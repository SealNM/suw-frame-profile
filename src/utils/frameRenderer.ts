import { BadgeConfig, FrameOption } from '../types';

/**
 * Draws the official Sukhothai Pha Pa frame overlay onto a 2D canvas context
 * at any resolution (e.g. 1080, 2048, 4000)
 */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: FrameOption,
  customFrameImg?: HTMLImageElement | null,
  badge?: BadgeConfig
) {
  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const r = size * 0.44; // Outer radius of profile frame
  const innerR = size * 0.355; // Inner circle opening for user's photo

  ctx.save();

  if (frame.renderType === 'image' && customFrameImg) {
    ctx.drawImage(customFrameImg, 0, 0, width, height);
    if (badge && badge.enabled && badge.name.trim()) {
      drawCustomBadge(ctx, width, height, badge);
    }
    ctx.restore();
    return;
  }

  drawSukhothaiOfficialFrame(ctx, width, height, cx, cy, r, innerR);

  if (badge && badge.enabled && badge.name.trim()) {
    drawCustomBadge(ctx, width, height, badge);
  }

  ctx.restore();
}

/**
 * Draw Default Avatar Silhouette inside profile circle aperture when no user photo is loaded
 */
export function drawDefaultSilhouette(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  innerR: number
) {
  ctx.save();
  // Clip to inner aperture
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.clip();

  // Soft lilac/lavender backdrop
  ctx.fillStyle = '#eae5f3';
  ctx.fillRect(cx - innerR, cy - innerR, innerR * 2, innerR * 2);

  // Soft purple avatar silhouette
  ctx.fillStyle = '#bfaece';

  const s = innerR / 100;

  // Head & Hair Silhouette
  // Hair Base
  ctx.beginPath();
  ctx.ellipse(cx, cy - 22 * s, 36 * s, 42 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face
  ctx.fillStyle = '#dfd6ec';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 18 * s, 26 * s, 30 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair Strands / Bob cut
  ctx.fillStyle = '#a894ba';
  ctx.beginPath();
  ctx.moveTo(cx - 36 * s, cy - 20 * s);
  ctx.quadraticCurveTo(cx - 38 * s, cy + 18 * s, cx - 22 * s, cy + 26 * s);
  ctx.quadraticCurveTo(cx - 16 * s, cy + 6 * s, cx - 22 * s, cy - 14 * s);
  ctx.quadraticCurveTo(cx, cy - 36 * s, cx + 22 * s, cy - 14 * s);
  ctx.quadraticCurveTo(cx + 16 * s, cy + 6 * s, cx + 22 * s, cy + 26 * s);
  ctx.quadraticCurveTo(cx + 38 * s, cy + 18 * s, cx + 36 * s, cy - 20 * s);
  ctx.quadraticCurveTo(cx + 34 * s, cy - 48 * s, cx, cy - 48 * s);
  ctx.quadraticCurveTo(cx - 34 * s, cy - 48 * s, cx - 36 * s, cy - 20 * s);
  ctx.fill();

  // Neck & Shoulders
  ctx.fillStyle = '#dfd6ec';
  ctx.beginPath();
  ctx.rect(cx - 10 * s, cy + 6 * s, 20 * s, 22 * s);
  ctx.fill();

  // Torso / Shirt Collar
  ctx.fillStyle = '#bfaece';
  ctx.beginPath();
  ctx.moveTo(cx - 65 * s, cy + 90 * s);
  ctx.quadraticCurveTo(cx - 50 * s, cy + 24 * s, cx - 18 * s, cy + 24 * s);
  ctx.quadraticCurveTo(cx, cy + 34 * s, cx + 18 * s, cy + 24 * s);
  ctx.quadraticCurveTo(cx + 50 * s, cy + 24 * s, cx + 65 * s, cy + 90 * s);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * 1. Official Sukhothai Wittayakom Pha Pa Samakkhi 2569 Frame
 * Designed exactly matching the user's mockup.
 */
function drawSukhothaiOfficialFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  cx: number,
  cy: number,
  r: number,
  innerR: number
) {
  const size = Math.min(w, h);

  // 1. Royal Violet Outer Circular Rim
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
  ctx.fillStyle = '#220847';
  ctx.fill();

  // Outer Gold Border Rings
  ctx.lineWidth = size * 0.016;
  ctx.strokeStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.07, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = size * 0.005;
  ctx.strokeStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.045, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Gold Rim around Profile Opening
  ctx.lineWidth = size * 0.014;
  ctx.strokeStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = size * 0.004;
  ctx.strokeStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(cx, cy, innerR - size * 0.008, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 2. Left Side: Cascading Purple Flower Garland / Dok Rak / Orchids
  ctx.save();
  drawCascadingPurpleFlowers(ctx, cx, cy, r, innerR, size);
  ctx.restore();

  // 3. Top Banner: 9 กันยายน 2569 & ขอเชิญร่วมเป็นเจ้าภาพ
  ctx.save();
  const topY = cy - r * 0.94;
  const topW = size * 0.50;
  const topH = size * 0.155;

  // Gold backing plaque with decorative side ears
  ctx.fillStyle = '#f59e0b';
  drawRoundedRect(ctx, cx - topW / 2 - size * 0.012, topY - size * 0.01, topW + size * 0.024, topH + size * 0.02, size * 0.04);
  ctx.fill();

  // Side decorative golden leaves
  drawKanokLeaf(ctx, cx - topW / 2 - size * 0.02, topY + topH * 0.35, Math.PI * 0.85, size * 0.06);
  drawKanokLeaf(ctx, cx + topW / 2 + size * 0.02, topY + topH * 0.35, -Math.PI * 0.85, size * 0.06);

  // Deep Navy/Purple inner header
  ctx.fillStyle = '#170638';
  drawRoundedRect(ctx, cx - topW / 2, topY, topW, topH * 0.62, size * 0.025);
  ctx.fill();

  // Date Text: 9 กันยายน 2569
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${size * 0.048}px 'Kanit', sans-serif`;
  ctx.fillText('9 กันยายน 2569', cx, topY + topH * 0.31);

  // Golden Subtitle Ribbon: ขอเชิญร่วมเป็นเจ้าภาพ
  const ribbonY = topY + topH * 0.62;
  const ribbonW = topW * 0.92;
  const ribbonH = topH * 0.42;

  ctx.fillStyle = '#fbbf24';
  drawRoundedRect(ctx, cx - ribbonW / 2, ribbonY, ribbonW, ribbonH, size * 0.018);
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = size * 0.003;
  ctx.stroke();

  ctx.fillStyle = '#1e0842';
  ctx.font = `700 ${size * 0.028}px 'Prompt', sans-serif`;
  ctx.fillText('ขอเชิญร่วมเป็นเจ้าภาพ', cx, ribbonY + ribbonH * 0.52);
  ctx.restore();

  // 4. Top Right: Golden Buddhist School Emblem
  ctx.save();
  const emblemX = cx + r * 0.72;
  const emblemY = cy - r * 0.56;

  // Halo Rays
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.003;
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.beginPath();
    ctx.moveTo(emblemX + Math.cos(angle) * size * 0.06, emblemY + Math.sin(angle) * size * 0.06);
    ctx.lineTo(emblemX + Math.cos(angle) * size * 0.09, emblemY + Math.sin(angle) * size * 0.09);
    ctx.stroke();
  }

  // Golden Shield Emblem
  ctx.fillStyle = '#1e0842';
  ctx.beginPath();
  ctx.arc(emblemX, emblemY - size * 0.01, size * 0.068, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.006;
  ctx.stroke();

  // Buddha Silhouette
  ctx.fillStyle = '#fbbf24';
  drawBuddhaSilhouette(ctx, emblemX, emblemY - size * 0.01, size * 0.085);

  // Ribbon: โรงเรียนสุโขทัยวิทยาคม
  ctx.fillStyle = '#f59e0b';
  drawRoundedRect(ctx, emblemX - size * 0.125, emblemY + size * 0.065, size * 0.25, size * 0.038, size * 0.01);
  ctx.fill();
  ctx.fillStyle = '#1e0842';
  ctx.font = `700 ${size * 0.018}px 'Prompt', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('โรงเรียนสุโขทัยวิทยาคม', emblemX, emblemY + size * 0.084);

  // 5. Tax Deduction Badge (สามารถลดหย่อนภาษีได้ 2 เท่า)
  const taxY = emblemY + size * 0.145;
  const taxW = size * 0.23;
  const taxH = size * 0.088;

  ctx.fillStyle = '#fef08a';
  drawRoundedRect(ctx, emblemX - taxW / 2, taxY, taxW, taxH, size * 0.02);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.004;
  ctx.stroke();

  ctx.fillStyle = '#4c1d95';
  ctx.font = `600 ${size * 0.019}px 'Prompt', sans-serif`;
  ctx.fillText('สามารถลดหย่อนภาษีได้', emblemX, taxY + size * 0.026);

  // Green Checkmark circle with 2 เท่า
  const checkX = emblemX - size * 0.052;
  const checkY = taxY + size * 0.058;
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(checkX, checkY, size * 0.022, 0, Math.PI * 2);
  ctx.fill();

  // White checkmark inside
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.004;
  ctx.beginPath();
  ctx.moveTo(checkX - size * 0.01, checkY);
  ctx.lineTo(checkX - size * 0.002, checkY + size * 0.008);
  ctx.lineTo(checkX + size * 0.01, checkY - size * 0.008);
  ctx.stroke();

  // Bold Text: 2 เท่า
  ctx.fillStyle = '#1e0842';
  ctx.font = `700 ${size * 0.038}px 'Kanit', sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('2 เท่า', checkX + size * 0.03, checkY + size * 0.002);
  ctx.restore();

  // 6. Bottom Right: Golden Pha Pa Money Tree (พุ่มผ้าป่า / พานทอง)
  ctx.save();
  const potX = cx + r * 0.74;
  const potY = cy + r * 0.62;
  drawPhaPaMoneyTree(ctx, potX, potY, size * 0.23);
  ctx.restore();

  // 7. Bottom Center: Main 3D Banner
  ctx.save();
  const mainBannerY = cy + r * 0.64;

  // Background Royal Purple Ribbon
  ctx.fillStyle = '#24084c';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.06, Math.PI * 0.22, Math.PI * 0.78, false);
  ctx.arc(cx, cy, r * 0.62, Math.PI * 0.78, Math.PI * 0.22, true);
  ctx.closePath();
  ctx.fill();

  // Golden trim on ribbon
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.007;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.06, Math.PI * 0.22, Math.PI * 0.78, false);
  ctx.stroke();

  // Text 1: ผ้าป่าสามัคคี (Large Golden 3D Text)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dark Outline
  ctx.lineWidth = size * 0.02;
  ctx.strokeStyle = '#451a03';
  ctx.font = `700 ${size * 0.092}px 'Kanit', sans-serif`;
  ctx.strokeText('ผ้าป่าสามัคคี', cx, mainBannerY);

  // Golden Fill
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('ผ้าป่าสามัคคี', cx, mainBannerY);

  // Text 2: เพื่อการศึกษา (Crisp White in Royal Navy Plaque)
  const subY = mainBannerY + size * 0.076;
  const subPlaqueW = size * 0.44;
  const subPlaqueH = size * 0.052;

  ctx.fillStyle = '#170638';
  drawRoundedRect(ctx, cx - subPlaqueW / 2, subY - subPlaqueH / 2, subPlaqueW, subPlaqueH, size * 0.02);
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = size * 0.003;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${size * 0.044}px 'Kanit', sans-serif`;
  ctx.fillText('เพื่อการศึกษา', cx, subY);

  // Text 3: โรงเรียนสุโขทัยวิทยาคม (Bottom Golden Plaque)
  const schoolBadgeY = subY + size * 0.058;
  const badgeW = size * 0.40;
  const badgeH = size * 0.044;

  ctx.fillStyle = '#fef08a';
  drawRoundedRect(ctx, cx - badgeW / 2, schoolBadgeY - badgeH / 2, badgeW, badgeH, size * 0.018);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.003;
  ctx.stroke();

  ctx.fillStyle = '#310d63';
  ctx.font = `700 ${size * 0.026}px 'Prompt', sans-serif`;
  ctx.fillText('โรงเรียนสุโขทัยวิทยาคม', cx, schoolBadgeY);
  ctx.restore();
}

/**
 * Cascading Purple Flower Garland along left ring
 */
function drawCascadingPurpleFlowers(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  innerR: number,
  size: number
) {
  const flowerPositions = [
    { angle: Math.PI * 0.85, s: 0.055 },
    { angle: Math.PI * 0.95, s: 0.065 },
    { angle: Math.PI * 1.05, s: 0.075 },
    { angle: Math.PI * 1.15, s: 0.07 },
    { angle: Math.PI * 1.25, s: 0.06 },
    { angle: Math.PI * 1.35, s: 0.05 },
  ];

  flowerPositions.forEach((pos) => {
    const fx = cx + Math.cos(pos.angle) * (innerR * 1.12);
    const fy = cy + Math.sin(pos.angle) * (innerR * 1.12);
    drawFlowerCluster(ctx, fx, fy, size * pos.s);
  });
}

function drawCustomBadge(ctx: CanvasRenderingContext2D, w: number, h: number, badge: BadgeConfig) {
  const size = Math.min(w, h);
  const cx = w / 2;
  const badgeY = badge.position === 'top' ? h * 0.22 : h * 0.79;
  const badgeW = size * 0.58;
  const badgeH = badge.role.trim() ? size * 0.11 : size * 0.08;

  ctx.save();
  ctx.fillStyle = badge.bgColor || '#1e0842';
  drawRoundedRect(ctx, cx - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, size * 0.025);
  ctx.fill();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = size * 0.005;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = badge.color || '#fbbf24';
  ctx.font = `700 ${size * 0.038}px 'Prompt', sans-serif`;

  if (badge.role.trim()) {
    ctx.fillText(badge.name, cx, badgeY - size * 0.016);
    ctx.fillStyle = '#ffffff';
    ctx.font = `500 ${size * 0.026}px 'Prompt', sans-serif`;
    ctx.fillText(badge.role, cx, badgeY + size * 0.024);
  } else {
    ctx.fillText(badge.name, cx, badgeY);
  }

  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawFlowerCluster(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  const petals = 6;
  const petalR = radius * 0.38;

  // Leaves in gold
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(x - radius * 0.4, y + radius * 0.2, radius * 0.4, radius * 0.18, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + radius * 0.4, y + radius * 0.2, radius * 0.4, radius * 0.18, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Purple Petals
  ctx.fillStyle = '#7c3aed';
  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals;
    const px = x + Math.cos(angle) * petalR;
    const py = y + Math.sin(angle) * petalR;
    ctx.beginPath();
    ctx.arc(px, py, petalR * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner petal layer in lighter violet
  ctx.fillStyle = '#c4b5fd';
  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals + Math.PI / petals;
    const px = x + Math.cos(angle) * (petalR * 0.5);
    const py = y + Math.sin(angle) * (petalR * 0.5);
    ctx.beginPath();
    ctx.arc(px, py, petalR * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center gold pistil
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x, y, petalR * 0.45, 0, Math.PI * 2);
  ctx.fill();
}

function drawBuddhaSilhouette(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 100;

  // Halo Ushnisha
  ctx.beginPath();
  ctx.moveTo(0, -38 * s);
  ctx.quadraticCurveTo(8 * s, -28 * s, 0, -20 * s);
  ctx.quadraticCurveTo(-8 * s, -28 * s, 0, -38 * s);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(0, -12 * s, 10 * s, 0, Math.PI * 2);
  ctx.fill();

  // Torso / Shoulders
  ctx.beginPath();
  ctx.moveTo(-22 * s, 12 * s);
  ctx.quadraticCurveTo(-14 * s, -4 * s, 0, -2 * s);
  ctx.quadraticCurveTo(14 * s, -4 * s, 22 * s, 12 * s);
  ctx.lineTo(26 * s, 26 * s);
  ctx.lineTo(-26 * s, 26 * s);
  ctx.closePath();
  ctx.fill();

  // Crossed legs pedestal
  ctx.beginPath();
  ctx.ellipse(0, 30 * s, 32 * s, 9 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPhaPaMoneyTree(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 100;

  // Golden pedestal (พานทอง)
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(-24 * s, 32 * s);
  ctx.lineTo(24 * s, 32 * s);
  ctx.lineTo(16 * s, 46 * s);
  ctx.lineTo(22 * s, 48 * s);
  ctx.lineTo(-22 * s, 48 * s);
  ctx.lineTo(-16 * s, 46 * s);
  ctx.closePath();
  ctx.fill();

  // Banknotes Fan (ธนบัตรใบละ 100, 500, 1000 บาท)
  const colors = ['#ef4444', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];
  const angles = [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6];

  angles.forEach((ang, idx) => {
    ctx.save();
    ctx.rotate(ang);
    ctx.fillStyle = colors[idx % colors.length];
    ctx.fillRect(-6 * s, -38 * s, 12 * s, 42 * s);
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1 * s;
    ctx.strokeRect(-6 * s, -38 * s, 12 * s, 42 * s);
    ctx.restore();
  });

  // Center pinnacle
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(0, -48 * s);
  ctx.lineTo(6 * s, -32 * s);
  ctx.lineTo(-6 * s, -32 * s);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawKanokLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(size * 0.6, -size * 0.4, size, 0);
  ctx.quadraticCurveTo(size * 0.4, size * 0.4, 0, 0);
  ctx.fill();
  ctx.restore();
}
