import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Upload,
  Camera,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  Move,
  FlipHorizontal,
  Download,
} from 'lucide-react';
import { BadgeConfig, FrameOption, PhotoTransform } from '../types';
import { drawFrame, drawDefaultSilhouette } from '../utils/frameRenderer';

interface FrameCanvasProps {
  userImage: HTMLImageElement | null;
  transform: PhotoTransform;
  onTransformChange: (newTransform: PhotoTransform) => void;
  selectedFrame: FrameOption;
  customFrameImg?: HTMLImageElement | null;
  badge?: BadgeConfig;
  onUploadClick: () => void;
  onCameraClick: () => void;
  onDownloadClick?: () => void;
  isDownloading?: boolean;
}

export const FrameCanvas: React.FC<FrameCanvasProps> = ({
  userImage,
  transform,
  onTransformChange,
  selectedFrame,
  customFrameImg = null,
  badge,
  onUploadClick,
  onCameraClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialTransform, setInitialTransform] = useState<PhotoTransform>(transform);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  // Redraw canvas whenever photo or transform changes
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const displaySize = 1200; // Crisp high-DPI internal buffer
    if (canvas.width !== displaySize || canvas.height !== displaySize) {
      canvas.width = displaySize;
      canvas.height = displaySize;
    }

    ctx.clearRect(0, 0, displaySize, displaySize);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const cx = displaySize / 2;
    const cy = displaySize / 2;
    const apertureR = displaySize * 0.442; // Precise inner opening radius of the official frame

    // 1. Draw User Photo behind the frame (fills 1:1 square canvas)
    if (userImage) {
      ctx.save();
      // Clean white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, displaySize, displaySize);

      // Filters
      ctx.filter = `brightness(${transform.brightness}%) contrast(${transform.contrast}%) saturate(${transform.saturation}%)`;

      // Transformations
      ctx.translate(cx + (transform.x * displaySize) / 500, cy + (transform.y * displaySize) / 500);
      ctx.rotate((transform.rotation * Math.PI) / 180);
      ctx.scale(
        transform.scale * (transform.flipH ? -1 : 1),
        transform.scale * (transform.flipV ? -1 : 1)
      );

      // 1:1 cover sizing (fills entire square frame area)
      const imgAspect = userImage.width / userImage.height;
      let drawW = displaySize;
      let drawH = displaySize;
      if (imgAspect > 1) {
        drawW = displaySize * imgAspect;
        drawH = displaySize;
      } else {
        drawW = displaySize;
        drawH = displaySize / imgAspect;
      }

      ctx.drawImage(userImage, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      // Default sleek silhouette placeholder as shown in mockup
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, displaySize, displaySize);
      drawDefaultSilhouette(ctx, cx, cy, apertureR * 0.85);
    }

    // 2. Draw Frame Overlay ON TOP of user photo
    drawFrame(ctx, displaySize, displaySize, selectedFrame, customFrameImg, badge);
  }, [userImage, transform, selectedFrame, customFrameImg, badge]);



  useEffect(() => {
    let animationFrameId: number;
    animationFrameId = requestAnimationFrame(renderCanvas);
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderCanvas]);

  // Mouse handlers for dragging photo
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialTransform(transform);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    onTransformChange({
      ...initialTransform,
      x: initialTransform.x + dx,
      y: initialTransform.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel to zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    const newScale = Math.min(3.0, Math.max(0.5, transform.scale * zoomFactor));
    onTransformChange({
      ...transform,
      scale: Number(newScale.toFixed(2)),
    });
  };

  // Touch gestures for mobile (prevents page scrolling when dragging on mobile)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setInitialTransform(transform);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
      setInitialTransform(transform);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStart.x;
      const dy = e.touches[0].clientY - dragStart.y;
      onTransformChange({
        ...initialTransform,
        x: initialTransform.x + dx,
        y: initialTransform.y + dy,
      });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleRatio = currentDist / touchDistance;
      const newScale = Math.min(3.0, Math.max(0.5, initialTransform.scale * scaleRatio));
      onTransformChange({
        ...initialTransform,
        scale: Number(newScale.toFixed(2)),
      });
    }
  };


  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  const handleZoom = (delta: number) => {
    if (!userImage) return;
    const newScale = Math.min(3.0, Math.max(0.5, transform.scale + delta));
    onTransformChange({
      ...transform,
      scale: Number(newScale.toFixed(2)),
    });
  };

  const handleRotate90 = () => {
    if (!userImage) return;
    let newRot = (transform.rotation + 90) % 360;
    if (newRot > 180) newRot -= 360;
    onTransformChange({
      ...transform,
      rotation: newRot,
    });
  };

  const handleFlipHorizontal = () => {
    if (!userImage) return;
    onTransformChange({
      ...transform,
      flipH: !transform.flipH,
    });
  };

  const handleResetPosition = () => {
    if (!userImage) return;
    onTransformChange({
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
    <div className="flex flex-col items-center w-full">
      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-[430px] mx-auto select-none flex items-center justify-center touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`w-full h-full object-contain touch-none ${
            userImage ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (!userImage) onUploadClick();
          }}
        />


        {/* Drag Helper Tip when user has photo */}
        {userImage && (
          <div className="absolute top-2 left-2 bg-[#20074f]/90 border border-purple-400/40 px-2 py-0.5 rounded-lg text-[10px] text-purple-100 flex items-center gap-1 pointer-events-none">
            <Move className="w-3 h-3 text-amber-400" />
            <span>ลากเพื่อเลื่อนตำแหน่ง</span>
          </div>
        )}
      </div>

      {/* Minimal Adjustments Toolbar (only shown when user photo is loaded) */}
      {userImage && (
        <div className="w-full max-w-[430px] mt-2 bg-white border border-purple-100 rounded-xl p-2 flex items-center justify-between gap-1.5 flex-wrap">
          {/* Zoom */}
          <div className="flex items-center gap-1 bg-[#f3edf8] px-2 py-0.5 rounded-lg">
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-1 text-[#4c1d95] hover:text-amber-600 transition-colors cursor-pointer"
              title="ย่อรูป"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono font-bold text-[#4c1d95] px-1 min-w-[38px] text-center">
              {Math.round(transform.scale * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              className="p-1 text-[#4c1d95] hover:text-amber-600 transition-colors cursor-pointer"
              title="ขยายรูป"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rotate / Flip / Center */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleRotate90}
              className="p-1.5 rounded-lg bg-[#f3edf8] text-[#4c1d95] hover:bg-purple-100 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
              title="หมุน 90 องศา"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="text-[11px]">หมุน</span>
            </button>

            <button
              onClick={handleFlipHorizontal}
              className="p-1.5 rounded-lg bg-[#f3edf8] text-[#4c1d95] hover:bg-purple-100 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
              title="พลิกซ้าย-ขวา"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span className="text-[11px]">พลิก</span>
            </button>

            <button
              onClick={handleResetPosition}
              className="p-1.5 rounded-lg bg-[#f3edf8] text-[#4c1d95] hover:bg-purple-100 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
              title="จัดกึ่งกลาง"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">กึ่งกลาง</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
