import React from 'react';
import { BrandLogoMaster } from '../brand/BrandLogoMaster';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { AppView, StudioTool } from '../../types';
import { 
  FolderOpen, 
  Upload, 
  Sparkles, 
  Layers, 
  History, 
  Palette, 
  Maximize2, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (view: AppView) => void;
  onSelectTool: (tool: StudioTool) => void;
  onUploadImage?: (file: File) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  onSelectTool,
  onUploadImage,
}) => {
  const quickActions = [
    {
      id: 'upscale',
      tool: 'upscale' as StudioTool,
      title: 'Upscale 1K–8K',
      badge: 'Super-Res',
      desc: 'Neural 8x detail generation with edge reconstruction and de-blurring.',
      icon: Maximize2,
      gradient: 'from-[#00F0FF] to-[#00C8FF]',
    },
    {
      id: 'enhance',
      tool: 'enhance' as StudioTool,
      title: 'AI Enhance',
      badge: 'Clarity & HDR',
      desc: 'Automatic exposure balancing, micro-contrast, vibrance, and noise removal.',
      icon: Sparkles,
      gradient: 'from-[#00C8FF] to-[#A855F7]',
    },
    {
      id: 'bg_remove',
      tool: 'bg_remove' as StudioTool,
      title: 'BG Remove',
      badge: 'Alpha Mask',
      desc: 'One-click hair and feather edge cutout with transparent PNG export.',
      icon: Layers,
      gradient: 'from-[#A855F7] to-[#EC35D8]',
    },
    {
      id: 'restore',
      tool: 'restore' as StudioTool,
      title: 'Photo Restore',
      badge: 'Archival & Face',
      desc: 'Fix scratched vintage photos, restore faded colors, and enhance faces.',
      icon: History,
      gradient: 'from-[#EC35D8] to-[#FFA600]',
    },
    {
      id: 'edit',
      tool: 'edit' as StudioTool,
      title: 'Creative Edit',
      badge: 'Color Grading',
      desc: 'Professional studio curves, cinematic presets, LUTs, and optical bloom.',
      icon: Palette,
      gradient: 'from-[#00F0FF] to-[#EC35D8]',
    },
  ];

  const recentProjects = [
    { name: 'Fashion_Portrait_Studio_8K.aipp', date: 'Today, 2:40 PM', size: '28.4 MB', tag: '8K Upscale' },
    { name: 'Archival_Family_Portrait_1948.aipp', date: 'Yesterday, 6:15 PM', size: '14.2 MB', tag: 'Restore' },
    { name: 'Ecommerce_Packshot_Transparent.aipp', date: 'Nov 6, 2026', size: '9.8 MB', tag: 'BG Remove' },
    { name: 'Landscape_Glacier_GoldenHour.aipp', date: 'Nov 4, 2026', size: '42.1 MB', tag: 'AI Enhance' },
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadImage) {
      onUploadImage(e.target.files[0]);
      onNavigate('studio');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-y-auto bg-[#080D20] p-6 lg:p-10 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00C8FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#EC35D8]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Hero Brand Lockup */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-[#141F3D]">
          {/* Brand Identity details */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#00C8FF]/15 text-[#00F0FF] border border-[#00C8FF]/30">
                Official Release v2.4.0
              </span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-xs text-white/60">GPU Neural Acceleration</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-white mb-2 leading-none">
              AI PIXEL{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8]">
                PRO
              </span>
            </h1>

            <p className="text-lg font-semibold text-[#00C8FF] mb-2 tracking-wide">
              AI Photo Studio
            </p>

            <p className="text-sm font-medium tracking-widest uppercase text-white/50 mb-6">
              Enhance • Edit • Restore • Create
            </p>

            <p className="text-sm text-white/75 leading-relaxed mb-6">
              Welcome to the next-generation AI-powered photo editing suite. Upscale images up to 8K, 
              restore degraded archival portraits, isolate backgrounds with sub-pixel alpha masking, 
              and apply cinematic neural color grading.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white font-bold text-xs shadow-[0_0_25px_rgba(0,200,255,0.35)] hover:brightness-110 transition-all cursor-pointer transform active:scale-95">
                <Upload size={14} />
                <span>Open & Edit Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>

              <button
                onClick={() => onNavigate('studio')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1A3A] hover:bg-[#162552] text-white font-semibold text-xs border border-[#213568] transition-colors"
              >
                <span>Enter Studio Canvas</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('brand_hub')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs border border-white/10 transition-colors"
              >
                <span>View Brand Assets</span>
              </button>
            </div>
          </div>

          {/* Master Logo Showcase with Glow */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 shrink-0 flex items-center justify-center">
            <BrandLogoMaster size={320} showGlow={true} />
          </div>
        </div>

        {/* Feature Grid corresponding to Logo Badges */}
        <div className="pt-10 pb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Quick Start AI Workflows
              </h2>
              <p className="text-xs text-white/50">
                Launch directly into a specialized AI processing module
              </p>
            </div>
            <button
              onClick={() => onNavigate('studio')}
              className="text-xs font-semibold text-[#00C8FF] hover:underline flex items-center gap-1"
            >
              Open Full Studio <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => {
              const IconComp = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onSelectTool(action.tool);
                    onNavigate('studio');
                  }}
                  className="group flex flex-col text-left p-4 rounded-2xl bg-[#0B132C]/80 border border-[#18264D] hover:border-[#00C8FF]/50 hover:bg-[#0E193A] transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${action.gradient} text-white shadow-md`}
                    >
                      <IconComp size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      {action.badge}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-[#00F0FF] transition-colors mb-1">
                    {action.title}
                  </h3>
                  <p className="text-[11px] text-white/60 leading-snug line-clamp-2">
                    {action.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Split: Recent Projects & Brand System Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Recent Projects (2 cols) */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0A1129] border border-[#162349]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderOpen size={16} className="text-[#00C8FF]" />
                <h3 className="text-sm font-bold text-white">Recent Projects</h3>
              </div>
              <button
                onClick={() => onNavigate('studio')}
                className="text-xs text-white/50 hover:text-white"
              >
                Clear History
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {recentProjects.map((proj, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('studio')}
                  className="py-3 px-2 flex items-center justify-between hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <SquareAppIcon size={24} />
                    <div>
                      <div className="text-xs font-semibold text-white/90 hover:text-[#00F0FF]">
                        {proj.name}
                      </div>
                      <div className="text-[11px] text-white/40">
                        {proj.date} · {proj.size}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-[#00C8FF] border border-white/5">
                    {proj.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System & Brand Specifications Card (1 col) */}
          <div className="p-5 rounded-2xl bg-[#0A1129] border border-[#162349] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-[#A855F7]" />
                <h3 className="text-sm font-bold text-white">Brand & Engine Specs</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li className="flex items-center justify-between">
                  <span className="text-white/40">Edition</span>
                  <span className="font-semibold text-white">AI Pixel Pro 2026</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/40">Engine Core</span>
                  <span className="font-mono text-[#00C8FF]">DirectML / TensorRT</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/40">Color Management</span>
                  <span className="text-white">DCI-P3 & ProPhoto RGB</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/40">Max Upscale</span>
                  <span className="font-bold text-[#EC35D8]">8K UHD (7680×4320)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/40">Logo System</span>
                  <span className="text-[#00F0FF]">9 Dedicated Assets</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Installed License</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <Check size={12} /> Active Pro
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
