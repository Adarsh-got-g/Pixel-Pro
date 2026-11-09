import React, { useState } from 'react';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { BrandLogoMaster } from '../brand/BrandLogoMaster';
import { Check, Folder, HardDrive, RefreshCw, ChevronRight, ArrowLeft } from 'lucide-react';

interface InstallerWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const InstallerWizard: React.FC<InstallerWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1);
  const [installPath, setInstallPath] = useState('C:\\Program Files\\AI Pixel Pro');
  const [createDesktopIcon, setCreateDesktopIcon] = useState(true);
  const [createStartMenu, setCreateStartMenu] = useState(true);
  const [associateFiles, setAssociateFiles] = useState(true);
  const [enableGpu, setEnableGpu] = useState(true);
  const [installProgress, setInstallProgress] = useState(0);

  const startInstallation = () => {
    setStep(5);
    setInstallProgress(0);
    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep(6); // Finish screen
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 120);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 bg-[#050814] select-none">
      {/* Installer Window Frame (Windows classic modern installer style) */}
      <div className="w-full max-w-2xl bg-[#0B122C] border border-[#1A284E] rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#080D20] border-b border-[#141F3E] text-xs">
          <div className="flex items-center gap-2">
            <SquareAppIcon size={16} />
            <span className="font-semibold text-white/90">
              AI PIXEL PRO v2.4.0 Setup
            </span>
          </div>
          <button
            onClick={onCancel}
            className="text-white/50 hover:text-white px-2 py-0.5 rounded hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Wizard Body: Left Branding Banner + Right Content Area */}
        <div className="flex flex-1 min-h-[380px]">
          {/* Asset #8: Installer Left-Banner Branding (164px wide standard NSIS layout) */}
          <div className="w-48 bg-gradient-to-b from-[#080E24] via-[#0E1A3D] to-[#060A1A] p-4 border-r border-[#152042] flex flex-col justify-between shrink-0 relative overflow-hidden">
            {/* Top decorative neon glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#00C8FF]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#EC35D8]/20 rounded-full blur-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <SquareAppIcon size={56} showGlow={true} className="mb-3" />
              <div className="font-display font-black text-sm text-white tracking-tight">
                AI PIXEL{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] to-[#EC35D8]">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-[#00C8FF] font-semibold uppercase tracking-wider mt-0.5">
                AI Photo Studio
              </div>
              <div className="text-[9px] text-white/40 tracking-widest uppercase mt-2">
                Enhance • Edit
                <br />
                Restore • Create
              </div>
            </div>

            {/* Left banner feature badges */}
            <div className="relative z-10 space-y-2 text-[10px] text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                <span>8K Neural Upscale</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF]" />
                <span>AI Photo Restore</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                <span>Alpha BG Removal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC35D8]" />
                <span>Creative Studio FX</span>
              </div>
            </div>

            <div className="relative z-10 text-[9px] text-white/30 text-center">
              Installer Branding Spec #8
            </div>
          </div>

          {/* Right Wizard Pages */}
          <div className="flex-1 p-6 flex flex-col justify-between bg-[#0B122C]">
            {/* Step 1: Welcome */}
            {step === 1 && (
              <div>
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  Welcome to the AI PIXEL PRO Setup Wizard
                </h2>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  This will install <strong className="text-white">AI PIXEL PRO v2.4.0 (64-bit)</strong> on your computer.
                </p>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  It is recommended that you close all other applications before continuing. AI PIXEL PRO includes state-of-the-art neural upscaling, archival photo restoration, background isolation, and professional color grading engines.
                </p>
                <div className="p-3 bg-[#080D20] border border-white/5 rounded-lg text-xs text-white/80">
                  <div className="font-semibold text-[#00F0FF] mb-1">Hardware Acceleration Notice:</div>
                  DirectML and CUDA hardware acceleration will be automatically configured for optimal tensor throughput.
                </div>
              </div>
            )}

            {/* Step 2: License Agreement */}
            {step === 2 && (
              <div>
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  License Agreement
                </h2>
                <p className="text-xs text-white/60 mb-2">
                  Please read the following license agreement carefully before continuing.
                </p>
                <div className="h-44 overflow-y-auto p-3 bg-[#060918] border border-white/10 rounded-lg text-[11px] text-white/70 font-mono leading-relaxed space-y-2">
                  <p>AI PIXEL PRO END-USER LICENSE AGREEMENT (EULA)</p>
                  <p>Copyright (c) 2026 AI PIXEL PRO Studio. All rights reserved.</p>
                  <p>1. GRANT OF LICENSE: AI PIXEL PRO grants you a non-exclusive license to use the Software for professional and creative digital imaging, upscaling, restoration, and background isolation.</p>
                  <p>2. NEURAL MODELS: Pre-trained weights for 1K-8K super resolution and face reconstruction are licensed for local offline processing without telemetry.</p>
                  <p>3. OWNERSHIP: You retain 100% intellectual property ownership of all output images created or enhanced using AI PIXEL PRO.</p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/90">
                  <input type="checkbox" id="eula" defaultChecked className="accent-[#00C8FF]" />
                  <label htmlFor="eula" className="cursor-pointer">I accept the terms in the License Agreement</label>
                </div>
              </div>
            )}

            {/* Step 3: Destination Folder */}
            {step === 3 && (
              <div>
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  Select Destination Location
                </h2>
                <p className="text-xs text-white/60 mb-4">
                  Where should AI PIXEL PRO be installed?
                </p>
                <div className="flex items-center gap-2 p-2 bg-[#060918] border border-white/10 rounded-lg mb-4">
                  <Folder size={16} className="text-[#00C8FF]" />
                  <input
                    type="text"
                    value={installPath}
                    onChange={(e) => setInstallPath(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white font-mono outline-none"
                  />
                  <button className="px-3 py-1 bg-white/10 hover:bg-white/15 text-xs text-white rounded">
                    Browse...
                  </button>
                </div>
                <div className="text-xs text-white/50 space-y-1">
                  <div>Required disk space: 1,420 MB</div>
                  <div>Space available on drive C:\: 284,500 MB</div>
                </div>
              </div>
            )}

            {/* Step 4: Components */}
            {step === 4 && (
              <div>
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  Select Additional Tasks
                </h2>
                <p className="text-xs text-white/60 mb-4">
                  Which additional shortcuts and associations should be created?
                </p>
                <div className="space-y-3 text-xs text-white/80">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={createDesktopIcon}
                      onChange={(e) => setCreateDesktopIcon(e.target.checked)}
                      className="accent-[#00C8FF]"
                    />
                    <span>Create a desktop shortcut using the simplified Square App Icon</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={createStartMenu}
                      onChange={(e) => setCreateStartMenu(e.target.checked)}
                      className="accent-[#00C8FF]"
                    />
                    <span>Pin AI PIXEL PRO to Windows Start Menu</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={associateFiles}
                      onChange={(e) => setAssociateFiles(e.target.checked)}
                      className="accent-[#00C8FF]"
                    />
                    <span>Associate with .AIPP, .PNG, .JPG, and raw image formats</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableGpu}
                      onChange={(e) => setEnableGpu(e.target.checked)}
                      className="accent-[#00C8FF]"
                    />
                    <span>Install DirectML GPU Acceleration Libraries</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Progress Bar */}
            {step === 5 && (
              <div className="py-8">
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  Installing AI PIXEL PRO...
                </h2>
                <p className="text-xs text-white/60 mb-6">
                  Please wait while Setup installs AI PIXEL PRO on your system.
                </p>
                <div className="w-full bg-[#060918] p-1 rounded-full border border-white/10 mb-2">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#00C8FF] to-[#EC35D8] transition-all duration-150"
                    style={{ width: `${installProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Extracting AI_Models_8K_Upscaler.bin...</span>
                  <span>{installProgress}%</span>
                </div>
              </div>
            )}

            {/* Step 6: Finished */}
            {step === 6 && (
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Check size={20} />
                </div>
                <h2 className="font-display font-bold text-lg text-white mb-2">
                  Completing the AI PIXEL PRO Setup Wizard
                </h2>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Setup has finished installing AI PIXEL PRO on your computer. The application may be launched by selecting the installed icons.
                </p>
                <div className="p-3 bg-[#080D20] border border-white/5 rounded-lg mb-4 text-xs text-white/80 space-y-1">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <Check size={14} className="text-[#00F0FF]" />
                    <span>Square taskbar icon installed to Windows Shell</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-white">
                    <Check size={14} className="text-[#00F0FF]" />
                    <span>Hardware acceleration enabled</span>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-white font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#00C8FF]" />
                  <span>Launch AI PIXEL PRO now</span>
                </label>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                {step > 1 && step < 5 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1 px-4 py-1.5 rounded text-xs text-white/80 hover:bg-white/10"
                  >
                    <ArrowLeft size={12} /> Back
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {step < 4 && (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-1 px-5 py-1.5 rounded-lg bg-[#00C8FF] hover:bg-[#00B4E6] text-[#080D20] font-bold text-xs shadow-md transition-colors"
                  >
                    Next <ChevronRight size={12} />
                  </button>
                )}
                {step === 4 && (
                  <button
                    onClick={startInstallation}
                    className="flex items-center gap-1 px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#00C8FF] to-[#EC35D8] text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
                  >
                    Install Now
                  </button>
                )}
                {step === 6 && (
                  <button
                    onClick={onComplete}
                    className="flex items-center gap-1 px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all"
                  >
                    Finish & Open Studio
                  </button>
                )}
                {step < 5 && (
                  <button
                    onClick={onCancel}
                    className="px-4 py-1.5 rounded text-xs text-white/60 hover:text-white hover:bg-white/5"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
