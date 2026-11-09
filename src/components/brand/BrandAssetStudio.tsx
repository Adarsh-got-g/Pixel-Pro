import React, { useState, useRef } from 'react';
import { LOGO_ASSETS, BRAND_COLORS } from '../../data/brandAssets';
import { LogoAssetItem } from '../../types';
import { BrandLogoMaster } from './BrandLogoMaster';
import { SquareAppIcon } from './SquareAppIcon';
import { SidebarLogo } from './SidebarLogo';
import { generateIcoFile, downloadBlob, renderAppIconToCanvas } from '../../utils/icoGenerator';
import { 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Monitor, 
  Eye, 
  Code,
  FileCode,
  Zap,
  Info
} from 'lucide-react';

export const BrandAssetStudio: React.FC = () => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('square_icon');
  const [activeBackground, setActiveBackground] = useState<'navy' | 'black' | 'checker'>('navy');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isGeneratingIco, setIsGeneratingIco] = useState(false);
  const [icoSuccess, setIcoSuccess] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedAsset = LOGO_ASSETS.find((a) => a.id === selectedAssetId) || LOGO_ASSETS[1];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleDownloadIco = async () => {
    try {
      setIsGeneratingIco(true);
      const blob = await generateIcoFile();
      downloadBlob(blob, 'ai_pixel_pro.ico');
      setIcoSuccess(true);
      setTimeout(() => setIcoSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to generate ICO', e);
    } finally {
      setIsGeneratingIco(false);
    }
  };

  const handleDownloadPng = (size = 512) => {
    const canvas = document.createElement('canvas');
    renderAppIconToCanvas(canvas, size, activeBackground === 'checker');
    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `ai_pixel_pro_icon_${size}x${size}.png`);
      }
    }, 'image/png');
  };

  const bgClass = 
    activeBackground === 'navy' 
      ? 'bg-[#080D20]' 
      : activeBackground === 'black' 
      ? 'bg-black' 
      : 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-[#0f172a]';

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-y-auto bg-[#080D20] p-6 lg:p-10 select-none">
      {/* Background neon ambient */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[#00C8FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#EC35D8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Header Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#152042]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#00C8FF]/20 text-[#00F0FF] border border-[#00C8FF]/30">
                Official Brand Assets System
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-xs text-white/60">9 Distinct Assets</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              AI PIXEL PRO — Identity & Logo Suite
            </h1>
            <p className="text-sm text-white/70 mt-1 max-w-2xl leading-relaxed">
              Complete multi-resolution asset delivery system based on the official camera lens, 
              rainbow iris, orbital swoosh, and 3D pixel typography brand guidelines.
            </p>
          </div>

          {/* Quick ICO Binary Export button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadIco}
              disabled={isGeneratingIco}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white font-bold text-xs shadow-[0_0_25px_rgba(0,200,255,0.35)] hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-50"
            >
              {icoSuccess ? (
                <>
                  <Check size={14} className="text-white" />
                  <span>Downloaded ai_pixel_pro.ico</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>{isGeneratingIco ? 'Generating ICO...' : 'Download Windows .ICO'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownloadPng(512)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
            >
              <Download size={14} />
              <span>Export 512px PNG</span>
            </button>
          </div>
        </div>

        {/* 6 Official Brand Colors Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Official Brand Color System
              </h2>
              <p className="text-xs text-white/50">
                Mathematically balanced 60-30-10 palette with AAA accessibility compliance
              </p>
            </div>
            <span className="text-[11px] text-[#00C8FF]">Click swatch to copy HEX</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {BRAND_COLORS.map((color) => (
              <button
                key={color.hex}
                onClick={() => handleCopyHex(color.hex)}
                className="group flex flex-col text-left p-3 rounded-xl bg-[#0A1026] border border-[#162348] hover:border-white/20 transition-all cursor-pointer relative"
              >
                <div
                  className="w-full h-14 rounded-lg mb-2 shadow-inner border border-white/10 flex items-end justify-end p-1.5 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                >
                  {copiedHex === color.hex && (
                    <span className="px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white flex items-center gap-1">
                      <Check size={10} /> Copied
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-white">{color.name}</div>
                <div className="font-mono text-[11px] text-[#00F0FF] group-hover:underline">
                  {color.hex}
                </div>
                <div className="text-[10px] text-white/50 truncate mt-1" title={color.usage}>
                  {color.usage}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main 9-Asset Catalog & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left Asset List (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              The 9 Required Logo Assets
            </h2>

            <div className="space-y-2">
              {LOGO_ASSETS.map((asset) => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#0E1738] border-[#00C8FF]/60 shadow-[0_0_20px_rgba(0,200,255,0.2)]'
                        : 'bg-[#0A1026]/70 border-[#142042] hover:bg-[#0C1430] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#00C8FF] to-[#EC35D8] text-white'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {asset.number}
                      </span>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-white/85'}`}>
                          {asset.name}
                        </div>
                        <div className="text-[11px] text-white/40 truncate">
                          {asset.usage}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-[#00C8FF] shrink-0 ml-2">
                      {asset.fileFormat.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Asset Live Inspection & Multi-Resolution Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Inspector Card */}
            <div className="p-6 rounded-2xl bg-[#0A1026] border border-[#162348] flex flex-col justify-between flex-1">
              <div>
                {/* Asset Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                        Asset #{selectedAsset.number}
                      </span>
                      <span className="text-white/40 text-xs">·</span>
                      <span className="text-xs text-white/60">{selectedAsset.aspectRatio}</span>
                    </div>
                    <h3 className="font-display font-black text-xl text-white mt-1">
                      {selectedAsset.name}
                    </h3>
                  </div>

                  {/* Background toggle */}
                  <div className="flex items-center gap-1 bg-[#060918] p-1 rounded-lg border border-white/5 text-xs">
                    <button
                      onClick={() => setActiveBackground('navy')}
                      className={`px-2 py-1 rounded text-[10px] font-medium ${
                        activeBackground === 'navy' ? 'bg-[#00C8FF]/20 text-[#00F0FF]' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Navy
                    </button>
                    <button
                      onClick={() => setActiveBackground('black')}
                      className={`px-2 py-1 rounded text-[10px] font-medium ${
                        activeBackground === 'black' ? 'bg-[#00C8FF]/20 text-[#00F0FF]' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      OLED Black
                    </button>
                    <button
                      onClick={() => setActiveBackground('checker')}
                      className={`px-2 py-1 rounded text-[10px] font-medium ${
                        activeBackground === 'checker' ? 'bg-[#00C8FF]/20 text-[#00F0FF]' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Transparency
                    </button>
                  </div>
                </div>

                {/* Primary Preview Stage */}
                <div
                  className={`w-full min-h-[300px] rounded-xl border border-white/10 flex items-center justify-center p-8 transition-colors ${bgClass}`}
                >
                  {selectedAsset.previewType === 'master' && (
                    <div className="flex flex-col items-center">
                      <BrandLogoMaster size={320} showGlow={true} />
                      <div className="text-[11px] text-white/50 mt-3 font-mono">
                        Official Promotional Key Art (1024×1024 Master)
                      </div>
                    </div>
                  )}

                  {selectedAsset.previewType === 'square_icon' && (
                    <div className="flex flex-col items-center">
                      <SquareAppIcon size={180} showGlow={true} />
                      <div className="text-[11px] text-[#00C8FF] mt-4 font-mono font-semibold">
                        Optimized Vector Squircle Icon (Camera + Iris + AI Monogram)
                      </div>
                    </div>
                  )}

                  {selectedAsset.previewType === 'ico' && (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex flex-col items-center">
                          <SquareAppIcon size={16} />
                          <span className="text-[9px] font-mono text-white/50 mt-1">16×16</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <SquareAppIcon size={32} />
                          <span className="text-[9px] font-mono text-white/50 mt-1">32×32</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <SquareAppIcon size={48} />
                          <span className="text-[9px] font-mono text-white/50 mt-1">48×48</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <SquareAppIcon size={96} />
                          <span className="text-[9px] font-mono text-white/50 mt-1">256×256</span>
                        </div>
                      </div>
                      <span className="text-xs text-white/70 font-mono">
                        Multi-Resolution Windows .ICO Binary
                      </span>
                    </div>
                  )}

                  {selectedAsset.previewType === 'sidebar' && (
                    <div className="p-4 bg-[#060918] rounded-xl border border-white/10 max-w-sm w-full">
                      <SidebarLogo />
                    </div>
                  )}

                  {selectedAsset.previewType === 'welcome' && (
                    <div className="flex flex-col items-center text-center">
                      <BrandLogoMaster size={180} showGlow={true} />
                      <div className="font-display font-black text-lg text-white mt-2">
                        AI PIXEL <span className="text-[#00C8FF]">PRO</span>
                      </div>
                      <div className="text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                        Enhance • Edit • Restore • Create
                      </div>
                    </div>
                  )}

                  {selectedAsset.previewType === 'splash' && (
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-dashed border-[#00C8FF]/40 rounded-full animate-spin [animation-duration:12s]" />
                        <BrandLogoMaster size={130} showGlow={true} />
                      </div>
                      <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#EC35D8] w-3/4 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-mono text-[#00F0FF] mt-1.5">
                        Loading Neural Shaders...
                      </span>
                    </div>
                  )}

                  {selectedAsset.previewType === 'about' && (
                    <div className="flex flex-col items-center text-center p-4 bg-[#060A1A] rounded-xl border border-white/10">
                      <BrandLogoMaster size={120} showGlow={true} />
                      <div className="font-display font-black text-sm text-white mt-1">
                        AI PIXEL PRO STUDIO EDITION 2026
                      </div>
                      <div className="text-[10px] text-white/50">Build 2026.11.08-PRO (DirectML)</div>
                    </div>
                  )}

                  {selectedAsset.previewType === 'installer' && (
                    <div className="w-36 h-64 bg-gradient-to-b from-[#080E24] via-[#0E1A3D] to-[#060A1A] rounded-lg p-3 border border-white/10 flex flex-col justify-between items-center text-center">
                      <SquareAppIcon size={38} showGlow={true} />
                      <div className="text-[10px] font-black text-white">AI PIXEL PRO Setup</div>
                      <div className="text-[8px] text-white/40">164×314 NSIS Specification</div>
                    </div>
                  )}

                  {selectedAsset.previewType === 'portable' && (
                    <div className="p-4 bg-[#080E24] rounded-xl border border-[#00C8FF]/30 flex items-center gap-3">
                      <SquareAppIcon size={44} showGlow={true} />
                      <div>
                        <div className="font-black text-xs text-white">PORTABLE LAUNCHER</div>
                        <div className="text-[10px] text-[#00F0FF]">Zero-Install Standalone</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Multi-Resolution Scaled Test Strip */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="text-xs font-semibold text-white/70 mb-3 flex items-center justify-between">
                    <span>Taskbar & Shell Precision Test (16px to 128px)</span>
                    <span className="text-[10px] font-mono text-emerald-400">Zero Blur Guaranteed</span>
                  </div>

                  <div className="flex items-center gap-5 p-3 bg-[#060918] rounded-xl border border-white/5 overflow-x-auto">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={16} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">16px</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={24} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">24px</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={32} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">32px</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-13 h-13 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={48} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">48px</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={64} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">64px</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 flex items-center justify-center bg-black/40 rounded border border-white/10">
                        <SquareAppIcon size={80} />
                      </div>
                      <span className="text-[9px] font-mono text-white/40 mt-1">80px</span>
                    </div>
                  </div>
                </div>

                {/* Important Design Rule Banner */}
                <div className="mt-5 p-3.5 bg-[#060B1E] border border-[#00C8FF]/20 rounded-xl flex items-start gap-3 text-xs text-white/80">
                  <Info size={16} className="text-[#00C8FF] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Strict Design Rule Enforced:</strong> As specified in the brand identity brief, the full promotional logo artwork is reserved for marketing hero displays and splash headers. At taskbar dimensions (16px–48px), the simplified square icon isolates the high-contrast camera lens, AI monogram, and pixel elements to prevent downsampling blur.
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-white/50">
                  Format: <span className="text-white font-medium">{selectedAsset.fileFormat}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPng(256)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    <Download size={13} />
                    <span>256px PNG</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPng(1024)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    <Download size={13} />
                    <span>1024px PNG</span>
                  </button>

                  <button
                    onClick={handleDownloadIco}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00C8FF] to-[#EC35D8] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all"
                  >
                    <Download size={13} />
                    <span>Windows .ICO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
