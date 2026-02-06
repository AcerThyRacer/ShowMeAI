import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { Calculator, DollarSign, TrendingDown, Award, Zap, Layers, Copy, Check, ArrowRight, Target, Clock, BarChart3, Sparkles } from 'lucide-react';
import { SEO } from './SEO';

interface PricingData {
  id: string;
  name: string;
  icon: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
  free?: boolean;
  latencyMs?: number;
  contextWindow?: string;
}

const modelPricing: PricingData[] = [
  // OpenAI
  { id: 'gpt-5', name: 'GPT-5', icon: '🤖', provider: 'OpenAI', inputPer1M: 10, outputPer1M: 30, latencyMs: 800, contextWindow: '256K' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', icon: '🌱', provider: 'OpenAI', inputPer1M: 0.40, outputPer1M: 1.60, latencyMs: 300, contextWindow: '128K' },
  { id: 'gpt-5-2-codex', name: 'GPT-5.2 Codex', icon: '💻', provider: 'OpenAI', inputPer1M: 15, outputPer1M: 60, latencyMs: 1200, contextWindow: '256K' },
  { id: 'o3', name: 'o3', icon: '🧪', provider: 'OpenAI', inputPer1M: 10, outputPer1M: 40, latencyMs: 5000, contextWindow: '200K' },
  { id: 'o4-mini', name: 'o4-mini', icon: '⚡', provider: 'OpenAI', inputPer1M: 1.10, outputPer1M: 4.40, latencyMs: 2000, contextWindow: '200K' },
  // Anthropic
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', icon: '🧠', provider: 'Anthropic', inputPer1M: 15, outputPer1M: 75, latencyMs: 1500, contextWindow: '200K' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', icon: '✨', provider: 'Anthropic', inputPer1M: 3, outputPer1M: 15, latencyMs: 600, contextWindow: '200K' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', icon: '🍃', provider: 'Anthropic', inputPer1M: 0.80, outputPer1M: 4, latencyMs: 250, contextWindow: '200K' },
  // Google
  { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', icon: '💎', provider: 'Google', inputPer1M: 1.25, outputPer1M: 10, latencyMs: 700, contextWindow: '1M' },
  { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', icon: '⚡', provider: 'Google', inputPer1M: 0.15, outputPer1M: 0.60, latencyMs: 150, contextWindow: '1M' },
  // xAI
  { id: 'grok-4', name: 'Grok 4', icon: '🚀', provider: 'xAI', inputPer1M: 3, outputPer1M: 15, latencyMs: 500, contextWindow: '256K' },
  { id: 'grok-3-mini', name: 'Grok 3 Mini', icon: '⚡', provider: 'xAI', inputPer1M: 0.30, outputPer1M: 0.50, latencyMs: 200, contextWindow: '131K' },
  // DeepSeek
  { id: 'deepseek-v3', name: 'DeepSeek V3', icon: '🔬', provider: 'DeepSeek', inputPer1M: 0.27, outputPer1M: 1.10, latencyMs: 400, contextWindow: '128K' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', icon: '🧮', provider: 'DeepSeek', inputPer1M: 0.55, outputPer1M: 2.19, latencyMs: 3000, contextWindow: '128K' },
  // Mistral
  { id: 'mistral-large-3', name: 'Mistral Large 3', icon: '🌬️', provider: 'Mistral', inputPer1M: 2, outputPer1M: 6, latencyMs: 500, contextWindow: '128K' },
  { id: 'codestral', name: 'Codestral', icon: '🔧', provider: 'Mistral', inputPer1M: 0.30, outputPer1M: 0.90, latencyMs: 350, contextWindow: '256K' },
  // Open Source (self-hosted, API cost ≈ 0)
  { id: 'llama-4-maverick', name: 'Llama 4 Maverick', icon: '🦙', provider: 'Meta', inputPer1M: 0, outputPer1M: 0, free: true, latencyMs: 600, contextWindow: '1M' },
  { id: 'llama-4-scout', name: 'Llama 4 Scout', icon: '🦙', provider: 'Meta', inputPer1M: 0, outputPer1M: 0, free: true, latencyMs: 300, contextWindow: '10M' },
  { id: 'phi-5', name: 'Phi-5', icon: '🔷', provider: 'Microsoft', inputPer1M: 0, outputPer1M: 0, free: true, latencyMs: 200, contextWindow: '128K' },
  { id: 'qwen-3', name: 'Qwen 3', icon: '🌏', provider: 'Alibaba', inputPer1M: 0.30, outputPer1M: 0.60, latencyMs: 350, contextWindow: '128K' },
  { id: 'cohere-command-r', name: 'Command R+', icon: '🏢', provider: 'Cohere', inputPer1M: 2.50, outputPer1M: 10, latencyMs: 500, contextWindow: '128K' },
];

/* ─── Usage Scenario Presets ─── */
interface Scenario {
  name: string;
  icon: string;
  desc: string;
  tokens: number;
  inputRatio: number;
  avgTokensPerReq: number;
}
const SCENARIOS: Scenario[] = [
  { name: 'Hobby Chatbot', icon: '💬', desc: 'Casual personal use', tokens: 5, inputRatio: 80, avgTokensPerReq: 2000 },
  { name: 'Code Assistant', icon: '💻', desc: 'Daily coding companion', tokens: 50, inputRatio: 60, avgTokensPerReq: 4000 },
  { name: 'Content Writer', icon: '✍️', desc: 'Blog posts, articles, marketing', tokens: 20, inputRatio: 30, avgTokensPerReq: 3000 },
  { name: 'Data Pipeline', icon: '📊', desc: 'Automated processing, extraction', tokens: 200, inputRatio: 90, avgTokensPerReq: 8000 },
  { name: 'Enterprise Support', icon: '🏢', desc: 'Customer service automation', tokens: 100, inputRatio: 70, avgTokensPerReq: 2500 },
  { name: 'Custom', icon: '⚙️', desc: 'Set your own parameters', tokens: 10, inputRatio: 70, avgTokensPerReq: 3000 },
];

type TimePeriod = 'daily' | 'monthly' | 'annual';
const PERIOD_MULTIPLIERS: Record<TimePeriod, number> = { daily: 1 / 30, monthly: 1, annual: 12 };
const PERIOD_LABELS: Record<TimePeriod, string> = { daily: 'day', monthly: 'mo', annual: 'yr' };

export const PricingCalculator: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();

  const [selectedModels, setSelectedModels] = useState<string[]>(['gemini-2-5-flash', 'claude-sonnet-4-5', 'deepseek-v3', 'gpt-5-mini']);
  const [monthlyTokensM, setMonthlyTokensM] = useState(10);
  const [inputRatio, setInputRatio] = useState(70);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const [budgetCap, setBudgetCap] = useState<number | null>(null);
  const [budgetInput, setBudgetInput] = useState('');
  const [scenario, setScenario] = useState<string>('Custom');
  const [avgTokensPerReq, setAvgTokensPerReq] = useState(3000);
  const [copiedTable, setCopiedTable] = useState(false);
  const [showProviders, setShowProviders] = useState(false);

  const toggleModel = (id: string) => {
    setSelectedModels(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const applyScenario = (s: Scenario) => {
    setScenario(s.name);
    if (s.name !== 'Custom') {
      setMonthlyTokensM(s.tokens);
      setInputRatio(s.inputRatio);
      setAvgTokensPerReq(s.avgTokensPerReq);
    }
  };

  const setBudget = () => {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) setBudgetCap(val);
    else setBudgetCap(null);
  };

  const calculations = useMemo(() => {
    const mult = PERIOD_MULTIPLIERS[timePeriod];
    const inputTokensM = monthlyTokensM * (inputRatio / 100) * mult;
    const outputTokensM = monthlyTokensM * ((100 - inputRatio) / 100) * mult;

    return selectedModels
      .map(id => {
        const model = modelPricing.find(m => m.id === id);
        if (!model) return null;
        const cost = (inputTokensM * model.inputPer1M) + (outputTokensM * model.outputPer1M);
        const totalTokensM = inputTokensM + outputTokensM;
        const requestsEstimate = totalTokensM > 0 ? (totalTokensM * 1_000_000) / avgTokensPerReq : 0;
        const costPerReq = requestsEstimate > 0 ? cost / requestsEstimate : 0;
        return { ...model, cost, inputCost: inputTokensM * model.inputPer1M, outputCost: outputTokensM * model.outputPer1M, requestsEstimate, costPerReq };
      })
      .filter(Boolean)
      .sort((a, b) => a!.cost - b!.cost) as (PricingData & { cost: number; inputCost: number; outputCost: number; requestsEstimate: number; costPerReq: number })[];
  }, [selectedModels, monthlyTokensM, inputRatio, timePeriod, avgTokensPerReq]);

  const maxCost = Math.max(...calculations.map(c => c.cost), 1);
  const cheapest = calculations[0];
  const mostExpensive = calculations[calculations.length - 1];
  const periodLabel = PERIOD_LABELS[timePeriod];
  const providers = useMemo(() => [...new Set(modelPricing.map(m => m.provider))], []);

  const annualProjection = useMemo(() => {
    if (timePeriod === 'annual') return null;
    const mult = timePeriod === 'daily' ? 365 : 12;
    return calculations.map(c => ({
      name: c.name, icon: c.icon,
      annual: c.cost * mult,
      annualDiscounted: c.cost * mult * 0.85,
    }));
  }, [calculations, timePeriod]);

  const exportTable = () => {
    const lines = [`AI Pricing Estimate — ${monthlyTokensM}M tokens/${periodLabel}, ${inputRatio}% input`, ''];
    lines.push('Model | Cost/' + periodLabel + ' | Input$/1M | Output$/1M | $/request');
    lines.push('--- | --- | --- | --- | ---');
    calculations.forEach(c => {
      lines.push(`${c.icon} ${c.name} | $${c.cost.toFixed(2)} | $${c.inputPer1M.toFixed(2)} | $${c.outputPer1M.toFixed(2)} | $${c.costPerReq.toFixed(4)}`);
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedTable(true);
    setTimeout(() => setCopiedTable(false), 2000);
  };

  const cardCls = 'p-6 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10';

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <SEO title="Pricing Calculator" description="Compare AI model pricing with usage scenarios, budget planning, and cost projections." path="/pricing" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible">

          {/* Header */}
          <div className="text-center mb-12">
            <Calculator size={48} className="mx-auto mb-4 text-[var(--accent-color)]" />
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
              Pricing <span className="text-[var(--accent-color)]">Intelligence</span>
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Compare costs across 21 AI models. Set budgets, pick usage scenarios, and project annual spend.
            </p>
          </div>

          {/* ══════ Usage Scenarios ══════ */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 opacity-70 flex items-center gap-2">
              <Zap size={14} /> Quick Scenarios
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SCENARIOS.map(s => (
                <button
                  key={s.name}
                  onClick={() => applyScenario(s)}
                  className={`p-3 rounded-xl text-left transition-all border ${
                    scenario === s.name
                      ? 'bg-[var(--accent-color)]/15 border-[var(--accent-color)]/40 shadow-md'
                      : 'bg-[var(--secondary-color)]/40 border-[var(--accent-color)]/10 hover:border-[var(--accent-color)]/30'
                  }`}
                >
                  <span className="text-lg">{s.icon}</span>
                  <div className="text-xs font-semibold mt-1">{s.name}</div>
                  <div className="text-[10px] opacity-40 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ══════ Controls Grid ══════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Token Usage */}
            <div className={cardCls}>
              <h3 className="text-sm font-semibold mb-3 opacity-70 flex items-center gap-2">
                <Layers size={14} /> Monthly Tokens
              </h3>
              <input
                type="range" min={1} max={500} value={monthlyTokensM}
                onChange={e => { setMonthlyTokensM(Number(e.target.value)); setScenario('Custom'); }}
                className="w-full accent-[var(--accent-color)] mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="opacity-40">{(monthlyTokensM * 1_000_000).toLocaleString()} tokens</span>
                <span className="font-bold text-[var(--accent-color)]">{monthlyTokensM}M</span>
              </div>
            </div>

            {/* I/O Ratio */}
            <div className={cardCls}>
              <h3 className="text-sm font-semibold mb-3 opacity-70 flex items-center gap-2">
                <ArrowRight size={14} /> Input / Output
              </h3>
              <input
                type="range" min={10} max={90} value={inputRatio}
                onChange={e => { setInputRatio(Number(e.target.value)); setScenario('Custom'); }}
                className="w-full accent-[var(--accent-color)] mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="text-[var(--accent-color)] font-medium">{inputRatio}% in</span>
                <span className="opacity-60">{100 - inputRatio}% out</span>
              </div>
            </div>

            {/* Tokens Per Request */}
            <div className={cardCls}>
              <h3 className="text-sm font-semibold mb-3 opacity-70 flex items-center gap-2">
                <BarChart3 size={14} /> Avg Tokens / Request
              </h3>
              <input
                type="range" min={500} max={20000} step={500} value={avgTokensPerReq}
                onChange={e => { setAvgTokensPerReq(Number(e.target.value)); setScenario('Custom'); }}
                className="w-full accent-[var(--accent-color)] mb-2"
              />
              <div className="flex justify-between text-sm">
                <span className="opacity-40">{(monthlyTokensM * 1_000_000 / avgTokensPerReq).toLocaleString(undefined, { maximumFractionDigits: 0 })} reqs/mo</span>
                <span className="font-bold text-[var(--accent-color)]">{avgTokensPerReq.toLocaleString()}</span>
              </div>
            </div>

            {/* Budget Cap */}
            <div className={cardCls}>
              <h3 className="text-sm font-semibold mb-3 opacity-70 flex items-center gap-2">
                <Target size={14} /> Budget Cap
              </h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <DollarSign size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40" />
                  <input
                    type="number" value={budgetInput} placeholder="No limit"
                    onChange={e => setBudgetInput(e.target.value)}
                    onBlur={setBudget}
                    onKeyDown={e => e.key === 'Enter' && setBudget()}
                    className="w-full pl-7 pr-2 py-2 rounded-lg bg-[var(--bg-color)] border border-[var(--accent-color)]/20 text-sm outline-none"
                  />
                </div>
                {budgetCap !== null && (
                  <button onClick={() => { setBudgetCap(null); setBudgetInput(''); }} className="px-2 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    Clear
                  </button>
                )}
              </div>
              {budgetCap !== null && (
                <p className="text-xs mt-2 text-[var(--accent-color)]">
                  Max ${budgetCap}/{periodLabel}
                </p>
              )}
            </div>
          </div>

          {/* Time Period Toggle */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="opacity-50" />
              <div className="flex rounded-xl overflow-hidden border border-[var(--accent-color)]/20">
                {(['daily', 'monthly', 'annual'] as TimePeriod[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setTimePeriod(p)}
                    className={`px-4 py-2 text-xs font-medium capitalize transition-all ${
                      timePeriod === p ? 'bg-[var(--accent-color)] text-white' : 'bg-[var(--secondary-color)]/60 hover:bg-[var(--accent-color)]/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowProviders(!showProviders)} className="px-3 py-2 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 text-xs hover:bg-[var(--accent-color)]/10 transition-colors">
                {showProviders ? 'Show All' : 'Group by Provider'}
              </button>
              <button onClick={exportTable} className="px-3 py-2 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 text-xs flex items-center gap-1.5 hover:bg-[var(--accent-color)]/10 transition-colors">
                {copiedTable ? <Check size={12} /> : <Copy size={12} />} {copiedTable ? 'Copied!' : 'Export'}
              </button>
            </div>
          </div>

          {/* ══════ Model Selection ══════ */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-3 opacity-70">Select Models ({selectedModels.length} selected)</h3>
            {showProviders ? (
              <div className="space-y-4">
                {providers.map(prov => (
                  <div key={prov}>
                    <h4 className="text-xs font-bold opacity-40 mb-2 uppercase tracking-wider">{prov}</h4>
                    <div className="flex flex-wrap gap-2">
                      {modelPricing.filter(m => m.provider === prov).map(m => (
                        <button
                          key={m.id}
                          onClick={() => toggleModel(m.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                            selectedModels.includes(m.id)
                              ? 'bg-[var(--accent-color)] text-white shadow-md'
                              : 'bg-[var(--secondary-color)] hover:bg-[var(--accent-color)]/20'
                          } ${m.free ? 'ring-1 ring-green-500/30' : ''}`}
                        >
                          <span>{m.icon}</span> {m.name}
                          {m.free && <span className="text-[9px] bg-green-500/20 text-green-400 px-1 rounded">FREE</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {modelPricing.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggleModel(m.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selectedModels.includes(m.id)
                        ? 'bg-[var(--accent-color)] text-white shadow-md'
                        : 'bg-[var(--secondary-color)] hover:bg-[var(--accent-color)]/20'
                    } ${m.free ? 'ring-1 ring-green-500/30' : ''}`}
                  >
                    <span>{m.icon}</span> {m.name}
                    {m.free && <span className="text-[9px] bg-green-500/20 text-green-400 px-1 rounded">FREE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ══════ Results ══════ */}
          {calculations.length > 0 ? (
            <>
              {/* Top Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {cheapest && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown size={16} className="text-green-400" />
                      <span className="text-xs opacity-50">Cheapest</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">${cheapest.cost.toFixed(2)}/{periodLabel}</div>
                    <div className="text-xs opacity-60">{cheapest.icon} {cheapest.name}</div>
                  </div>
                )}
                {mostExpensive && calculations.length > 1 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign size={16} className="text-red-400" />
                      <span className="text-xs opacity-50">Most Expensive</span>
                    </div>
                    <div className="text-lg font-bold text-red-400">${mostExpensive.cost.toFixed(2)}/{periodLabel}</div>
                    <div className="text-xs opacity-60">{mostExpensive.icon} {mostExpensive.name}</div>
                  </div>
                )}
                {cheapest && mostExpensive && calculations.length > 1 && (
                  <div className="p-4 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-[var(--accent-color)]" />
                      <span className="text-xs opacity-50">You Save</span>
                    </div>
                    <div className="text-lg font-bold text-[var(--accent-color)]">
                      ${(mostExpensive.cost - cheapest.cost).toFixed(2)}/{periodLabel}
                    </div>
                    <div className="text-xs opacity-60">Cheapest vs most expensive</div>
                  </div>
                )}
                {cheapest && (
                  <div className="p-4 rounded-xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 size={16} className="opacity-50" />
                      <span className="text-xs opacity-50">Cost/Request</span>
                    </div>
                    <div className="text-lg font-bold">${cheapest.costPerReq < 0.001 ? cheapest.costPerReq.toExponential(1) : cheapest.costPerReq.toFixed(4)}</div>
                    <div className="text-xs opacity-60">{cheapest.icon} {cheapest.name}</div>
                  </div>
                )}
              </div>

              {/* Cost Bars */}
              <div className="space-y-3 mb-8">
                {calculations.map((calc, i) => {
                  const overBudget = budgetCap !== null && calc.cost > budgetCap;
                  return (
                    <div key={calc.id} className={`p-4 rounded-xl border transition-all ${
                      overBudget
                        ? 'bg-red-500/5 border-red-500/20 opacity-60'
                        : 'bg-[var(--secondary-color)]/60 border-[var(--accent-color)]/10'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{calc.icon}</span>
                          <span className="font-medium">{calc.name}</span>
                          <span className="text-[10px] opacity-30 font-mono">{calc.provider}</span>
                          {i === 0 && !overBudget && <Award size={14} className="text-yellow-400" />}
                          {calc.free && <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-medium">OPEN SOURCE</span>}
                          {overBudget && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-medium">OVER BUDGET</span>}
                        </div>
                        <span className={`font-bold ${overBudget ? 'text-red-400' : 'text-[var(--accent-color)]'}`}>
                          ${calc.cost.toFixed(2)}<span className="text-xs opacity-50">/{periodLabel}</span>
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden mb-2">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: overBudget ? '#ef4444' : i === 0 ? '#22c55e' : 'var(--accent-color)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${maxCost > 0 ? (calc.cost / maxCost) * 100 : 0}%` }}
                          transition={{ duration: 0.5, delay: i * 0.04 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs opacity-40 flex-wrap gap-2">
                        <span>In: ${calc.inputCost.toFixed(2)} · Out: ${calc.outputCost.toFixed(2)}</span>
                        <span>{calc.requestsEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })} reqs · ${calc.costPerReq < 0.001 ? calc.costPerReq.toExponential(1) : calc.costPerReq.toFixed(4)}/req</span>
                        {calc.latencyMs && <span>~{calc.latencyMs >= 1000 ? (calc.latencyMs / 1000).toFixed(1) + 's' : calc.latencyMs + 'ms'} latency</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Table */}
              <div className="rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 overflow-x-auto mb-8">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--accent-color)]/10">
                      <th className="text-left px-4 py-3 font-medium opacity-50">Model</th>
                      <th className="text-right px-4 py-3 font-medium opacity-50">In $/1M</th>
                      <th className="text-right px-4 py-3 font-medium opacity-50">Out $/1M</th>
                      <th className="text-right px-4 py-3 font-medium opacity-50">Cost/{periodLabel}</th>
                      <th className="text-right px-4 py-3 font-medium opacity-50">$/request</th>
                      <th className="text-right px-4 py-3 font-medium opacity-50">Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.map((calc, i) => (
                      <tr key={calc.id} className={`border-b border-[var(--accent-color)]/5 ${budgetCap !== null && calc.cost > budgetCap ? 'opacity-40' : ''}`}>
                        <td className="px-4 py-3 font-medium">
                          {calc.icon} {calc.name}
                          {i === 0 && <Award size={12} className="inline ml-1 text-yellow-400" />}
                        </td>
                        <td className="px-4 py-3 text-right">${calc.inputPer1M.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">${calc.outputPer1M.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-[var(--accent-color)]">${calc.cost.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">${calc.costPerReq < 0.001 ? calc.costPerReq.toExponential(1) : calc.costPerReq.toFixed(4)}</td>
                        <td className="px-4 py-3 text-right text-xs opacity-50">{calc.contextWindow}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Annual Projection */}
              {annualProjection && annualProjection.length > 0 && (
                <div className={cardCls + ' mb-8'}>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-[var(--accent-color)]" />
                    Annual Projection
                    <span className="text-xs opacity-40 font-normal ml-2">Based on current {timePeriod} usage</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {annualProjection.map(p => (
                      <div key={p.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[var(--accent-color)]/5">
                        <div>
                          <span className="text-sm font-medium">{p.icon} {p.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">${p.annual.toFixed(0)}<span className="text-xs opacity-40">/yr</span></div>
                          <div className="text-[10px] text-green-400">~${p.annualDiscounted.toFixed(0)} w/ 15% commit</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] opacity-30 mt-3">* Annual commitment discounts are estimates and vary by provider.</p>
                </div>
              )}

              {/* Budget Analysis */}
              {budgetCap !== null && (
                <div className={cardCls}>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target size={18} className="text-[var(--accent-color)]" /> Budget Analysis — ${budgetCap}/{periodLabel}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-green-400 mb-2 uppercase tracking-wider">✅ Within Budget ({calculations.filter(c => c.cost <= budgetCap!).length})</h4>
                      <div className="space-y-1.5">
                        {calculations.filter(c => c.cost <= budgetCap!).map(c => (
                          <div key={c.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-green-500/5">
                            <span>{c.icon} {c.name}</span>
                            <span className="font-medium text-green-400">${c.cost.toFixed(2)}</span>
                          </div>
                        ))}
                        {calculations.filter(c => c.cost <= budgetCap!).length === 0 && (
                          <p className="text-xs opacity-40">No models fit this budget. Try increasing it.</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">❌ Over Budget ({calculations.filter(c => c.cost > budgetCap!).length})</h4>
                      <div className="space-y-1.5">
                        {calculations.filter(c => c.cost > budgetCap!).map(c => (
                          <div key={c.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-red-500/5 opacity-60">
                            <span>{c.icon} {c.name}</span>
                            <span className="font-medium text-red-400">${c.cost.toFixed(2)} (+${(c.cost - budgetCap!).toFixed(2)})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <DollarSign size={56} className="mx-auto mb-4 opacity-15" />
              <h3 className="text-xl font-bold mb-2 opacity-50">No Models Selected</h3>
              <p className="opacity-30 text-sm">Select models above to start comparing pricing.</p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
