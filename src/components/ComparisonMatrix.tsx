import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiModels } from '../data/models';
import { ArrowLeft, Scale, Download, Share2, Check, X } from 'lucide-react';
import { useToast } from './Toast';
import { SEO } from './SEO';

function benchmarkScore(strengthsCount: number): number {
  return Math.min(100, Math.round((strengthsCount / 6) * 100));
}

export const ComparisonMatrix: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  const ids = useMemo(() => (searchParams.get('ids') || '').split(',').filter(Boolean), [searchParams]);
  const models = useMemo(() => ids.map(id => aiModels.find(m => m.id === id)).filter(Boolean) as typeof aiModels, [ids]);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    models.forEach(m => m.category.forEach(c => set.add(c)));
    return Array.from(set).sort();
  }, [models]);

  const exportCSV = () => {
    const header = ['Spec', ...models.map(m => m.name)];
    const rows = [
      ['Provider', ...models.map(m => m.provider)],
      ['Release Year', ...models.map(m => String(m.releaseYear))],
      ['Pricing', ...models.map(m => m.pricing)],
      ['Categories', ...models.map(m => m.category.join('; '))],
      ['Strengths', ...models.map(m => m.strengths.join('; '))],
      ['Weaknesses', ...models.map(m => m.weaknesses.join('; '))],
      ['Score', ...models.map(m => String(benchmarkScore(m.strengths.length)))],
    ];
    const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'model-comparison.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Comparison exported as CSV', 'success');
  };

  const exportMarkdown = () => {
    const header = `| Spec | ${models.map(m => m.name).join(' | ')} |`;
    const sep = `| --- | ${models.map(() => '---').join(' | ')} |`;
    const rows = [
      `| Provider | ${models.map(m => m.provider).join(' | ')} |`,
      `| Release Year | ${models.map(m => m.releaseYear).join(' | ')} |`,
      `| Pricing | ${models.map(m => m.pricing).join(' | ')} |`,
      `| Categories | ${models.map(m => m.category.join(', ')).join(' | ')} |`,
      `| Score | ${models.map(m => benchmarkScore(m.strengths.length)).join(' | ')} |`,
    ];
    const md = [header, sep, ...rows].join('\n');
    navigator.clipboard.writeText(md);
    showToast('Markdown table copied to clipboard', 'success');
  };

  const shareComparison = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast('Comparison link copied!', 'success');
  };

  if (models.length < 2) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Scale size={48} className="mx-auto mb-4 opacity-20" />
          <h1 className="text-2xl font-bold mb-4">Select at least 2 models to compare</h1>
          <Link to="/models" className="text-[var(--accent-color)] hover:underline">← Browse Models</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 relative">
      <SEO title="Comparison Matrix" description={`Comparing ${models.map(m => m.name).join(', ')}`} path="/matrix" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Link to="/models" className="p-2 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors">
                <ArrowLeft size={22} className="text-[var(--accent-color)]" />
              </Link>
              <Scale size={28} className="text-[var(--accent-color)]" />
              <h1 className={`text-3xl md:text-4xl font-bold ${theme === 'hacker' ? 'font-mono' : ''}`}>
                Comparison Matrix
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="px-3 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all text-sm font-medium flex items-center gap-2">
                <Download size={14} /> CSV
              </button>
              <button onClick={exportMarkdown} className="px-3 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all text-sm font-medium flex items-center gap-2">
                <Download size={14} /> Markdown
              </button>
              <button onClick={shareComparison} className="px-3 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all text-sm font-medium flex items-center gap-2">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>

          {/* Model headers */}
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${models.length}, minmax(0, 1fr))` }}>
            {models.map(m => (
              <div key={m.id} className="p-4 rounded-2xl bg-[var(--secondary-color)]/80 border border-[var(--accent-color)]/20 text-center">
                <span className="text-4xl block mb-2">{m.icon}</span>
                <h2 className="font-bold text-lg">{m.name}</h2>
                <p className="text-xs opacity-50">{m.provider}</p>
              </div>
            ))}
          </div>

          {/* Specs Table */}
          <div className="rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--accent-color)]/10">
                  <th className="text-left px-5 py-3 font-medium opacity-50 min-w-[140px]">Spec</th>
                  {models.map(m => (
                    <th key={m.id} className="text-left px-5 py-3 font-medium opacity-50">{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--accent-color)]/5">
                  <td className="px-5 py-3 font-medium opacity-70">Release Year</td>
                  {models.map(m => <td key={m.id} className="px-5 py-3">{m.releaseYear}</td>)}
                </tr>
                <tr className="border-b border-[var(--accent-color)]/5">
                  <td className="px-5 py-3 font-medium opacity-70">Pricing</td>
                  {models.map(m => <td key={m.id} className="px-5 py-3">{m.pricing}</td>)}
                </tr>
                <tr className="border-b border-[var(--accent-color)]/5">
                  <td className="px-5 py-3 font-medium opacity-70">Categories</td>
                  {models.map(m => <td key={m.id} className="px-5 py-3">{m.category.join(', ')}</td>)}
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium opacity-70">Score</td>
                  {models.map(m => (
                    <td key={m.id} className="px-5 py-3">
                      <span className="font-bold text-[var(--accent-color)]">{benchmarkScore(m.strengths.length)}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Category coverage matrix */}
          <h3 className="text-lg font-semibold mb-4 opacity-80">Category Coverage</h3>
          <div className="rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--accent-color)]/10">
                  <th className="text-left px-5 py-3 font-medium opacity-50 min-w-[140px]">Category</th>
                  {models.map(m => (
                    <th key={m.id} className="text-center px-5 py-3 font-medium opacity-50">{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allCategories.map(cat => (
                  <tr key={cat} className="border-b border-[var(--accent-color)]/5">
                    <td className="px-5 py-2 font-medium opacity-70">{cat}</td>
                    {models.map(m => (
                      <td key={m.id} className="px-5 py-2 text-center">
                        {m.category.includes(cat) ? <Check size={16} className="inline text-green-400" /> : <X size={16} className="inline opacity-20" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Strengths */}
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 opacity-80">
            <Check size={16} className="text-green-400" /> Strengths
          </h3>
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${models.length}, minmax(0, 1fr))` }}>
            {models.map(m => (
              <div key={m.id} className="p-5 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
                <ul className="space-y-2">
                  {m.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={14} className="mt-0.5 shrink-0 text-green-400" /><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Weaknesses */}
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 opacity-80">
            <X size={16} className="text-red-400" /> Weaknesses
          </h3>
          <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${models.length}, minmax(0, 1fr))` }}>
            {models.map(m => (
              <div key={m.id} className="p-5 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
                <ul className="space-y-2">
                  {m.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X size={14} className="mt-0.5 shrink-0 text-red-400" /><span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Score bars */}
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 opacity-80">
            <Scale size={16} className="text-[var(--accent-color)]" /> Benchmark Scores
          </h3>
          <div className="rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 p-6 space-y-4">
            {models.map(m => {
              const score = benchmarkScore(m.strengths.length);
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{m.icon} {m.name}</span>
                    <span className="font-bold text-[var(--accent-color)]">{score}</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-[var(--accent-color)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
