import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, ArrowRight, Menu, X, Terminal } from 'lucide-react';

interface HeaderProps {
  onOpenPoc: () => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPoc, onOpenReport }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '개요', href: '#hero' },
    { label: '한계 & 솔루션', href: '#problem' },
    { label: '인스펙터 시뮬레이터', href: '#simulator' },
    { label: '작동 방식', href: '#how-it-works' },
    { label: 'YOLO26s-seg', href: '#why-yolo' },
    { label: '시스템 아키텍처', href: '#architecture' },
    { label: '성능 지표', href: '#performance' },
    { label: 'ROI 계산기', href: '#roi' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl shadow-2xl border-b border-[#20202a] py-3'
          : 'bg-[#080808] border-b border-[#181820]/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0071e3] to-[#00c6ff] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">VIRA-1</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  v2.6-seg
                </span>
              </div>
              <p className="text-[11px] text-gray-400 -mt-0.5 hidden sm:block">Semiconductor Inspection System</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenReport}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-300 bg-[#14141a] hover:bg-[#1d1d26] hover:text-white border border-[#2a2a36] transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              기술 리포트
            </button>
            <button
              onClick={onOpenPoc}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0071e3] to-[#0092ff] hover:from-[#0062c4] hover:to-[#0082e0] shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 group"
            >
              <span>PoC 문의</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#181822]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#20202a] pb-2 space-y-1 bg-[#0c0c10] p-3 rounded-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#1a1a24]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReport();
                }}
                className="w-full px-4 py-2 rounded-lg text-xs font-semibold text-gray-200 bg-[#14141a] border border-[#2a2a36] flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-blue-400" />
                기술 리포트 보기
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPoc();
                }}
                className="w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0071e3] flex items-center justify-center gap-2"
              >
                PoC 문의하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
