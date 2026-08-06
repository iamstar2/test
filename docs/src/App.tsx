import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { WaferInspector } from './components/WaferInspector';
import { HowItWorks } from './components/HowItWorks';
import { WhyYolo } from './components/WhyYolo';
import { SystemArchitecture } from './components/SystemArchitecture';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { RoadmapAndRoi } from './components/RoadmapAndRoi';
import { PocSection } from './components/PocSection';
import { PocInquiryModal } from './components/PocInquiryModal';
import { TechReportModal } from './components/TechReportModal';
import { Footer } from './components/Footer';
import { PocFormData } from './types';

export default function App() {
  const [pocModalOpen, setPocModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const handlePocSubmit = (data: PocFormData) => {
    console.log('PoC Request Submitted:', data);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5] flex flex-col font-sans selection:bg-[#0071e3] selection:text-white">
      
      {/* Header Navigation Bar */}
      <Header
        onOpenPoc={() => setPocModalOpen(true)}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPoc={() => setPocModalOpen(true)}
          onOpenReport={() => setReportModalOpen(true)}
        />

        {/* 3 Core Problems Section */}
        <ProblemSection />

        {/* Interactive Wafer Defect Inspector Simulator */}
        <WaferInspector />

        {/* End-to-End How It Works & Latency Pipeline */}
        <HowItWorks />

        {/* Why YOLO26s-seg (Detect vs Seg, Matrix, Size) */}
        <WhyYolo />

        {/* System Architecture (HW, SW, SEMI Standards) */}
        <SystemArchitecture />

        {/* Performance Metrics (8 Verified Cards) */}
        <PerformanceMetrics />

        {/* Deployment Roadmap & Interactive ROI Calculator */}
        <RoadmapAndRoi />

        {/* In-Page 5-Week PoC Inquiry Specification Form */}
        <PocSection onSuccessSubmit={handlePocSubmit} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PocInquiryModal
        isOpen={pocModalOpen}
        onClose={() => setPocModalOpen(false)}
        onSuccessSubmit={handlePocSubmit}
      />

      <TechReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

    </div>
  );
}
