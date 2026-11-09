import React from 'react';

interface SquareAppIconProps {
  size?: number;
  className?: string;
  showGlow?: boolean;
  withContainer?: boolean;
}

export const SquareAppIcon: React.FC<SquareAppIconProps> = ({
  size = 64,
  className = '',
  showGlow = false,
  withContainer = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className} ${
        showGlow ? 'drop-shadow-[0_0_18px_rgba(0,200,255,0.4)]' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 256 256"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B122C" />
            <stop offset="50%" stopColor="#080D20" />
            <stop offset="100%" stopColor="#040714" />
          </linearGradient>

          <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="30%" stopColor="#00C8FF" />
            <stop offset="70%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC35D8" />
          </linearGradient>

          <linearGradient id="cameraBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2A4A" />
            <stop offset="50%" stopColor="#111B34" />
            <stop offset="100%" stopColor="#0A1022" />
          </linearGradient>

          <linearGradient id="orbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFA600" />
            <stop offset="25%" stopColor="#FF3366" />
            <stop offset="55%" stopColor="#9D00FF" />
            <stop offset="85%" stopColor="#00C8FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>

          <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A0F24" />
            <stop offset="25%" stopColor="#0D1B42" />
            <stop offset="50%" stopColor="#00C8FF" />
            <stop offset="70%" stopColor="#EC35D8" />
            <stop offset="90%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#00F0FF" />
          </radialGradient>

          <linearGradient id="aiTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2F4FF" />
            <stop offset="100%" stopColor="#8AD6FF" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer squircle container */}
        {withContainer && (
          <>
            <rect
              x="6"
              y="6"
              width="244"
              height="244"
              rx="54"
              fill="url(#bgGrad)"
            />
            <rect
              x="6"
              y="6"
              width="244"
              height="244"
              rx="54"
              stroke="url(#neonBorder)"
              strokeWidth="4"
              strokeOpacity="0.85"
            />
          </>
        )}

        {/* Floating Pixel Cubes (upper left) */}
        <g opacity="0.95">
          <rect x="42" y="38" width="14" height="14" rx="2" fill="#00F0FF" />
          <rect x="24" y="56" width="14" height="14" rx="2" fill="#00C8FF" />
          <rect x="42" y="56" width="14" height="14" rx="2" fill="#A855F7" />
          <rect x="24" y="74" width="14" height="14" rx="2" fill="#00F0FF" />
          <rect x="42" y="74" width="14" height="14" rx="2" fill="#EC35D8" />
          <rect x="60" y="56" width="14" height="14" rx="2" fill="#00C8FF" />
          <rect x="60" y="74" width="14" height="14" rx="2" fill="#A855F7" />
          <rect x="42" y="92" width="14" height="14" rx="2" fill="#00C8FF" />
          <rect x="24" y="92" width="14" height="14" rx="2" fill="#A855F7" />
          <rect x="60" y="92" width="14" height="14" rx="2" fill="#EC35D8" />
          <rect x="42" y="110" width="14" height="14" rx="2" fill="#EC35D8" />
        </g>

        {/* Camera body silhouette */}
        <g id="camera">
          {/* Top bump / prism */}
          <path
            d="M 100 48 L 112 36 L 144 36 L 156 48 Z"
            fill="url(#cameraBodyGrad)"
            stroke="#00C8FF"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          {/* Main camera housing */}
          <rect
            x="68"
            y="48"
            width="120"
            height="86"
            rx="14"
            fill="url(#cameraBodyGrad)"
            stroke="#2B3A60"
            strokeWidth="2"
          />
          {/* Flash / Sensor light */}
          <circle cx="166" cy="62" r="4.5" fill="#00F0FF" filter="url(#softGlow)" />
        </g>

        {/* Lens Outer Barrel */}
        <circle cx="128" cy="92" r="38" fill="#080D20" stroke="#1A2744" strokeWidth="4" />
        <circle cx="128" cy="92" r="34" stroke="url(#neonBorder)" strokeWidth="2.5" />

        {/* Rainbow Iris / Aperture Ring */}
        <circle cx="128" cy="92" r="28" fill="url(#irisGrad)" opacity="0.92" />
        
        {/* Aperture blades & inner core reflection */}
        <circle cx="128" cy="92" r="16" fill="#040714" stroke="#00C8FF" strokeWidth="1.5" />
        <circle cx="124" cy="88" r="4" fill="#FFFFFF" opacity="0.9" filter="url(#softGlow)" />
        <circle cx="132" cy="94" r="1.5" fill="#00F0FF" opacity="0.8" />

        {/* Glowing Planetary Orbital Swoop Ring */}
        <path
          d="M 52 142 C 40 134 46 114 84 94 C 130 70 196 52 216 66 C 228 74 220 94 182 114 C 136 138 70 156 52 142 Z"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#softGlow)"
        />
        {/* Orbital highlight strand */}
        <path
          d="M 56 140 C 90 126 150 102 196 76"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* "AI" Big Monogram Typography at center-bottom */}
        <g id="ai-emblem" transform="translate(128, 184)">
          {/* Letter A with star cut */}
          <path
            d="M -48 30 L -22 -38 L -4 -38 L 22 30 L 6 30 L 0 12 L -26 12 L -32 30 Z M -22 -2 L -4 -2 L -13 -25 Z"
            fill="url(#aiTextGrad)"
            stroke="#080D20"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Distinctive 4-point star in letter A */}
          <path
            d="M -13 -18 Q -13 -9 -4 -9 Q -13 -9 -13 0 Q -13 -9 -22 -9 Q -13 -9 -13 -18 Z"
            fill="#00F0FF"
            filter="url(#softGlow)"
          />

          {/* Letter I */}
          <path
            d="M 28 -38 L 44 -38 L 44 30 L 28 30 Z"
            fill="url(#aiTextGrad)"
            stroke="#080D20"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Corner sparkle */}
        <path
          d="M 188 32 Q 188 42 198 42 Q 188 42 188 52 Q 188 42 178 42 Q 188 42 188 32 Z"
          fill="#00F0FF"
          filter="url(#softGlow)"
        />
      </svg>
    </div>
  );
};
