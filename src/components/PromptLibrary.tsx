import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import {
  PROMPT_CATEGORIES,
  PROMPT_TEMPLATES,
  getPromptsByCategory,
  type PromptTemplate,
} from '../data/promptTemplates';
import {
  Copy,
  Check,
  Search,
  BookOpen,
  Code,
  PenTool,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Zap,
  MessageSquare,
  Search as SearchIcon,
  X,
  FileText,
  ArrowUp,
} from 'lucide-react';

/* ─── Icon Mapping ─── */
const CategoryIcon: React.FC<{ name: string; className?: string; size?: number; style?: React.CSSProperties }> = ({ name, className, size, style }) => {
  const icons: Record<string, React.FC<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
    Code,
    PenTool,
    Search,
    Briefcase,
    GraduationCap,
    Lightbulb,
    Zap,
    MessageSquare,
    FileText,
  };
  const Icon = icons[name] || FileText;
  return <Icon className={className} size={size} style={style} />;
};

/* ─── Highlight bracket variables like [topic] in accent color ─── */
const HighlightedTemplate: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[.+\]$/.test(part) ? (
          <span key={i} className="text-[var(--accent-color)] font-semibold">{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

/* ─── Copy Button Component ─── */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm px-5 py-3.5 transition-all duration-200 w-full ${
        copied
          ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40 scale-[0.98]'
          : 'bg-[var(--accent-color)] text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--accent-color)]/25'
      }`}
    >
      {copied ? (
        <>
          <Check size={18} />
          <span>Copied to clipboard!</span>
        </>
      ) : (
        <>
          <Copy size={18} />
          <span>Copy Prompt</span>
        </>
      )}
    </button>
  );
};

/* ─── Prompt Card Component ─── */
const PromptCard: React.FC<{ prompt: PromptTemplate; index: number }> = ({ prompt, index }) => {
  const { getItemVariants } = useThemeAnimations();
  const category = PROMPT_CATEGORIES.find(c => c.id === prompt.categoryId);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={getItemVariants(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="rounded-2xl border border-[var(--accent-color)]/15 overflow-hidden bg-[var(--secondary-color)]/30 hover:border-[var(--accent-color)]/40 hover:shadow-lg hover:shadow-[var(--accent-color)]/5 transition-all duration-300 flex flex-col"
    >
      {/* Card Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-2.5 mb-2">
          {category && (
            <div
              className="p-1.5 rounded-lg shrink-0 mt-0.5"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              <CategoryIcon name={category.icon} size={16} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-[var(--text-color)] leading-tight">{prompt.title}</h3>
            <p className="text-sm opacity-60 leading-relaxed mt-1">{prompt.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {prompt.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--accent-color)]/8 text-[var(--accent-color)] border border-[var(--accent-color)]/15 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Template Block */}
      <div className="px-5 pb-3 flex-1">
        <div className="relative">
          <pre
            className={`text-[13px] leading-relaxed whitespace-pre-wrap font-mono bg-[var(--bg-color)]/60 p-4 rounded-xl border border-[var(--accent-color)]/10 overflow-y-auto transition-all duration-300 ${
              expanded ? 'max-h-[600px]' : 'max-h-48'
            }`}
          >
            <HighlightedTemplate text={prompt.template} />
          </pre>
          {prompt.template.length > 400 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs text-[var(--accent-color)] hover:underline font-medium"
            >
              {expanded ? '▲ Show less' : '▼ Show full prompt'}
            </button>
          )}
        </div>
      </div>

      {/* Copy Button */}
      <div className="px-5 pb-5">
        <CopyButton text={prompt.template} />
      </div>
    </motion.div>
  );
};

/* ─── Main Prompt Library Component ─── */
export const PromptLibrary: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredPrompts = React.useMemo(() => {
    let prompts = PROMPT_TEMPLATES;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      prompts = prompts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.template.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      prompts = prompts.filter(p => p.categoryId === selectedCategory);
    }
    return prompts;
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] text-sm font-medium mb-5">
            <BookOpen size={16} />
            Prompt Library
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              theme === 'hacker' ? 'font-mono' : ''
            }`}
          >
            Prompt <span className="text-[var(--accent-color)]">Library</span>
          </h1>
          <p className="text-lg opacity-60 max-w-2xl mx-auto">
            Battle-tested prompts that get incredible results. Just copy, paste into any AI, and fill in the <span className="text-[var(--accent-color)] font-medium">[brackets]</span>.
          </p>
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-2xl mx-auto">
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
            />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[var(--secondary-color)]/40 border border-[var(--accent-color)]/20 focus:border-[var(--accent-color)] focus:outline-none transition-colors text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--accent-color)]/10 rounded-lg transition-colors"
              >
                <X size={18} className="opacity-50" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-[var(--accent-color)] text-white shadow-md shadow-[var(--accent-color)]/25'
                  : 'bg-[var(--secondary-color)]/40 hover:bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10'
              }`}
            >
              All
            </button>
            {PROMPT_CATEGORIES.map((cat) => {
              const count = getPromptsByCategory(cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-[var(--accent-color)] text-white shadow-md shadow-[var(--accent-color)]/25'
                      : 'bg-[var(--secondary-color)]/40 hover:bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10'
                  }`}
                >
                  <CategoryIcon name={cat.icon} size={14} />
                  <span>{cat.name}</span>
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Results Count ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm opacity-50 text-center"
        >
          Showing <strong className="text-[var(--text-color)]">{filteredPrompts.length}</strong> prompt{filteredPrompts.length !== 1 ? 's' : ''}
          {searchQuery && <span> matching "<strong className="text-[var(--accent-color)]">{searchQuery}</strong>"</span>}
          {selectedCategory && (
            <span> in <strong className="text-[var(--accent-color)]">{PROMPT_CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></span>
          )}
        </motion.div>

        {/* ── Prompt Cards Grid ── */}
        {filteredPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-bold mb-2">No prompts found</h3>
            <p className="opacity-50">Try a different search term or category</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {filteredPrompts.map((prompt, index) => (
              <PromptCard key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* ── Scroll to Top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-[var(--accent-color)] text-white shadow-lg hover:brightness-110 transition-all z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
