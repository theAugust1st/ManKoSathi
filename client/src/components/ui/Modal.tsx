import { X } from "lucide-react";
import React from "react";

// --- The props are exactly as you defined them ---
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-brand-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Allows closing by clicking the background
    >
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg border border-brand-100 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1 rounded-full text-brand-700 hover:bg-brand-100 hover:text-brand-900 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {children}
      </div>
    </div>
  );
}
