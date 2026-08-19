import React from 'react';
import { SukhothaiEmblemIcon, SukhothaiPagodaSilhouettes, ThaiDokPrachamYamPattern } from './ThaiIcons';

interface HeaderProps {
  onOpenEventInfo?: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEventInfo }) => {
  return (
    <header className="relative w-full bg-[#20074f] overflow-hidden select-none">
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex flex-wrap">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 0.75px, transparent 0.75px), radial-gradient(#d8b4fe 0.75px, #20074f 0.75px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-9 sm:pb-12 flex items-center justify-between gap-4">
        {/* Left: School Emblem & Name */}
        <div className="flex items-center gap-3 sm:gap-4 z-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
            <SukhothaiEmblemIcon className="w-full h-full drop-shadow-none" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold font-['Kanit'] text-white tracking-wide leading-tight">
              โรงเรียนสุโขทัยวิทยาคม
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
              สหวิทยาเขตสุโขทัย
            </p>
          </div>
        </div>

        {/* Right: Golden Sukhothai Wat Mahathat / Pagoda & Chedi Silhouettes */}
        <div className="hidden sm:flex items-end justify-end shrink-0 z-10 pr-2">
          <SukhothaiPagodaSilhouettes className="w-48 md:w-60 h-16 md:h-20" color="#f59e0b" />
        </div>
      </div>

      {/* Elegant Concave Wave Arch with Golden Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 pointer-events-none">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* White Bottom Cutout */}
          <path
            d="M0 40 L0 10 Q600 45 1200 10 L1200 40 Z"
            fill="#ffffff"
          />
          {/* Golden Curved Border Line */}
          <path
            d="M0 10 Q600 45 1200 10"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </svg>
      </div>
    </header>
  );
};
