import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Shared hook: keeps intensity in a ref so canvas animation loops can read it without re-mounting
function useIntensityRef() {
  const { intensity } = useTheme();
  const ref = useRef(intensity);
  useEffect(() => { ref.current = intensity; }, [intensity]);
  return ref;
}

const DarkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX_STARS = 200;
    const stars: { x: number; y: number; r: number; baseSpeed: number; opacity: number }[] = [];
    for (let i = 0; i < MAX_STARS; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        baseSpeed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let animId: number;
    const animate = () => {
      const t = iRef.current / 100; // 0..1
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const visible = Math.max(5, Math.floor(MAX_STARS * t));
      for (let i = 0; i < visible; i++) {
        const s = stars[i];
        s.opacity += (Math.random() - 0.5) * 0.02 * t;
        s.opacity = Math.max(0.05, Math.min(0.8, s.opacity));
        s.y -= s.baseSpeed * (0.1 + t * 1.5);
        if (s.y < -5) { s.y = canvas.height + 5; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (0.5 + t * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${s.opacity * t})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

const LightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const orbs: { x: number; y: number; r: number; baseDx: number; baseDy: number; color: string }[] = [];
    const colors = ['rgba(59,130,246,0.08)', 'rgba(147,51,234,0.06)', 'rgba(236,72,153,0.06)', 'rgba(34,197,94,0.06)'];
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 200 + 100,
        baseDx: (Math.random() - 0.5) * 0.5,
        baseDy: (Math.random() - 0.5) * 0.5,
        color: colors[i % colors.length],
      });
    }

    let animId: number;
    const animate = () => {
      const t = iRef.current / 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (t < 0.02) { animId = requestAnimationFrame(animate); return; }
      const visible = Math.max(1, Math.floor(orbs.length * t));
      for (let i = 0; i < visible; i++) {
        const o = orbs[i];
        o.x += o.baseDx * t * 2;
        o.y += o.baseDy * t * 2;
        if (o.x < -o.r || o.x > canvas.width + o.r) o.baseDx *= -1;
        if (o.y < -o.r || o.y > canvas.height + o.r) o.baseDy *= -1;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * (0.5 + t * 0.5));
        grad.addColorStop(0, o.color.replace(/[\d.]+\)$/, `${parseFloat(o.color.match(/[\d.]+\)$/)?.[0] || '0.06') * t * 2})`));
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const RaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; hue: number; life: number; maxLife: number }[] = [];

    let animId: number;
    let tick = 0;
    const animate = () => {
      const t = iRef.current / 100;
      ctx.fillStyle = `rgba(0,0,0,${0.04 + (1 - t) * 0.15})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn rate scales with intensity: 0 at t=0, up to 5 per frame at t=1
      const spawnCount = Math.floor(t * 5);
      if (tick % Math.max(1, Math.floor(4 - t * 3)) === 0) {
        for (let i = 0; i < spawnCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            vx: (Math.random() - 0.5) * (1 + t * 4),
            vy: -(Math.random() * (1 + t * 4) + 1),
            r: Math.random() * (2 + t * 4) + 1,
            hue: Math.random() * 360,
            life: 0,
            maxLife: Math.random() * 120 + 60,
          });
        }
      }
      tick++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01;
        p.hue += 1 + t * 3;
        p.life++;
        const alpha = (1 - p.life / p.maxLife) * t;
        if (alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue % 360}, 100%, 60%, ${alpha})`;
        ctx.shadowBlur = 10 + t * 20;
        ctx.shadowColor = `hsla(${p.hue % 360}, 100%, 60%, ${0.5 + t * 0.5})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Strobe: more frequent at high intensity
      if (t > 0.6 && tick % Math.max(20, Math.floor(80 - t * 60)) === 0) {
        ctx.fillStyle = `rgba(255,255,255,${0.02 + t * 0.04})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />;
};

const NeonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX_LINES = 25;
    const lines: { x: number; y: number; len: number; baseSpeed: number; color: string; width: number; angle: number }[] = [];
    const colors = ['#d946ef', '#00ffcc', '#06b6d4', '#a855f7'];
    for (let i = 0; i < MAX_LINES; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 150 + 50,
        baseSpeed: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    const animate = () => {
      const t = iRef.current / 100;
      ctx.fillStyle = `rgba(9,9,11,${0.03 + (1 - t) * 0.12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const visible = Math.max(1, Math.floor(MAX_LINES * t));
      for (let i = 0; i < visible; i++) {
        const l = lines[i];
        l.x += Math.cos(l.angle) * l.baseSpeed * (0.2 + t * 1.2);
        l.y += Math.sin(l.angle) * l.baseSpeed * (0.2 + t * 1.2);
        l.angle += (Math.random() - 0.5) * 0.03 * (0.5 + t);

        if (l.x < -100) l.x = canvas.width + 100;
        if (l.x > canvas.width + 100) l.x = -100;
        if (l.y < -100) l.y = canvas.height + 100;
        if (l.y > canvas.height + 100) l.y = -100;

        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        const drawLen = l.len * (0.3 + t * 0.7);
        ctx.lineTo(l.x + Math.cos(l.angle) * drawLen, l.y + Math.sin(l.angle) * drawLen);
        ctx.strokeStyle = l.color;
        ctx.lineWidth = l.width * (0.5 + t * 0.5);
        ctx.shadowBlur = 10 + t * 25;
        ctx.shadowColor = l.color;
        ctx.globalAlpha = 0.2 + t * 0.8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

const HackerBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

    const colsRef = useRef<{ drops: number[]; maxCols: number }>({ drops: [], maxCols: 0 });

    const initDrops = (width: number) => {
      const maxCols = Math.floor(width / 18);
      // Preserve existing drops if possible, or extend
      const currentDrops = colsRef.current.drops;
      if (currentDrops.length < maxCols) {
        const newDrops = new Array(maxCols - currentDrops.length).fill(0).map(() => Math.random() * -100);
        colsRef.current.drops = [...currentDrops, ...newDrops];
      }
      colsRef.current.maxCols = maxCols;
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      initDrops(canvas.width);
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>?/~`';
  
      let animId: number;
      const animate = () => {
        const t = iRef.current / 100;
        ctx.fillStyle = `rgba(0, 0, 0, ${0.04 + (1 - t) * 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        // Draw across full width, but vary density based on intensity
        ctx.font = '15px monospace';
        
        const { drops, maxCols } = colsRef.current;
        
        for (let i = 0; i < maxCols; i++) {
          const y = drops[i];
          const char = chars[Math.floor(Math.random() * chars.length)];
          
          // Intensity affects brightness and "glitch" chance
          const isBright = Math.random() > 0.95;
          const brightness = isBright ? 255 : Math.random() * 100 + 50;
          
          // Opacity scales with intensity
          const opacity = (0.1 + t * 0.9); 
          
          ctx.fillStyle = `rgba(0, ${brightness}, 0, ${opacity})`;
          ctx.fillText(char, i * 18, y);
          
          // Speed scales with intensity
          const speed = 18 * (0.3 + t * 1.0);
          
          // Randomly reset drops to create rain effect
          if (y > canvas.height && Math.random() > 0.975) {
               drops[i] = 0;
          } else {
               drops[i] = y + speed;
          }
        }
  
        animId = requestAnimationFrame(animate);
      };
  
      animate();
  
      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initDrops(canvas.width);
      };
      window.addEventListener('resize', onResize);
      return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
    }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />;
};

/* ─── Toxic: floating radioactive bubbles ─── */
const ToxicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX = 60;
    const bubbles: { x: number; y: number; r: number; baseSpeed: number; wobble: number; color: string }[] = [];
    const colors = ['#b8ff00', '#9333ea', '#22c55e', '#a855f7', '#84cc16'];
    for (let i = 0; i < MAX; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 30 + 8,
        baseSpeed: Math.random() * 0.4 + 0.1,
        wobble: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    let frame = 0;
    const animate = () => {
      const t = iRef.current / 100;
      ctx.fillStyle = `rgba(10,10,10,${0.06 + (1 - t) * 0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const visible = Math.max(2, Math.floor(MAX * t));
      frame++;
      for (let i = 0; i < visible; i++) {
        const b = bubbles[i];
        b.y -= b.baseSpeed * (0.3 + t * 1.2);
        b.x += Math.sin(b.wobble + frame * 0.01) * 0.5 * t;
        if (b.y < -b.r * 2) { b.y = canvas.height + b.r; b.x = Math.random() * canvas.width; }

        const drawR = b.r * (0.4 + t * 0.6);
        ctx.beginPath();
        ctx.arc(b.x, b.y, drawR, 0, Math.PI * 2);
        ctx.fillStyle = b.color + '18';
        ctx.fill();
        ctx.strokeStyle = b.color + '55';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowBlur = 8 + t * 20;
        ctx.shadowColor = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, drawR * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = b.color + '44';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

/* ─── Candy: floating pastel shapes ─── */
const CandyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iRef = useIntensityRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MAX = 50;
    const shapes: { x: number; y: number; size: number; baseSpeed: number; rotation: number; rotSpeed: number; sides: number; color: string }[] = [];
    const colors = ['#ec4899', '#f472b6', '#a855f7', '#fb923c', '#facc15', '#34d399'];
    for (let i = 0; i < MAX; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 18 + 6,
        baseSpeed: Math.random() * 0.3 + 0.08,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        sides: Math.floor(Math.random() * 4) + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      const t = iRef.current / 100;
      ctx.fillStyle = `rgba(253,242,248,${0.06 + (1 - t) * 0.12})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const visible = Math.max(2, Math.floor(MAX * t));
      for (let i = 0; i < visible; i++) {
        const s = shapes[i];
        s.y -= s.baseSpeed * (0.2 + t * 1.0);
        s.rotation += s.rotSpeed * (0.3 + t * 1.5);
        if (s.y < -s.size * 3) { s.y = canvas.height + s.size * 2; s.x = Math.random() * canvas.width; }

        const drawSize = s.size * (0.4 + t * 0.6);
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.beginPath();
        for (let j = 0; j < s.sides; j++) {
          const angle = (j / s.sides) * Math.PI * 2 - Math.PI / 2;
          if (j === 0) ctx.moveTo(Math.cos(angle) * drawSize, Math.sin(angle) * drawSize);
          else ctx.lineTo(Math.cos(angle) * drawSize, Math.sin(angle) * drawSize);
        }
        ctx.closePath();
        ctx.fillStyle = s.color + '22';
        ctx.fill();
        ctx.strokeStyle = s.color + '55';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

export const ThemeBackground: React.FC = () => {
  const { theme } = useTheme();

  switch (theme) {
    case 'rave': return <RaveBackground />;
    case 'neon': return <NeonBackground />;
    case 'hacker': return <HackerBackground />;
    case 'light': return <LightBackground />;
    case 'dark': return <DarkBackground />;
    case 'toxic': return <ToxicBackground />;
    case 'candy': return <CandyBackground />;
    default: return <DarkBackground />;
  }
};
