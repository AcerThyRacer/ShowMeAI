import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Minus, Sparkles } from 'lucide-react';

/** Tiny per-theme animated track for the motion slider */
const MotionTrackCanvas: React.FC<{ value: number; width: number }> = ({ value, width }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const valRef = useRef(value);
  useEffect(() => { valRef.current = value; }, [value]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    c.width = width; c.height = 20;
    let id = 0, frame = 0;

    const draw = () => {
      id = requestAnimationFrame(draw);
      const v = valRef.current / 100;
      if (v < 0.05) { ctx.clearRect(0, 0, c.width, c.height); return; }
      frame++;
      ctx.clearRect(0, 0, c.width, c.height);
      const filled = v * c.width;

      if (theme === 'rave') {
        const h = (frame * 3) % 360;
        for (let x = 0; x < filled; x += 3) {
          ctx.fillStyle = `hsla(${(h + x * 4) % 360},100%,65%,0.7)`;
          ctx.fillRect(x, 8, 2, 4);
        }
      } else if (theme === 'neon') {
        const wave = Math.sin(frame * 0.06);
        ctx.strokeStyle = `rgba(0,255,204,${0.6 + wave * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < filled; x++) {
          const y = 10 + Math.sin((x + frame) * 0.15) * 2 * v;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (theme === 'hacker') {
        ctx.fillStyle = 'rgba(0,255,0,0.7)';
        const barW = 2, gap = 3;
        for (let x = 0; x < filled; x += barW + gap) {
          const h2 = (Math.sin((x + frame) * 0.2) * 3 + 3) * v;
          ctx.fillRect(x, 10 - h2 / 2, barW, h2);
        }
      } else if (theme === 'toxic') {
        const grad = ctx.createLinearGradient(0, 0, filled, 0);
        grad.addColorStop(0, `rgba(184,255,0,${0.5 + Math.sin(frame * 0.04) * 0.3})`);
        grad.addColorStop(1, `rgba(147,51,234,0.7)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 8, filled, 4);
      } else if (theme === 'candy') {
        const colors = ['#f472b6', '#a855f7', '#818cf8', '#c084fc', '#f472b6'];
        const segW = c.width / colors.length;
        for (let i = 0; i < colors.length; i++) {
          const sx = i * segW;
          if (sx > filled) break;
          const sw = Math.min(segW, filled - sx);
          ctx.fillStyle = colors[i];
          ctx.globalAlpha = 0.6 + Math.sin(frame * 0.08 + i) * 0.3;
          ctx.fillRect(sx, 8, sw, 4);
        }
        ctx.globalAlpha = 1;
      } else if (theme === 'cyberpunk') {
        for (let x = 0; x < filled; x += 4) {
          const alt = ((x + frame) % 8) < 4;
          ctx.fillStyle = alt ? 'rgba(255,107,43,0.7)' : 'rgba(0,240,255,0.5)';
          ctx.fillRect(x, 8, 3, 4);
        }
      } else if (theme === 'ocean') {
        ctx.strokeStyle = `rgba(14,165,233,${0.5 + Math.sin(frame * 0.05) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < filled; x++) {
          const y = 10 + Math.sin((x + frame) * 0.1) * 2 * v;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (theme === 'sunset') {
        const grad = ctx.createLinearGradient(0, 0, filled, 0);
        grad.addColorStop(0, 'rgba(249,115,22,0.7)');
        grad.addColorStop(1, 'rgba(168,85,247,0.5)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 8, filled, 4);
      } else if (theme === 'retro') {
        const h = (frame * 2) % 360;
        const grad = ctx.createLinearGradient(0, 0, filled, 0);
        grad.addColorStop(0, `hsla(${(h + 330) % 360},100%,55%,0.7)`);
        grad.addColorStop(1, `hsla(${(h + 180) % 360},100%,55%,0.7)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 8, filled, 4);
      } else if (theme === 'minimalist') {
        ctx.fillStyle = `rgba(161,161,170,${0.25 + v * 0.3})`;
        ctx.fillRect(0, 9, filled, 2);
      } else {
        const alpha = 0.4 + Math.sin(frame * 0.05) * 0.15 * v;
        ctx.fillStyle = theme === 'light' ? `rgba(37,99,235,${alpha})` : `rgba(59,130,246,${alpha})`;
        ctx.fillRect(0, 8, filled, 4);
      }
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [theme, width]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width, height: 20 }} />;
};

export const MotionSlider: React.FC = () => {
  const { motionLevel, setMotionLevel } = useTheme();
  const trackW = 80; // w-20 = 80px

  return (
    <div className="flex items-center gap-1.5 group" title="UI Effects — controls card glow, shimmer, and ambient animations">
      <Minus
        size={13}
        className="opacity-50 group-hover:opacity-80 transition-opacity shrink-0"
        style={{ color: 'var(--accent-color)' }}
      />
      <div className="relative w-20 h-8 flex items-center">
        <MotionTrackCanvas value={motionLevel} width={trackW} />
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-1.5 rounded-full bg-[var(--secondary-color)] overflow-hidden" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={motionLevel}
          onChange={(e) => setMotionLevel(Number(e.target.value))}
          className="intensity-slider absolute inset-0 w-full appearance-none bg-transparent cursor-pointer z-10"
          aria-label="UI effects level"
        />
      </div>
      <Sparkles
        size={13}
        className="shrink-0 transition-all"
        style={{
          color: 'var(--accent-color)',
          opacity: 0.4 + (motionLevel / 100) * 0.6,
          filter: motionLevel > 60
            ? `drop-shadow(0 0 ${(motionLevel / 25) | 0}px var(--accent-color))`
            : 'none',
        }}
      />
    </div>
  );
};
