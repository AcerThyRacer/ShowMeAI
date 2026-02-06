import { useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

export function useConfetti() {
  const { theme } = useTheme();

  const burst = useCallback((x?: number, y?: number) => {
    // Only fire in candy theme
    if (theme !== 'candy') return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;

    const originX = x ?? canvas.width / 2;
    const originY = y ?? canvas.height / 2;
    const colors = ['#f472b6', '#a855f7', '#818cf8', '#fbbf24', '#34d399', '#f87171', '#60a5fa', '#fb923c'];
    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; life: number; decay: number; shape: number }[] = [];

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        r: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        shape: Math.floor(Math.random() * 3), // 0=circle, 1=square, 2=star
      });
    }

    let frameId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.99;
        p.life -= p.decay;

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        if (p.shape === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 1) {
          ctx.fillRect(p.x - p.r / 2, p.y - p.r / 2, p.r, p.r);
        } else {
          // Simple star
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            const a = (j * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = j % 2 === 0 ? p.r : p.r * 0.4;
            ctx.lineTo(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (alive) {
        frameId = requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };
    frameId = requestAnimationFrame(animate);

    // Cleanup after 3s max
    setTimeout(() => {
      cancelAnimationFrame(frameId);
      canvas.remove();
    }, 3000);
  }, [theme]);

  return { burst };
}
