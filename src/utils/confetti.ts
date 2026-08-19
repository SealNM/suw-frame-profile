// High-performance golden & royal purple celebration particle burst
export function triggerGoldConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const width = (canvas.width = window.innerWidth * dpr);
  const height = (canvas.height = window.innerHeight * dpr);

  const colors = [
    '#f59e0b', // Amber Gold
    '#fbbf24', // Warm Gold
    '#fef08a', // Light Gold
    '#9333ea', // Royal Purple
    '#a855f7', // Bright Purple
    '#f8fafc', // Pearlescent White
  ];

  interface ConfettiParticle {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    rotation: number;
    vRot: number;
    color: string;
    alpha: number;
    shape: 'rect' | 'circle' | 'sparkle';
  }

  const particles: ConfettiParticle[] = [];
  const particleCount = 75;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const speed = Math.random() * 8 + 4;
    const originX = width / 2;
    const originY = height * 0.45;

    particles.push({
      x: originX,
      y: originY,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      vx: Math.cos(angle) * speed * dpr,
      vy: Math.sin(angle) * speed * dpr - 4 * dpr,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.3 ? 'rect' : 'sparkle',
    });
  }

  let startTime = performance.now();
  const duration = 2400; // ms

  function animate(now: number) {
    const elapsed = now - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
      return;
    }

    ctx?.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18 * dpr; // gravity
      p.vx *= 0.985; // drag
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - progress * 1.1);

      if (!ctx) continue;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'sparkle') {
        ctx.beginPath();
        ctx.moveTo(0, -p.w);
        ctx.lineTo(p.w * 0.3, -p.w * 0.3);
        ctx.lineTo(p.w, 0);
        ctx.lineTo(p.w * 0.3, p.w * 0.3);
        ctx.lineTo(0, p.w);
        ctx.lineTo(-p.w * 0.3, p.w * 0.3);
        ctx.lineTo(-p.w, 0);
        ctx.lineTo(-p.w * 0.3, -p.w * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
