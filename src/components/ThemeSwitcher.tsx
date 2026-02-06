import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Moon, Sun, Zap, Terminal, Music, Skull, Candy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'rave', name: 'Rave', icon: Music },
  { id: 'neon', name: 'Neon', icon: Zap },
  { id: 'hacker', name: 'Hacker', icon: Terminal },
  { id: 'toxic', name: 'Toxic', icon: Skull },
  { id: 'candy', name: 'Candy', icon: Candy },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
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
              className="absolute top-12 right-0 flex flex-col gap-1 p-2 rounded-xl bg-[var(--secondary-color)] shadow-xl border border-[var(--accent-color)]/30 z-50 min-w-[140px]"
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as any);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                    theme === t.id
                      ? 'bg-[var(--accent-color)] text-white'
                      : 'text-[var(--text-color)] hover:bg-[var(--accent-color)]/20'
                  }`}
                >
                  <t.icon size={16} />
                  <span className="font-medium">{t.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
