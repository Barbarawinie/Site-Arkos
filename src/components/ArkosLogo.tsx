import React, { useState } from 'react';
import { LOGO_ASSETS } from '../assets/logos';

interface ArkosLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const ArkosLogo: React.FC<ArkosLogoProps> = ({
  className = "h-9",
  variant = "light",
  showTagline = true,
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === "light";
  const logoSrc = isLight ? LOGO_ASSETS.arkosWhite : LOGO_ASSETS.arkosDark;
  const primaryText = isLight ? "#FFFFFF" : "#06110C";
  const subText = isLight ? "#34D399" : "#076633";

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {!imgError ? (
        <img
          src={logoSrc}
          alt="Arkos Benefícios"
          className="h-full w-auto max-h-12 object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 40 40"
            className="h-8 w-8 shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arkosGradBrand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#076633" />
              </linearGradient>
            </defs>
            <polygon
              points="20,2 36,11 36,29 20,38 4,29 4,11"
              fill="url(#arkosGradBrand)"
            />
            <path
              d="M20 9L29 26H23.5L20 18.5L16.5 26H11L20 9Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
            <circle cx="20" cy="27" r="2.2" fill="#FFFFFF" />
          </svg>

          <div className="flex flex-col leading-none">
            <span
              className="font-black tracking-tight text-xl font-sans"
              style={{ color: primaryText }}
            >
              arkos
            </span>
            {showTagline && (
              <span
                className="text-[9px] uppercase font-bold tracking-[0.22em] mt-0.5"
                style={{ color: subText }}
              >
                benefícios
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
