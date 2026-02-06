import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'rave' | 'neon' | 'hacker' | 'toxic' | 'candy' | 'cyberpunk' | 'ocean' | 'sunset' | 'retro' | 'minimalist' | 'forest' | 'monochrome' | 'synthwavex' | 'seasonal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  transitionTheme: (theme: Theme) => void;
  intensity: number;
  setIntensity: (intensity: number) => void;
  motionLevel: number;
  setMotionLevel: (level: number) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ALL_THEMES: Theme[] = ['dark', 'light', 'rave', 'neon', 'hacker', 'toxic', 'candy', 'cyberpunk', 'ocean', 'sunset', 'retro', 'minimalist', 'forest', 'monochrome', 'synthwavex', 'seasonal'];
const ALL_THEME_CLASSES = ALL_THEMES.map(t => `theme-${t}`);

function loadSaved<T>(key: string, fallback: T, validate?: (v: any) => boolean): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed as T;
  } catch { return fallback; }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = loadSaved<Theme>('ai-theme', 'dark', v => ALL_THEMES.includes(v));
    // Seasonal auto-detect
    if (saved === 'seasonal') return 'seasonal';
    return saved;
  });
  const [intensity, setIntensityState] = useState<number>(() =>
    loadSaved<number>('ai-intensity', 50, v => typeof v === 'number' && v >= 0 && v <= 100)
  );
  const [motionLevel, setMotionLevelState] = useState<number>(() =>
    loadSaved<number>('ai-motion', 75, v => typeof v === 'number' && v >= 0 && v <= 100)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem('ai-theme', JSON.stringify(t)); } catch {}
  }, []);

  const transitionTheme = useCallback((t: Theme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(t);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, [setTheme]);

  const setIntensity = useCallback((v: number) => {
    setIntensityState(v);
    try { localStorage.setItem('ai-intensity', JSON.stringify(v)); } catch {}
  }, []);
  const setMotionLevel = useCallback((v: number) => {
    setMotionLevelState(v);
    try { localStorage.setItem('ai-motion', JSON.stringify(v)); } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(...ALL_THEME_CLASSES);
    document.documentElement.classList.add(`theme-${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionLevelState(0);
      setIntensityState(0);
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, transitionTheme, intensity, setIntensity, motionLevel, setMotionLevel, isTransitioning }),
    [theme, setTheme, transitionTheme, intensity, setIntensity, motionLevel, setMotionLevel, isTransitioning]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme} min-h-screen transition-colors duration-300`}>
        {/* Theme transition overlay */}
        {isTransitioning && (
          <div
            className="fixed inset-0 z-[200] bg-black pointer-events-none"
            style={{
              animation: 'theme-fade 300ms ease-in-out',
            }}
          />
        )}
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
