import React from 'react';
import { BrandLogoMaster } from '../brand/BrandLogoMaster';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { X, ExternalLink, Cpu, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-xl bg-[#091026] border border-[#1C2C55] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Top Accent Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#00F0FF] via-[#00C8FF] via-[#A855F7] to-[#EC35D8]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X size={18} />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          {/* Asset #7: About Application Logo Emblem */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C8FF]/20 via-[#A855F7]/20 to-[#EC35D8]/20 rounded-full blur-xl pointer-events-none" />
            <BrandLogoMaster size={170} showGlow={true} />
          </div>

          <h2 className="font-display font-black text-2xl text-white tracking-tight">
            AI PIXEL PRO
          </h2>
          <div className="text-sm font-semibold text-[#00C8FF] mt-0.5 tracking-wide">
            AI Photo Studio · Studio Edition 2026
          </div>
          <div className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#00C8FF] to-[#EC35D8] tracking-[0.2em] uppercase mt-1 mb-5">
            Enhance • Edit • Restore • Create
          </div>

          {/* Version badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/80 border border-white/10">
              Version 2.4.0 (Build 2026.11.08-PRO)
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Check size={12} /> Pro Licensed
            </span>
          </div>

          {/* Specs & Hardware Grid */}
          <div className="w-full bg-[#050A1A] border border-white/5 rounded-2xl p-4 text-xs text-left space-y-2 mb-6">
            <div className="flex items-center justify-between text-white/70">
              <span className="text-white/40">Neural Upscaler</span>
              <span className="font-mono text-[#00C8FF]">ESRGAN-Pro-8K TensorCore</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span className="text-white/40">Face Restorer</span>
              <span className="font-mono text-[#A855F7]">GFPGAN-v2 + CodeFormer</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span className="text-white/40">Alpha Background Mask</span>
              <span className="font-mono text-[#EC35D8]">BiRefNet Sub-Pixel Matting</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span className="text-white/40">Acceleration Backend</span>
              <span className="font-mono text-emerald-400">DirectML / WebGL 2.0 / WebGPU</span>
            </div>
          </div>

          {/* Credits & Copyright */}
          <div className="text-[11px] text-white/50 space-y-1 mb-6">
            <p className="font-medium text-white/70">
              Official Identity & Architecture by AI PIXEL PRO Engineering Team
            </p>
            <p>
              Deep Navy (#080D20) · Electric Blue (#00C8FF) · Neon Purple (#A855F7) · Magenta (#EC35D8) · Cyan (#00F0FF)
            </p>
            <p className="text-[10px] text-white/30 pt-1">
              Copyright © 2026 AI PIXEL PRO Studio. All rights reserved.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
