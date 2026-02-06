import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Minus, Sparkles } from 'lucide-react';

export const MotionSlider: React.FC = () => {
  const { motionLevel, setMotionLevel } = useTheme();

  return (
    <div className="flex items-center gap-1.5 group" title="Animation amount">
      <Minus
        size={13}
        className="opacity-50 group-hover:opacity-80 transition-opacity shrink-0"
        style={{ color: 'var(--accent-color)' }}
      />
      <div className="relative w-20 h-8 flex items-center">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-1.5 rounded-full bg-[var(--secondary-color)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${motionLevel}%`,
                background: `linear-gradient(90deg, var(--accent-color), var(--accent-color))`,
                opacity: 0.6 + (motionLevel / 100) * 0.4,
              }}
            />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={motionLevel}
          onChange={(e) => setMotionLevel(Number(e.target.value))}
          className="intensity-slider absolute inset-0 w-full appearance-none bg-transparent cursor-pointer z-10"
          aria-label="Animation amount"
        />
      </div>
      <Sparkles
        size={13}
        className="shrink-0 transition-all"
        style={{
          color: 'var(--accent-color)',
          opacity: 0.4 + (motionLevel / 100) * 0.6,
        }}
      />
    </div>
  );
};
