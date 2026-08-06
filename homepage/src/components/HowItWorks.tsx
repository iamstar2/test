import React from 'react';
import { Cpu, ArrowRight, Clock, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Zap, Layers } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const latencyRows = [
    { step: '전처리 (정합·정규화)', engine: 'OpenCV 룰 기반', latency: '15 ms', description: '0.8µm 해상도 이미지 좌표 정렬 및 서브픽셀 보정' },
    { step: '구조/치수 검사', engine: '템플릿 정합 + 경량 분류기', latency: '20 ms', description: '패드 오프셋, 범프 피치, 마크 회전 각도 측정' },
    { step: '표면 결함 검출', engine: 'YOLO26s-seg (PyTorch / TensorRT)', latency: '45 ms', description: '크랙, 칩핑, 파티클, 스태인 픽셀 마스크 추출' },
    { step: '미학습 이상 탐지', engine: 'PatchCore (양품 메모리 기반)', latency: '30 ms', description: '신종 패턴 변이 및 미정의 결함 이상 스코어링' },
    { step: '후처리 (µm 환산·스펙 대조)', engine: 'C++ 룰 기반 엔진', latency: '10 ms', description: '픽셀 면적/장축 길이를 µm 환산 후 스펙 매칭' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0a0a0e] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5" />
            END-TO-END PIPELINE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            작동 방식 & 파이프라인
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            다이 인덱스 입력부터 SECS/GEM 판정 전송까지 120ms(P95) 내에 완료되는 고성능 비전 파이프라인
          </p>
        </div>

        {/* Pipeline Horizontal Flow Diagram */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-gray-400 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            파이프라인 흐름도 (Data Processing Pipeline Flow)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c] relative group hover:border-[#2e2e3d] transition-all">
              <div className="text-[10px] font-mono text-gray-500 mb-1">STAGE 01</div>
              <div className="text-sm font-bold text-white mb-1">다이 인덱스</div>
              <div className="text-xs text-gray-400">소터 트리거 신호 수신</div>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c] relative group hover:border-[#2e2e3d] transition-all">
              <div className="text-[10px] font-mono text-gray-500 mb-1">STAGE 02</div>
              <div className="text-sm font-bold text-white mb-1">3채널 촬상</div>
              <div className="text-xs text-gray-400">동축+다크필드 LED 동시</div>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c] relative group hover:border-[#2e2e3d] transition-all">
              <div className="text-[10px] font-mono text-gray-500 mb-1">STAGE 03</div>
              <div className="text-sm font-bold text-white mb-1">전처리</div>
              <div className="text-xs text-gray-400">OpenCV 서브픽셀 정합</div>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/40 relative group transition-all">
              <div className="text-[10px] font-mono text-cyan-400 mb-1">STAGE 04 (CORE)</div>
              <div className="text-sm font-bold text-cyan-200 mb-1">YOLO26s-seg</div>
              <div className="text-xs text-cyan-300">구조+seg+이상탐지 병렬</div>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c] relative group hover:border-[#2e2e3d] transition-all">
              <div className="text-[10px] font-mono text-gray-500 mb-1">STAGE 05</div>
              <div className="text-sm font-bold text-white mb-1">µm 환산</div>
              <div className="text-xs text-gray-400">픽셀 면적을 치수 변환</div>
              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 z-10" />
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 relative group transition-all">
              <div className="text-[10px] font-mono text-emerald-400 mb-1">STAGE 06</div>
              <div className="text-sm font-bold text-emerald-200 mb-1">3-Bin 분류</div>
              <div className="text-xs text-emerald-300">SECS/GEM 맵 전송</div>
            </div>

          </div>
        </div>

        {/* Detailed Latency Breakdown Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 bg-[#111116] border border-[#22222c] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#1e1e28] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">단계별 소요 시간 분석 (Latency Breakdown)</h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                P95 Target: 120 ms
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-gray-400 border-b border-[#1e1e28] bg-[#08080d]">
                    <th className="py-2.5 px-3">처리 단계 (Pipeline Step)</th>
                    <th className="py-2.5 px-3">적용 엔진 / 알고리즘</th>
                    <th className="py-2.5 px-3 text-right">소요시간 (P95)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e28] text-gray-300">
                  {latencyRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#161620] transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">{row.step}</td>
                      <td className="py-3 px-3 text-gray-400">{row.engine}</td>
                      <td className="py-3 px-3 text-right text-cyan-400 font-bold">{row.latency}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#08080d] font-bold text-white border-t-2 border-[#20202d]">
                    <td className="py-3 px-3 text-sm">합계 P95 지연시간</td>
                    <td className="py-3 px-3 text-xs text-gray-400 font-normal">Dual RTX A6000 TensorRT FP16 최적화</td>
                    <td className="py-3 px-3 text-right text-base text-blue-400">120 ms</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Latency Margin Note */}
            <div className="mt-4 p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200 flex items-center justify-between">
              <span>⚡ <strong>소터 택트 250ms 대응:</strong> 120ms 처리 완료로 여유율 <strong className="text-cyan-300">52%</strong>를 확보하여 소터 정지 없이 연속 픽업이 가능합니다.</span>
            </div>
          </div>

          {/* Right Column: 3-Bin Decision Rules */}
          <div className="lg:col-span-4 bg-[#111116] border border-[#22222c] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1e1e28] pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              자동 3-Bin 판정 로직
            </h3>

            {/* PASS */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> PASS (Good Bin)</span>
                <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">BIN 1</span>
              </div>
              <p className="text-xs text-emerald-100/80">조건: 추론 스코어 &lt; 0.35, 전 항목 치수/표면 스펙 만족</p>
            </div>

            {/* REVIEW */}
            <div className="p-3.5 rounded-xl bg-yellow-950/40 border border-yellow-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-yellow-300">
                <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-yellow-400" /> REVIEW (재판정 트레이)</span>
                <span className="font-mono text-[10px] bg-yellow-500/20 px-2 py-0.5 rounded">BIN 2</span>
              </div>
              <p className="text-xs text-yellow-100/80">조건: 0.35 ≤ 스코어 &lt; 0.70 또는 이상탐지 스코어 단독 검출</p>
            </div>

            {/* REJECT */}
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-red-300">
                <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-400" /> REJECT (Reject Bin)</span>
                <span className="font-mono text-[10px] bg-red-500/20 px-2 py-0.5 rounded">BIN 3</span>
              </div>
              <p className="text-xs text-red-100/80">조건: Critical 결함 (크랙/칩핑) 검출 또는 스코어 ≥ 0.70</p>
            </div>

            <div className="text-[11px] text-gray-400 font-mono pt-1">
              * SECS/GEM HSMS 통신으로 300mm 웨이퍼 맵(SEMI E142)에 실시간 좌표 인덱싱 기록
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
