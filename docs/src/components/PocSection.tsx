import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert, Cpu, Check, Terminal } from 'lucide-react';
import { PocFormData } from '../types';

interface PocSectionProps {
  onSuccessSubmit: (data: PocFormData) => void;
}

export const PocSection: React.FC<PocSectionProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<PocFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    waferSize: '300mm (12 inch)',
    dieSize: '5 x 5 mm',
    minDefectSize: '15 µm',
    dieSorterModel: '',
    aecQ100Required: false,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccessSubmit(formData);
  };

  return (
    <section id="poc" className="py-20 bg-[#080808] text-white border-b border-[#1c1c24]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            START YOUR RISK-FREE 5-WEEK POC
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            먼저 5주짜리 PoC로 검증하세요.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            고객사의 실제 샘플 이미지 데이터로 YOLO26s-seg의 검출률과 120ms P95 지연시간을 직접 확인해보실 수 있습니다.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#111116] border border-[#22222c] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">PoC 기술 검토 신청이 완료되었습니다.</h3>
              <p className="text-gray-300 text-sm max-w-lg mx-auto">
                담당 비전 솔루션 엔지니어가 24시간 이내에 <strong className="text-cyan-400 font-mono">{formData.email}</strong>으로 NDA 및 샘플 데이터 전송 가이드를 안내해 드립니다.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#1e1e28] hover:bg-[#282836] text-gray-200 border border-[#2e2e3d]"
              >
                추가 제출하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">고객사 / 기업명 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: Samsung Electronics / SK Hynix"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">담당자 성함 & 직함 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 책임연구원"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">이메일 주소 *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

              </div>

              {/* Wafer Spec Inputs */}
              <div className="pt-4 border-t border-[#1e1e28] space-y-4">
                <div className="text-xs font-mono font-bold text-cyan-400">검사 대상 웨이퍼 사양 (Wafer Spec)</div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1">웨이퍼 규격</label>
                    <select
                      value={formData.waferSize}
                      onChange={(e) => setFormData({ ...formData, waferSize: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option>300mm (12 inch)</option>
                      <option>200mm (8 inch)</option>
                      <option>150mm (6 inch)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1">다이 크기 (Die Size)</label>
                    <input
                      type="text"
                      placeholder="예: 5 x 5 mm"
                      value={formData.dieSize}
                      onChange={(e) => setFormData({ ...formData, dieSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1">최소 검출 결함 크기</label>
                    <input
                      type="text"
                      placeholder="예: 15 µm"
                      value={formData.minDefectSize}
                      onChange={(e) => setFormData({ ...formData, minDefectSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 mb-1">연동 소터 장비 모델 (Die Sorter)</label>
                    <input
                      type="text"
                      placeholder="예: ASM / BESi / Kulicke & Soffa"
                      value={formData.dieSorterModel}
                      onChange={(e) => setFormData({ ...formData, dieSorterModel: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aecQ100Required}
                        onChange={(e) => setFormData({ ...formData, aecQ100Required: e.target.checked })}
                        className="w-4 h-4 accent-cyan-400 rounded"
                      />
                      <span>AEC-Q100 전장용 품질 대응 요구</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 mb-1">추가 요청사항 및 검수 항목</label>
                  <textarea
                    rows={3}
                    placeholder="특이 결함 패턴이나 현재 겪고 계신 과검/미검 문제점을 적어주세요."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#08080d] border border-[#1e1e28] text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0071e3] to-[#0092ff] hover:from-[#0060c5] hover:to-[#007edc] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>5주 PoC 기술 검토 신청서 제출</span>
              </button>

              <div className="text-center text-[11px] text-gray-500 font-mono">
                🔒 제출된 정보 및 샘플 데이터는 상호 기밀유지협약(NDA)에 따라 엄격히 보호됩니다.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
