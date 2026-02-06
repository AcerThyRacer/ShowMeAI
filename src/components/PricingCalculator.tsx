import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { Calculator, DollarSign, TrendingDown, Award } from 'lucide-react';
import { SEO } from './SEO';

interface PricingData {
  id: string;
  name: string;
  icon: string;
  inputPer1M: number;
  outputPer1M: number;
}

// Estimated pricing data (per 1M tokens)
const modelPricing: PricingData[] = [
  { id: 'gpt-5-codex', name: 'GPT-5.3 Codex', icon: '🤖', inputPer1M: 15, outputPer1M: 60 },
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', icon: '🧠', inputPer1M: 15, outputPer1M: 75 },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', icon: '💎', inputPer1M: 2, outputPer1M: 8 },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', icon: '⚡', inputPer1M: 0.5, outputPer1M: 1.5 },
  { id: 'gemini-3-thinking', name: 'Gemini 3 Thinking', icon: '🤔', inputPer1M: 5, outputPer1M: 20 },
  { id: 'grok-4', name: 'Grok 4.1', icon: '⚡', inputPer1M: 3, outputPer1M: 15 },
  { id: 'deepseek-v3', name: 'DeepSeek V3', icon: '🔬', inputPer1M: 0.27, outputPer1M: 1.1 },
  { id: 'cohere-command-r7', name: 'Command R7', icon: '🏢', inputPer1M: 2.5, outputPer1M: 10 },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', icon: '✨', inputPer1M: 3, outputPer1M: 15 },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', icon: '🌱', inputPer1M: 0.4, outputPer1M: 1.6 },
  { id: 'llama-4-maverick', name: 'Llama 4 Maverick', icon: '🦙', inputPer1M: 0, outputPer1M: 0 },
  { id: 'mistral-large-3', name: 'Mistral Large 3', icon: '🌬️', inputPer1M: 2, outputPer1M: 6 },
  { id: 'phi-5', name: 'Phi-5', icon: '🔷', inputPer1M: 0, outputPer1M: 0 },
  { id: 'qwen-3', name: 'Qwen 3', icon: '🌏', inputPer1M: 0.3, outputPer1M: 0.6 },
];

