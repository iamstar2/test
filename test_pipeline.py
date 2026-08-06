"""
test_pipeline.py

반도체 다이싱 라인(PKG-A) AI 비전 검사 E2E 검증 스크립트.
CuPy 전처리(경량 재현) -> PatchCore/Classifier 추론(Mock) -> supervision 시각화 -> VRS(Hold)/Fail 저장

실행: python test_pipeline.py
- ./raw_images 에 12bit(.png/.bmp) 이미지가 없으면 데모용 합성 이미지를 자동 생성해 즉시 검증 가능.
- Pass 판정은 저장하지 않고, Hold(VRS)/Fail 판정만 ./output_vrs 에 시각화 이미지로 저장.
- 판독 결과(after) 이미지를 display_batch_size(기본 3)장 단위로 모아 한 화면에 나열해 표시함
  (PASS/HOLD/FAIL 전부, 전처리 전 원본은 표시하지 않음).
  창에 포커스를 두고 임의의 키를 누르면 다음 3장으로, ESC를 누르면 시각화 확인을 종료한다.
  (PipelineConfig.show_window = False 로 끄면 창 없이 저장/로그만 수행)
"""

import glob
import os
import sys
import time
import traceback
from dataclasses import dataclass

import cv2
import numpy as np
import supervision as sv

try:  # Windows 콘솔 코드페이지(cp949 등)에서도 한글 로그가 깨지지 않도록 강제
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

try:
    import cupy as cp

    xp = cp
    GPU_AVAILABLE = True
except ImportError:
    xp = np
    GPU_AVAILABLE = False

# supervision 버전에 따라 BoundingBoxAnnotator / BoxAnnotator 로 이름이 다르다.
BoxAnnotatorCls = getattr(sv, "BoundingBoxAnnotator", None) or sv.BoxAnnotator


@dataclass
class PipelineConfig:
    input_dir: str = "./raw_images"
    output_dir: str = "./output_vrs"
    crop_margin: int = 200  # Hard Crop: 4변에서 잘라낼 픽셀 수 (프레임 가장자리/다이싱 테이프 제외)
    saturation_value: int = 4095  # 12bit 포화 기준값 (2^12 - 1)
    score_low: float = 0.35  # score < score_low -> PASS
    score_high: float = 0.70  # score >= score_high -> FAIL, 사이는 HOLD(VRS)
    vis_max_dim: int = 1024  # 시각화/저장용 리사이즈 기준 (원본 4096은 파일 용량이 과도함)
    latency_budget_ms: float = 50.0
    class_names: tuple = ("Scratch", "Particle", "Chipping")
    show_window: bool = True  # 처리 결과를 화면 창으로 즉시 띄워 육안 확인
    window_name: str = "VIRA Inspection Viewer (SPACE/any key: next, ESC: quit)"
    display_batch_size: int = 3  # 한 화면에 나열해서 보여줄 결과 이미지 개수
    display_panel_size: int = 520  # 나열 시 각 결과 이미지의 표시 크기(px)
    annotation_margin: int = 48  # 어노테이션 전 사방에 추가할 여백(px) — 테두리 라벨 잘림 방지


CFG = PipelineConfig()


