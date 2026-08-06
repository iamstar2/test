import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Eye, Sliders, Play, Layers, ChevronRight, Activity, Crosshair } from 'lucide-react';

interface HeroProps {
  onOpenPoc: () => void;
  onOpenReport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPoc, onOpenReport }) => {
  const [activeOverlayMode, setActiveOverlayMode] = useState<'seg' | 'box' | 'raw'>('seg');
  const [zoomIn, setZoomIn] = useState(false);

  const waferImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB-PZmNfLnn0pzVGWAFcDG8z4lj8ENkZJscacVXK3xU_oBQveY5_gbajaOqiuXlFUtQ2mJ8ALrpxM2U-EBu-c-XCr3uvzBOyZiwIUEthXhg0_Wg5_RfWcg79HAZGYNMJRbdBcAqLirNj3dYhUrZCMv5gMzpj9OWTV42JvbUSWR5Qr7W-vDEsAPJI4Nus1Alp6SqEEoyuz2b1KiCmfdzQIBPzVRc6l1jnxiGiBC4vQ5rA2_gAm-xtvEn-w";

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#080808] text-white overflow-hidden border-b border-[#1c1c24]">
      {/* Dark Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161620_1px,transparent_1px),linear-gradient(to_bottom,#161620_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/15 to-cyan-500/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>NEXT-GEN SEMICONDUCTOR AOI & SEGMENTATION</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              VIRA-1: 반도체 검사의 <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
                새로운 기준.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              YOLO26-seg 기반 픽셀 단위 검출로 300mm 웨이퍼 후공정의 완벽함을 실현하십시오.
              기존 Bounding Box 방식의 오검을 제거하고 15µm 미세 크랙까지 정밀 추적합니다.
            </p>

            {/* Key Metrics Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222c] backdrop-blur-sm">
                <div className="text-xs text-gray-400">미검율 (Underkill)</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">≤ 10 DPPM</div>
              </div>
              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222c] backdrop-blur-sm">
                <div className="text-xs text-gray-400">추론 속도 (P95)</div>
                <div className="text-lg font-bold text-blue-400 font-mono">120 ms</div>
              </div>
              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222c] backdrop-blur-sm">
                <div className="text-xs text-gray-400">소터 택트 대응</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">250 ms</div>
              </div>
              <div className="p-3 rounded-xl bg-[#111116] border border-[#22222c] backdrop-blur-sm">
                <div className="text-xs text-gray-400">과검율 (Overkill)</div>
                <div className="text-lg font-bold text-indigo-400 font-mono">≤ 1.0%</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenPoc}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0071e3] to-[#0090ff] hover:from-[#0060c5] hover:to-[#007edc] shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group"
              >
                <span>먼저 5주 PoC 진행하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenReport}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-200 bg-[#14141a] hover:bg-[#1d1d26] hover:text-white border border-[#2a2a36] transition-all flex items-center gap-2"
              >
                <span>기술 사양 리포트 받기</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Compliance Quick Tag */}
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 font-mono">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> SEMI E5/E30/E37 (HSMS)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> SECS/GEM 준수
              </span>
            </div>
          </div>

          {/* Right Column: Hotlinked Interactive Wafer Inspection Viewport */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-[#111116] border border-[#22222d] p-3 shadow-2xl shadow-blue-950/20 overflow-hidden group">
              
              {/* Header Bar of Viewport */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#08080c] rounded-lg mb-3 border border-[#1e1e28] text-xs">
                <div className="flex items-center gap-2 text-gray-300 font-mono">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>300mm Wafer Inspection #WF-2026-08A</span>
                </div>

                {/* Overlay Toggle Segmented Control */}
                <div className="flex items-center bg-gray-900 rounded-md p-1 border border-gray-800">
                  <button
                    onClick={() => setActiveOverlayMode('seg')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                      activeOverlayMode === 'seg'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    YOLO26-seg (픽셀)
                  </button>
                  <button
                    onClick={() => setActiveOverlayMode('box')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                      activeOverlayMode === 'box'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    기존 Box (AABB)
                  </button>
                  <button
                    onClick={() => setActiveOverlayMode('raw')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                      activeOverlayMode === 'raw'
                        ? 'bg-gray-800 text-gray-200'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Raw Image
                  </button>
                </div>
              </div>

              {/* Wafer Hotlinked Image Area */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={waferImageUrl}
                  alt="300mm Semiconductor Wafer Inspection Preview"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    zoomIn ? 'scale-150' : 'scale-100'
                  }`}
                />

                {/* Interactive Simulated Overlays on Wafer */}
                {activeOverlayMode === 'seg' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Defect 1: Micro Crack Segmentation Polygon */}
                    <div className="absolute top-[38%] left-[42%] w-24 h-24 border border-cyan-400/80 bg-cyan-500/10 rounded-lg p-1 animate-pulse">
                      <svg className="w-full h-full text-cyan-400 overflow-visible" viewBox="0 0 100 100">
                        {/* Realistic crack segmentation line path */}
                        <path
                          d="M15,20 Q35,10 45,35 T75,45 T85,80 Q55,75 35,60 Z"
                          fill="rgba(6, 182, 212, 0.35)"
                          stroke="#06b6d4"
                          strokeWidth="2"
                        />
                      </svg>
                      <div className="absolute -top-6 left-0 bg-cyan-950/90 text-cyan-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-cyan-500/50 shadow whitespace-nowrap">
                        Crack (Seg: 6.8%) | Conf: 99.4%
                      </div>
                    </div>

                    {/* Defect 2: Edge Chipping */}
                    <div className="absolute bottom-[28%] right-[32%] w-16 h-16 border border-emerald-400/80 bg-emerald-500/10 rounded-md p-1">
                      <svg className="w-full h-full text-emerald-400 overflow-visible" viewBox="0 0 100 100">
                        <polygon
                          points="20,20 80,15 90,70 30,85 10,50"
                          fill="rgba(16, 185, 129, 0.35)"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                      </svg>
                      <div className="absolute -top-6 left-0 bg-emerald-950/90 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/50 shadow whitespace-nowrap">
                        Chipping | Conf: 98.9%
                      </div>
                    </div>
                  </div>
                )}

                {activeOverlayMode === 'box' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Defect 1: Oversized Bounding Box */}
                    <div className="absolute top-[38%] left-[42%] w-24 h-24 border-2 border-red-500 bg-red-500/20 rounded-none p-1">
                      <div className="absolute -top-6 left-0 bg-red-950 text-red-300 text-[10px] font-mono px-1.5 py-0.5 border border-red-500 whitespace-nowrap">
                        AABB Box: 100% Area (Overkill Risk)
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-red-400 text-[10px] font-mono">
                        93.2% Normal Pattern Included
                      </div>
                    </div>
                  </div>
                )}

                {/* Reticle / Crosshair visual */}
                <div className="absolute inset-0 border border-blue-500/20 pointer-events-none flex items-center justify-center">
                  <Crosshair className="w-12 h-12 text-blue-400/30" />
                </div>

                {/* Corner Scan Line Indicator */}
                <div className="absolute bottom-3 left-3 bg-gray-950/90 border border-gray-800 rounded-lg p-2 text-[11px] font-mono space-y-0.5 text-gray-300">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">RES:</span>
                    <span className="text-cyan-400">0.8 µm / pixel</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">INFERENCE:</span>
                    <span className="text-emerald-400">45 ms (YOLO26s-seg)</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">DECISION:</span>
                    <span className="text-red-400 font-bold">REJECT (Critical Crack)</span>
                  </div>
                </div>

                {/* Zoom toggle button */}
                <button
                  onClick={() => setZoomIn(!zoomIn)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-gray-900/80 border border-gray-700 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  {zoomIn ? '1x Reset' : '2x Zoom Micro'}
                </button>
              </div>

              {/* Status footer bar */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-mono px-1">
                <span>SECS/GEM Status: <strong className="text-emerald-400 font-normal">CONNECTED</strong></span>
                <span>Tact: <strong>250ms Target</strong> (Margin: 52%)</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
