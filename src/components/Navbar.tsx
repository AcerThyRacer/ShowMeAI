import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { IntensitySlider } from './IntensitySlider';
import { MotionSlider } from './MotionSlider';
import { Bot, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/models', label: 'AI Models' },
    { to: '/providers', label: 'Providers' },
    { to: '/ai-guide', label: 'AI Guide' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--bg-color)]/80 border-b border-[var(--accent-color)]/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <Bot size={28} className="text-[var(--accent-color)] group-hover:rotate-12 transition-transform" />
          <span className={theme === 'hacker' ? 'font-mono' : ''}>
            AI <span className="text-[var(--accent-color)]">Masterclass</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'bg-[var(--accent-color)] text-white'
                  : 'hover:bg-[var(--secondary-color)] opacity-80 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4 flex items-center gap-3">
            <IntensitySlider />
            <MotionSlider />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <MotionSlider />
          <ThemeSwitcher />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
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
            className="md:hidden border-t border-[var(--accent-color)]/20 bg-[var(--bg-color)]/95 backdrop-blur-xl"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