# ---------------------------------------------------------------------------
# 1. 전처리 (CuPy 기반, 경량 재현) — Hard Crop -> 포화 마스킹 -> Z-score 정규화(FP16)
# ---------------------------------------------------------------------------
class CuPyPreprocessor:
    """PRD 전처리 3단계의 경량 재현. 실 배포에서는 hot/dead pixel 보정, dark/flat,
    서브픽셀 정렬 등이 선행되어야 하지만, 본 스크립트는 시각화 파이프라인 검증이
    목적이므로 PRD에 명시된 3단계만 재현한다."""

    def __init__(self, cfg: PipelineConfig):
        self.cfg = cfg

    def hard_crop(self, image_u16: np.ndarray) -> np.ndarray:
        m = self.cfg.crop_margin
        h, w = image_u16.shape
        if h <= 2 * m or w <= 2 * m:
            return image_u16
        return image_u16[m : h - m, m : w - m]

    def mask_saturation(self, image_u16: np.ndarray) -> np.ndarray:
        return image_u16 >= self.cfg.saturation_value

    def zscore_normalize(self, image_u16: np.ndarray, sat_mask: np.ndarray):
        arr = xp.asarray(image_u16, dtype=xp.float32)
        valid = xp.asarray(~sat_mask)
        valid_pixels = arr[valid]
        # 포화 화소가 통계를 오염시키지 않도록 비포화 영역만으로 평균/표준편차를 산출한다.
        if valid_pixels.size:
            mean = float(valid_pixels.mean())
            std = float(valid_pixels.std())
        else:
            mean, std = float(arr.mean()), 1.0
        std = std if std > 1e-6 else 1.0
        normed = (arr - mean) / std
        return normed.astype(xp.float16)

    def preprocess(self, image_u16: np.ndarray):
        cropped = self.hard_crop(image_u16)
        sat_mask = self.mask_saturation(cropped)
        tensor_fp16 = self.zscore_normalize(cropped, sat_mask)
        if GPU_AVAILABLE:
            # Mock 추론기는 CPU/NumPy 기반이므로 인터페이스 통일을 위해 명시적으로 동기화한다.
            # 실제 추론기는 GPU 텐서를 그대로 소비하므로 이 변환은 불필요하다.
            tensor_fp16 = cp.asnumpy(tensor_fp16)
        return tensor_fp16, sat_mask, cropped


# ---------------------------------------------------------------------------
# 2. 추론 모킹 — 1차 PatchCore Anomaly Map + 2차 Classifier 결함 좌표/판정용 스코어
# ---------------------------------------------------------------------------
class MockDefectDetector:
    """실제 PatchCore + Classifier 대신, 형태만 동일한 가상의 이상탐지 결과를 반환한다."""

    def __init__(self, cfg: PipelineConfig):
        self.cfg = cfg
        self._rng = np.random.default_rng()

    def infer(self, tensor_fp16: np.ndarray) -> dict:
        h, w = tensor_fp16.shape[-2:]
        # 그리드 해상도를 이미지 크기와 무관하게 고정해, 큰 그리드의 극값 통계(order
        # statistics)로 인해 배경 노이즈만으로도 max score가 항상 1에 근접해버리는
        # 현상을 방지한다.
        grid_h, grid_w = 32, 32
        anomaly_map = self._rng.random((grid_h, grid_w)).astype(np.float32) * 0.15

        r = self._rng.random()
        if r < 0.4:
            peak = 0.0  # 정상 다이 (핫스팟 없음) -> PASS
        elif r < 0.7:
            peak = float(self._rng.uniform(0.40, 0.65))  # HOLD(VRS) 대역
        else:
            peak = float(self._rng.uniform(0.75, 0.97))  # FAIL 대역

        if peak > 0:
            cy, cx = self._rng.integers(2, grid_h - 2), self._rng.integers(2, grid_w - 2)
            yy, xx = np.mgrid[0:grid_h, 0:grid_w]
            bump = peak * np.exp(-(((yy - cy) ** 2 + (xx - cx) ** 2) / (2 * 2.5**2)))
            anomaly_map = np.maximum(anomaly_map, bump.astype(np.float32))

        anomaly_map_full = cv2.resize(anomaly_map, (w, h), interpolation=cv2.INTER_LINEAR)
        max_score = float(anomaly_map_full.max())

        num_boxes = int(self._rng.integers(0, 4))
        boxes, confidences, class_ids = [], [], []
        for _ in range(num_boxes):
            bw, bh = self._rng.integers(20, 120, size=2)
            x1 = int(self._rng.integers(0, max(w - int(bw), 1)))
            y1 = int(self._rng.integers(0, max(h - int(bh), 1)))
            boxes.append([x1, y1, x1 + int(bw), y1 + int(bh)])
            confidences.append(float(self._rng.uniform(0.4, 0.98)))
            class_ids.append(int(self._rng.integers(0, len(self.cfg.class_names))))

        return {
            "anomaly_map": anomaly_map_full,
            "max_score": max_score,
            "boxes": np.array(boxes, dtype=np.float32).reshape(-1, 4),
            "confidences": np.array(confidences, dtype=np.float32),
            "class_ids": np.array(class_ids, dtype=int),
        }


