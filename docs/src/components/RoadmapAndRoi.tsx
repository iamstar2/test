import React, { useState } from 'react';
import { TrendingUp, Calendar, DollarSign, ShieldCheck, ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

export const RoadmapAndRoi: React.FC = () => {
  // Calculator state
  const [monthlyWafers, setMonthlyWafers] = useState<number>(30000);
  const [diePerWafer, setDiePerWafer] = useState<number>(500);
  const [overkillRatePercent, setOverkillRatePercent] = useState<number>(4.2);
  const [reviewCostPerDie, setReviewCostPerDie] = useState<number>(15); // KRW

  // Dynamic calculations
  const totalMonthlyDies = monthlyWafers * diePerWafer;
  const currentOverkillDiesMonthly = Math.round(totalMonthlyDies * (overkillRatePercent / 100));
  const viraOverkillDiesMonthly = Math.round(totalMonthlyDies * 0.01); // 1.0% with VIRA-1
  const savedOverkillDiesMonthly = currentOverkillDiesMonthly - viraOverkillDiesMonthly;

  const monthlySavingsKRW = savedOverkillDiesMonthly * reviewCostPerDie;
  const annualSavingsKRW = monthlySavingsKRW * 12;

  const capexInstallKRW = 250000000; // 2.5억 원
  const paybackMonths = Math.max(0.5, (capexInstallKRW / Math.max(1, monthlySavingsKRW))).toFixed(1);
  const annualRoiPercent = Math.round((annualSavingsKRW / capexInstallKRW) * 100);

  const formatKRW = (num: number) => {
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(2)}억 원`;
    }
    return `${(num / 10000).toLocaleString()}만 원`;
  };

  return (
    <section id="roi" className="py-20 bg-[#0a0a0e] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            ROI & DEPLOYMENT ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            도입 로드맵 & 투자 대비 효과 (ROI)
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            리스크 없는 5주 PoC 검증부터 평균 4.2개월 내 투자금 회수까지 입증된 실행 플랜
          </p>
        </div>

        {/* 4-Phase Deployment Roadmap Timeline */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-gray-400 mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            단계별 도입 로드맵 (Implementation Phased Timeline)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Phase P0 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-cyan-500/40 relative space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 bg-cyan-950 rounded border border-cyan-500/30">
                  PHASE 0 (5주)
                </span>
                <span className="text-[10px] text-gray-500 font-mono">RISK-FREE</span>
              </div>
              <h4 className="text-base font-bold text-white">타당성 검증 (PoC)</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                고객사 대표 샘플 웨이퍼 이미지 데이터셋(양품/불량 1,000장) 수집 후 YOLO26s-seg 검출률 & 지연시간 정량 평가 리포트 제공
              </p>
            </div>

            {/* Phase P1 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#22222c] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400 px-2.5 py-1 bg-blue-950 rounded border border-blue-500/30">
                  PHASE 1 (12주)
                </span>
              </div>
              <h4 className="text-base font-bold text-white">시스템 구축 & 파인튜닝</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Dual RTX A6000 엣지 서버 연동, 카테고리별 커스텀 딥러닝 모델 학습, SECS/GEM HSMS 통신 파이프라인 커스텀
              </p>
            </div>

            {/* Phase P2 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#22222c] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-1 bg-indigo-950 rounded border border-indigo-500/30">
                  PHASE 2 (8주)
                </span>
              </div>
              <h4 className="text-base font-bold text-white">양산 병행 검증 (Shadow)</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                기존 AOI 장비와 인라인 실시간 병행 가동. 과검률 1.0% 이하 통계 검증 및 패브릭 트래픽 인터락 테스트
              </p>
            </div>

            {/* Phase P3 */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#22222c] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 bg-emerald-950 rounded border border-emerald-500/30">
                  PHASE 3 (8주)
                </span>
              </div>
              <h4 className="text-base font-bold text-white">양산 확산 & 풀 자동화</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                메인 소터 라인 정식 전환, SECS/GEM 웨이퍼 맵 자동 마킹 연동, MLOps 모델 자가 재학습 루프 가동
              </p>
            </div>

          </div>

          {/* Security Guarantee Note */}
          <div className="mt-4 p-4 rounded-xl bg-[#08080d] border border-[#1e1e28] text-xs text-gray-400 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>보안 규격:</strong> 고객사 반도체 설계 및 이미지 데이터는 외부망 연결 없이 On-Premise 폐쇄망 환경에서만 처리됩니다.</span>
          </div>
        </div>

        {/* Interactive ROI Calculator */}
        <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e1e28] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">고객사 맞춤 ROI 계산기 (Interactive ROI Calculator)</h3>
                <p className="text-xs text-gray-400">웨이퍼 물량과 과검 재검증 비용 입력 시 절감액 자동 산출</p>
              </div>
            </div>
          </div>

          {/* Calculator Controls & Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Input Sliders */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Slider 1: Monthly Wafer */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>월간 300mm 웨이퍼 투입량:</span>
                  <span className="text-cyan-400 font-bold">{monthlyWafers.toLocaleString()} 장/월</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={monthlyWafers}
                  onChange={(e) => setMonthlyWafers(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Slider 2: Die per Wafer */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>웨이퍼 당 평균 다이 수 (Dies/Wafer):</span>
                  <span className="text-blue-400 font-bold">{diePerWafer} Dies</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={diePerWafer}
                  onChange={(e) => setDiePerWafer(Number(e.target.value))}
                  className="w-full accent-blue-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Slider 3: Current Overkill Rate */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>기존 AOI 과검율 (Current Overkill):</span>
                  <span className="text-orange-400 font-bold">{overkillRatePercent}%</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.1"
                  value={overkillRatePercent}
                  onChange={(e) => setOverkillRatePercent(Number(e.target.value))}
                  className="w-full accent-orange-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
                <div className="text-[10px] text-gray-500 font-mono mt-1">
                  * VIRA-1 적용 시 과검율 1.0%로 감축 보장
                </div>
              </div>

              {/* Slider 4: Re-inspection cost */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>다이 당 재판정 처리 인건비/비용:</span>
                  <span className="text-emerald-400 font-bold">{reviewCostPerDie} 원 / Die</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={reviewCostPerDie}
                  onChange={(e) => setReviewCostPerDie(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
              </div>

            </div>

            {/* Right: Calculated Dynamic ROI Box */}
            <div className="lg:col-span-6 bg-[#08080d] border border-[#1e1e28] rounded-2xl p-6 space-y-6">
              <div className="text-xs font-mono text-gray-400 border-b border-[#1e1e28] pb-2 flex justify-between">
                <span>ESTIMATED ROI FINANCIAL IMPACT</span>
                <span className="text-emerald-400">VIRA-1 ROI Model</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c]">
                  <div className="text-xs text-gray-400">월 순 절감 예상액</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                    {formatKRW(monthlySavingsKRW)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c]">
                  <div className="text-xs text-gray-400">연간 총 절감액</div>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
                    {formatKRW(annualSavingsKRW)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c]">
                  <div className="text-xs text-gray-400">투자 회수 기간 (Payback)</div>
                  <div className="text-2xl font-extrabold text-blue-400 font-mono mt-1">
                    {paybackMonths} 개월
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#111116] border border-[#22222c]">
                  <div className="text-xs text-gray-400">연간 수익률 (Annual ROI)</div>
                  <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">
                    {annualRoiPercent}%
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
                🚀 매월 과검 재심사 대상 다이 <strong className="font-mono text-emerald-300">{savedOverkillDiesMonthly.toLocaleString()}개</strong> 감축으로 공정 효율 증대
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
