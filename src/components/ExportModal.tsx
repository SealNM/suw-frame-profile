import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  Layers,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import { BadgeConfig, FrameOption, PhotoTransform } from '../types';
import {
  copyImageToClipboard,
  downloadExportedImage,
  generateCompositeCanvas,
} from '../utils/exportImage';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userImage: HTMLImageElement | null;
  transform: PhotoTransform;
  frame: FrameOption;
  customFrameImg: HTMLImageElement | null;
  badge: BadgeConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  userImage,
  transform,
  frame,
  customFrameImg,
  badge,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(2048);
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg'>('png');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Generate preview when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const generatePreview = async () => {
      try {
        const canvas = await generateCompositeCanvas(
          userImage,
          transform,
          frame,
          customFrameImg,
          badge,
          800
        );
        if (isMounted) {
          setPreviewUrl(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        console.error('Error generating export preview:', err);
      }
    };

    generatePreview();
    return () => {
      isMounted = false;
    };
  }, [isOpen, userImage, transform, frame, customFrameImg, badge]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await downloadExportedImage(userImage, transform, frame, customFrameImg, badge, {
        size: selectedSize,
        format: selectedFormat,
        quality: 0.98,
        filename: 'sukhothai-phapa-2569-profile',
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    const success = await copyImageToClipboard(
      userImage,
      transform,
      frame,
      customFrameImg,
      badge
    );
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share && previewUrl) {
      try {
        const canvas = await generateCompositeCanvas(
          userImage,
          transform,
          frame,
          customFrameImg,
          badge,
          1080
        );
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'sukhothai-phapa-profile.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'รูปโปรไฟล์ผ้าป่าสามัคคี โรงเรียนสุโขทัยวิทยาคม',
              text: 'ขอเชิญร่วมเป็นเจ้าภาพทอดผ้าป่าสามัคคีเพื่อการศึกษา 9 กันยายน 2569',
              files: [file],
            });
          }
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#14082c] border border-purple-800 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#180a33] border-b border-purple-900">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold font-['Kanit'] text-amber-400">
              ส่งออกรูปภาพโปรไฟล์ความละเอียดสูง
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Left: Preview */}
          <div className="flex flex-col items-center gap-2 w-full md:w-1/2 shrink-0">
            <div className="w-64 h-64 sm:w-72 sm:h-72 aspect-square rounded-2xl bg-[#0e051e] border-2 border-purple-800 flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Export Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-xs text-purple-400">กำลังประมวลผลตัวอย่าง...</div>
              )}
            </div>
            <span className="text-[11px] text-purple-300/80">
              ตัวอย่างก่อนบันทึกจริง ({selectedSize} x {selectedSize} px)
            </span>
          </div>

          {/* Right: Settings & Actions */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            {/* Resolution Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-purple-200">
                เลือกขนาดความละเอียดไฟล์:
              </label>
              <div className="flex flex-col gap-2">
                {[
                  {
                    size: 1080,
                    label: '1080 x 1080 px (Full HD)',
                    sub: 'เหมาะสำหรับ Facebook, Line, IG Profile',
                  },
                  {
                    size: 2048,
                    label: '2048 x 2048 px (2K Ultra HD)',
                    sub: 'คมชัดสูงพิเศษ ไร้รอยหยัก แนะนำสำหรับการใช้งานทั่วไป',
                    recommended: true,
                  },
                  {
                    size: 4000,
                    label: '4000 x 4000 px (4K Master)',
                    sub: 'ความละเอียดสูงสุดสำหรับการพิมพ์หรือป้ายไวนิล',
                  },
                ].map((item) => {
                  const isSelected = selectedSize === item.size;
                  return (
                    <button
                      key={item.size}
                      onClick={() => setSelectedSize(item.size)}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer flex flex-col ${
                        isSelected
                          ? 'bg-purple-900 border-amber-500 ring-1 ring-amber-500/50'
                          : 'bg-[#0f0622] hover:bg-purple-950 border-purple-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-100">
                          {item.label}
                        </span>
                        {item.recommended && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            แนะนำ
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-purple-300/80 mt-0.5">
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Format Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-purple-200">รูปแบบไฟล์:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedFormat('png')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    selectedFormat === 'png'
                      ? 'bg-purple-900 border-amber-500 text-amber-300'
                      : 'bg-[#0f0622] hover:bg-purple-950 border-purple-900 text-purple-200'
                  }`}
                >
                  PNG (คมชัดไร้การบีบอัด)
                </button>
                <button
                  onClick={() => setSelectedFormat('jpeg')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    selectedFormat === 'jpeg'
                      ? 'bg-purple-900 border-amber-500 text-amber-300'
                      : 'bg-[#0f0622] hover:bg-purple-950 border-purple-900 text-purple-200'
                  }`}
                >
                  JPG (ขนาดไฟล์กะทัดรัด)
                </button>
              </div>
            </div>

            {/* Quick Action buttons (Copy / Share) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCopyClipboard}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-xs font-medium transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-semibold">คัดลอกรูปแล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>คัดลอกภาพ</span>
                  </>
                )}
              </button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>แชร์ไปยังแอป</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#180a33] border-t border-purple-900 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-700 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
          >
            {isExporting ? (
              <span>กำลังสร้างไฟล์ความละเอียดสูง...</span>
            ) : downloadSuccess ? (
              <>
                <FileCheck className="w-4 h-4 text-slate-950" />
                <span>ดาวน์โหลดเสร็จสมบูรณ์!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดรูปภาพ ({selectedSize}px)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