def judge_verdict(score: float, cfg: PipelineConfig) -> str:
    if score < cfg.score_low:
        return "PASS"
    if score < cfg.score_high:
        return "HOLD"
    return "FAIL"


# ---------------------------------------------------------------------------
# 3. 시각화 — 12bit -> 8bit BGR 안전 변환 + supervision 어노테이션
# ---------------------------------------------------------------------------
class Visualizer:
    @staticmethod
    def to_display_bgr8(image_u16: np.ndarray, sat_mask: np.ndarray) -> np.ndarray:
        """12bit(uint16) -> 8bit 3채널(BGR) 안전 변환.
        전역 min-max 대신 비포화 영역의 0.5~99.5 퍼센타일로 대비를 잡아, 정반사(포화)
        영역이 계조를 독식해 표면 전체 대비가 죽는 것을 방지한다. 포화 화소는 정보가
        없는 영역이므로 회색으로 뭉개지 않고 마젠타로 별도 표시해 육안 식별이 가능하게 한다."""
        valid = image_u16[~sat_mask]
        if valid.size == 0:
            valid = image_u16.reshape(-1)
        lo, hi = np.percentile(valid, [0.5, 99.5])
        if hi <= lo:
            hi = lo + 1.0
        clipped = np.clip(image_u16.astype(np.float32), lo, hi)
        gray8 = ((clipped - lo) / (hi - lo) * 255.0).astype(np.uint8)
        bgr = cv2.cvtColor(gray8, cv2.COLOR_GRAY2BGR)
        bgr[sat_mask] = (255, 0, 255)  # BGR 마젠타
        return bgr

    @staticmethod
    def add_margin(bgr_image: np.ndarray, anomaly_map: np.ndarray, boxes: np.ndarray, margin: int):
        """어노테이션(배너/결함 라벨)을 그리기 전에 캔버스 사방에 여백을 추가한다.
        sv.LabelAnnotator는 라벨을 박스 바로 위쪽에 그리는데, 박스가 캔버스 경계에 붙어
        있으면 라벨이 캔버스 밖으로 밀려 잘려 보이지 않는다. 캔버스를 여백만큼 넓히고
        박스/Anomaly Map 좌표를 함께 이동시켜, 어떤 위치의 라벨도 잘리지 않게 한다."""
        padded = cv2.copyMakeBorder(
            bgr_image, margin, margin, margin, margin, cv2.BORDER_CONSTANT, value=(32, 32, 32)
        )
        anomaly_padded = cv2.copyMakeBorder(
            anomaly_map, margin, margin, margin, margin, cv2.BORDER_CONSTANT, value=0
        )
        shifted_boxes = boxes + margin if boxes.size else boxes
        return padded, anomaly_padded, shifted_boxes

    @staticmethod
    def tile_results(panels: list, captions: list, panel_size: int = 520) -> np.ndarray:
        """판독 결과(after) 이미지 여러 장을 한 줄로 나열해 한 화면에서 비교할 수 있게 한다."""
        divider = np.full((panel_size, 6, 3), (60, 60, 60), dtype=np.uint8)
        tiles = []
        for panel, caption in zip(panels, captions):
            tile = cv2.resize(panel, (panel_size, panel_size), interpolation=cv2.INTER_AREA)
            (tw, th), _ = cv2.getTextSize(caption, cv2.FONT_HERSHEY_SIMPLEX, 0.55, 2)
            cv2.rectangle(tile, (0, panel_size - th - 14), (min(tw + 14, panel_size), panel_size), (0, 0, 0), -1)
            cv2.putText(
                tile, caption, (6, panel_size - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (255, 255, 255), 2, cv2.LINE_AA
            )
            tiles.append(tile)

        row = [tiles[0]]
        for tile in tiles[1:]:
            row.append(divider)
            row.append(tile)
        return np.hstack(row)

    @staticmethod
    def resize_for_display(image_u16: np.ndarray, sat_mask: np.ndarray, cfg: PipelineConfig):
        h, w = image_u16.shape
        scale = min(1.0, cfg.vis_max_dim / max(h, w))
        if scale >= 1.0:
            return image_u16, sat_mask, 1.0
        new_w, new_h = int(w * scale), int(h * scale)
        resized_img = cv2.resize(image_u16, (new_w, new_h), interpolation=cv2.INTER_AREA)
        resized_mask = cv2.resize(
            sat_mask.astype(np.uint8), (new_w, new_h), interpolation=cv2.INTER_NEAREST
        ).astype(bool)
        return resized_img, resized_mask, scale

    @staticmethod
    def overlay_anomaly_heatmap(bgr_image: np.ndarray, anomaly_map: np.ndarray) -> np.ndarray:
        """sv.HeatMapAnnotator로 1차 Anomaly Map을 오버레이한다.
        HeatMapAnnotator는 원래 검출 지점(anchor)의 시간축 누적 밀도를 그리도록 설계되어
        연속적인 2D 스코어 배열을 직접 받지 않는다. 이를 활용하기 위해 anomaly score에
        비례해 가중 샘플링한 점들을 미세 bbox의 Detections로 변환한 뒤 단일 프레임에
        누적시켜, 스코어가 높은 영역일수록 점 밀도가 높아지고 결과적으로 더 뜨거운
        색으로 표현되도록 한다."""
        h, w = bgr_image.shape[:2]
        flat = anomaly_map.reshape(-1)
        threshold = float(np.quantile(flat, 0.85))
        ys, xs = np.where(anomaly_map >= threshold)
        if xs.size == 0:
            return bgr_image

        weights = anomaly_map[ys, xs].astype(np.float64)
        weights = weights / weights.sum()
        n_points = min(1500, xs.size)
        idx = np.random.default_rng().choice(xs.size, size=n_points, replace=True, p=weights)
        px, py = xs[idx], ys[idx]

        half = 1
        xyxy = np.stack(
            [px - half, py - half, px + half, py + half], axis=1
        ).astype(np.float32)
        heat_detections = sv.Detections(xyxy=xyxy)

        radius = max(min(h, w) // 40, 20)
        heat_annotator = sv.HeatMapAnnotator(radius=radius, opacity=0.45, kernel_size=25)
        return heat_annotator.annotate(scene=bgr_image, detections=heat_detections)

    @staticmethod
    def annotate_detections(
        bgr_image: np.ndarray,
        boxes: np.ndarray,
        confidences: np.ndarray,
        class_ids: np.ndarray,
        cfg: PipelineConfig,
        verdict: str,
        elapsed_ms: float,
    ) -> np.ndarray:
        """결함 bbox/클래스/신뢰도와, 3-Way 판정 + 소요시간 배너를 함께 어노테이션한다."""
        h, w = bgr_image.shape[:2]

        if boxes.shape[0] > 0:
            xyxy = boxes.astype(np.float32)
            conf = confidences.astype(np.float32)
            cls = class_ids.astype(int)
            labels = [f"{cfg.class_names[c]} {p:.2f}" for c, p in zip(cls, conf)]
        else:
            xyxy = np.empty((0, 4), dtype=np.float32)
            conf = np.empty((0,), dtype=np.float32)
            cls = np.empty((0,), dtype=int)
            labels = []

        # 판정 배너도 동일한 BoxAnnotator/LabelAnnotator 경로로 그려, 화면 좌상단에
        # 3-Way 판정 결과와 전처리+추론 소요시간(ms)을 텍스트로 표시한다.
        # 배너/박스 좌표는 이미 add_margin()으로 여백만큼 이동된 캔버스 기준이므로,
        # 여백(margin) 오프셋을 그대로 더해 실제 이미지 모서리에 걸리지 않게 한다.
        m = cfg.annotation_margin
        verdict_class_id = len(cfg.class_names) + {"PASS": 0, "HOLD": 1, "FAIL": 2}[verdict]
        banner_box = np.array([[m + 8, m + 8, min(m + 430, w - 8), m + 42]], dtype=np.float32)
        xyxy = np.concatenate([xyxy, banner_box], axis=0)
        conf = np.concatenate([conf, np.array([1.0], dtype=np.float32)])
        cls = np.concatenate([cls, np.array([verdict_class_id], dtype=int)])
        over_budget = " OVER-BUDGET" if elapsed_ms > cfg.latency_budget_ms else ""
        labels.append(f"[{verdict}] pre+infer {elapsed_ms:.1f}ms{over_budget}")

        detections = sv.Detections(xyxy=xyxy, confidence=conf, class_id=cls)
        box_annotator = BoxAnnotatorCls(thickness=3)
        label_annotator = sv.LabelAnnotator(text_scale=0.6, text_padding=6)

        annotated = box_annotator.annotate(scene=bgr_image, detections=detections)
        annotated = label_annotator.annotate(scene=annotated, detections=detections, labels=labels)
        return annotated


class _LiveDisplay:
    """cv2.imshow 창으로 처리 결과를 즉시 육안 확인할 수 있게 한다.
    디스플레이가 없는 헤드리스 환경(CI 서버 등)에서 imshow가 예외를 던지면
    이후 프레임은 창 띄우기를 건너뛰고 콘솔 로그만으로 계속 진행한다."""

    def __init__(self, cfg: PipelineConfig):
        self.window_name = cfg.window_name
        self.enabled = True
        width = cfg.display_batch_size * cfg.display_panel_size + (cfg.display_batch_size - 1) * 6
        try:
            cv2.namedWindow(self.window_name, cv2.WINDOW_NORMAL)
            cv2.resizeWindow(self.window_name, width, cfg.display_panel_size + 40)
        except cv2.error as exc:
            print(f"[WARN] 화면 창을 열 수 없어 시각화 표시를 비활성화합니다: {exc}")
            self.enabled = False

    def show(self, title: str, image: np.ndarray) -> bool:
        """True를 반환하면 계속 진행, False면 ESC로 중단 요청됨."""
        if not self.enabled:
            return True
        try:
            cv2.setWindowTitle(self.window_name, title)
            cv2.imshow(self.window_name, image)
            key = cv2.waitKey(0) & 0xFF
            if key == 27:  # ESC
                return False
        except cv2.error as exc:
            print(f"[WARN] 화면 표시 중 오류로 이후 시각화를 비활성화합니다: {exc}")
            self.enabled = False
        return True

    def close(self):
        if self.enabled:
            cv2.destroyWindow(self.window_name)


# ---------------------------------------------------------------------------
# 4. 파이프라인 오케스트레이션
# ---------------------------------------------------------------------------
class InspectionPipeline:
    def __init__(self, cfg: PipelineConfig):
        self.cfg = cfg
        self.preprocessor = CuPyPreprocessor(cfg)
        self.model = MockDefectDetector(cfg)
        os.makedirs(cfg.output_dir, exist_ok=True)

    @staticmethod
    def _load_raw(path: str) -> np.ndarray:
        image = cv2.imread(path, cv2.IMREAD_UNCHANGED)
        if image is None:
            raise IOError(f"이미지를 읽을 수 없음 (손상/미지원 포맷): {path}")
        if image.ndim == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        if image.dtype != np.uint16:
            raise TypeError(f"12bit(uint16) 컨테이너가 아님 (dtype={image.dtype}): {path}")
        return image

    def process_one(self, path: str) -> dict:
        raw = self._load_raw(path)

        # ---- 50ms 예산 대상 구간: 전처리 + 추론만 계측 (시각화/저장 제외) ----
        t0 = time.perf_counter()
        tensor_fp16, sat_mask, cropped = self.preprocessor.preprocess(raw)
        result = self.model.infer(tensor_fp16)
        elapsed_ms = (time.perf_counter() - t0) * 1000.0
        # ---------------------------------------------------------------

        verdict = judge_verdict(result["max_score"], self.cfg)

        disp_img, disp_mask, scale = Visualizer.resize_for_display(cropped, sat_mask, self.cfg)
        anomaly_disp = cv2.resize(
            result["anomaly_map"], (disp_img.shape[1], disp_img.shape[0]), interpolation=cv2.INTER_LINEAR
        )
        boxes_disp = result["boxes"] * scale

        bgr = Visualizer.to_display_bgr8(disp_img, disp_mask)
        bgr, anomaly_disp, boxes_disp = Visualizer.add_margin(
            bgr, anomaly_disp, boxes_disp, self.cfg.annotation_margin
        )
        bgr = Visualizer.overlay_anomaly_heatmap(bgr, anomaly_disp)
        bgr = Visualizer.annotate_detections(
            bgr, boxes_disp, result["confidences"], result["class_ids"], self.cfg, verdict, elapsed_ms
        )

        return {"verdict": verdict, "elapsed_ms": elapsed_ms, "score": result["max_score"], "image": bgr}

    def run(self):
        paths = sorted(
            glob.glob(os.path.join(self.cfg.input_dir, "*.png"))
            + glob.glob(os.path.join(self.cfg.input_dir, "*.bmp"))
        )
        if not paths:
            print(f"[WARN] 처리할 이미지가 없습니다: {self.cfg.input_dir}")
            return

        stats = {"PASS": 0, "HOLD": 0, "FAIL": 0, "ERROR": 0}
        display = _LiveDisplay(self.cfg) if self.cfg.show_window else None
        batch_panels, batch_captions = [], []
        stopped = False

        def flush_batch():
            nonlocal stopped
            if display is None or not batch_panels:
                return
            tiled = Visualizer.tile_results(batch_panels, batch_captions, self.cfg.display_panel_size)
            title = " | ".join(batch_captions)
            if not display.show(title, tiled):
                stopped = True

        for path in paths:
            if stopped:
                break

            name = os.path.basename(path)
            try:
                out = self.process_one(path)
            except Exception as exc:  # 손상 이미지 등으로 루프가 중단되지 않도록 개별 캐치
                stats["ERROR"] += 1
                print(f"[ERROR] {name}: {exc}")
                traceback.print_exc()
                continue

            stats[out["verdict"]] += 1
            flag = " (budget 50ms 초과)" if out["elapsed_ms"] > self.cfg.latency_budget_ms else ""
            print(
                f"[{out['verdict']:>4}] {name}  score={out['score']:.3f}  "
                f"proc={out['elapsed_ms']:.2f}ms{flag}"
            )

            if out["verdict"] in ("HOLD", "FAIL"):
                save_path = os.path.join(self.cfg.output_dir, f"{out['verdict']}_{name}")
                cv2.imwrite(save_path, out["image"])

            if display is not None:
                batch_panels.append(out["image"])
                batch_captions.append(f"{name} [{out['verdict']}]")
                if len(batch_panels) >= self.cfg.display_batch_size:
                    flush_batch()
                    batch_panels, batch_captions = [], []

        if not stopped:
            flush_batch()  # 배치 크기(3)에 못 미치는 마지막 나머지도 표시

        if stopped:
            print("[INFO] ESC 입력으로 시각화 확인을 중단합니다. (파일 처리는 계속되지 않음)")

        if display is not None:
            display.close()

        print("\n=== 처리 결과 요약 ===")
        for key, value in stats.items():
            print(f"  {key}: {value}")


# ---------------------------------------------------------------------------
# 5. 데모 데이터 자동 생성 (raw_images 가 비어 있을 때만)
# ---------------------------------------------------------------------------
def _ensure_demo_images(cfg: PipelineConfig, count: int = 3, size: int = 4096):
    os.makedirs(cfg.input_dir, exist_ok=True)
    existing = glob.glob(os.path.join(cfg.input_dir, "*.png")) + glob.glob(
        os.path.join(cfg.input_dir, "*.bmp")
    )
    if existing:
        return

    print(f"[INFO] {cfg.input_dir} 에 이미지가 없어 데모용 합성 12bit 이미지를 {count}장 생성합니다.")
    rng = np.random.default_rng(0)
    for i in range(count):
        base = rng.normal(loc=1800, scale=60, size=(size, size)).clip(0, cfg.saturation_value).astype(np.uint16)
        edge = 300  # 다이싱 테이프 배경(가장자리)을 어둡게 시뮬레이션
        base[:edge, :] //= 3
        base[-edge:, :] //= 3
        base[:, :edge] //= 3
        base[:, -edge:] //= 3
        # 정반사(패드/범프) 포화 영역 시뮬레이션
        cy, cx = rng.integers(600, size - 600, size=2)
        base[cy - 40 : cy + 40, cx - 40 : cx + 40] = cfg.saturation_value
        cv2.imwrite(os.path.join(cfg.input_dir, f"demo_die_{i:02d}.png"), base)


def main():
    cfg = CFG
    print(f"[INFO] GPU(CuPy) 사용 가능: {GPU_AVAILABLE}")
    _ensure_demo_images(cfg)
    pipeline = InspectionPipeline(cfg)
    pipeline.run()


if __name__ == "__main__":
    main()
