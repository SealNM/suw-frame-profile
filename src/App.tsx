import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Camera,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Crop,
  Sparkles,
} from 'lucide-react';
import { PhotoTransform } from './types';
import { DEFAULT_FRAMES } from './data/frames';
import { Header } from './components/Header';
import { FrameCanvas } from './components/FrameCanvas';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { InvitationSection } from './components/InvitationSection';
import { ThaiKanokDivider } from './components/ThaiIcons';
import { downloadExportedImage } from './utils/exportImage';
import { triggerGoldConfetti } from './utils/confetti';

export default function App() {
  // 1. User Photo State (null initially to show the sleek mockup avatar silhouette)
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    flipH: false,
    flipV: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  // Pre-load the official user uploaded frame (/frames/suw-frame.png)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setFrameImage(img);
    };
    img.src = '/frames/suw-frame.png';
  }, []);

  // 2. Official Single Frame
  const officialFrame = DEFAULT_FRAMES[0];

  // 3. UI states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Refs
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);
  const frameSectionRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll to frame preview on mobile/desktop
  const scrollToFrameSection = () => {
    setTimeout(() => {
      if (frameSectionRef.current) {
        frameSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 200);
  };

  // Handle user photo file selection with automatic centering and scale
  const handlePhotoFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|bmp|gif|heic|heif)$/i)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) return;
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        // Automatically reset to centered position & default scale
        setPhotoTransform({
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          flipH: false,
          flipV: false,
          brightness: 100,
          contrast: 100,
          saturation: 100,
        });
        setDownloadSuccess(false);
        // Smoothly scroll down to frame preview
        scrollToFrameSection();
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFile(e.target.files[0]);
    }
    // Reset file input value so selecting the same file again triggers onChange
    e.target.value = '';
  };

  // Handle camera captured image
  const handleCameraCapture = (capturedImg: HTMLImageElement) => {
    setUserImage(capturedImg);
    setPhotoTransform({
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      flipH: false,
      flipV: false,
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
    setDownloadSuccess(false);
    scrollToFrameSection();
  };

  // 1-Click Instant High Resolution Download (JPG format 1080x1080)
  const handleInstantDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadExportedImage(
        userImage,
        photoTransform,
        officialFrame,
        frameImage,
        undefined,
        {
          size: 1080,
          format: 'jpeg',
          quality: 0.92,
          filename: 'sukhothai-phapa-2569-profile',
        }
      );
      setDownloadSuccess(true);
      triggerGoldConfetti();
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };


  // Drag and drop image
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="min-h-screen flex flex-col bg-[#faf8fc] text-slate-900 selection:bg-purple-600 selection:text-white font-['Prompt',sans-serif]"
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={photoFileInputRef}
        onChange={handlePhotoInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* 1. Header with Royal Purple Background, Thai School Logo & Sukhothai Arch Sparkles */}
      <Header />

      {/* 2. Main Two-Column Content Layout */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 flex flex-col gap-5 sm:gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column: Title, Thai Ornament & Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 flex flex-col gap-2 sm:gap-3 text-center lg:text-left items-center lg:items-start"
          >
            {/* Main Heading */}
            <h2 className="text-xl sm:text-3xl font-bold font-['Kanit'] text-[#2b0c5e] tracking-tight leading-tight">
              ผ้าป่าสามัคคีเพื่อการศึกษา
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              ขอเชิญร่วมเป็นเจ้าภาพ สร้างโอกาสทางการศึกษา สร้างอนาคตที่ยั่งยืน
            </p>

            {/* Thai Golden Kanok Center Divider */}
            <div className="py-0.5 sm:py-1 flex items-center justify-center lg:justify-start gap-2">
              <ThaiKanokDivider className="w-28 sm:w-36 h-5 sm:h-6 text-amber-500" />
            </div>

            {/* Upload Box Card - Streamlined on Mobile */}
            <motion.div
              whileHover={{ scale: 1.012 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => photoFileInputRef.current?.click()}
              className="mt-1 sm:mt-2 w-full border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-white hover:bg-[#fcfbfe] text-center flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs hover:shadow-md group relative overflow-hidden"
            >
              {/* Purple Circle Cloud Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#4c1d95] group-hover:bg-[#3b1278] text-white flex items-center justify-center mb-2 sm:mb-3 transition-colors shadow-md shadow-purple-900/20"
              >
                <Upload className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>

              {/* Title */}
              <h3 className="text-sm sm:text-lg font-bold font-['Kanit'] text-[#2b0c5e] mb-0.5 sm:mb-1">
                อัปโหลดรูป ใส่กรอบโปรไฟล์
              </h3>

              {/* Format Hint */}
              <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4">
                ไฟล์ JPG, PNG (ปรับขนาดให้พอดีอัตโนมัติ)
              </p>

              {/* Action Buttons: Choose File & Camera */}
              <div className="w-full flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    photoFileInputRef.current?.click();
                  }}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-[#4c1d95] hover:bg-[#3b1278] text-white font-bold font-['Kanit'] text-xs sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <ImageIcon className="w-4 h-4 text-white" />
                  <span>เลือกรูปภาพ</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCameraOpen(true);
                  }}
                  className="py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#4c1d95] font-semibold font-['Kanit'] text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-purple-200"
                >
                  <Camera className="w-4 h-4" />
                  <span>ถ่ายภาพ</span>
                </button>
              </div>
            </motion.div>

            {/* Auto-Fit Information Box - Shown on Tablet/Desktop, Hidden on small screens to reduce clutter */}
            <div className="hidden sm:flex w-full bg-[#f3edf8] border border-purple-100 rounded-2xl p-3.5 items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-200/70 text-[#4c1d95] flex items-center justify-center shrink-0">
                <Crop className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold font-['Kanit'] text-[#2b0c5e]">
                  จัดตำแหน่งและขนาดอัตโนมัติ
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  ใช้นิ้วแตะลาก ขยับ หรือหมุนรูปภาพในกรอบได้ตามต้องการ
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Frame Preview & Instant High-Res Download Button */}
          <motion.div
            ref={frameSectionRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col items-center scroll-mt-4 w-full"
          >
            {/* Header: ตัวอย่างกรอบโปรไฟล์ */}
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <h3 className="text-sm sm:text-base font-bold font-['Kanit'] text-[#2b0c5e] flex items-center gap-1.5">
                <span>ตัวอย่างกรอบโปรไฟล์</span>
                {userImage && (
                  <span className="text-[10px] sm:text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    พร้อมส่งออก
                  </span>
                )}
              </h3>

              {userImage && (
                <button
                  onClick={() => photoFileInputRef.current?.click()}
                  className="text-xs text-[#4c1d95] hover:text-[#3b1278] font-medium underline cursor-pointer"
                >
                  เปลี่ยนรูปใหม่
                </button>
              )}
            </div>

            {/* Frame Container Card - Clean, Premium, Minimal Border */}
            <div className="w-full bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-2.5 sm:p-6 flex flex-col items-center justify-center shadow-xs relative">
              <FrameCanvas
                userImage={userImage}
                transform={photoTransform}
                onTransformChange={setPhotoTransform}
                selectedFrame={officialFrame}
                customFrameImg={frameImage}
                onUploadClick={() => photoFileInputRef.current?.click()}
                onCameraClick={() => setIsCameraOpen(true)}
              />
            </div>

            {/* High-Resolution Download Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={handleInstantDownload}
              disabled={isDownloading}
              className={`w-full mt-3 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold font-['Kanit'] text-sm sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                downloadSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
                  : 'bg-[#4c1d95] hover:bg-[#3b1278] text-white disabled:bg-purple-300 shadow-purple-900/25'
              }`}
            >
              <AnimatePresence mode="wait">
                {downloadSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>ดาวน์โหลดรูปภาพสำเร็จแล้ว!</span>
                  </motion.div>
                ) : isDownloading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>กำลังสร้างรูปภาพความละเอียดสูง...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-5 h-5 text-white" />
                    <span>ดาวน์โหลดรูปภาพ (JPG)</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Subtext below download button */}
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium text-center mt-1.5 sm:mt-2">
              ไฟล์ JPG ความคมชัดสูง 1080×1080 พร้อมตั้งเป็นรูปโปรไฟล์ทันที
            </p>
          </motion.div>
        </div>

        {/* 3. Bottom Thai Invitation & Educational Purpose Section */}
        <InvitationSection />
      </main>

      {/* Modals for Camera */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
}



