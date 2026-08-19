import React, { useState } from 'react';

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
  
  // For dark background (variant="light"), use arkos-white.png
  // For light background (variant="dark"), use arkos-trimmed.png
  const logoSrc = isLight ? "/assets/logos/arkos-white.png" : "/assets/logos/arkos-trimmed.png";
  const primaryText = isLight ? "#FFFFFF" : "#06110C";
  const subText = isLight ? "#A7F3D0" : "#076633";

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
        /* Dynamic SVG Vector Fallback */
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 48 48"
            className="h-8 w-8 shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arkosGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#076633" />
              </linearGradient>
            </defs>
            <path
              d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
              fill="url(#arkosGrad1)"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span
              className="font-extrabold tracking-tight text-xl font-sans"
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
