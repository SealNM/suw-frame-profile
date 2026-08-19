import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check, AlertCircle } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (image: HTMLImageElement) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasError, setHasError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  useEffect(() => {
    if (!isOpen) return;

    let currentStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setHasError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 1280 },
          },
          audio: false,
        });
        currentStream = stream;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err: any) {
        console.error('Camera access error:', err);
        setHasError('ไม่สามารถเข้าถึงกล้องถ่ายรูปได้ กรุณาอนุญาตการเข้าถึงกล้องในเบราว์เซอร์');
      }
    };

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  if (!isOpen) return null;

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    const size = Math.min(video.videoWidth || 640, video.videoHeight || 640);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crop center square
    const sx = ((video.videoWidth || size) - size) / 2;
    const sy = ((video.videoHeight || size) - size) / 2;

    if (facingMode === 'user') {
      // Mirror user front camera
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      onCapture(img);
      onClose();
    };
    img.src = canvas.toDataURL('image/png');
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#14082c] border border-purple-800 rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#180a33] border-b border-purple-900">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-['Kanit'] text-amber-400">
              ถ่ายรูปด้วยกล้อง
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative w-full aspect-square bg-[#0a0314] flex items-center justify-center overflow-hidden">
          {hasError ? (
            <div className="p-6 text-center flex flex-col items-center gap-3">
              <AlertCircle className="w-10 h-10 text-rose-500" />
              <p className="text-xs text-purple-200">{hasError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Circular Framing Guide */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[72%] aspect-square rounded-full border-2 border-amber-400/80" />
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#180a33] border-t border-purple-900 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={toggleCamera}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>สลับกล้อง</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!!hasError}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-purple-950 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>ถ่ายรูปทันที</span>
          </button>
        </div>
      </div>
    </div>
  );
};
