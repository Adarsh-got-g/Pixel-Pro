import React from 'react';

interface BrandLogoMasterProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
  variant?: 'full' | 'emblem' | 'compact';
  alt?: string;
}

export const BrandLogoMaster: React.FC<BrandLogoMasterProps> = ({
  className = '',
  size = '100%',
  showGlow = true,
  alt = 'AI PIXEL PRO - AI Photo Studio Logo',
}) => {
  const masterLogoSrc = '/assets/aistudio/file_00000000dc0882088a989dd5f637fb33_ac7e338a.png';

  const style: React.CSSProperties = {
    maxWidth: typeof size === 'number' ? `${size}px` : size,
    maxHeight: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <div className={`relative inline-block ${className}`} style={style}>
      {showGlow && (
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#00C8FF]/20 via-[#A855F7]/25 to-[#EC35D8]/20 rounded-3xl blur-2xl -z-10 transform scale-95 opacity-70 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <img
        src={masterLogoSrc}
        alt={alt}
        className="w-full h-auto object-contain select-none drop-shadow-2xl"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
