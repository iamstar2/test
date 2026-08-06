import React, { useState } from 'react';
import { Crosshair, Sliders, CheckCircle2, AlertTriangle, XCircle, RotateCcw, Cpu, Layers, Sparkles } from 'lucide-react';
import { DefectItem } from '../types';

export const WaferInspector: React.FC = () => {
  const [selectedDefectType, setSelectedDefectType] = useState<'crack' | 'chipping' | 'particle' | 'stain'>('crack');
  const [boundingMode, setBoundingMode] = useState<'seg' | 'obb' | 'aabb'>('seg');
  const [defectSizeMicron, setDefectSizeMicron] = useState<number>(18);
  const [confidence, setConfidence] = useState<number>(0.985);
  const [activeDieIndex, setActiveDieIndex] = useState<{ row: number; col: number }>({ row: 4, col: 5 });

  // Defect profiles
  const defectProfiles = {
    crack: {
      name: 'Micro Line Crack (미세선형 크랙)',
      defaultSize: 18,
      severity: 'Critical (치명적)',
      areaRatio: { seg: '100% (Pure Defect)', obb: '34.2%', aabb: '6.8%' },
      noiseRatio: { seg: '0%', obb: '65.8%', aabb: '93.2%' },
      bin: 'REJECT',
      color: 'cyan',
    },
    chipping: {
      name: 'Edge Chipping (다이 엣지 칩핑)',
      defaultSize: 35,
      severity: 'Major (중결함)',
      areaRatio: { seg: '100% (Pure Defect)', obb: '48.5%', aabb: '14.5%' },
      noiseRatio: { seg: '0%', obb: '51.5%', aabb: '85.5%' },
      bin: 'REJECT',
      color: 'emerald',
    },
    particle: {
      name: 'Particle (파티클 이물)',
      defaultSize: 22,
      severity: 'Moderate (경결함)',
      areaRatio: { seg: '100% (Pure Defect)', obb: '72.0%', aabb: '55.0%' },
      noiseRatio: { seg: '0%', obb: '28.0%', aabb: '45.0%' },
      bin: defectSizeMicron > 25 ? 'REJECT' : 'REVIEW',
      color: 'yellow',
    },
    stain: {
      name: 'Chemical Stain (화학 얼룩)',
      defaultSize: 45,
      severity: 'Low / Pattern Noise',
      areaRatio: { seg: '100% (Pure Defect)', obb: '41.0%', aabb: '18.2%' },
      noiseRatio: { seg: '0%', obb: '59.0%', aabb: '81.8%' },
      bin: defectSizeMicron > 50 ? 'REVIEW' : 'PASS',
      color: 'indigo',
    },
  };

  const currentProfile = defectProfiles[selectedDefectType];

  // Calculate simulated pixel area
  const pixelArea = Math.round((defectSizeMicron / 0.8) * (defectSizeMicron / 0.8) * 0.42);
  const realAreaMicronSq = Math.round(defectSizeMicron * defectSizeMicron * 0.35);

  return (
    <section id="simulator" className="py-20 bg-[#080808] text-white border-b border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            INTERACTIVE WAFER INSPECTION SIMULATOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            웨이퍼 픽셀 인스펙터 시뮬레이터
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            300mm 웨이퍼의 미세 결함에 대해 AABB vs OBB vs YOLO26s-seg 다각형 세그멘테이션의 정밀도 차이를 실시간으로 비교해보세요.
          </p>
        </div>

        {/* Main Grid: Wafer Map + Micro Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 300mm Wafer Die Grid (3 Cols on large, full on small) */}
          <div className="lg:col-span-5 bg-[#111116] border border-[#22222c] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e1e28] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>300mm Wafer Map Grid (9x9 Dies)</span>
              </div>
              <span className="text-[11px] font-mono text-gray-500">Selected: Die ({activeDieIndex.row}, {activeDieIndex.col})</span>
            </div>

            {/* Simulated Round Wafer Contour */}
            <div className="relative aspect-square max-w-[340px] mx-auto rounded-full bg-[#08080d] border-4 border-[#1e1e28] p-4 flex items-center justify-center overflow-hidden shadow-inner">
              
              {/* Wafer Grid (9x9) */}
              <div className="grid grid-cols-9 gap-1 w-full h-full">
                {Array.from({ length: 81 }).map((_, idx) => {
                  const r = Math.floor(idx / 9);
                  const c = idx % 9;
                  // Distance from center to hide corner dies for round wafer shape
                  const dist = Math.sqrt(Math.pow(r - 4, 2) + Math.pow(c - 4, 2));
                  const isCorner = dist > 4.1;

                  if (isCorner) {
                    return <div key={idx} className="opacity-0" />;
                  }

                  const isSelected = activeDieIndex.row === r && activeDieIndex.col === c;
                  const isDefective = (r === 4 && c === 5) || (r === 2 && c === 3) || (r === 6 && c === 4);

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDieIndex({ row: r, col: c })}
                      className={`rounded-xs transition-all relative group flex items-center justify-center text-[9px] font-mono ${
                        isSelected
                          ? 'bg-cyan-500 text-black font-bold ring-2 ring-cyan-300 shadow-lg scale-110 z-10'
                          : isDefective
                          ? 'bg-red-500/80 text-white hover:bg-red-400'
                          : 'bg-[#1a1a24] hover:bg-[#222230] text-gray-400'
                      }`}
                    >
                      {r},{c}
                    </button>
                  );
                })}
              </div>

              {/* Wafer Notch */}
              <div className="absolute bottom-0 w-6 h-2 bg-[#1a1a24] rounded-t-sm border-t border-[#2a2a38]" />
            </div>

            {/* Wafer Summary Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2">
              <div className="p-2 rounded-lg bg-[#08080d] border border-[#1e1e28]">
                <div className="text-gray-500 text-[10px]">TOTAL DIES</div>
                <div className="text-white font-bold">588 Dies</div>
              </div>
              <div className="p-2 rounded-lg bg-[#08080d] border border-[#1e1e28]">
                <div className="text-gray-500 text-[10px]">GOOD DIES</div>
                <div className="text-emerald-400 font-bold">585 (99.5%)</div>
              </div>
              <div className="p-2 rounded-lg bg-[#08080d] border border-[#1e1e28]">
                <div className="text-gray-500 text-[10px]">DEFECT DIES</div>
                <div className="text-red-400 font-bold">3 Dies</div>
              </div>
            </div>
          </div>

          {/* Right: Micro Inspection Viewer & Interactive Controls */}
          <div className="lg:col-span-7 bg-[#111116] border border-[#22222c] rounded-2xl p-6 space-y-6">
            
            {/* Control Bar: Select Defect Type */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">결함 유형 선택 (Defect Category)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(defectProfiles) as Array<keyof typeof defectProfiles>).map((type) => {
                  const p = defectProfiles[type];
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedDefectType(type);
                        setDefectSizeMicron(p.defaultSize);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                        selectedDefectType === type
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-md'
                          : 'bg-[#08080d] border-[#1e1e28] text-gray-400 hover:text-white hover:border-[#2a2a38]'
                      }`}
                    >
                      <div className="font-bold truncate">{p.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-gray-400 truncate">{p.name.split(' ')[1]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bounding Method Control Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[#08080d] rounded-xl border border-[#1e1e28]">
              <span className="text-xs font-mono text-gray-300">검출 메커니즘 (Detection Method):</span>
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  onClick={() => setBoundingMode('seg')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    boundingMode === 'seg'
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold'
                      : 'bg-[#14141a] text-gray-400 hover:text-white'
                  }`}
                >
                  YOLO26s-seg (Polygon)
                </button>
                <button
                  onClick={() => setBoundingMode('obb')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    boundingMode === 'obb'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-[#14141a] text-gray-400 hover:text-white'
                  }`}
                >
                  OBB (회전박스)
                </button>
                <button
                  onClick={() => setBoundingMode('aabb')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    boundingMode === 'aabb'
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-[#14141a] text-gray-400 hover:text-white'
                  }`}
                >
                  AABB (축정렬박스)
                </button>
              </div>
            </div>

            {/* Micro Inspection Canvas Render */}
            <div className="relative aspect-video rounded-xl bg-black border border-[#1e1e28] overflow-hidden flex items-center justify-center p-4">
              
              {/* Circuit Pattern Background Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#161620_1px,transparent_1px),linear-gradient(to_bottom,#161620_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

              {/* Simulated Defect Graphic */}
              <div className="relative w-48 h-48 border border-gray-700/60 bg-[#0c0c12]/80 rounded-lg flex items-center justify-center p-2 shadow-inner">
                
                {/* Circuit Lines */}
                <div className="absolute inset-2 border-t border-b border-gray-700/40 opacity-50 pointer-events-none" />
                <div className="absolute inset-2 border-l border-r border-gray-700/40 opacity-50 pointer-events-none" />

                {/* Render bounding according to selected mode */}
                {boundingMode === 'aabb' && (
                  <div className="absolute w-36 h-36 border-2 border-red-500 bg-red-500/20 flex flex-col justify-between p-1">
                    <span className="text-[10px] font-mono text-red-300 bg-red-950 px-1 py-0.5 self-start">AABB Bounding Box</span>
                    <span className="text-[10px] font-mono text-red-300 text-center">93.2% Circuit Pattern Noise Included</span>
                  </div>
                )}

                {boundingMode === 'obb' && (
                  <div className="absolute w-32 h-20 border-2 border-orange-500 bg-orange-500/25 rotate-45 flex flex-col justify-center items-center p-1">
                    <span className="text-[9px] font-mono text-orange-200 bg-orange-950 px-1">OBB Box</span>
                  </div>
                )}

                {/* Real Defect Polygon (YOLO26s-seg) */}
                <div className="relative z-10">
                  <svg className="w-32 h-32 text-cyan-400 overflow-visible" viewBox="0 0 100 100">
                    <path
                      d="M10,25 Q30,15 45,35 T75,40 T85,75 Q55,70 30,55 Z"
                      fill={boundingMode === 'seg' ? 'rgba(6, 182, 212, 0.45)' : 'rgba(239, 68, 68, 0.6)'}
                      stroke={boundingMode === 'seg' ? '#06b6d4' : '#ef4444'}
                      strokeWidth={boundingMode === 'seg' ? '2.5' : '1.5'}
                    />
                  </svg>
                  {boundingMode === 'seg' && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/50 whitespace-nowrap shadow">
                      YOLO26s-seg Pixel Mask (100% Pure Defect)
                    </div>
                  )}
                </div>

                <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-400">
                  Res: 0.8 µm/px
                </div>
              </div>

              {/* Real-time calculated Area Stats Badge */}
              <div className="absolute bottom-3 left-3 bg-[#08080d]/90 border border-[#1e1e28] rounded-lg p-2.5 text-xs font-mono space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">결함 신뢰면적 점유율:</span>
                  <span className="text-cyan-400 font-bold">{currentProfile.areaRatio[boundingMode]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">정상 회로 노이즈 혼입:</span>
                  <span className="text-red-400 font-bold">{currentProfile.noiseRatio[boundingMode]}</span>
                </div>
              </div>
            </div>

            {/* Sliders: Defect Size & Confidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>결함 크기 (Defect Length):</span>
                  <span className="text-cyan-400 font-bold">{defectSizeMicron} µm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={defectSizeMicron}
                  onChange={(e) => setDefectSizeMicron(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>5 µm (초미세)</span>
                  <span>50 µm</span>
                  <span>100 µm (대형)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                  <span>추론 스코어 (Confidence):</span>
                  <span className="text-emerald-400 font-bold">{(confidence * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.99"
                  step="0.01"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-[#1e1e28] rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                  <span>0.10 (의심)</span>
                  <span>0.70 (스펙)</span>
                  <span>0.99 (확정)</span>
                </div>
              </div>
            </div>

            {/* Decision Output Box */}
            <div className="p-4 rounded-xl bg-[#08080d] border border-[#1e1e28] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {currentProfile.bin === 'REJECT' ? (
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                ) : currentProfile.bin === 'REVIEW' ? (
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="text-xs text-gray-400 font-mono">자동 3-BIN 분류 결과</div>
                  <div className={`text-lg font-bold font-mono ${
                    currentProfile.bin === 'REJECT' ? 'text-red-400' : currentProfile.bin === 'REVIEW' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {currentProfile.bin === 'REJECT' ? 'REJECT BIN (불량 통)' : currentProfile.bin === 'REVIEW' ? 'REVIEW TRAY (재판정)' : 'PASS (양품 다이)'}
                  </div>
                </div>
              </div>

              <div className="text-right text-xs font-mono space-y-0.5 text-gray-400">
                <div>추산 면적: <span className="text-white font-bold">{realAreaMicronSq} µm²</span> ({pixelArea} px)</div>
                <div>YOLO26 추론: <span className="text-cyan-400 font-bold">45 ms</span> (P95 Total: 120 ms)</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
