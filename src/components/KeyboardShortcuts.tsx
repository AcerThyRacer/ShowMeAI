import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Keyboard, X, Search, Command } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from './Toast';
import { aiModels, aiProviders } from '../data/models';

const ALL_THEMES = ['dark', 'light', 'rave', 'neon', 'hacker', 'toxic', 'candy', 'cyberpunk', 'ocean', 'sunset', 'retro', 'minimalist'] as const;

const shortcuts = [
  { keys: ['Ctrl', 'K'], action: 'Open search' },
  { keys: ['Ctrl', '/'], action: 'Toggle shortcuts' },
  { keys: ['T'], action: 'Cycle themes' },
  { keys: ['Esc'], action: 'Close modals' },
];

export const KeyboardShortcuts: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const cycleTheme = useCallback(() => {
    const idx = ALL_THEMES.indexOf(theme as any);
    const next = ALL_THEMES[(idx + 1) % ALL_THEMES.length];
    setTheme(next as any);
    showToast(`Theme changed to ${next.charAt(0).toUpperCase() + next.slice(1)}`, 'theme');
  }, [theme, setTheme, showToast]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Ctrl+K: search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
        setShowHelp(false);
        return;
      }

      // Ctrl+/: shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowHelp(prev => !prev);
        setShowSearch(false);
        return;
      }

      // Esc: close modals
      if (e.key === 'Escape') {
        setShowHelp(false);
        setShowSearch(false);
        return;
      }

      if (isInput) return;

      // T: cycle themes
      if (e.key === 't' || e.key === 'T') {
        cycleTheme();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cycleTheme]);

  // Listen for navbar button click
  useEffect(() => {
    const handleToggle = () => setShowHelp(prev => !prev);
    window.addEventListener('toggle-shortcuts', handleToggle);
    return () => window.removeEventListener('toggle-shortcuts', handleToggle);
  }, []);

  const searchResults = searchQuery.trim().length > 0
    ? [
      ...aiModels
        .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(m => ({ type: 'model' as const, id: m.id, name: m.name, icon: m.icon, sub: m.tagline, path: `/models/${m.id}` })),
      ...aiProviders
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(p => ({ type: 'provider' as const, id: p.id, name: p.name, icon: p.icon, sub: p.description, path: `/providers/${p.id}` })),
    ].slice(0, 8)
    : [];

  return (
    <>
      {/* Shortcuts Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-color)] border border-[var(--accent-color)]/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Keyboard size={22} className="text-[var(--accent-color)]" />
                  Keyboard Shortcuts
                </h2>
                <button onClick={() => setShowHelp(false)} className="p-1 hover:bg-[var(--accent-color)]/10 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {shortcuts.map(s => (
                  <div key={s.action} className="flex items-center justify-between">
                    <span className="text-sm opacity-80">{s.action}</span>
                    <div className="flex gap-1">
                      {s.keys.map(k => (
                        <kbd key={k} className="px-2 py-1 text-xs rounded-md bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 font-mono">
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal (Ctrl+K) */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -10 }}
              className="bg-[var(--bg-color)] border border-[var(--accent-color)]/20 rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--accent-color)]/10">
                <Search size={20} className="text-[var(--accent-color)] shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search models, providers..."
                  className="flex-1 bg-transparent outline-none text-base placeholder:opacity-40"
                />
                <kbd className="px-2 py-0.5 text-xs rounded bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 font-mono opacity-50">
                  Esc
                </kbd>
              </div>

              {searchResults.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {searchResults.map(r => (
                    <button
                      key={`${r.type}-${r.id}`}
                      onClick={() => {
                        navigate(r.path);
                        setShowSearch(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors text-left"
                    >
                      <span className="text-2xl">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{r.name}</div>
                        <div className="text-xs opacity-50 truncate">{r.sub}</div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                        {r.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <div className="p-8 text-center opacity-50 text-sm">
                  No results for "{searchQuery}"
                </div>
              )}

              {searchQuery.trim().length === 0 && (
                <div className="p-6 text-center opacity-40 text-sm flex items-center justify-center gap-2">
                  <Command size={14} /> Type to search models and providers
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
