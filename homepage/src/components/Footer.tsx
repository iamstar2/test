import React from 'react';
import { Cpu, ShieldCheck, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050508] text-gray-400 py-12 border-t border-[#1c1c24] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-wider">VIRA Systems</span>
              <p className="text-[11px] text-gray-500">Semiconductor Vision Inspection Solution</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <a href="#hero" className="hover:text-white transition-colors">제품 개요</a>
            <a href="#simulator" className="hover:text-white transition-colors">인스펙터 시뮬레이터</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">작동 파이프라인</a>
            <a href="#why-yolo" className="hover:text-white transition-colors">YOLO26s-seg 기술</a>
            <a href="#architecture" className="hover:text-white transition-colors">아키텍처 & SEMI 규격</a>
            <a href="#roi" className="hover:text-white transition-colors">ROI 계산기</a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1c1c24] flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            Copyright © {new Date().getFullYear()} VIRA Systems. All rights reserved. SEMI E5/E30/E37 & SEMI E142 Compliant.
          </div>
          <div className="flex items-center gap-4">
            <a href="#poc" className="hover:text-cyan-400">개인정보 처리방침</a>
            <a href="#poc" className="hover:text-cyan-400">보안 이행 프로토콜 (NDA)</a>
            <a href="#poc" className="hover:text-cyan-400">고객 지원 센터</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
