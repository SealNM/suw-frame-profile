export interface PhotoTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  brightness: number; // 0 to 200 (100 = default)
  contrast: number; // 0 to 200 (100 = default)
  saturation: number; // 0 to 200 (100 = default)
}

export interface FrameOption {
  id: string;
  name: string;
  category: 'official' | 'gold' | 'royal' | 'custom';
  description: string;
  thumbnailSvg?: string;
  imageUrl?: string;
  renderType: 'canvas-draw' | 'image' | 'svg';
  customSvgPath?: string;
  themeColor: string;
}

export interface BadgeConfig {
  enabled: boolean;
  name: string;
  role: string;
  fontSize: number;
  color: string;
  bgColor: string;
  position: 'bottom' | 'top';
}

export interface ExportSettings {
  size: number; // e.g. 1080, 2048, 4000
  format: 'png' | 'jpeg';
  quality: number; // 0.8 to 1.0
  filename: string;
}
