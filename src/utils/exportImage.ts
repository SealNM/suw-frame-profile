import { BadgeConfig, ExportSettings, FrameOption, PhotoTransform } from '../types';
import { drawFrame } from './frameRenderer';

/**
 * Generates an ultra high-resolution canvas with user photo and frame overlay
 */
export async function generateCompositeCanvas(
  userImage: HTMLImageElement | null,
  transform: PhotoTransform,
  frame: FrameOption,
  customFrameImg: HTMLImageElement | null,
  badge?: BadgeConfig,
  targetSize: number = 1080
): Promise<HTMLCanvasElement> {

  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d', { alpha: true });

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Ensure frame image is loaded if frame has imageUrl or renderType image
  let activeFrameImg = customFrameImg;
  if (!activeFrameImg && (frame.imageUrl || frame.renderType === 'image')) {
    try {
      activeFrameImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = frame.imageUrl || '/frames/suw-frame.png';
      });
    } catch {
      activeFrameImg = null;
    }
  }

  // Smooth image rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const cx = targetSize / 2;
  const cy = targetSize / 2;

  // Solid white background (vital for clean JPG exports)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // 1. Draw User Photo behind the frame (fills 1:1 square canvas)
  if (userImage) {
    ctx.save();

    // Apply color adjustments
    ctx.filter = `brightness(${transform.brightness}%) contrast(${transform.contrast}%) saturate(${transform.saturation}%)`;

    // Move to center for transformations
    ctx.translate(cx + (transform.x * targetSize) / 500, cy + (transform.y * targetSize) / 500);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(
      transform.scale * (transform.flipH ? -1 : 1),
      transform.scale * (transform.flipV ? -1 : 1)
    );

    // Calculate 1:1 full cover aspect ratio fit
    const imgAspect = userImage.width / userImage.height;
    let drawW = targetSize;
    let drawH = targetSize;

    if (imgAspect > 1) {
      drawW = targetSize * imgAspect;
      drawH = targetSize;
    } else {
      drawW = targetSize;
      drawH = targetSize / imgAspect;
    }

    ctx.drawImage(userImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  }

  // 2. Draw Frame Overlay on top
  drawFrame(ctx, targetSize, targetSize, frame, activeFrameImg, badge);

  return canvas;

}


/**
 * Downloads the exported image to user's device (JPG format, 1080x1080)
 */
export async function downloadExportedImage(
  userImage: HTMLImageElement | null,
  transform: PhotoTransform,
  frame: FrameOption,
  customFrameImg: HTMLImageElement | null,
  badge?: BadgeConfig,
  settings: ExportSettings = {
    size: 1080,
    format: 'jpeg',
    quality: 0.92,
    filename: 'sukhothai-phapa-2569-profile',
  }
): Promise<void> {
  const canvas = await generateCompositeCanvas(
    userImage,
    transform,
    frame,
    customFrameImg,
    badge,
    settings.size || 1080
  );


  return new Promise((resolve, reject) => {
    const isJpeg = settings.format === 'jpeg' || !settings.format;
    const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
    const quality = settings.quality ?? 0.92;
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image blob'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const ext = isJpeg ? 'jpg' : 'png';
        link.download = `${settings.filename || 'sukhothai-phapa-2569-profile'}.${ext}`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      mimeType,
      quality
    );
  });
}


/**
 * Copies the composite image to the user's clipboard
 */
export async function copyImageToClipboard(
  userImage: HTMLImageElement | null,
  transform: PhotoTransform,
  frame: FrameOption,
  customFrameImg: HTMLImageElement | null,
  badge: BadgeConfig
): Promise<boolean> {
  try {
    const canvas = await generateCompositeCanvas(
      userImage,
      transform,
      frame,
      customFrameImg,
      badge,
      1080
    );

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob || !navigator.clipboard || !window.ClipboardItem) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}
