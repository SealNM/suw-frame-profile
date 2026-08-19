import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  phase: number;
  hasGlint: boolean;
  hue: number; // 40-50 (Gold/Warm Amber)
  layer: 'bokeh' | 'dust' | 'glint';
}

export const HeaderParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 1200);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 200);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      initParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Particle Pool
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Calculate count based on width to evenly distribute across entire banner
      const particleCount = Math.max(35, Math.floor((width / 1200) * 55));

      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        let layer: 'bokeh' | 'dust' | 'glint' = 'dust';
        let radius = Math.random() * 2 + 1;
        let baseAlpha = Math.random() * 0.4 + 0.3;
        let hasGlint = false;

        if (rand < 0.2) {
          // Large soft background bokeh halo
          layer = 'bokeh';
          radius = Math.random() * 18 + 12;
          baseAlpha = Math.random() * 0.15 + 0.08;
        } else if (rand > 0.85) {
          // Bright delicate micro glint
          layer = 'glint';
          radius = Math.random() * 2.5 + 1.5;
          baseAlpha = Math.random() * 0.5 + 0.5;
          hasGlint = true;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          currentAlpha: baseAlpha,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(Math.random() * 0.35 + 0.1), // Gentle natural upward drift
          twinkleSpeed: Math.random() * 0.03 + 0.015,
          phase: Math.random() * Math.PI * 2,
          hasGlint,
          hue: 42 + Math.random() * 8, // Rich royal gold (42-50)
          layer,
        });
      }
    };

    initParticles();

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Render all particles across full banner width
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics update
        p.x += p.vx * (delta * 60);
        p.y += p.vy * (delta * 60);
        p.phase += p.twinkleSpeed * (delta * 60);

        // Sinusoidal natural breathing/sparkle alpha
        const sinVal = Math.sin(p.phase);
        p.currentAlpha = Math.max(0.02, p.baseAlpha * (0.65 + 0.35 * sinVal));

        // Wrap around boundaries seamlessly
        if (p.y < -p.radius * 2) {
          p.y = height + p.radius * 2;
          p.x = Math.random() * width;
        }
        if (p.x < -p.radius * 2) p.x = width + p.radius * 2;
        if (p.x > width + p.radius * 2) p.x = -p.radius * 2;

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.layer === 'bokeh') {
          // Soft radial bokeh glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
          grad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${p.currentAlpha})`);
          grad.addColorStop(0.5, `hsla(${p.hue}, 90%, 55%, ${p.currentAlpha * 0.4})`);
          grad.addColorStop(1, `hsla(${p.hue}, 85%, 45%, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Golden stardust particle with radiant core
          const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 2.5);
          coreGrad.addColorStop(0, `hsla(55, 100%, 95%, ${p.currentAlpha})`);
          coreGrad.addColorStop(0.35, `hsla(${p.hue}, 95%, 65%, ${p.currentAlpha * 0.85})`);
          coreGrad.addColorStop(0.75, `hsla(${p.hue - 5}, 90%, 50%, ${p.currentAlpha * 0.3})`);
          coreGrad.addColorStop(1, `hsla(${p.hue}, 85%, 40%, 0)`);

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Delicate fine realistic micro glint (soft optical diamond flare)
          if (p.hasGlint && p.currentAlpha > 0.45) {
            const glintLength = p.radius * 4.5 * (p.currentAlpha / p.baseAlpha);
            ctx.strokeStyle = `hsla(50, 100%, 95%, ${p.currentAlpha * 0.6})`;
            ctx.lineWidth = 0.75;

            // Horizontal & vertical fine beam
            ctx.beginPath();
            ctx.moveTo(-glintLength, 0);
            ctx.lineTo(glintLength, 0);
            ctx.moveTo(0, -glintLength);
            ctx.lineTo(0, glintLength);
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
