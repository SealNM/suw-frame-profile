import React from 'react';

/**
 * 1. Sukhothai Pagoda / Chedi Silhouette (Wat Mahathat style)
 */
export const SukhothaiPagodaSilhouettes: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-48 h-20',
  color = '#d97706',
}) => (
  <svg
    viewBox="0 0 240 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Small Side Chedi Left */}
    <path
      d="M20 90 L20 70 L28 70 L28 55 L32 55 L32 45 L35 45 L35 30 L37 30 L37 15 L38 0 L39 15 L39 30 L41 30 L41 45 L44 45 L44 55 L48 55 L48 70 L56 70 L56 90 Z"
      fill={color}
      opacity="0.8"
    />
    {/* Medium Chedi */}
    <path
      d="M70 90 L70 65 L80 65 L80 48 L86 48 L86 36 L90 36 L90 22 L93 22 L93 10 L95 0 L97 10 L97 22 L100 22 L100 36 L104 36 L104 48 L110 48 L110 65 L120 65 L120 90 Z"
      fill={color}
      opacity="0.9"
    />
    {/* Main Sukhothai Chedi (Prang / Lotus Bud Chedi) */}
    <path
      d="M140 90 L140 60 L152 60 L152 45 L158 45 L158 32 L164 32 L164 20 L168 20 L168 12 L170 0 L172 12 L172 20 L176 20 L176 32 L182 32 L182 45 L188 45 L188 60 L200 60 L200 90 Z"
      fill={color}
    />
    {/* Spire Lotus Bud tip on main */}
    <path
      d="M166 22 Q170 12 170 0 Q170 12 174 22 Z"
      fill={color}
    />
    {/* Small Side Chedi Right */}
    <path
      d="M210 90 L210 72 L216 72 L216 58 L220 58 L220 48 L223 48 L223 35 L225 35 L225 18 L226 0 L227 18 L227 35 L229 35 L229 48 L232 48 L232 58 L236 58 L236 72 L242 72 L242 90 Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

/**
 * 2. Thai School Emblem with Buddha Silhouette & Ribbon
 */
export const SukhothaiEmblemIcon: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Halo Rays */}
    <circle cx="50" cy="46" r="42" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="50" cy="46" r="39" fill="#1e0842" stroke="#fbbf24" strokeWidth="3" />
    
    {/* Golden Buddha Silhouette */}
    <path
      d="M50 18 Q54 24 50 29 Q46 24 50 18 Z"
      fill="#fbbf24"
    />
    <circle cx="50" cy="33" r="6" fill="#fbbf24" />
    <path
      d="M37 46 Q43 38 50 39 Q57 38 63 46 L65 55 L35 55 Z"
      fill="#fbbf24"
    />
    <ellipse cx="50" cy="58" rx="18" ry="5" fill="#fbbf24" />
    
    {/* Golden Pedestal lines */}
    <rect x="30" y="62" width="40" height="4" rx="2" fill="#f59e0b" />
    <rect x="34" y="67" width="32" height="3" rx="1.5" fill="#fbbf24" />
    
    {/* Lower Banner Ribbon */}
    <path
      d="M18 78 L82 78 L86 86 L82 94 L18 94 L14 86 Z"
      fill="#f59e0b"
      stroke="#b45309"
      strokeWidth="1"
    />
    <path
      d="M22 81 L78 81 L80 86 L78 91 L22 91 L20 86 Z"
      fill="#1e0842"
    />
    <text
      x="50"
      y="88"
      textAnchor="middle"
      fill="#fef08a"
      fontSize="6.5"
      fontWeight="bold"
      fontFamily="'Prompt', sans-serif"
    >
      สุโขทัยวิทยาคม
    </text>
  </svg>
);

/**
 * 3. Thai Golden Kanok Center Divider
 */
export const ThaiKanokDivider: React.FC<{ className?: string }> = ({
  className = 'w-36 h-6',
}) => (
  <svg
    viewBox="0 0 160 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left horizontal gradient line */}
    <line x1="10" y1="15" x2="60" y2="15" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="64" cy="15" r="2" fill="#f59e0b" />

    {/* Center Flower / Dok Pra Cham Yam */}
    <g transform="translate(80, 15)">
      {/* 4 Petals */}
      <path d="M0 -10 Q5 -4 0 0 Q-5 -4 0 -10 Z" fill="#d97706" />
      <path d="M0 10 Q5 4 0 0 Q-5 4 0 10 Z" fill="#d97706" />
      <path d="M-10 0 Q-4 5 0 0 Q-4 -5 -10 0 Z" fill="#d97706" />
      <path d="M10 0 Q4 5 0 0 Q4 -5 10 0 Z" fill="#d97706" />
      {/* Center circle */}
      <circle cx="0" cy="0" r="3" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8" />
    </g>

    {/* Right horizontal gradient line */}
    <circle cx="96" cy="15" r="2" fill="#f59e0b" />
    <line x1="100" y1="15" x2="150" y2="15" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * 4. Golden Thai Education Book Ornament
 */
export const ThaiEducationBookIcon: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Radiant sun rays */}
    <path d="M50 10 L50 2 M30 18 L24 12 M70 18 L76 12 M18 32 L10 28 M82 32 L90 28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Open Book Left & Right Pages */}
    <path
      d="M50 68 Q34 60 14 65 L14 30 Q34 25 50 33 Z"
      fill="#fffbeb"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M50 68 Q66 60 86 65 L86 30 Q66 25 50 33 Z"
      fill="#fffbeb"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Inner Book Spine / Leaves Layer */}
    <path d="M50 33 L50 68" stroke="#b45309" strokeWidth="2.5" />
    <path d="M22 38 Q36 34 46 40" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 46 Q36 42 46 48" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 54 Q36 50 46 56" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

    <path d="M78 38 Q64 34 54 40" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M78 46 Q64 42 54 48" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M78 54 Q64 50 54 56" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

    {/* Golden Thai Floral base (Phan / Pedestal base) */}
    <path
      d="M38 72 Q50 68 62 72 L66 82 Q50 86 34 82 Z"
      fill="#f59e0b"
      stroke="#b45309"
      strokeWidth="2"
    />
    <circle cx="50" cy="77" r="3" fill="#fef08a" />
  </svg>
);

