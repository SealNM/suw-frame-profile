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
  badge: BadgeConfig,
  targetSize: number = 2048
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d', { alpha: true });

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Smooth image rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const cx = targetSize / 2;
  const cy = targetSize / 2;
  const innerR = targetSize * 0.355; // circular cutout radius

  // 1. Draw User Photo (if available)
  if (userImage) {
    ctx.save();

    // Clip to circle so photo doesn't spill out
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.clip();

    // Background behind photo (clean neutral)
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();

    // Apply color adjustments
    ctx.filter = `brightness(${transform.brightness}%) contrast(${transform.contrast}%) saturate(${transform.saturation}%)`;

    // Move to center for transformations
    ctx.translate(cx + (transform.x * targetSize) / 500, cy + (transform.y * targetSize) / 500);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(
      transform.scale * (transform.flipH ? -1 : 1),
      transform.scale * (transform.flipV ? -1 : 1)
    );

    // Calculate aspect ratio fit
    const imgAspect = userImage.width / userImage.height;
    let drawW = innerR * 2.3;
    let drawH = drawW / imgAspect;

    if (imgAspect < 1) {
      drawH = innerR * 2.3;
      drawW = drawH * imgAspect;
    }

    ctx.drawImage(userImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  } else {
    // Empty state placeholder inside circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = '#130a24';
    ctx.fill();
    ctx.restore();
  }

  // 2. Draw Frame Overlay on top
  drawFrame(ctx, targetSize, targetSize, frame, customFrameImg, badge);

  return canvas;
}

/**
 * Downloads the exported image to user's device
 */
export async function downloadExportedImage(
  userImage: HTMLImageElement | null,
  transform: PhotoTransform,
  frame: FrameOption,
  customFrameImg: HTMLImageElement | null,
  badge: BadgeConfig,
  settings: ExportSettings
): Promise<void> {
  const canvas = await generateCompositeCanvas(
    userImage,
    transform,
    frame,
    customFrameImg,
    badge,
    settings.size
  );

  return new Promise((resolve, reject) => {
    const mimeType = settings.format === 'jpeg' ? 'image/jpeg' : 'image/png';
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image blob'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const ext = settings.format === 'jpeg' ? 'jpg' : 'png';
        link.download = `${settings.filename || 'sukhothai-phapa-2569-profile'}-${settings.size}px.${ext}`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      mimeType,
      settings.quality
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
