import React, { useRef } from 'react';
import { Layers, Check, Upload, Sparkles, Shield, Crown, FileImage } from 'lucide-react';
import { FrameOption } from '../types';

interface FrameSelectorProps {
  frames: FrameOption[];
  selectedFrame: FrameOption;
  onSelectFrame: (frame: FrameOption) => void;
  onUploadCustomFrame: (file: File) => void;
  hasCustomFrame: boolean;
}

export const FrameSelector: React.FC<FrameSelectorProps> = ({
  frames,
  selectedFrame,
  onSelectFrame,
  onUploadCustomFrame,
  hasCustomFrame,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCustomFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadCustomFrame(e.target.files[0]);
    }
  };

  return (
    <div className="w-full bg-[#14082c] border border-purple-900/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm sm:text-base font-bold font-['Kanit'] text-amber-400">
            เลือกแบบกรอบรูปโปรไฟล์
          </h2>
        </div>
        <span className="text-xs text-purple-300">
          {frames.length + (hasCustomFrame ? 1 : 0)} รูปแบบ
        </span>
      </div>

      {/* Frame Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {frames.map((frame) => {
          const isSelected = selectedFrame.id === frame.id;
          return (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(frame)}
              className={`flex flex-col p-3 rounded-xl border text-left transition-colors cursor-pointer relative ${
                isSelected
                  ? 'bg-purple-900/90 border-amber-500 ring-2 ring-amber-500/40'
                  : 'bg-[#0f0622] hover:bg-purple-950/70 border-purple-900/70 hover:border-purple-700'
              }`}
            >
              {/* Checkmark indicator */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-400 shrink-0">
                  {frame.id === 'sukhothai-official' && <Crown className="w-4 h-4" />}
                  {frame.id === 'sukhothai-clean-gold' && <Sparkles className="w-4 h-4" />}
                  {frame.id === 'sukhothai-alumni' && <Shield className="w-4 h-4" />}
                  {frame.id === 'sukhothai-tax-donation' && <Layers className="w-4 h-4" />}
                  {frame.id === 'sukhothai-kanok-luxury' && <Sparkles className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-purple-100 line-clamp-1">
                    {frame.name}
                  </div>
                  <span className="text-[10px] text-amber-400 font-medium">
                    {frame.category === 'official'
                      ? 'แบบทางการ'
                      : frame.category === 'gold'
                      ? 'ธีมทองคำมงคล'
                      : 'เกียรติยศศิษย์เก่า'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-purple-300/80 line-clamp-2 leading-relaxed">
                {frame.description}
              </p>
            </button>
          );
        })}

        {/* Custom PNG Frame Upload Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col p-3 rounded-xl border border-dashed text-left transition-colors cursor-pointer relative ${
            selectedFrame.id === 'custom-uploaded-frame'
              ? 'bg-purple-900/90 border-amber-500 ring-2 ring-amber-500/40'
              : 'bg-[#0f0622] hover:bg-purple-950/70 border-purple-800 hover:border-amber-500/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomFileChange}
            accept="image/png,image/webp"
            className="hidden"
          />

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-amber-400 shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-300">
                {hasCustomFrame ? 'กรอบรูปที่คุณอัปโหลด' : 'อัปโหลดกรอบรูป PNG เอง'}
              </div>
              <span className="text-[10px] text-purple-300 font-medium">
                {hasCustomFrame ? 'คลิกเพื่อเปลี่ยนไฟล์' : 'ไฟล์ PNG โปร่งใส'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-purple-300/80 line-clamp-2 leading-relaxed">
            {hasCustomFrame
              ? 'ใช้งานกรอบรูปที่อัปโหลดเข้าสู่ระบบ'
              : 'นำเข้ากรอบรูป PNG โปร่งใสเพื่อใส่รูปโปรไฟล์'}
          </p>
        </div>
      </div>
    </div>
  );
};
