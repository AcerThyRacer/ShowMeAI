import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Moon, Sun, Zap, Terminal, Music, Skull, Candy, Cpu, Waves, Sunset, Radio, Type, TreePine, Circle, AudioLines, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'dark',       name: 'Dark',       icon: Moon,     colors: ['#0f172a', '#3b82f6', '#1e293b'] },
  { id: 'light',      name: 'Light',      icon: Sun,      colors: ['#f8fafc', '#2563eb', '#e2e8f0'] },
  { id: 'rave',       name: 'Rave',       icon: Music,    colors: ['#000000', '#ff00ff', '#00ffff'] },
  { id: 'neon',       name: 'Neon',       icon: Zap,      colors: ['#09090b', '#d946ef', '#00ffcc'] },
  { id: 'hacker',     name: 'Hacker',     icon: Terminal,  colors: ['#000000', '#008f11', '#00ff00'] },
  { id: 'toxic',      name: 'Toxic',      icon: Skull,    colors: ['#0a0a0a', '#9333ea', '#b8ff00'] },
      { id: 'candy',      name: 'Candy',      icon: Candy,    colors: ['#1a0a1e', '#f472b6', '#a855f7'] },
  
  { id: 'cyberpunk',  name: 'Cyberpunk',  icon: Cpu,      colors: ['#0c0a1a', '#ff6b2b', '#00f0ff'] },
  { id: 'ocean',      name: 'Ocean',      icon: Waves,    colors: ['#0a192f', '#0ea5e9', '#06b6d4'] },
  { id: 'sunset',     name: 'Sunset',     icon: Sunset,   colors: ['#1a0a00', '#f97316', '#a855f7'] },
  { id: 'retro',      name: 'Retro',      icon: Radio,    colors: ['#1a0025', '#ff2975', '#00f0ff'] },
  { id: 'minimalist', name: 'Minimal',    icon: Type,         colors: ['#fafafa', '#18181b', '#a1a1aa'] },
  { id: 'forest',     name: 'Forest',     icon: TreePine,     colors: ['#0b1a0f', '#22c55e', '#132a18'] },
  { id: 'monochrome', name: 'Mono',       icon: Circle,       colors: ['#0a0a0a', '#ffffff', '#171717'] },
  { id: 'synthwavex', name: 'Synthwave X',icon: AudioLines,   colors: ['#0d001a', '#01cdfe', '#ff71ce'] },
  { id: 'seasonal',   name: 'Seasonal',   icon: CalendarDays, colors: ['#0f0a1a', '#a855f7', '#f472b6'] },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, transitionTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 focus:outline-none ring-2 ring-[var(--accent-color)]/30 bg-[var(--secondary-color)] text-[var(--text-color)]"
        aria-label="Change Theme"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-12 right-0 flex flex-col gap-1 p-2 rounded-xl bg-[var(--secondary-color)] shadow-xl border border-[var(--accent-color)]/30 z-50 min-w-[180px] max-h-[70vh] overflow-y-auto"
              style={{ contain: 'layout' }}
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    transitionTheme(t.id as any);
                    setIsOpen(false);
                  }}
                  aria-label={`Switch to ${t.name} theme`}
                  aria-pressed={theme === t.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm group ${
                    theme === t.id
                      ? 'bg-[var(--accent-color)] text-white'
                      : 'text-[var(--text-color)] hover:bg-[var(--accent-color)]/20'
                  }`}
                >
                  <t.icon size={16} />
                  <span className="font-medium flex-1 text-left">{t.name}</span>
                  {/* Color swatch preview */}
                  <div className="flex -space-x-1">
                    {t.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
