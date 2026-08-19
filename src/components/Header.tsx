import React from 'react';
import { SukhothaiEmblemIcon } from './ThaiIcons';
import { HeaderParticleCanvas } from './HeaderParticleCanvas';

interface HeaderProps {
  onOpenEventInfo?: () => void;
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEventInfo }) => {
  return (
    <header className="relative w-full bg-[#1b0333] overflow-hidden select-none min-h-[96px] sm:min-h-[140px] md:min-h-[170px] flex items-center justify-center shadow-md">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC CANVAS PARTICLE SYSTEM (REALISTIC STARDUST BEHIND ARCH IMAGE) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[1]">
        {/* Soft Golden Ambient Light Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_80%_at_50%_45%,_rgba(251,191,36,0.22)_0%,_rgba(147,51,234,0.12)_55%,_transparent_85%)]" />

        {/* 60fps High Performance Particle Canvas */}
        <HeaderParticleCanvas />
      </div>

      {/* ========================================================================= */}
      {/* 2. SUKHOTHAI ROYAL ARCH IMAGE (LAYERED IN FRONT OF STARDUST PARTICLES)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden z-[2]">
        <img
          src="/images/20260819_085332_0000.webp"
          alt="Sukhothai Royal Arch Header Background"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. FOREGROUND CONTENT: CENTERED SCHOOL EMBLEM & NAME                      */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-4 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 z-10">
        {/* Centered School Emblem - Clean & Crisp without glow */}
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0 flex items-center justify-center relative">
          <img
            src="/images/20260819_083131_0000.webp"
            alt="ตราโรงเรียนสุโขทัยวิทยาคม"
            className="w-full h-full object-contain relative z-10 transition-transform duration-300 hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (!img.src.includes('1000145881')) {
                img.src = '/images/1000145881-jukebox-bg-removed.webp';
              } else {
                img.style.display = 'none';
                const fallback = document.getElementById('header-svg-fallback');
                if (fallback) fallback.style.display = 'block';
              }
            }}
          />
          <div id="header-svg-fallback" className="hidden w-full h-full relative z-10">
            <SukhothaiEmblemIcon className="w-full h-full drop-shadow-none" />
          </div>
        </div>

        {/* Centered School Name */}
        <h1 className="text-base sm:text-2xl md:text-3xl font-bold font-['Kanit'] text-white tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          โรงเรียนสุโขทัยวิทยาคม
        </h1>
      </div>
    </header>
  );
};