/**
 * 5. Thai Pagoda / Wat Temple Icon in Royal Purple
 */
export const ThaiTempleIcon: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Base Steps */}
    <rect x="15" y="82" width="70" height="6" rx="2" fill="#4c1d95" />
    <rect x="22" y="74" width="56" height="8" rx="2" fill="#3b0764" />
    <rect x="28" y="66" width="44" height="8" rx="2" fill="#581c87" />

    {/* Main Temple Building Sanctuary */}
    <rect x="36" y="48" width="28" height="18" fill="#4c1d95" />

    {/* Pillars */}
    <rect x="38" y="52" width="4" height="14" fill="#a855f7" />
    <rect x="58" y="52" width="4" height="14" fill="#a855f7" />
    {/* Arch door */}
    <path d="M46 66 L46 54 Q50 50 54 54 L54 66 Z" fill="#1e0842" />

    {/* Tiered Thai Roof */}
    <path d="M26 48 Q50 36 74 48 L70 42 Q50 32 30 42 Z" fill="#6b21a8" />
    <path d="M30 42 Q50 30 70 42 L66 36 Q50 26 34 36 Z" fill="#7e22ce" />
    <path d="M34 36 Q50 24 66 36 L62 30 Q50 20 38 30 Z" fill="#9333ea" />

    {/* Golden Spire / Chofa top */}
    <path
      d="M50 6 Q53 14 50 22 Q47 14 50 6 Z"
      fill="#f59e0b"
      stroke="#b45309"
      strokeWidth="1"
    />
    <circle cx="50" cy="5" r="2.5" fill="#fbbf24" />
  </svg>
);

/**
 * 6. Thai Traditional Purple Lotus / Floral Bouquet Ornament
 */
export const ThaiLotusBouquetIcon: React.FC<{ className?: string }> = ({
  className = 'w-24 h-16',
}) => (
  <svg
    viewBox="0 0 140 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left flowing leaf */}
    <path
      d="M70 70 C40 65 20 50 10 30 C25 35 45 45 70 70 Z"
      fill="#6b21a8"
    />
    <path
      d="M70 70 C45 55 30 35 25 15 C38 25 55 45 70 70 Z"
      fill="#7e22ce"
    />

    {/* Center Lotus Flower */}
    {/* Outer Petals */}
    <path
      d="M70 70 C50 45 50 25 70 10 C90 25 90 45 70 70 Z"
      fill="#9333ea"
    />
    {/* Inner Petal Center */}
    <path
      d="M70 70 C60 50 60 35 70 20 C80 35 80 50 70 70 Z"
      fill="#a855f7"
    />
    {/* Golden Stamen Tip */}
    <circle cx="70" cy="18" r="3" fill="#fbbf24" />

    {/* Right flowing leaf */}
    <path
      d="M70 70 C95 55 110 35 115 15 C102 25 85 45 70 70 Z"
      fill="#7e22ce"
    />
    <path
      d="M70 70 C100 65 120 50 130 30 C115 35 95 45 70 70 Z"
      fill="#6b21a8"
    />
  </svg>
);

/**
 * 7. Thai Dok Pracham Yam Pattern for background watermarks
 */
export const ThaiDokPrachamYamPattern: React.FC<{ className?: string }> = ({
  className = 'w-full h-full opacity-10',
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
  >
    <g fill="#f59e0b">
      {/* 4 Point Petals */}
      <path d="M30 16 Q34 23 30 30 Q26 23 30 16 Z" />
      <path d="M30 44 Q34 37 30 30 Q26 37 30 44 Z" />
      <path d="M16 30 Q23 34 30 30 Q23 26 16 30 Z" />
      <path d="M44 30 Q37 34 30 30 Q37 26 44 30 Z" />
      {/* Center point */}
      <circle cx="30" cy="30" r="2.5" fill="#fef08a" />
      {/* Corner mini dots */}
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="50" cy="10" r="1.5" />
      <circle cx="10" cy="50" r="1.5" />
      <circle cx="50" cy="50" r="1.5" />
    </g>
  </svg>
);
