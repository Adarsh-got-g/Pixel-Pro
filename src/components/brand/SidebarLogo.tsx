import React from 'react';
import { SquareAppIcon } from './SquareAppIcon';

interface SidebarLogoProps {
  collapsed?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({
  collapsed = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`flex items-center gap-3 select-none transition-all ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      } ${className}`}
    >
      {/* Brand Square Icon */}
      <div className="relative shrink-0">
        <SquareAppIcon size={collapsed ? 38 : 42} showGlow={!collapsed} />
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] border border-[#080D20]"
          title="AI Engine Active"
        />
      </div>

      {/* Typography Lockup */}
      {!collapsed && (
        <div className="flex flex-col min-w-0 leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-lg tracking-tight text-white whitespace-nowrap">
              AI PIXEL{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8]">
                PRO
              </span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#00C8FF] whitespace-nowrap">
              AI Photo Studio
            </span>
            <span className="text-white/30 text-[9px]">·</span>
            <span className="text-[9px] font-medium text-white/50 tracking-wider">v2.4</span>
          </div>
        </div>
      )}
    </div>
  );
};
