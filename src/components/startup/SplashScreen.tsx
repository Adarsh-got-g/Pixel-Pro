import React, { useEffect, useState } from 'react';
import { BrandLogoMaster } from '../brand/BrandLogoMaster';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { Play, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  autoProgress?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoProgress = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    'Initializing Neural Engine v4.2...',
    'Loading TensorRT & DirectML GPU Accelerators...',
    'Calibrating Color Profiles & HDR Color Gamut...',
    'Mounting AI Photo Studio Tools (Upscale, Restore, BG Remove)...',
    'AI PIXEL PRO Ready.',
  ];

  useEffect(() => {
    if (!autoProgress) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = Math.min(next, 100);
        
        // Update stage
        if (capped > 85) setStageIndex(4);
        else if (capped > 60) setStageIndex(3);
        else if (capped > 35) setStageIndex(2);
        else if (capped > 15) setStageIndex(1);
        else setStageIndex(0);

        return capped;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [autoProgress]);

  const handleRestart = () => {
    setProgress(0);
    setStageIndex(0);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-[#080D20] overflow-hidden select-none">
      {/* Background glow ambiance */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#00C8FF]/15 via-[#A855F7]/15 to-[#EC35D8]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,13,32,0.8)_100%)]" />

      {/* Splash Window Frame */}
      <div className="relative w-full max-w-xl bg-[#0B122C]/90 backdrop-blur-2xl border border-[#1E2C52] rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top subtle decorative strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC35D8]" />

        {/* Center Artwork / Master Brand Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-64 h-64 mb-4 flex items-center justify-center">
            {/* Spinning orbital ambient ring */}
            <div className="absolute inset-0 border-2 border-dashed border-[#00C8FF]/30 rounded-full animate-spin [animation-duration:18s] pointer-events-none" />
            <div className="absolute inset-3 border border-[#EC35D8]/20 rounded-full pointer-events-none" />
            
            <BrandLogoMaster size={240} showGlow={true} />
          </div>

          {/* Slogan */}
          <p className="text-xs uppercase tracking-[0.28em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#00C8FF] to-[#EC35D8] mb-6">
            Enhance • Edit • Restore • Create
          </p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md bg-[#050918] p-1 rounded-full border border-white/10 shadow-inner mb-3">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#00C8FF] to-[#EC35D8] transition-all duration-150 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#00F0FF]" />
            </div>
          </div>

          {/* Telemetry Stage Readout */}
          <div className="flex items-center justify-between w-full max-w-md text-xs text-white/70 px-1 mb-6">
            <span className="font-mono text-[11px] text-[#00C8FF]">
              {stages[stageIndex]}
            </span>
            <span className="font-mono font-bold text-[#00F0FF]">
              {progress}%
            </span>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-3">
            {progress < 100 ? (
              <button
                onClick={() => {
                  setProgress(100);
                  setStageIndex(4);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 transition-colors"
              >
                Skip Intro
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white shadow-[0_0_25px_rgba(0,200,255,0.4)] hover:brightness-110 transition-all transform active:scale-95"
              >
                <span>Launch AI Photo Studio</span>
                <ChevronRight size={14} />
              </button>
            )}

            <button
              onClick={handleRestart}
              className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              title="Replay Startup Animation"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Footer micro-details */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
          <span>AI PIXEL PRO Desktop Suite v2.4.0</span>
          <span>Official Build · 64-bit DirectML Edition</span>
        </div>
      </div>
    </div>
  );
};
