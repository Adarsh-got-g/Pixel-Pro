import React, { useState } from 'react';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { HardDrive, Play, Folder, RefreshCw, Cpu, Check, Shield } from 'lucide-react';

interface PortableLauncherProps {
  onLaunch: () => void;
  onClose: () => void;
}

export const PortableLauncher: React.FC<PortableLauncherProps> = ({
  onLaunch,
  onClose,
}) => {
  const [useCustomCache, setUseCustomCache] = useState(false);
  const [portableDrive, setPortableDrive] = useState('E:\\AI_Pixel_Pro_Portable\\Data');
  const [ramCacheSize, setRamCacheSize] = useState('4 GB');
  const [stealthMode, setStealthMode] = useState(true);

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 bg-[#050814] select-none">
      {/* Portable Compact Container */}
      <div className="w-full max-w-lg bg-[#0A1026] border border-[#18264E] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#060A1A] border-b border-[#142042] text-xs">
          <div className="flex items-center gap-2">
            <SquareAppIcon size={16} />
            <span className="font-semibold text-white/90">
              AI PIXEL PRO Portable Edition
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white px-2 py-0.5 rounded hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Asset #9: Portable Launcher Branding Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#080E24] via-[#0E1A3D] to-[#080E24] border-b border-[#162349] overflow-hidden">
          {/* Neon Glow backdrop */}
          <div className="absolute right-0 top-0 w-44 h-44 bg-[#00C8FF]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <SquareAppIcon size={64} showGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl text-white tracking-tight">
                  AI PIXEL PRO
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00C8FF]/20 text-[#00F0FF] border border-[#00C8FF]/30">
                  PORTABLE
                </span>
              </div>
              <p className="text-xs font-semibold text-[#00C8FF] tracking-wide mt-0.5">
                AI Photo Studio · Zero-Installation Standalone
              </p>
              <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">
                Enhance • Edit • Restore • Create
              </p>
            </div>
          </div>
        </div>

        {/* Body Settings */}
        <div className="p-6 space-y-4">
          {/* Drive & Sandbox Detection */}
          <div className="p-3.5 bg-[#060918] border border-white/5 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <HardDrive size={14} className="text-[#00C8FF]" />
                Portable Host Volume
              </span>
              <span className="font-mono text-[#00F0FF]">Removable (USB 3.2)</span>
            </div>
            <div className="text-[11px] text-white/50 font-mono truncate">
              {portableDrive}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 text-xs text-white/80">
            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-emerald-400" />
                <div>
                  <div className="font-medium text-white">Stealth Sandbox Mode</div>
                  <div className="text-[10px] text-white/40">Zero registry entries, leaves no trace on host OS</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={stealthMode}
                onChange={(e) => setStealthMode(e.target.checked)}
                className="accent-[#00C8FF]"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-[#A855F7]" />
                <div>
                  <div className="font-medium text-white">DirectML Neural Acceleration</div>
                  <div className="text-[10px] text-white/40">Use host GPU without installing drivers</div>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="accent-[#00C8FF]"
              />
            </label>
          </div>

          {/* Launch CTA */}
          <div className="pt-2">
            <button
              onClick={onLaunch}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white font-bold text-xs shadow-[0_0_25px_rgba(0,200,255,0.35)] hover:brightness-110 transition-all transform active:scale-95"
            >
              <Play size={15} fill="currentColor" />
              <span>Launch AI PIXEL PRO Workspace</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#060A18] border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
          <span>Asset #9 · Portable Launcher Identity</span>
          <span>Self-contained 64-bit EXE</span>
        </div>
      </div>
    </div>
  );
};
