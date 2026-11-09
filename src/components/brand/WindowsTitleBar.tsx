import React, { useState } from 'react';
import { SquareAppIcon } from './SquareAppIcon';
import { AppView } from '../../types';
import { 
  Minus, 
  Square, 
  X, 
  Sparkles, 
  Sliders, 
  Package, 
  HardDrive, 
  HelpCircle,
  Palette,
  DoorOpen
} from 'lucide-react';

interface WindowsTitleBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAbout: () => void;
}

export const WindowsTitleBar: React.FC<WindowsTitleBarProps> = ({
  currentView,
  onNavigate,
  onOpenAbout,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'File',
      children: [
        { label: 'New Project...', action: () => onNavigate('welcome') },
        { label: 'Open Image...', action: () => onNavigate('studio') },
        { label: 'Export Asset System...', action: () => onNavigate('brand_hub') },
        { divider: true },
        { label: 'Close Workspace', action: () => onNavigate('welcome') },
      ],
    },
    {
      label: 'Enhance',
      children: [
        { label: 'AI Super-Resolution (1K–8K)', action: () => onNavigate('studio') },
        { label: 'Clarity & Dynamic Range Boost', action: () => onNavigate('studio') },
        { label: 'Face Retouch & Smoothing', action: () => onNavigate('studio') },
      ],
    },
    {
      label: 'Branding',
      children: [
        { label: 'Brand Asset Studio (All 9 Logos)', action: () => onNavigate('brand_hub') },
        { label: 'Replay Startup Splash Screen', action: () => onNavigate('splash') },
        { label: 'Simulate Windows Installer', action: () => onNavigate('installer') },
        { label: 'Launch Portable Edition', action: () => onNavigate('portable') },
      ],
    },
    {
      label: 'Help',
      children: [
        { label: 'Brand Identity Guidelines', action: () => onNavigate('brand_hub') },
        { label: 'About AI PIXEL PRO...', action: onOpenAbout },
      ],
    },
  ];

  return (
    <header className="relative z-50 bg-[#060A19] border-b border-[#121B38] text-xs select-none">
      {/* Top Row: Taskbar Icon, App Title, Windows Controls */}
      <div className="flex items-center justify-between h-9 px-3">
        {/* Left: Simplified Windows Taskbar App Icon + Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            title="AI PIXEL PRO"
          >
            <SquareAppIcon size={18} showGlow={true} />
            <span className="font-display font-bold tracking-tight text-white text-[12px]">
              AI PIXEL PRO
            </span>
          </button>
          <span className="text-white/20 text-[10px]">|</span>
          <span className="text-white/60 font-medium text-[11px] truncate max-w-[280px]">
            AI Photo Studio — Enhance • Edit • Restore • Create
          </span>
        </div>

        {/* Center: Quick Mode Navigator */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#091028] p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => onNavigate('studio')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'studio'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders size={12} className="text-[#00C8FF]" />
            Studio
          </button>
          <button
            onClick={() => onNavigate('brand_hub')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'brand_hub'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette size={12} className="text-[#A855F7]" />
            Brand Assets (9)
          </button>
          <button
            onClick={() => onNavigate('welcome')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'welcome'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <DoorOpen size={12} className="text-[#EC35D8]" />
            Welcome
          </button>
          <button
            onClick={() => onNavigate('splash')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'splash'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles size={12} className="text-[#00F0FF]" />
            Startup Splash
          </button>
          <button
            onClick={() => onNavigate('installer')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'installer'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package size={12} className="text-[#00C8FF]" />
            Installer
          </button>
          <button
            onClick={() => onNavigate('portable')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              currentView === 'portable'
                ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/20 text-[#00F0FF] border border-[#00C8FF]/30 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <HardDrive size={12} className="text-white/80" />
            Portable
          </button>
        </nav>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-0">
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors mr-2"
            title="About AI PIXEL PRO"
          >
            <HelpCircle size={12} className="text-[#00C8FF]" />
            About
          </button>
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('welcome')}
              className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Minimize"
            >
              <Minus size={13} />
            </button>
            <button
              onClick={() => onNavigate('studio')}
              className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Maximize / Restore"
            >
              <Square size={11} />
            </button>
            <button
              onClick={() => onNavigate('welcome')}
              className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-600 transition-colors"
              title="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Bar Strip */}
      <div className="flex items-center px-2 py-0.5 border-t border-white/5 bg-[#050815] text-[11px]">
        {menuItems.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              onMouseEnter={() => {
                if (activeMenu) setActiveMenu(menu.label);
              }}
              className={`px-2.5 py-0.5 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors ${
                activeMenu === menu.label ? 'bg-white/15 text-white' : ''
              }`}
            >
              {menu.label}
            </button>

            {activeMenu === menu.label && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute left-0 top-full mt-1 w-56 bg-[#0B122C] border border-[#1A274E] rounded-md shadow-2xl py-1 z-50">
                  {menu.children.map((item, idx) => {
                    if ('divider' in item && item.divider) {
                      return <div key={idx} className="my-1 border-t border-white/10" />;
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if ('action' in item && item.action) item.action();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-white/85 hover:text-white hover:bg-[#00C8FF]/20 flex items-center justify-between transition-colors"
                      >
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}

        <div className="ml-auto flex items-center gap-3 pr-2 text-[10px] text-white/40">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            Neural Engine v4.2 Ready
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[#00C8FF]">DirectML / CUDA</span>
        </div>
      </div>
    </header>
  );
};