export const PricingCalculator: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const [selectedModels, setSelectedModels] = useState<string[]>(['gemini-3-flash', 'claude-opus-4-6', 'deepseek-v3']);
  const [monthlyTokensM, setMonthlyTokensM] = useState(10); // millions of tokens
  const [inputRatio, setInputRatio] = useState(70); // percentage of tokens that are input

  const toggleModel = (id: string) => {
    setSelectedModels(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const calculations = useMemo(() => {
    const inputTokensM = monthlyTokensM * (inputRatio / 100);
    const outputTokensM = monthlyTokensM * ((100 - inputRatio) / 100);

    return selectedModels
      .map(id => {
        const model = modelPricing.find(m => m.id === id);
        if (!model) return null;
        const cost = (inputTokensM * model.inputPer1M) + (outputTokensM * model.outputPer1M);
        return { ...model, cost, inputCost: inputTokensM * model.inputPer1M, outputCost: outputTokensM * model.outputPer1M };
      })
      .filter(Boolean)
      .sort((a, b) => a!.cost - b!.cost) as (PricingData & { cost: number; inputCost: number; outputCost: number })[];
  }, [selectedModels, monthlyTokensM, inputRatio]);

  const maxCost = Math.max(...calculations.map(c => c.cost), 1);
  const cheapest = calculations[0];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <SEO title="Pricing Calculator" description="Estimate monthly costs for AI models based on your token usage." path="/pricing" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible">
          <div className="text-center mb-12">
            <Calculator size={48} className="mx-auto mb-4 text-[var(--accent-color)]" />
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
              Pricing <span className="text-[var(--accent-color)]">Calculator</span>
            </h1>
            <p className="text-lg opacity-80">Estimate monthly costs based on your token usage.</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
              <h3 className="text-sm font-semibold mb-3 opacity-70">Monthly Token Usage</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={monthlyTokensM}
                  onChange={e => setMonthlyTokensM(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent-color)]"
                />
                <span className="text-lg font-bold text-[var(--accent-color)] min-w-[80px] text-right">
                  {monthlyTokensM}M
                </span>
              </div>
              <p className="text-xs opacity-40 mt-2">{(monthlyTokensM * 1_000_000).toLocaleString()} tokens/month</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
              <h3 className="text-sm font-semibold mb-3 opacity-70">Input / Output Ratio</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={inputRatio}
                  onChange={e => setInputRatio(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent-color)]"
                />
                <span className="text-sm font-medium min-w-[100px] text-right">
                  {inputRatio}% in / {100 - inputRatio}% out
                </span>
              </div>
            </div>
          </div>

          {/* Model Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 opacity-70">Select Models to Compare</h3>
            <div className="flex flex-wrap gap-2">
              {modelPricing.map(m => (
                <button
                  key={m.id}
                  onClick={() => toggleModel(m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    selectedModels.includes(m.id)
                      ? 'bg-[var(--accent-color)] text-white'
                      : 'bg-[var(--secondary-color)] hover:bg-[var(--accent-color)]/20'
                  }`}
                >
                  <span>{m.icon}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {calculations.length > 0 && (
            <>
              {/* Cheapest highlight */}
              {cheapest && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6 flex items-center gap-3">
                  <TrendingDown size={20} className="text-green-400" />
                  <span className="text-sm">
                    <strong className="text-green-400">{cheapest.icon} {cheapest.name}</strong> is the cheapest at{' '}
                    <strong>${cheapest.cost.toFixed(2)}/month</strong>
                    {cheapest.cost === 0 && ' (Free / Open Source)'}
                  </span>
                </div>
              )}

              {/* Cost bars */}
              <div className="space-y-4 mb-8">
                {calculations.map((calc, i) => (
                  <div key={calc.id} className="p-4 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{calc.icon}</span>
                        <span className="font-medium">{calc.name}</span>
                        {i === 0 && <Award size={14} className="text-yellow-400" />}
                      </div>
                      <span className="font-bold text-[var(--accent-color)]">
                        ${calc.cost.toFixed(2)}<span className="text-xs opacity-50">/mo</span>
                      </span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden mb-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: i === 0 ? '#22c55e' : 'var(--accent-color)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${maxCost > 0 ? (calc.cost / maxCost) * 100 : 0}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs opacity-50">
                      <span>Input: ${calc.inputCost.toFixed(2)} ({calc.inputPer1M}/1M)</span>
                      <span>Output: ${calc.outputCost.toFixed(2)} ({calc.outputPer1M}/1M)</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary table */}
              <div className="rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--accent-color)]/10">
                      <th className="text-left px-5 py-3 font-medium opacity-50">Model</th>
                      <th className="text-right px-5 py-3 font-medium opacity-50">Input $/1M</th>
                      <th className="text-right px-5 py-3 font-medium opacity-50">Output $/1M</th>
                      <th className="text-right px-5 py-3 font-medium opacity-50">Monthly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.map(calc => (
                      <tr key={calc.id} className="border-b border-[var(--accent-color)]/5">
                        <td className="px-5 py-3 font-medium">{calc.icon} {calc.name}</td>
                        <td className="px-5 py-3 text-right">${calc.inputPer1M.toFixed(2)}</td>
                        <td className="px-5 py-3 text-right">${calc.outputPer1M.toFixed(2)}</td>
                        <td className="px-5 py-3 text-right font-bold text-[var(--accent-color)]">${calc.cost.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {calculations.length === 0 && (
            <div className="text-center py-16">
              <DollarSign size={48} className="mx-auto mb-4 opacity-20" />
              <p className="opacity-50">Select models above to compare pricing</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
