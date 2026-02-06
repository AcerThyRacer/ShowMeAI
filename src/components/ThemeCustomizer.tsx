import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Paintbrush, Save, RotateCcw, Download, Upload, Shuffle, X, Copy, Check, Eye, EyeOff, Palette, Sparkles, Sun, Moon, Droplets, Leaf, Flame, Zap, Heart, Star } from 'lucide-react';
import { useToast } from './Toast';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { SEO } from './SEO';

interface CustomTheme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
}

const MAX_SLOTS = 10;

function loadCustomThemes(): CustomTheme[] {
  try { return JSON.parse(localStorage.getItem('ai-custom-themes') || '[]'); } catch { return []; }
}
function saveCustomThemes(themes: CustomTheme[]) {
  try { localStorage.setItem('ai-custom-themes', JSON.stringify(themes)); } catch {}
}

/* ─── Color utilities ─── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
}
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');
}
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(c => c / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6
      : max === g ? ((b - r) / d + 2) / 6
      : ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}
function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return rgbToHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrastRatio(c1: string, c2: string): number {
  const l1 = relativeLuminance(c1), l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ─── Theme Presets ─── */
const PRESETS: (CustomTheme & { icon: React.ReactNode })[] = [
  { name: 'Midnight Ocean', bg: '#0c1929', text: '#e0f2fe', accent: '#0ea5e9', secondary: '#1e3a5f', icon: <Moon size={16} /> },
  { name: 'Sunset Blaze', bg: '#1a0a00', text: '#fff1e6', accent: '#f97316', secondary: '#3d1e0a', icon: <Sun size={16} /> },
  { name: 'Rose Garden', bg: '#1a0510', text: '#fce7f3', accent: '#ec4899', secondary: '#3b0a24', icon: <Heart size={16} /> },
  { name: 'Emerald Depths', bg: '#0b1a0f', text: '#d4e8d0', accent: '#22c55e', secondary: '#1a3320', icon: <Leaf size={16} /> },
  { name: 'Royal Velvet', bg: '#12061f', text: '#e8d5f5', accent: '#a855f7', secondary: '#2e1065', icon: <Star size={16} /> },
  { name: 'Arctic Frost', bg: '#f0f9ff', text: '#0c4a6e', accent: '#06b6d4', secondary: '#e0f2fe', icon: <Droplets size={16} /> },
  { name: 'Crimson Ember', bg: '#1a0000', text: '#fecaca', accent: '#ef4444', secondary: '#3b0000', icon: <Flame size={16} /> },
  { name: 'Golden Hour', bg: '#1a1400', text: '#fef3c7', accent: '#f59e0b', secondary: '#3d2e00', icon: <Sun size={16} /> },
  { name: 'Cyber Chrome', bg: '#0c0a1a', text: '#e0d7ff', accent: '#ff6b2b', secondary: '#1a1530', icon: <Zap size={16} /> },
  { name: 'Neon Dreams', bg: '#0a0a1a', text: '#c4f5fc', accent: '#22d3ee', secondary: '#1e1e3f', icon: <Sparkles size={16} /> },
  { name: 'Cherry Blossom', bg: '#1a0a14', text: '#fde8f0', accent: '#f472b6', secondary: '#3b1025', icon: <Heart size={16} /> },
  { name: 'Slate Minimal', bg: '#1e293b', text: '#cbd5e1', accent: '#94a3b8', secondary: '#334155', icon: <Palette size={16} /> },
];

function randomTheme(): CustomTheme {
  const hue = Math.random() * 360;
  const isDark = Math.random() > 0.2;
  const bgL = isDark ? 5 + Math.random() * 10 : 93 + Math.random() * 5;
  const textL = isDark ? 88 + Math.random() * 10 : 8 + Math.random() * 12;
  const secL = isDark ? bgL + 5 + Math.random() * 8 : bgL - 5 - Math.random() * 8;
  return {
    name: '',
    bg: hslToHex(hue, 15 + Math.random() * 30, bgL),
    text: hslToHex(hue, 5 + Math.random() * 15, textL),
    accent: hslToHex(hue + 10 + Math.random() * 40, 60 + Math.random() * 35, 50 + Math.random() * 15),
    secondary: hslToHex(hue, 15 + Math.random() * 25, secL),
  };
}

