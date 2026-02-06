import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Paintbrush, X, Save, RotateCcw, Download, Upload } from 'lucide-react';
import { useToast } from './Toast';

interface CustomTheme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
}

const MAX_SLOTS = 5;

function loadCustomThemes(): CustomTheme[] {
  try {
    return JSON.parse(localStorage.getItem('ai-custom-themes') || '[]');
  } catch {
    return [];
  }
}

function saveCustomThemes(themes: CustomTheme[]) {
  try { localStorage.setItem('ai-custom-themes', JSON.stringify(themes)); } catch {}
}

export const ThemeCustomizer: React.FC = () => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [bg, setBg] = useState('#0f172a');
  const [text, setText] = useState('#f8fafc');
  const [accent, setAccent] = useState('#3b82f6');
  const [secondary, setSecondary] = useState('#1e293b');
  const [themeName, setThemeName] = useState('');
  const [savedThemes, setSavedThemes] = useState<CustomTheme[]>(loadCustomThemes);
  const [previewActive, setPreviewActive] = useState(false);

  const applyPreview = () => {
    document.documentElement.style.setProperty('--bg-color', bg);
    document.documentElement.style.setProperty('--text-color', text);
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    setPreviewActive(true);
  };

  const removePreview = () => {
    document.documentElement.style.removeProperty('--bg-color');
    document.documentElement.style.removeProperty('--text-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--secondary-color');
    setPreviewActive(false);
  };

  const saveTheme = () => {
    if (!themeName.trim()) {
      showToast('Enter a name for your theme', 'info');
      return;
    }
    if (savedThemes.length >= MAX_SLOTS) {
      showToast(`Maximum ${MAX_SLOTS} custom themes`, 'info');
      return;
    }
    const newTheme: CustomTheme = { name: themeName.trim(), bg, text, accent, secondary };
    const updated = [...savedThemes, newTheme];
    setSavedThemes(updated);
    saveCustomThemes(updated);
    setThemeName('');
    showToast(`Saved "${newTheme.name}" theme`, 'success');
  };

  const loadTheme = (t: CustomTheme) => {
    setBg(t.bg);
    setText(t.text);
    setAccent(t.accent);
    setSecondary(t.secondary);
    applyPreviewWith(t);
    showToast(`Loaded "${t.name}"`, 'theme');
  };

  const applyPreviewWith = (t: CustomTheme) => {
    document.documentElement.style.setProperty('--bg-color', t.bg);
    document.documentElement.style.setProperty('--text-color', t.text);
    document.documentElement.style.setProperty('--accent-color', t.accent);
    document.documentElement.style.setProperty('--secondary-color', t.secondary);
    setPreviewActive(true);
  };

  const deleteTheme = (idx: number) => {
    const updated = savedThemes.filter((_, i) => i !== idx);
    setSavedThemes(updated);
    saveCustomThemes(updated);
    showToast('Theme deleted', 'info');
  };

  const exportThemes = () => {
    const json = JSON.stringify(savedThemes, null, 2);
    navigator.clipboard.writeText(json);
    showToast('Themes copied to clipboard', 'success');
  };

  const importThemes = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        const merged = [...savedThemes, ...parsed].slice(0, MAX_SLOTS);
        setSavedThemes(merged);
        saveCustomThemes(merged);
        showToast(`Imported ${parsed.length} theme(s)`, 'success');
      }
    } catch {
      showToast('Failed to import themes', 'info');
    }
  };

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (previewActive) removePreview();
    };
  }, [previewActive]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-20 z-50 w-10 h-10 rounded-full bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 flex items-center justify-center hover:border-[var(--accent-color)] transition-all shadow-lg"
        aria-label="Customize theme"
      >
        <Paintbrush size={18} className="opacity-60" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); if (previewActive) removePreview(); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--bg-color)] border border-[var(--accent-color)]/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Paintbrush size={22} className="text-[var(--accent-color)]" />
                  Theme Customizer
                </h2>
                <button onClick={() => { setIsOpen(false); if (previewActive) removePreview(); }} className="p-1 hover:bg-[var(--accent-color)]/10 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Color pickers */}
              <div className="space-y-4 mb-6">
                {[
                  { label: 'Background', value: bg, set: setBg },
                  { label: 'Text', value: text, set: setText },
                  { label: 'Accent', value: accent, set: setAccent },
                  { label: 'Secondary', value: secondary, set: setSecondary },
                ].map(({ label, value, set }) => (
                  <div key={label} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={value}
                      onChange={e => set(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-[var(--accent-color)]/20 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1">
                      <label className="text-sm font-medium">{label}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={e => set(e.target.value)}
                        className="block w-full text-xs font-mono mt-0.5 bg-transparent border-b border-[var(--accent-color)]/20 outline-none py-0.5"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div className="flex gap-2 mb-6">
                <button onClick={applyPreview} className="flex-1 px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white text-sm font-medium hover:brightness-110 transition-all">
                  Preview
                </button>
                <button onClick={removePreview} className="px-4 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 text-sm font-medium hover:border-[var(--accent-color)] transition-all flex items-center gap-1">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>

              {/* Save */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={themeName}
                  onChange={e => setThemeName(e.target.value)}
                  placeholder="Theme name..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 text-sm outline-none placeholder:opacity-40"
                />
                <button onClick={saveTheme} className="px-4 py-2 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-sm font-medium flex items-center gap-1 hover:bg-[var(--accent-color)]/20 transition-all">
                  <Save size={14} /> Save
                </button>
              </div>

              {/* Saved themes */}
              {savedThemes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 opacity-70">Saved Themes ({savedThemes.length}/{MAX_SLOTS})</h3>
                  <div className="space-y-2">
                    {savedThemes.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
                        <div className="flex -space-x-1">
                          {[t.bg, t.accent, t.secondary, t.text].map((c, j) => (
                            <div key={j} className="w-5 h-5 rounded-full border-2 border-[var(--bg-color)]" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className="text-sm font-medium flex-1">{t.name}</span>
                        <button onClick={() => loadTheme(t)} className="text-xs px-2 py-1 rounded bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20 transition-colors">Apply</button>
                        <button onClick={() => deleteTheme(i)} className="text-xs px-2 py-1 rounded hover:bg-red-500/10 text-red-400 transition-colors">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Import/Export */}
              <div className="flex gap-2 pt-4 border-t border-[var(--accent-color)]/10">
                <button onClick={exportThemes} className="flex-1 px-3 py-2 rounded-lg bg-[var(--secondary-color)] text-sm flex items-center justify-center gap-1 hover:bg-[var(--accent-color)]/10 transition-colors">
                  <Download size={14} /> Export
                </button>
                <button onClick={importThemes} className="flex-1 px-3 py-2 rounded-lg bg-[var(--secondary-color)] text-sm flex items-center justify-center gap-1 hover:bg-[var(--accent-color)]/10 transition-colors">
                  <Upload size={14} /> Import
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
