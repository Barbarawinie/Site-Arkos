import React, { useState } from 'react';
import { LOGO_ASSETS } from '../assets/logos';

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

  // Map operator IDs to bundled static image assets
  let officialLogoSrc: string | null = null;
  switch (id) {
    case 'sulamerica':
      officialLogoSrc = LOGO_ASSETS.sulamerica;
      break;
    case 'bradesco':
      officialLogoSrc = LOGO_ASSETS.bradesco;
      break;
    case 'porto':
      officialLogoSrc = LOGO_ASSETS.porto;
      break;
    case 'amil':
      officialLogoSrc = LOGO_ASSETS.amil;
      break;
    case 'unimed':
      officialLogoSrc = LOGO_ASSETS.unimed;
      break;
    case 'hapvida-gndi':
    case 'hapvida':
      officialLogoSrc = LOGO_ASSETS.hapvida;
      break;
    default:
      officialLogoSrc = null;
  }

  // If official bundled image exists and has not errored, display the clean image
  if (officialLogoSrc && !imgError) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={officialLogoSrc}
          alt={name}
          className="h-full w-auto max-h-10 max-w-[130px] object-contain transition-transform duration-200 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Refined Vector Badges
  switch (id) {
    case 'sulamerica':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M5 12C5 8.134 8.134 5 12 5V19C8.134 19 5 15.866 5 12Z" fill="#FFFFFF" />
              <circle cx="16" cy="12" r="3" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="font-black text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
            SulAmérica
          </span>
        </div>
      );

    case 'bradesco':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#CC0000] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M12 4L19 12L12 20L5 12L12 4Z" fill="#FFFFFF" />
              <circle cx="12" cy="12" r="2.5" fill="#CC0000" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
              Bradesco
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-red-600">
              Saúde
            </span>
          </div>
        </div>
      );

    case 'porto':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#0055A5] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M6 12C6 8.686 8.686 6 12 6C15.314 6 18 8.686 18 12C18 15.314 15.314 18 12 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="#00A3E0" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-sm sm:text-base tracking-tight" style={{ color: textColor }}>
              Porto
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600">
              Saúde
            </span>
          </div>
        </div>
      );

    case 'amil':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#002D72] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M6 18L12 6L18 18M8.5 13H15.5" stroke="#00A3E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-black text-lg tracking-wider uppercase" style={{ color: textColor }}>
            amil
          </span>
        </div>
      );

    case 'unimed':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#00995D] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M12 4L18 10V18H15V13H9V18H6V10L12 4Z" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="font-black text-sm sm:text-base tracking-tight text-[#00995D]">
            Unimed
          </span>
        </div>
      );

    case 'hapvida-gndi':
    case 'hapvida':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#003399] flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[#FF8200] opacity-25" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 relative z-10" fill="none">
              <path d="M8 12H16M12 8V16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xs sm:text-sm tracking-tight" style={{ color: textColor }}>
              Hapvida
            </span>
            <span className="text-[10px] font-bold uppercase text-amber-600">
              NotreDame
            </span>
          </div>
        </div>
      );

    case 'medsenior':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#1A535C] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="#4ECDC4" />
            </svg>
          </div>
          <span className="font-black text-sm sm:text-base tracking-tight text-[#1A535C]" style={{ color: isDark ? '#4ECDC4' : undefined }}>
            MedSênior
          </span>
        </div>
      );

    case 'omint':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#1B2A4A] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <circle cx="12" cy="12" r="5" stroke="#D4AF37" strokeWidth="2" />
            </svg>
          </div>
          <span className="font-black text-sm tracking-widest uppercase" style={{ color: textColor }}>
            OMINT
          </span>
        </div>
      );

    case 'careplus':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#008080] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M12 7V17M7 12H17" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-black text-sm tracking-tight" style={{ color: textColor }}>
            Care Plus
          </span>
        </div>
      );

    case 'sobam':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#006699] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <polygon points="12,6 18,18 6,18" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="font-black text-sm uppercase tracking-wider" style={{ color: textColor }}>
            Sobam
          </span>
        </div>
      );

    case 'gocare':
      return (
        <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
          <div className="w-8 h-8 rounded-lg bg-[#E65100] flex items-center justify-center shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2 2" />
            </svg>
          </div>
          <span className="font-black text-sm tracking-tight" style={{ color: textColor }}>
            GoCare
          </span>
        </div>
      );

    default:
      return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 ${className}`}>
          <span className="font-bold text-sm" style={{ color: textColor }}>
            {name}
          </span>
        </div>
      );
  }
};
