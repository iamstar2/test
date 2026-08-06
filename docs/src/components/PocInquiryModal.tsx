import React from 'react';
import { X } from 'lucide-react';
import { PocSection } from './PocSection';
import { PocFormData } from '../types';

interface PocInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit: (data: PocFormData) => void;
}

export const PocInquiryModal: React.FC<PocInquiryModalProps> = ({ isOpen, onClose, onSuccessSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#111116] border border-[#22222c] rounded-2xl p-4 sm:p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1e1e28] z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <PocSection onSuccessSubmit={(data) => {
          onSuccessSubmit(data);
          setTimeout(() => onClose(), 2000);
        }} />
      </div>
    </div>
  );
};
