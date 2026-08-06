import React from 'react';
import { AlertTriangle, BoxSelect, ShieldAlert, Cpu, ArrowDownRight, Layers } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-20 bg-[#0a0a0e] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            CONVENTIONAL AOI LIMITATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            기존 검사의 한계를 넘어서다.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            300mm 웨이퍼 후공정에서 conventional rule-based AOI와 단순 Bounding Box 방식이 겪는 3가지 치명적 병목
          </p>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: 6.8% Box vs Defect Area */}
          <div className="rounded-2xl bg-[#111116] border border-[#22222c] p-6 sm:p-8 hover:border-[#2e2e3d] transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <BoxSelect className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-gray-500">PROBLEM #01</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-red-400 font-mono tracking-tight">6.8%</span>
                <span className="text-xs text-gray-400">실제 결함 점유 비율</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                박스로는 측정할 수 없다
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                축정렬 박스(AABB) 안에서 실제 결함이 차지하는 면적은 평균 <strong className="text-gray-200">6.8%</strong>에 불과합니다.
                나머지 93%는 정상 회로 패턴입니다. AABB는 결함의 면적, 주축 방향, 종대비를 심각하게 왜곡합니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1e28] text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>영향: 정밀 면적 산출 불가</span>
              <span className="text-red-400 font-semibold">스펙 오판 유발</span>
            </div>
          </div>

          {/* Card 2: 4.2% Overkill Rate */}
          <div className="rounded-2xl bg-[#111116] border border-[#22222c] p-6 sm:p-8 hover:border-[#2e2e3d] transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-gray-500">PROBLEM #02</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-orange-400 font-mono tracking-tight">4.2%</span>
                <span className="text-xs text-gray-400">기존 AOI 과검율</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                룰 기반 AOI는 과검으로 무너진다
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                임계값 기반 AOI는 회로 패턴의 정상 광학 반사를 결함과 구분하지 못합니다.
                과검율 4.2%는 하루 <strong className="text-gray-200">약 11,900개 다이</strong>를 재판정 대기열로 보내고 작업자 병목을 초래합니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1e28] text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>손실: 재검증 공수 가중</span>
              <span className="text-orange-400 font-semibold">11.9k Dies/Day</span>
            </div>
          </div>

          {/* Card 3: 240 DPPM Missed Cracks */}
          <div className="rounded-2xl bg-[#111116] border border-[#22222c] p-6 sm:p-8 hover:border-[#2e2e3d] transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-gray-500">PROBLEM #03</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-yellow-400 font-mono tracking-tight">240 DPPM</span>
                <span className="text-xs text-gray-400">고객 입고 미검 잔류</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                그런데 정작 미세 크랙은 놓친다
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                기준을 아무리 조여도 폭 15~25µm의 선형 크랙은 배경 텍스처와 픽셀 통계가 겹칩니다.
                고객 입고 검사에서 여전히 <strong className="text-gray-200">240 DPPM</strong>이 미검으로 잔류해 크리티컬 클레임이 발생합니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e1e28] text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>위험: 신뢰성 클레임</span>
              <span className="text-yellow-400 font-semibold">미세선형 크랙 유출</span>
            </div>
          </div>

        </div>

        {/* Transition Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-cyan-950/40 to-blue-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">VIRA-1의 Solution: YOLO26s-seg 픽셀 단위 인스펙션</h4>
              <p className="text-xs text-gray-300">실시간 다각형 마스크 세그멘테이션으로 93% 노이즈를 완전 제거하고 15µm 미세 크랙까지 추적합니다.</p>
            </div>
          </div>
          <a
            href="#simulator"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5"
          >
            시뮬레이터로 직접 검증
            <ArrowDownRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
