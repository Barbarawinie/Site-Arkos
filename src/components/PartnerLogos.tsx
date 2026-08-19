import React, { useState } from 'react';
import { PARTNERS_DATA } from '../data/partners';

interface PartnerLogoProps {
  id: string;
  name: string;
  className?: string;
  theme?: 'dark' | 'light';
}

export const PartnerLogoBadge: React.FC<PartnerLogoProps> = ({
  id,
  name,
  className = "h-9",
  theme = "light",
}) => {
  const [imgError, setImgError] = useState(false);
  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#0A0A0A";

  const partner = PARTNERS_DATA.find(p => p.id === id);
  const logoUrl = partner?.logoUrl;

  // If partner has an official image asset and hasn't errored
  if (logoUrl && !imgError) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoUrl}
          alt={name}
          className="h-full w-auto max-h-11 max-w-[140px] object-contain transition-transform duration-200 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Vector / Design Fallbacks
  switch (id) {
    case 'sulamerica':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#FF6B00" />
            <path d="M7 16C7 11.0294 11.0294 7 16 7V25C11.0294 25 7 20.9706 7 16Z" fill="#FFFFFF" />
            <circle cx="21" cy="16" r="4" fill="#FFFFFF" />
          </svg>
          <span className="font-extrabold text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
            SulAmérica
          </span>
        </div>
      );

    case 'bradesco':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#CC0000" />
            <path d="M16 7L24 16L16 25L8 16L16 7Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="16" cy="16" r="3.5" fill="#CC0000" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
              Bradesco
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase text-red-500">
              Saúde
            </span>
          </div>
        </div>
      );

    case 'porto':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#0055A5" />
            <path d="M9 16C9 12.134 12.134 9 16 9C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2.5" fill="#00A3E0" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
              Porto
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase text-sky-500">
              Saúde
            </span>
          </div>
        </div>
      );

    case 'amil':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#002D72" />
            <path d="M10 21L16 9L22 21M12 17H20" stroke="#00A3E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-black text-base tracking-wider uppercase" style={{ color: textColor }}>
            amil
          </span>
        </div>
      );

    case 'unimed':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#00995D" />
            <path d="M16 6L23 13V23H19V17H13V23H9V13L16 6Z" fill="#FFFFFF" />
          </svg>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-emerald-600 dark:text-emerald-400">
            Unimed
          </span>
        </div>
      );

    case 'hapvida-gndi':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#003399" />
            <path d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z" fill="#FF8200" opacity="0.3" />
            <path d="M12 16H20M16 12V20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight" style={{ color: textColor }}>
              Hapvida
            </span>
            <span className="text-[9px] font-semibold uppercase text-amber-500">
              NotreDame
            </span>
          </div>
        </div>
      );

    case 'medsenior':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#1A535C" />
            <path d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
            MedSênior
          </span>
        </div>
      );

    case 'omint':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#1B2A4A" />
            <circle cx="16" cy="16" r="6" stroke="#D4AF37" strokeWidth="2" />
          </svg>
          <span className="font-black text-sm tracking-widest uppercase" style={{ color: textColor }}>
            OMINT
          </span>
        </div>
      );

    case 'careplus':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#008080" />
            <path d="M16 10V22M10 16H22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-sm tracking-tight" style={{ color: textColor }}>
            Care Plus
          </span>
        </div>
      );

    case 'sobam':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#006699" />
            <polygon points="16,8 24,24 8,24" fill="#FFFFFF" opacity="0.85" />
          </svg>
          <span className="font-extrabold text-sm uppercase tracking-wider" style={{ color: textColor }}>
            Sobam
          </span>
        </div>
      );

    case 'gocare':
      return (
        <div className={`flex items-center gap-2 font-sans select-none ${className}`}>
          <svg viewBox="0 0 32 32" className="h-full w-auto" fill="none">
            <rect width="32" height="32" rx="6" fill="#E65100" />
            <circle cx="16" cy="16" r="7" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3 3" />
          </svg>
          <span className="font-extrabold text-sm tracking-tight" style={{ color: textColor }}>
            GoCare
          </span>
        </div>
      );

    default:
      return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 ${className}`}>
          <span className="font-semibold text-sm" style={{ color: textColor }}>
            {name}
          </span>
        </div>
      );
  }
};
