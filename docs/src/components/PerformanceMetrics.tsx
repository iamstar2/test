import React from 'react';
import { Target, CheckCircle, ShieldAlert, Cpu, Activity, Clock, Layers, Award } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const metrics = [
    { title: '치명 결함 검출률 (Recall)', value: '≥ 99.5%', sub: '크랙, 칩핑, 쇼트 결함 대상', color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { title: '미검율 (Underkill / Escape)', value: '≤ 10 DPPM', sub: '고객 입고 클레임 방지 레벨', color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { title: '과검율 (Overkill Rate)', value: '≤ 1.0%', sub: '기존 AOI(4.2%) 대비 76% 감축', color: 'text-blue-400', border: 'border-blue-500/30' },
    { title: '검출 정확도 (Precision)', value: '≥ 90.0%', sub: '회로 노이즈 완벽 오인 해소', color: 'text-indigo-400', border: 'border-indigo-500/30' },
    { title: '추론 지연시간 (P95)', value: '120 ms', sub: 'P99 ≤ 200ms (소터 250ms 완벽 대응)', color: 'text-purple-400', border: 'border-purple-500/30' },
    { title: '시간당 처리량 (Throughput)', value: '≥ 14,400 UPH', sub: '300mm 웨이퍼 풀 다이 검사 기준', color: 'text-sky-400', border: 'border-sky-500/30' },
    { title: '장비 가동률 (Availability)', value: '≥ 99.0%', sub: 'SEMI E10 준수 24/7 가동 사양', color: 'text-teal-400', border: 'border-teal-500/30' },
    { title: '웨이퍼 맵 정합성', value: '0 Error', sub: 'SEMI E142 통신 인덱스 불일치 제로', color: 'text-yellow-400', border: 'border-yellow-500/30' },
  ];

  return (
    <section id="performance" className="py-20 bg-[#080808] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5" />
            PRECISION ENGINEERED GUARANTEED PERFORMANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            검증된 핵심 성능 지표
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            양산 패브릭라인 실측 평가 데이터를 기반으로 보장하는 VIRA-1의 정량적 품질 사양
          </p>
        </div>

        {/* 8 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[#111116] border ${m.border} hover:border-[#2e2e3d] transition-all shadow-lg space-y-2 relative overflow-hidden group`}
            >
              <div className="text-xs font-mono text-gray-400">{m.title}</div>
              <div className={`text-3xl font-extrabold font-mono tracking-tight ${m.color}`}>
                {m.value}
              </div>
              <div className="text-[11px] text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Performance Philosophy Callout Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0d0d12] via-[#111117] to-[#0d0d12] border border-[#22222c] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              VIRA SYSTEMS PERFORMANCE PHILOSOPHY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              "단 하나의 미세 크랙 유출도 용납하지 않으면서, 과검으로 인한 생산성 손실을 제로에 가깝게 통제합니다."
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              YOLO26s-seg 다각형 마스크 세그멘테이션 알고리즘과 TensorRT FP16 가속 엔진은 소터 장비의 물리적 구동속도를 상회하는 
              <strong className="text-white"> 120ms P95 Latency</strong>를 유지하면서, 자동차용 AEC-Q100 등급의 혹독한 품질 검증 요구사항을 만족시킵니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
