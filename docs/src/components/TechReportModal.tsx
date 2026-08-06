import React from 'react';
import { X, Download, Terminal, CheckCircle2, Cpu, Shield, Layers } from 'lucide-react';

interface TechReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechReportModal: React.FC<TechReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1e1e28]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#1e1e28] pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">VIRA-1 기술 사양 백서 (Whitepaper)</h3>
            <p className="text-xs font-mono text-cyan-400">YOLO26s-seg Semiconductor Inspection Architecture Specification</p>
          </div>
        </div>

        {/* Report Overview Content */}
        <div className="space-y-4 text-xs font-mono text-gray-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-[#08080d] border border-[#1e1e28] space-y-2">
            <div className="text-sm font-bold text-white">포함 내용 요약 (Included Sections)</div>
            <ul className="space-y-1.5 text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>300mm 웨이퍼 후공정 YOLO26s-seg 다각형 세그멘테이션 수학적 모델링</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NVIDIA Dual RTX A6000 TensorRT FP16 커스텀 가속 레이어 벤치마크</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>SECS/GEM HSMS 통신 프로토콜 및 SEMI E142 Substrate Map 규격 명세</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5주 PoC 검증 프레임워크 및 양산 라인 Shadow Run 평가 방법론</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-lg bg-[#08080d] border border-[#1e1e28]">
              <div className="text-gray-500 text-[10px]">DOCUMENT FORMAT</div>
              <div className="text-white font-bold">PDF (Full Tech Spec 28p)</div>
            </div>
            <div className="p-3 rounded-lg bg-[#08080d] border border-[#1e1e28]">
              <div className="text-gray-500 text-[10px]">SECURITY LEVEL</div>
              <div className="text-emerald-400 font-bold">Public Technical Whitepaper</div>
            </div>
          </div>
        </div>

        {/* Download Action */}
        <div className="pt-4 border-t border-[#1e1e28] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-gray-500 font-mono">Document Ver: v2.6-seg.2026.08</span>
          <button
            onClick={() => {
              alert("VIRA-1 기술 백서 PDF 다운로드가 시작되었습니다.");
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            <span>기술 백서 PDF 다운로드</span>
          </button>
        </div>

      </div>
    </div>
  );
};
