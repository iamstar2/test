import React from 'react';
import { Cpu, Server, Shield, Network, CheckCircle, Database, HardDrive } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const complianceBadges = [
    { code: 'SEMI E5/E30/E37', title: 'SECS/GEM via HSMS 호스트 통신' },
    { code: 'SEMI E142', title: '300mm Substrate Map 데이터 규격' },
    { code: 'SEMI E10', title: '장비 가동률(RAM) 99.0% 사양 준수' },
    { code: 'ISO 14644-1', title: 'Class 6 클린룸 환경 적합성' },
    { code: 'ANSI/ESD S20.20', title: '정전기 방지 ESD 제어 기준' },
    { code: 'IATF 16949', title: '자동차 품질 경영 시스템 표준' },
    { code: 'AEC-Q100', title: '차량용 반도체 신뢰성 검증 대응' },
  ];

  return (
    <section id="architecture" className="py-20 bg-[#0a0a0e] text-white border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
            <Server className="w-3.5 h-3.5" />
            FULL STACK HARDWARE & SOFTWARE SPECIFICATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            VIRA-1 시스템 아키텍처
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            클린룸 광학 장비부터 엣지 AI 추론, Fab FAB SECS/GEM 프로토콜 연동까지 완벽히 검증된 단일 솔루션
          </p>
        </div>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Hardware & Optics */}
          <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#1e1e28] pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">광학 및 하드웨어 스펙 (Optics & HW)</h3>
                <p className="text-xs text-gray-400">sub-micron 정밀 촬영 및 High-Throughput Edge AI</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">비전 카메라 (Camera):</span>
                <span className="text-white font-semibold text-right">150MP Ultra-CMOS Line Scan</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">광학 렌즈 (Optical Lens):</span>
                <span className="text-white font-semibold text-right">0.5x Telecentric High NA Lens</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">공간 분해능 (Spatial Resolution):</span>
                <span className="text-cyan-400 font-bold text-right">0.8 µm / Pixel (Sub-micron)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">조명 시스템 (Illumination):</span>
                <span className="text-white font-semibold text-right">동축 LED + RGB 다크필드 링 조명</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">엣지 추론 컴퓨팅 (Edge GPU):</span>
                <span className="text-emerald-400 font-bold text-right">Dual NVIDIA RTX A6000 (TensorRT FP16)</span>
              </div>
            </div>
          </div>

          {/* Communication & Software Stack */}
          <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#1e1e28] pb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">통신 및 소프트웨어 스택 (SW & Protocol)</h3>
                <p className="text-xs text-gray-400">SECS/GEM HSMS 통합 및 MLOps 자동화</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">FAB 호스트 통신:</span>
                <span className="text-white font-semibold text-right">SECS/GEM via HSMS (SEMI E5/E30/E37)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">실시간 판정 메시지:</span>
                <span className="text-white font-semibold text-right">ZeroMQ Pub/Sub (&lt; 2ms IPC)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">재학습 인프라:</span>
                <span className="text-white font-semibold text-right">On-Premises Kubernetes Cluster</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">이미지 & 데이터베이스:</span>
                <span className="text-white font-semibold text-right">PostgreSQL + S3 Object Store</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08080d] border border-[#1e1e28] flex justify-between items-center">
                <span className="text-gray-400">MLOps 및 라이프사이클:</span>
                <span className="text-cyan-400 font-bold text-right">MLflow Model Registry & TensorRT Engine</span>
              </div>
            </div>
          </div>

        </div>

        {/* Global Fab Compliance Standards */}
        <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-400">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>글로벌 반도체 양산 공정 준수 규격 (Global Semiconductor Fab Standards Compliance)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {complianceBadges.map((badge, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#08080d] border border-[#1e1e28] text-center hover:border-blue-500/40 transition-colors">
                <div className="text-xs font-bold font-mono text-blue-400 mb-0.5">{badge.code}</div>
                <div className="text-[10px] text-gray-400 leading-tight">{badge.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
