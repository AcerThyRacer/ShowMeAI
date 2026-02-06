import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { IntensitySlider } from './IntensitySlider';
import { MotionSlider } from './MotionSlider';
import { Bot, Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/models', label: 'Models' },
    { to: '/providers', label: 'Providers' },
    { to: '/compare', label: 'Compare' },
    { to: '/prompt-library', label: '✨ Prompts' },
    { to: '/playground', label: 'Playground' },
    { to: '/ai-guide', label: 'Guide' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/search', label: 'Search' },
    { to: '/wizard', label: 'Wizard' },
    { to: '/customize', label: '🎨 Customize' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--bg-color)]/80 border-b border-[var(--accent-color)]/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <Bot size={28} className="text-[var(--accent-color)] group-hover:rotate-12 transition-transform" />
          <span className={theme === 'hacker' ? 'font-mono' : ''}>
            AI <span className="text-[var(--accent-color)]">Masterclass</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap ${
                isActive(link.to)
                  ? 'bg-[var(--accent-color)] text-white shadow-sm shadow-[var(--accent-color)]/25'
                  : 'hover:bg-[var(--secondary-color)] opacity-70 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-3">
            <Link
              to="/favorites"
              className="relative p-2 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors"
              aria-label="Favorites"
            >
              <Heart size={18} className={favoritesCount > 0 ? 'text-pink-400' : 'opacity-50'} fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <IntensitySlider />
            <MotionSlider />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <MotionSlider />
          <ThemeSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[var(--accent-color)]/20 bg-[var(--bg-color)]/95 backdrop-blur-xl"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-3 text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'bg-[var(--accent-color)] text-white' : 'hover:bg-[var(--secondary-color)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile sliders */}
            <div className="px-6 py-4 border-t border-[var(--accent-color)]/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-50 w-16 shrink-0">Effects</span>
                <IntensitySlider />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-50 w-16 shrink-0">Motion</span>
                <MotionSlider />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
