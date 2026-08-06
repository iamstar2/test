import React, { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, Sliders, Layers, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { ModelComparison } from '../types';

export const WhyYolo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'segVsDetect' | 'modelCompare' | 'modelSize'>('segVsDetect');

  const modelMatrix: ModelComparison[] = [
    { model: 'Mask R-CNN', p95Latency: '380 ms', mAP50: '42.1%', nmsFree: false, dflRemoval: false, smallObjectLoss: false, note: '택트 250ms 초과로 실시간 적용 불가' },
    { model: 'YOLOv8-seg', p95Latency: '185 ms', mAP50: '48.5%', nmsFree: false, dflRemoval: false, smallObjectLoss: false, note: 'NMS 병목으로 지연시간 변동성 큼' },
    { model: 'YOLO11-seg', p95Latency: '145 ms', mAP50: '51.2%', nmsFree: false, dflRemoval: false, smallObjectLoss: true, note: '여유율 부족 (145ms vs 250ms)' },
    { model: 'YOLO12-seg', p95Latency: '130 ms', mAP50: '52.8%', nmsFree: true, dflRemoval: false, smallObjectLoss: true, note: '추론 안정적이나 DFL 오버헤드 잔류' },
    { model: 'YOLO26s-seg (VIRA-1)', p95Latency: '45 ms (Total 120ms)', mAP50: '56.4%', nmsFree: true, dflRemoval: true, smallObjectLoss: true, note: 'NMS-free + DFL 제거로 52% 여유율 달성' },
  ];

  return (
    <section id="why-yolo" className="py-20 bg-[#080808] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            CORE AI ENGINE & TECHNICAL ADVANTAGE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            왜 YOLO26s-seg 인가?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            반도체 후공정 300mm 웨이퍼 비전 검사에 특화된 최신 세그멘테이션 아키텍처 분석
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-[#1e1e28] pb-4">
          <button
            onClick={() => setActiveTab('segVsDetect')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-mono flex items-center gap-2 ${
              activeTab === 'segVsDetect'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-[#181822] border border-[#22222c]'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Detect vs Seg (실측 왜곡 해소)
          </button>

          <button
            onClick={() => setActiveTab('modelCompare')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-mono flex items-center gap-2 ${
              activeTab === 'modelCompare'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-[#181822] border border-[#22222c]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            2. YOLO26s 모델 성능 비교
          </button>

          <button
            onClick={() => setActiveTab('modelSize')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-mono flex items-center gap-2 ${
              activeTab === 'modelSize'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-[#181822] border border-[#22222c]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            3. mask_ratio & 모델 사이즈
          </button>
        </div>

        {/* Tab Content 1: Seg vs Detect */}
        {activeTab === 'segVsDetect' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-white">
                왜 Detect가 아니라 Segmentation인가? (실측 분석)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                바운딩 박스(AABB) 방식은 불규칙한 미세 크랙이나 칩핑 결함을 직사각형 박스로 둘러싸기 때문에,
                박스 내부 면적의 <strong className="text-red-400 font-mono">93.2%가 정상 회로 패턴</strong>으로 채워집니다.
              </p>
              <ul className="space-y-2 text-xs text-gray-300 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>AABB (축정렬 박스):</strong> 결함 점유율 6.8%. 크랙의 실제 폭과 곡률을 완전히 무시함.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>OBB (회전 박스):</strong> 결함 점유율 ~34.2%. 사선 크랙에는 개선되나 곡선 크랙에는 한계.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>YOLO26s-seg (Polygon Mask):</strong> 결함 점유율 <strong className="text-cyan-300">100%</strong>. 회로 노이즈 0% 분리.</span>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-[#08080d] border border-[#1e1e28] text-xs text-gray-400">
                💡 픽셀 단위 다각형 마스크는 결함의 <span className="text-white font-semibold">실제 면적(µm²), 주축 길이, 종대비(Aspect Ratio)</span>를 정밀 산출하여
                스펙 오판에 따른 억울한 다이 스크랩을 방지합니다.
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#08080d] border border-[#1e1e28] rounded-xl p-5 space-y-3 text-xs font-mono">
              <div className="text-gray-400 font-bold text-center border-b border-[#1e1e28] pb-2">
                실측 픽셀 채움 비율 (Pixel Filling Ratio)
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1 text-red-400">
                    <span>AABB (기존 Box)</span>
                    <span>6.8% (노이즈 93.2%)</span>
                  </div>
                  <div className="w-full bg-[#1e1e28] rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '6.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-orange-400">
                    <span>OBB (회전 Box)</span>
                    <span>34.2% (노이즈 65.8%)</span>
                  </div>
                  <div className="w-full bg-[#1e1e28] rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '34.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-cyan-400 font-bold">
                    <span>YOLO26s-seg (Polygon)</span>
                    <span>100% (Pure Defect)</span>
                  </div>
                  <div className="w-full bg-[#1e1e28] rounded-full h-2.5">
                    <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Model Comparison Matrix */}
        {activeTab === 'modelCompare' && (
          <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">세그멘테이션 인공지능 모델 벤치마크</h3>
                <p className="text-xs text-gray-400">300mm 웨이퍼 후공정 250ms 소터 인덱스 타임 조건 기준 비교</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-950 rounded border border-cyan-500/40">
                Selected: YOLO26s-seg
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-gray-400 border-b border-[#1e1e28] bg-[#08080d]">
                    <th className="py-3 px-3">모델명 (Model)</th>
                    <th className="py-3 px-3">추론 지연 (P95)</th>
                    <th className="py-3 px-3">mAP50-Mask</th>
                    <th className="py-3 px-3 text-center">NMS-Free</th>
                    <th className="py-3 px-3 text-center">DFL 제거</th>
                    <th className="py-3 px-3 text-center">Small-Loss</th>
                    <th className="py-3 px-3">적용 적합성 및 특이사항</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {modelMatrix.map((item, idx) => {
                    const isSelected = item.model.includes('YOLO26s-seg');
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isSelected ? 'bg-cyan-950/60 font-semibold text-white' : 'hover:bg-gray-800/40'
                        }`}
                      >
                        <td className="py-3 px-3 font-bold flex items-center gap-1.5">
                          {isSelected && <Zap className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />}
                          {item.model}
                        </td>
                        <td className={`py-3 px-3 font-bold ${isSelected ? 'text-cyan-300' : 'text-gray-300'}`}>
                          {item.p95Latency}
                        </td>
                        <td className="py-3 px-3 text-emerald-400">{item.mAP50}</td>
                        <td className="py-3 px-3 text-center">
                          {item.nmsFree ? <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" /> : <XCircle className="w-4 h-4 text-red-500/70 inline" />}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {item.dflRemoval ? <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" /> : <XCircle className="w-4 h-4 text-red-500/70 inline" />}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {item.smallObjectLoss ? <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" /> : <XCircle className="w-4 h-4 text-red-500/70 inline" />}
                        </td>
                        <td className={`py-3 px-3 text-xs ${isSelected ? 'text-cyan-200' : 'text-gray-400'}`}>
                          {item.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 3: Model Size & mask_ratio */}
        {activeTab === 'modelSize' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#22222c] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm font-bold">
                M1
              </div>
              <h4 className="text-base font-bold text-white">mask_ratio = 1 필수 고정</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                기본 값인 mask_ratio=4 사용 시 마스크 해상도가 1/4로 다운샘플링되어 15µm 미세 크랙 경계선이 뭉개집니다.
                VIRA-1은 <strong className="text-white">mask_ratio=1</strong> 고정 학습으로 원본 해상도 1:1 마스크 피처맵을 보존합니다.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#22222c] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-sm font-bold">
                M2
              </div>
              <h4 className="text-base font-bold text-white">해상도 제약 (imgsz ≤ 832)</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                웨이퍼 고해상도 전체 이미지를 다이 단위 패치로 크롭 시 이미지 사이즈를 <strong className="text-white">imgsz = 832</strong>로 제한하여 TensorRT 메모리 대역폭 한계를 준수하고 45ms 추론을 유지합니다.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300 font-mono text-sm font-bold">
                M3
              </div>
              <h4 className="text-base font-bold text-white">YOLO26s (Small) 최적의 스위트스팟</h4>
              <p className="text-xs text-cyan-200/90 leading-relaxed">
                Nano(n)는 15µm 표면 불량 검출률 부족, Medium(m)은 추론 지연시간 85ms 초과.
                <strong>YOLO26s-seg</strong>만이 mAP50 56.4%와 45ms 추론의 Perfect Sweet Spot을 제공합니다.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
