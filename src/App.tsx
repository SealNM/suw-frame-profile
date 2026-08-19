import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Crop,
  Sparkles,
} from 'lucide-react';
import { BadgeConfig, PhotoTransform } from './types';
import { DEFAULT_FRAMES } from './data/frames';
import { Header } from './components/Header';
import { FrameCanvas } from './components/FrameCanvas';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { EventInfoModal } from './components/EventInfoModal';
import {
  ThaiKanokDivider,
  ThaiEducationBookIcon,
  ThaiTempleIcon,
  ThaiLotusBouquetIcon,
} from './components/ThaiIcons';
import { downloadExportedImage } from './utils/exportImage';

export default function App() {
  // 1. User Photo State (null initially to show the sleek mockup avatar silhouette)
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
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

  // 2. Official Single Frame
  const officialFrame = DEFAULT_FRAMES[0];

  // 3. UI states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // File input ref
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle user photo file selection with automatic centering and scale
  const handlePhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.crossOrigin = 'anonymous';
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
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFile(e.target.files[0]);
    }
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
  };

  // 1-Click Instant High Resolution Download (2048x2048 Ultra HD)
  const handleInstantDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadExportedImage(
        userImage,
        photoTransform,
        officialFrame,
        null,
        undefined,
        {
          size: 2048,
          format: 'png',
          quality: 1,
          filename: 'sukhothai-phapa-2569-profile',
        }
      );
      setDownloadSuccess(true);
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
      className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-purple-600 selection:text-white font-['Prompt',sans-serif]"
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={photoFileInputRef}
        onChange={handlePhotoInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* 1. Header with Royal Purple Background, Thai School Logo & Sukhothai Chedi */}
      <Header onOpenEventInfo={() => setIsEventInfoOpen(true)} />

      {/* 2. Main Two-Column Content Layout (Matching User Mockup) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Title, Thai Ornament & Upload Card */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold font-['Kanit'] text-[#2b0c5e] tracking-tight leading-tight">
              ผ้าป่าสามัคคีเพื่อการศึกษา
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              ขอเชิญร่วมเป็นเจ้าภาพ สร้างโอกาสทางการศึกษา สร้างอนาคตที่ยั่งยืน
            </p>

            {/* Thai Golden Kanok Center Divider */}
            <div className="py-1">
              <ThaiKanokDivider className="w-40 h-6 text-amber-500" />
            </div>

            {/* Upload Box Card */}
            <div
              onClick={() => photoFileInputRef.current?.click()}
              className="mt-2 w-full border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-3xl p-6 sm:p-7 bg-[#fcfbfe] hover:bg-[#faf7fd] text-center flex flex-col items-center justify-center cursor-pointer transition-colors group"
            >
              {/* Purple Circle Cloud Icon */}
              <div className="w-14 h-14 rounded-full bg-[#4c1d95] group-hover:bg-[#3b1278] text-white flex items-center justify-center mb-3 transition-colors">
                <Upload className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold font-['Kanit'] text-[#2b0c5e] mb-1">
                อัปโหลดรูป ใส่กรอบโปรไฟล์
              </h3>

              {/* Format Hint */}
              <p className="text-xs text-slate-400 mb-4">
                ไฟล์ JPG, PNG (ขนาดไม่เกิน 10MB)
              </p>

              {/* Select Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  photoFileInputRef.current?.click();
                }}
                className="w-full py-3 px-6 rounded-2xl bg-[#4c1d95] hover:bg-[#3b1278] text-white font-bold font-['Kanit'] text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-white" />
                <span>เลือกไฟล์รูปภาพ</span>
              </button>
            </div>

            {/* Auto-Fit Information Box */}
            <div className="w-full bg-[#f3edf8] border border-purple-100 rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-200/70 text-[#4c1d95] flex items-center justify-center shrink-0">
                <Crop className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold font-['Kanit'] text-[#2b0c5e]">
                  ปรับอัตโนมัติให้พอดีกับกรอบ
                </div>
                <p className="text-xs text-slate-500">
                  คุณสามารถขยับหรือซูมรูปเล็กน้อยได้ในกรอบ
                </p>
              </div>
            </div>

            {/* Quick Camera Option Button */}
            <button
              onClick={() => setIsCameraOpen(true)}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#4c1d95] text-xs font-semibold font-['Kanit'] transition-colors cursor-pointer w-full mt-1"
            >
              <Camera className="w-4 h-4" />
              <span>หรือเปิดกล้องถ่ายภาพของคุณ</span>
            </button>
          </div>

          {/* Right Column: Profile Frame Preview & Instant High-Res Download Button */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Header: ตัวอย่างกรอบโปรไฟล์ */}
            <h3 className="text-sm sm:text-base font-bold font-['Kanit'] text-[#2b0c5e] mb-2.5 text-center">
              ตัวอย่างกรอบโปรไฟล์
            </h3>

            {/* Frame Container Card */}
            <div className="w-full bg-[#f4f2f6] border border-slate-200/80 rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center">
              <FrameCanvas
                userImage={userImage}
                transform={photoTransform}
                onTransformChange={setPhotoTransform}
                selectedFrame={officialFrame}
                onUploadClick={() => photoFileInputRef.current?.click()}
                onCameraClick={() => setIsCameraOpen(true)}
              />
            </div>

            {/* High-Resolution Download Button */}
            <button
              onClick={handleInstantDownload}
              disabled={isDownloading}
              className={`w-full mt-3.5 py-3.5 sm:py-4 px-6 rounded-2xl font-bold font-['Kanit'] text-base sm:text-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#4c1d95] hover:bg-[#3b1278] text-white disabled:bg-purple-300'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span>ดาวน์โหลดรูปภาพสำเร็จแล้ว!</span>
                </>
              ) : isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>กำลังสร้างรูปภาพความละเอียดสูง...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-white" />
                  <span>ดาวน์โหลดภาพความละเอียดสูง</span>
                </>
              )}
            </button>

            {/* Subtext below download button */}
            <p className="text-xs text-slate-500 font-medium text-center mt-2">
              PNG ความละเอียดสูง พร้อมใช้งานทันที
            </p>
          </div>
        </div>

        {/* 3. Bottom 3-Column Thai Ornaments & Education Purpose Cards */}
        <section className="w-full border border-amber-400 rounded-2xl p-5 sm:p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-purple-100 mt-2">
          {/* Card 1: ร่วมสร้างโอกาสทางการศึกษา */}
          <div className="flex items-start gap-4 pt-2 md:pt-0">
            <ThaiEducationBookIcon className="w-14 h-14 shrink-0 text-amber-600" />
            <div className="flex flex-col">
              <h4 className="text-sm font-bold font-['Kanit'] text-[#2b0c5e] mb-1">
                ร่วมสร้างโอกาสทางการศึกษา
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                รายได้จากผ้าป่าสามัคคี นำไปพัฒนาการเรียนรู้ ปรับปรุงสื่อการศึกษา และส่งเสริมกิจกรรมของนักเรียน เพื่ออนาคตที่ดีของเยาวชน
              </p>
            </div>
          </div>

          {/* Card 2: ร่วมทำบุญ ร่วมสร้างอนาคต */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
            <ThaiTempleIcon className="w-14 h-14 shrink-0 text-[#4c1d95]" />
            <div className="flex flex-col">
              <h4 className="text-sm font-bold font-['Kanit'] text-[#2b0c5e] mb-1">
                ร่วมทำบุญ ร่วมสร้างอนาคต
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ทุกการร่วมสมทบทุน คือพลังแห่งความดี เพื่อเด็ก ๆ และโรงเรียนของเรา
              </p>
            </div>
          </div>

          {/* Card 3: Thai Lotus Bouquet Ornament */}
          <div className="flex items-center justify-center pt-4 md:pt-0 md:pl-6">
            <ThaiLotusBouquetIcon className="w-28 h-16 text-[#6b21a8]" />
          </div>
        </section>
      </main>

      {/* Modals for Camera and Event Info */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <EventInfoModal
        isOpen={isEventInfoOpen}
        onClose={() => setIsEventInfoOpen(false)}
      />
    </div>
  );
}