/* ─── Component ─── */
export const ThemeCustomizer: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const { showToast } = useToast();

  const [bg, setBg] = useState('#0f172a');
  const [text, setText] = useState('#f8fafc');
  const [accent, setAccent] = useState('#3b82f6');
  const [secondary, setSecondary] = useState('#1e293b');
  const [themeName, setThemeName] = useState('');
  const [savedThemes, setSavedThemes] = useState<CustomTheme[]>(loadCustomThemes);
  const [previewActive, setPreviewActive] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'presets' | 'saved'>('editor');

  const applyPreview = useCallback(() => {
    document.documentElement.style.setProperty('--bg-color', bg);
    document.documentElement.style.setProperty('--text-color', text);
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    setPreviewActive(true);
  }, [bg, text, accent, secondary]);

  const removePreview = useCallback(() => {
    document.documentElement.style.removeProperty('--bg-color');
    document.documentElement.style.removeProperty('--text-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--secondary-color');
    setPreviewActive(false);
  }, []);

  const applyFromTheme = useCallback((t: CustomTheme) => {
    setBg(t.bg); setText(t.text); setAccent(t.accent); setSecondary(t.secondary);
    document.documentElement.style.setProperty('--bg-color', t.bg);
    document.documentElement.style.setProperty('--text-color', t.text);
    document.documentElement.style.setProperty('--accent-color', t.accent);
    document.documentElement.style.setProperty('--secondary-color', t.secondary);
    setPreviewActive(true);
  }, []);

  const saveTheme = () => {
    if (!themeName.trim()) { showToast('Enter a name for your theme', 'info'); return; }
    if (savedThemes.length >= MAX_SLOTS) { showToast(`Maximum ${MAX_SLOTS} custom themes`, 'info'); return; }
    const newTheme: CustomTheme = { name: themeName.trim(), bg, text, accent, secondary };
    const updated = [...savedThemes, newTheme];
    setSavedThemes(updated);
    saveCustomThemes(updated);
    setThemeName('');
    showToast(`Saved "${newTheme.name}" theme`, 'success');
  };

  const deleteTheme = (idx: number) => {
    const updated = savedThemes.filter((_, i) => i !== idx);
    setSavedThemes(updated);
    saveCustomThemes(updated);
    showToast('Theme deleted', 'info');
  };

  const doRandomize = () => {
    const t = randomTheme();
    applyFromTheme(t);
    showToast('Random theme generated!', 'theme');
  };

  const exportThemes = () => {
    navigator.clipboard.writeText(JSON.stringify(savedThemes, null, 2));
    showToast('Themes copied to clipboard', 'success');
  };
  const importThemes = async () => {
    try {
      const raw = await navigator.clipboard.readText();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const merged = [...savedThemes, ...parsed].slice(0, MAX_SLOTS);
        setSavedThemes(merged);
        saveCustomThemes(merged);
        showToast(`Imported ${parsed.length} theme(s)`, 'success');
      }
    } catch { showToast('Failed to import themes', 'info'); }
  };

  const copyCSS = () => {
    const css = `:root {\n  --bg-color: ${bg};\n  --text-color: ${text};\n  --accent-color: ${accent};\n  --secondary-color: ${secondary};\n}`;
    navigator.clipboard.writeText(css);
    setCopiedCSS(true);
    showToast('CSS copied to clipboard', 'success');
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // Contrast checker
  const contrast = useMemo(() => {
    const r = contrastRatio(text, bg);
    return { ratio: r, aa: r >= 4.5, aaa: r >= 7 };
  }, [text, bg]);

  // Color harmony from accent
  const harmonies = useMemo(() => {
    const [h, s, l] = hexToHsl(accent);
    return {
      complementary: hslToHex((h + 180) % 360, s, l),
      analogous1: hslToHex((h + 30) % 360, s, l),
      analogous2: hslToHex((h - 30 + 360) % 360, s, l),
      triadic1: hslToHex((h + 120) % 360, s, l),
      triadic2: hslToHex((h + 240) % 360, s, l),
      split1: hslToHex((h + 150) % 360, s, l),
      split2: hslToHex((h + 210) % 360, s, l),
    };
  }, [accent]);

  useEffect(() => {
    return () => { if (previewActive) removePreview(); };
  }, [previewActive, removePreview]);

  const cardBg = 'bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10';

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <SEO title="Theme Studio" description="Create, customize, and preview beautiful color themes for the AI Masterclass experience." path="/customize" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible">

          {/* Header */}
          <div className="text-center mb-12">
            <Paintbrush size={48} className="mx-auto mb-4 text-[var(--accent-color)]" />
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
              Theme <span className="text-[var(--accent-color)]">Studio</span>
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Design your perfect color theme. Pick presets, generate random palettes, check accessibility, and export your creation.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-8">
            {(['editor', 'presets', 'saved'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[var(--accent-color)] text-white shadow-lg'
                    : 'bg-[var(--secondary-color)]/60 hover:bg-[var(--accent-color)]/20'
                }`}
              >
                {tab === 'editor' ? '🎨 Color Editor' : tab === 'presets' ? '✨ Presets' : `💾 Saved (${savedThemes.length})`}
              </button>
            ))}
          </div>

          {/* ══════ EDITOR TAB ══════ */}
          {activeTab === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Left: Color Pickers */}
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Palette size={18} className="text-[var(--accent-color)]" /> Color Editor
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Background', value: bg, set: setBg, desc: 'Page background color' },
                      { label: 'Text', value: text, set: setText, desc: 'Primary text color' },
                      { label: 'Accent', value: accent, set: setAccent, desc: 'Buttons, links, highlights' },
                      { label: 'Secondary', value: secondary, set: setSecondary, desc: 'Cards, panels, surfaces' },
                    ].map(({ label, value, set, desc }) => (
                      <div key={label} className="flex items-center gap-3">
                        <input
                          type="color"
                          value={value}
                          onChange={e => set(e.target.value)}
                          className="w-12 h-12 rounded-xl border-2 border-[var(--accent-color)]/20 cursor-pointer bg-transparent shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <label className="text-sm font-semibold">{label}</label>
                          <p className="text-xs opacity-40">{desc}</p>
                        </div>
                        <input
                          type="text"
                          value={value}
                          onChange={e => set(e.target.value)}
                          className="w-24 text-xs font-mono bg-[var(--bg-color)] border border-[var(--accent-color)]/20 rounded-lg px-2 py-1.5 outline-none text-center"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-6">
                    <button onClick={applyPreview} className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--accent-color)] text-white text-sm font-medium hover:brightness-110 transition-all flex items-center justify-center gap-1.5">
                      {previewActive ? <EyeOff size={14} /> : <Eye size={14} />}
                      {previewActive ? 'Update Preview' : 'Preview'}
                    </button>
                    <button onClick={removePreview} className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-1.5 transition-all ${previewActive ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-[var(--secondary-color)] border-[var(--accent-color)]/20 opacity-50'}`} disabled={!previewActive}>
                      <RotateCcw size={14} /> Reset
                    </button>
                    <button onClick={doRandomize} className="px-4 py-2.5 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-sm font-medium hover:bg-[var(--accent-color)]/20 transition-all flex items-center gap-1.5" title="Generate random theme">
                      <Shuffle size={14} />
                    </button>
                  </div>
                </div>

                {/* Contrast Checker */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye size={18} className="text-[var(--accent-color)]" /> Accessibility Check
                  </h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: bg, color: text, border: '2px solid ' + accent }}>
                      Aa
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold">{contrast.ratio.toFixed(1)}:1</div>
                      <p className="text-xs opacity-50">Text on background contrast ratio</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${contrast.aa ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        AA {contrast.aa ? '✓' : '✗'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${contrast.aaa ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        AAA {contrast.aaa ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{
                      width: `${Math.min(100, (contrast.ratio / 21) * 100)}%`,
                      background: contrast.aaa ? '#22c55e' : contrast.aa ? '#eab308' : '#ef4444',
                    }} />
                  </div>
                </div>

                {/* Color Harmony */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-[var(--accent-color)]" /> Color Harmony
                    <span className="text-xs opacity-40 font-normal ml-auto">Click to apply as accent</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Complementary', colors: [harmonies.complementary] },
                      { label: 'Analogous', colors: [harmonies.analogous1, harmonies.analogous2] },
                      { label: 'Triadic', colors: [harmonies.triadic1, harmonies.triadic2] },
                      { label: 'Split Complementary', colors: [harmonies.split1, harmonies.split2] },
                    ].map(({ label, colors }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-xs opacity-50 w-32 shrink-0">{label}</span>
                        <div className="flex gap-2 flex-1">
                          {colors.map((c, i) => (
                            <button
                              key={i}
                              onClick={() => { setAccent(c); showToast(`Accent set to ${c}`, 'theme'); }}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                            >
                              <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                              <span className="text-xs font-mono opacity-60">{c}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CSS Export */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Copy size={18} className="text-[var(--accent-color)]" /> Export
                  </h3>
                  <pre className="text-xs font-mono bg-[var(--bg-color)] rounded-xl p-4 mb-3 overflow-x-auto opacity-70">
{`:root {
  --bg-color: ${bg};
  --text-color: ${text};
  --accent-color: ${accent};
  --secondary-color: ${secondary};
}`}
                  </pre>
                  <div className="flex gap-2">
                    <button onClick={copyCSS} className="flex-1 px-3 py-2 rounded-lg bg-[var(--accent-color)]/10 text-sm flex items-center justify-center gap-1.5 hover:bg-[var(--accent-color)]/20 transition-colors">
                      {copiedCSS ? <Check size={14} /> : <Copy size={14} />} {copiedCSS ? 'Copied!' : 'Copy CSS'}
                    </button>
                    <button onClick={exportThemes} className="flex-1 px-3 py-2 rounded-lg bg-[var(--secondary-color)] text-sm flex items-center justify-center gap-1.5 hover:bg-[var(--accent-color)]/10 transition-colors">
                      <Download size={14} /> Export All
                    </button>
                    <button onClick={importThemes} className="flex-1 px-3 py-2 rounded-lg bg-[var(--secondary-color)] text-sm flex items-center justify-center gap-1.5 hover:bg-[var(--accent-color)]/10 transition-colors">
                      <Upload size={14} /> Import
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Live Preview + Save */}
              <div className="space-y-6">
                {/* Live Preview */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-4">Live Preview</h3>
                  <div className="rounded-2xl overflow-hidden border border-white/10" style={{ backgroundColor: bg, color: text }}>
                    {/* Mini navbar */}
                    <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ borderColor: accent + '22', backgroundColor: secondary }}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-sm font-bold" style={{ color: text }}>AI Masterclass</span>
                      <div className="flex gap-3 ml-auto">
                        {['Models', 'Guide', 'Pricing'].map(l => (
                          <span key={l} className="text-xs opacity-60" style={{ color: text }}>{l}</span>
                        ))}
                      </div>
                    </div>
                    {/* Mini hero */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2" style={{ color: text }}>
                        Explore <span style={{ color: accent }}>AI Models</span>
                      </h4>
                      <p className="text-sm mb-4" style={{ color: text, opacity: 0.6 }}>
                        Discover the world's most powerful artificial intelligence systems.
                      </p>
                      <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: accent }}>
                        Get Started →
                      </button>
                    </div>
                    {/* Mini cards */}
                    <div className="grid grid-cols-2 gap-3 p-5 pt-0">
                      {['GPT-5', 'Claude Opus', 'Gemini 3', 'Grok 4'].map(name => (
                        <div key={name} className="p-3 rounded-xl border" style={{ backgroundColor: secondary, borderColor: accent + '20' }}>
                          <span className="text-sm font-medium" style={{ color: text }}>{name}</span>
                          <div className="mt-2 h-1.5 rounded-full" style={{ backgroundColor: accent + '30' }}>
                            <div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${40 + Math.random() * 50}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Gradient preview */}
                    <div className="h-3" style={{ background: `linear-gradient(90deg, ${bg}, ${accent}, ${secondary})` }} />
                  </div>
                </div>

                {/* Save Theme */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Save size={18} className="text-[var(--accent-color)]" /> Save Theme
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={themeName}
                      onChange={e => setThemeName(e.target.value)}
                      placeholder="My awesome theme..."
                      maxLength={30}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-color)] border border-[var(--accent-color)]/20 text-sm outline-none placeholder:opacity-40"
                      onKeyDown={e => e.key === 'Enter' && saveTheme()}
                    />
                    <button onClick={saveTheme} className="px-5 py-2.5 rounded-xl bg-[var(--accent-color)] text-white text-sm font-medium hover:brightness-110 transition-all flex items-center gap-1.5">
                      <Save size={14} /> Save
                    </button>
                  </div>
                  <p className="text-xs opacity-40 mt-2">{savedThemes.length}/{MAX_SLOTS} slots used</p>
                </div>

                {/* Palette Swatch */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3">Current Palette</h3>
                  <div className="flex rounded-xl overflow-hidden h-20">
                    {[
                      { c: bg, l: 'BG' },
                      { c: secondary, l: 'SEC' },
                      { c: accent, l: 'ACC' },
                      { c: text, l: 'TXT' },
                    ].map(({ c, l }) => (
                      <div key={l} className="flex-1 flex items-end justify-center pb-2 relative group cursor-pointer" style={{ backgroundColor: c }}
                        onClick={() => { navigator.clipboard.writeText(c); showToast(`Copied ${c}`, 'info'); }}>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-white">{l}</span>
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-1 rounded">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Gradient Ideas */}
                <div className={`p-6 rounded-2xl ${cardBg}`}>
                  <h3 className="font-semibold mb-3">Gradient Previews</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Linear', gradient: `linear-gradient(135deg, ${accent}, ${secondary})` },
                      { label: 'Radial', gradient: `radial-gradient(circle, ${accent}44, ${bg})` },
                      { label: 'Duo', gradient: `linear-gradient(90deg, ${accent}, ${harmonies.complementary})` },
                      { label: 'Triadic', gradient: `linear-gradient(90deg, ${accent}, ${harmonies.triadic1}, ${harmonies.triadic2})` },
                    ].map(({ label, gradient }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-xs opacity-50 w-14 shrink-0">{label}</span>
                        <div className="flex-1 h-8 rounded-lg" style={{ background: gradient }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════ PRESETS TAB ══════ */}
          {activeTab === 'presets' && (
            <div>
              <p className="text-center opacity-50 mb-8">Click any preset to instantly preview it, then save if you like it.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRESETS.map((preset) => (
                  <motion.button
                    key={preset.name}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { applyFromTheme(preset); showToast(`Previewing "${preset.name}"`, 'theme'); }}
                    className="text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all shadow-lg group"
                    style={{ backgroundColor: preset.bg }}
                  >
                    {/* Gradient bar */}
                    <div className="h-2" style={{ background: `linear-gradient(90deg, ${preset.accent}, ${preset.secondary})` }} />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ color: preset.accent }}>{preset.icon}</span>
                        <span className="font-bold" style={{ color: preset.text }}>{preset.name}</span>
                      </div>
                      {/* Mini card preview */}
                      <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: preset.secondary, border: `1px solid ${preset.accent}22` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent + '30' }} />
                          <div>
                            <div className="h-2 w-16 rounded" style={{ backgroundColor: preset.text + '40' }} />
                            <div className="h-1.5 w-10 rounded mt-1" style={{ backgroundColor: preset.text + '20' }} />
                          </div>
                        </div>
                      </div>
                      {/* Color dots */}
                      <div className="flex gap-1.5">
                        {[preset.bg, preset.secondary, preset.accent, preset.text].map((c, i) => (
                          <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="text-center mt-8">
                <button onClick={doRandomize} className="px-6 py-3 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-sm font-medium hover:bg-[var(--accent-color)]/20 transition-all inline-flex items-center gap-2">
                  <Shuffle size={16} /> Generate Random Theme
                </button>
              </div>
            </div>
          )}

          {/* ══════ SAVED TAB ══════ */}
          {activeTab === 'saved' && (
            <div>
              {savedThemes.length === 0 ? (
                <div className="text-center py-20">
                  <Palette size={56} className="mx-auto mb-4 opacity-15" />
                  <h3 className="text-xl font-bold mb-2 opacity-50">No Saved Themes</h3>
                  <p className="opacity-30 text-sm mb-6">Go to the Color Editor to create and save themes.</p>
                  <button onClick={() => setActiveTab('editor')} className="px-5 py-2.5 rounded-xl bg-[var(--accent-color)] text-white text-sm font-medium hover:brightness-110 transition-all">
                    Open Editor
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {savedThemes.map((t, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-[var(--accent-color)]/10 group" style={{ backgroundColor: t.bg }}>
                        <div className="h-2" style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.secondary})` }} />
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold" style={{ color: t.text }}>{t.name}</span>
                            <button onClick={() => deleteTheme(i)} className="p-1 rounded-lg hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all">
                              <X size={14} className="text-red-400" />
                            </button>
                          </div>
                          <div className="flex gap-1.5 mb-4">
                            {[t.bg, t.secondary, t.accent, t.text].map((c, j) => (
                              <div key={j} className="w-6 h-6 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <button
                            onClick={() => { applyFromTheme(t); showToast(`Applied "${t.name}"`, 'theme'); }}
                            className="w-full px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{ backgroundColor: t.accent, color: '#fff' }}
                          >
                            Apply Theme
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    <button onClick={exportThemes} className="px-5 py-2.5 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 text-sm flex items-center gap-2 hover:bg-[var(--accent-color)]/10 transition-colors">
                      <Download size={14} /> Export All Themes
                    </button>
                    <button onClick={importThemes} className="px-5 py-2.5 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 text-sm flex items-center gap-2 hover:bg-[var(--accent-color)]/10 transition-colors">
                      <Upload size={14} /> Import Themes
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
