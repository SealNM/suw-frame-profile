import React, { useState } from 'react';
import {
  Sliders,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Sun,
  Contrast,
  Palette,
  Type,
  Maximize2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { BadgeConfig, PhotoTransform } from '../types';

interface PhotoControlsProps {
  transform: PhotoTransform;
  onChangeTransform: (newTransform: PhotoTransform) => void;
  badge: BadgeConfig;
  onChangeBadge: (newBadge: BadgeConfig) => void;
  disabled: boolean;
}

export const PhotoControls: React.FC<PhotoControlsProps> = ({
  transform,
  onChangeTransform,
  badge,
  onChangeBadge,
  disabled,
}) => {
  const [activeTab, setActiveTab] = useState<'transform' | 'filters' | 'badge'>('transform');

  // Rotate 90 degrees
  const handleRotateStep = (degrees: number) => {
    let newRot = (transform.rotation + degrees) % 360;
    if (newRot > 180) newRot -= 360;
    if (newRot < -180) newRot += 360;
    onChangeTransform({ ...transform, rotation: newRot });
  };

  // Flip toggles
  const handleToggleFlipH = () => {
    onChangeTransform({ ...transform, flipH: !transform.flipH });
  };

  const handleToggleFlipV = () => {
    onChangeTransform({ ...transform, flipV: !transform.flipV });
  };

  // Reset Filters
  const handleResetFilters = () => {
    onChangeTransform({
      ...transform,
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
  };

  // Reset Position & Scale
  const handleResetPosition = () => {
    onChangeTransform({
      ...transform,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      flipH: false,
      flipV: false,
    });
  };

  return (
    <div className="w-full bg-[#14082c] border border-purple-900/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-[#0e051e] rounded-xl border border-purple-950">
        <button
          onClick={() => setActiveTab('transform')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'transform'
              ? 'bg-purple-800 text-amber-300 border border-purple-700'
              : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>ปรับขนาด & ทิศทาง</span>
        </button>

        <button
          onClick={() => setActiveTab('filters')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'filters'
              ? 'bg-purple-800 text-amber-300 border border-purple-700'
              : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>แสง & สี</span>
        </button>

        <button
          onClick={() => setActiveTab('badge')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'badge'
              ? 'bg-purple-800 text-amber-300 border border-purple-700'
              : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>ป้ายชื่อข้อความ</span>
        </button>
      </div>

      {disabled && (
        <div className="text-center py-6 text-purple-300/70 text-xs">
          กรุณาอัปโหลดรูปภาพเพื่อเปิดใช้งานเครื่องมือปรับแต่ง
        </div>
      )}

      {!disabled && (
        <>
          {/* TAB 1: Transform / Scale / Rotation */}
          {activeTab === 'transform' && (
            <div className="flex flex-col gap-4">
              {/* Zoom / Scale Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-200">ขนาดรูปภาพ (Zoom)</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {Math.round(transform.scale * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={transform.scale}
                  onChange={(e) =>
                    onChangeTransform({ ...transform, scale: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-purple-950 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>

              {/* Rotation Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-200">หมุนองศา (Rotate)</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {Math.round(transform.rotation)}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={transform.rotation}
                  onChange={(e) =>
                    onChangeTransform({ ...transform, rotation: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-purple-950 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <button
                  onClick={() => handleRotateStep(-90)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="หมุนทวนเข็ม 90 องศา"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>หมุนซ้าย 90°</span>
                </button>

                <button
                  onClick={() => handleRotateStep(90)}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-xs font-semibold transition-colors cursor-pointer"
                  title="หมุนตามเข็ม 90 องศา"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>หมุนขวา 90°</span>
                </button>

                <button
                  onClick={handleToggleFlipH}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    transform.flipH
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-purple-950 hover:bg-purple-900 border-purple-800 text-purple-200'
                  }`}
                  title="กลับด้านแนวนอน"
                >
                  <FlipHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>พลิกซ้าย-ขวา</span>
                </button>

                <button
                  onClick={handleToggleFlipV}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    transform.flipV
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-purple-950 hover:bg-purple-900 border-purple-800 text-purple-200'
                  }`}
                  title="กลับด้านแนวตั้ง"
                >
                  <FlipVertical className="w-3.5 h-3.5 text-amber-400" />
                  <span>พลิกบน-ล่าง</span>
                </button>
              </div>

              {/* Reset Positioning button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleResetPosition}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>คืนค่าตำแหน่งและขนาดเริ่มต้น</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Filters / Color & Lighting */}
          {activeTab === 'filters' && (
            <div className="flex flex-col gap-4">
              {/* Brightness */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-200 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> ความสว่าง (Brightness)
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    {transform.brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="160"
                  step="1"
                  value={transform.brightness}
                  onChange={(e) =>
                    onChangeTransform({ ...transform, brightness: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-purple-950 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>

              {/* Contrast */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-200 flex items-center gap-1.5">
                    <Contrast className="w-3.5 h-3.5 text-amber-400" /> ความคมชัด (Contrast)
                  </span>
                  <span className="text-amber-400 font-mono font-bold">{transform.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="160"
                  step="1"
                  value={transform.contrast}
                  onChange={(e) =>
                    onChangeTransform({ ...transform, contrast: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-purple-950 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>

              {/* Saturation */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-purple-200 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" /> ความอิ่มตัวสี (Saturation)
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    {transform.saturation}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="2"
                  value={transform.saturation}
                  onChange={(e) =>
                    onChangeTransform({ ...transform, saturation: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-purple-950 rounded-lg cursor-pointer accent-amber-500"
                />
              </div>

              {/* Quick Tone presets */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() =>
                    onChangeTransform({ ...transform, brightness: 105, contrast: 110, saturation: 110 })
                  }
                  className="py-1.5 px-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-[11px] font-medium text-purple-200 transition-colors cursor-pointer text-center"
                >
                  ภาพสว่างสดใส
                </button>
                <button
                  onClick={() =>
                    onChangeTransform({ ...transform, brightness: 100, contrast: 120, saturation: 100 })
                  }
                  className="py-1.5 px-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-[11px] font-medium text-purple-200 transition-colors cursor-pointer text-center"
                >
                  คมชัดเข้มข้น
                </button>
                <button
                  onClick={() =>
                    onChangeTransform({ ...transform, brightness: 100, contrast: 100, saturation: 0 })
                  }
                  className="py-1.5 px-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-[11px] font-medium text-purple-200 transition-colors cursor-pointer text-center"
                >
                  โทนขาวดำ
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>คืนค่าแสงและสีเริ่มต้น</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Custom Name / Role Badge */}
          {activeTab === 'badge' && (
            <div className="flex flex-col gap-3.5">
              {/* Badge Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-purple-950/80 border border-purple-800 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-purple-100">
                      แสดงป้ายชื่อ / ตำแหน่ง
                    </div>
                    <div className="text-[11px] text-purple-300/80">
                      เพิ่มชื่อและรุ่นบนกรอบรูปโปรไฟล์
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={badge.enabled}
                  onChange={(e) => onChangeBadge({ ...badge, enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 bg-purple-900 border-purple-700 focus:ring-0 cursor-pointer accent-amber-500"
                />
              </label>

              {badge.enabled && (
                <div className="flex flex-col gap-3 pt-1">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-purple-200">
                      ชื่อ-นามสกุล หรือข้อความหลัก
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น นายณรงค์ศักดิ์ สุขใจ"
                      value={badge.name}
                      onChange={(e) => onChangeBadge({ ...badge, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0e051e] border border-purple-700 text-sm text-purple-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Role / Subtitle Input */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-purple-200">
                      รุ่น / หน่วยงาน / ข้อความรอง (ถ้ามี)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ศิษย์เก่า ส.ท. รุ่น 45 หรือ ร่วมทำบุญเจ้าภาพ"
                      value={badge.role}
                      onChange={(e) => onChangeBadge({ ...badge, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0e051e] border border-purple-700 text-sm text-purple-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Preset quick title buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onChangeBadge({ ...badge, role: 'ศิษย์เก่าสุโขทัยวิทยาคม' })}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 border border-purple-700 text-purple-200 transition-colors cursor-pointer"
                    >
                      ศิษย์เก่าสุโขทัยวิทยาคม
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeBadge({ ...badge, role: 'ร่วมเป็นเจ้าภาพทอดผ้าป่า' })}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 border border-purple-700 text-purple-200 transition-colors cursor-pointer"
                    >
                      ร่วมเป็นเจ้าภาพ
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeBadge({ ...badge, role: 'คณะครูและบุคลากร' })}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 border border-purple-700 text-purple-200 transition-colors cursor-pointer"
                    >
                      คณะครูและบุคลากร
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
