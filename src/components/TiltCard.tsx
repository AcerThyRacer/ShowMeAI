import React, { useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const { theme, motionLevel } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const getMaxTilt = () => {
    switch (theme) {
      case 'retro': return 15;
      case 'minimalist': return 4;
      case 'rave': return 0; // rave uses wiggle instead
      case 'candy': return 8;
      default: return 10;
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (motionLevel < 10) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = getMaxTilt() * (motionLevel / 100);

    if (theme === 'rave') {
      // Wiggle/bounce effect for rave
      const wobble = Math.sin(Date.now() / 100) * 2;
      setStyle({
        transform: `scale(1.02) rotate(${wobble}deg)`,
        transition: 'transform 0.1s ease',
      });
      return;
    }

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease',
      backgroundImage: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
    });
  }, [theme, motionLevel]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      backgroundImage: 'none',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};
