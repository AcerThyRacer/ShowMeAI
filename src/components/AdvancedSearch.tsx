import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { useComparison } from '../context/ComparisonContext';
import { aiModels, aiProviders } from '../data/models';
import { ArrowRight, Filter, X, Share2, ChevronDown } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { RevealCard } from './RevealCard';
import { useToast } from './Toast';
import { SEO } from './SEO';

const ALL_CATEGORIES = [
  'autonomous', 'reasoning', 'multimodal', 'coding', 'creative',
  'enterprise', 'research', 'open-source', 'science', 'speed',
  'math', 'image', 'video', 'music', 'memory', 'real-time',
  'open-weights', 'edge', 'local', 'rag', 'voice',
] as const;

const PRICING_TIERS = [
  { id: 'free', label: 'Free / Open' },
  { id: 'low', label: 'Low Cost' },
  { id: 'enterprise', label: 'Enterprise' },
] as const;

const YEAR_RANGE = { min: 2023, max: 2026 };

function matchesPricing(pricing: string, tier: string): boolean {
  const p = pricing.toLowerCase();
  if (tier === 'free') return p.includes('free') || p.includes('open') || p.includes('$0');
  if (tier === 'low') return p.includes('$0.') || p.includes('$1') || p.includes('$2') || p.includes('low') || p.includes('included');
  if (tier === 'enterprise') return p.includes('enterprise') || p.includes('seat') || p.includes('tier') || p.includes('volume') || p.includes('computation');
  return true;
}

const PROVIDERS = Array.from(new Set(aiModels.map(m => m.providerSlug)));

export const AdvancedSearch: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants, getItemVariants } = useThemeAnimations();
  const { toggleModel, isSelected } = useComparison();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params for initial state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => 
    (searchParams.get('category') || '').split(',').filter(Boolean)
  );
  const [selectedPricing, setSelectedPricing] = useState<string[]>(() =>
    (searchParams.get('pricing') || '').split(',').filter(Boolean)
  );
  const [selectedProviders, setSelectedProviders] = useState<string[]>(() =>
    (searchParams.get('provider') || '').split(',').filter(Boolean)
  );
  const [yearRange, setYearRange] = useState<[number, number]>(() => {
    const min = parseInt(searchParams.get('yearMin') || String(YEAR_RANGE.min));
    const max = parseInt(searchParams.get('yearMax') || String(YEAR_RANGE.max));
    return [min, max];
  });
  const [showFilters, setShowFilters] = useState(true);

  // Sync URL params
  const updateUrl = (cats: string[], pricing: string[], providers: string[], years: [number, number]) => {
    const params = new URLSearchParams();
    if (cats.length) params.set('category', cats.join(','));
    if (pricing.length) params.set('pricing', pricing.join(','));
    if (providers.length) params.set('provider', providers.join(','));
    if (years[0] !== YEAR_RANGE.min) params.set('yearMin', String(years[0]));
    if (years[1] !== YEAR_RANGE.max) params.set('yearMax', String(years[1]));
    setSearchParams(params, { replace: true });
  };

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter(c => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(updated);
    updateUrl(updated, selectedPricing, selectedProviders, yearRange);
  };

  const togglePricing = (tier: string) => {
    const updated = selectedPricing.includes(tier)
      ? selectedPricing.filter(t => t !== tier)
      : [...selectedPricing, tier];
    setSelectedPricing(updated);
    updateUrl(selectedCategories, updated, selectedProviders, yearRange);
  };

  const toggleProvider = (prov: string) => {
    const updated = selectedProviders.includes(prov)
      ? selectedProviders.filter(p => p !== prov)
      : [...selectedProviders, prov];
    setSelectedProviders(updated);
    updateUrl(selectedCategories, selectedPricing, updated, yearRange);
  };

  const handleYearChange = (type: 'min' | 'max', val: number) => {
    const updated: [number, number] = type === 'min' ? [val, yearRange[1]] : [yearRange[0], val];
    setYearRange(updated);
    updateUrl(selectedCategories, selectedPricing, selectedProviders, updated);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPricing([]);
    setSelectedProviders([]);
    setYearRange([YEAR_RANGE.min, YEAR_RANGE.max]);
    setSearchParams({}, { replace: true });
  };

  const shareFilters = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Filter URL copied to clipboard!', 'success');
  };

  const hasFilters = selectedCategories.length > 0 || selectedPricing.length > 0 || selectedProviders.length > 0 || yearRange[0] !== YEAR_RANGE.min || yearRange[1] !== YEAR_RANGE.max;

  const filtered = useMemo(() => {
    return aiModels.filter(m => {
      if (selectedCategories.length > 0 && !selectedCategories.some(c => m.category.includes(c))) return false;
      if (selectedPricing.length > 0 && !selectedPricing.some(t => matchesPricing(m.pricing, t))) return false;
      if (selectedProviders.length > 0 && !selectedProviders.includes(m.providerSlug)) return false;
      if (m.releaseYear < yearRange[0] || m.releaseYear > yearRange[1]) return false;
      return true;
    });
  }, [selectedCategories, selectedPricing, selectedProviders, yearRange]);

  const providerNames = useMemo(() => {
    const map: Record<string, string> = {};
    aiProviders.forEach(p => { map[p.id] = p.name; });
    return map;
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <SEO title="Advanced Search" description="Filter and discover AI models with advanced multi-select filters." path="/search" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible" className="text-center mb-8">
          <h1 className={`text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            Advanced <span className="text-[var(--accent-color)]">Search</span>
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Filter models by category, pricing, provider, and release year.
          </p>
        </motion.div>

        {/* Filter toggle + actions */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 text-sm font-medium">
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex gap-2">
            {hasFilters && (
              <>
                <button onClick={clearFilters} className="px-3 py-1.5 text-sm opacity-60 hover:opacity-100 flex items-center gap-1">
                  <X size={14} /> Clear all
                </button>
                <button onClick={shareFilters} className="px-3 py-1.5 text-sm flex items-center gap-1 opacity-60 hover:opacity-100">
                  <Share2 size={14} /> Share
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 opacity-70">Categories (multi-select)</h3>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategories.includes(cat)
                            ? 'bg-[var(--accent-color)] text-white'
                            : 'bg-[var(--bg-color)] hover:bg-[var(--accent-color)]/20'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 opacity-70">Pricing Tier</h3>
                  <div className="flex flex-wrap gap-2">
                    {PRICING_TIERS.map(tier => (
                      <button
                        key={tier.id}
                        onClick={() => togglePricing(tier.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedPricing.includes(tier.id)
                            ? 'bg-[var(--accent-color)] text-white'
                            : 'bg-[var(--bg-color)] hover:bg-[var(--accent-color)]/20'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Providers */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 opacity-70">Provider</h3>
                  <div className="flex flex-wrap gap-2">
                    {PROVIDERS.map(prov => (
                      <button
                        key={prov}
                        onClick={() => toggleProvider(prov)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedProviders.includes(prov)
                            ? 'bg-[var(--accent-color)] text-white'
                            : 'bg-[var(--bg-color)] hover:bg-[var(--accent-color)]/20'
                        }`}
                      >
                        {providerNames[prov] || prov}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 opacity-70">Release Year ({yearRange[0]} – {yearRange[1]})</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={YEAR_RANGE.min}
                      max={YEAR_RANGE.max}
                      value={yearRange[0]}
                      onChange={e => handleYearChange('min', Number(e.target.value))}
                      className="flex-1 accent-[var(--accent-color)]"
                    />
                    <input
                      type="range"
                      min={YEAR_RANGE.min}
                      max={YEAR_RANGE.max}
                      value={yearRange[1]}
                      onChange={e => handleYearChange('max', Number(e.target.value))}
                      className="flex-1 accent-[var(--accent-color)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        <p className="text-center text-sm opacity-50 mb-8">
          {filtered.length} model{filtered.length !== 1 ? 's' : ''} match{filtered.length === 1 ? 'es' : ''}
          {hasFilters && ' your filters'}
        </p>

        {/* Results Grid */}
        <LayoutGroup>
          <motion.div layout="position" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((model, index) => (
                <RevealCard key={model.id} variants={getItemVariants(index % 10)}>
                  <div className="theme-card block h-full p-6 rounded-2xl bg-[var(--secondary-color)]/80 backdrop-blur border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group relative">
                    {/* Favorite + Compare buttons */}
                    <div className="absolute top-4 right-4 flex items-center gap-1">
                      <FavoriteButton id={model.id} name={model.name} size={16} />
                      <button
                        onClick={() => toggleModel(model.id)}
                        className={`p-1.5 rounded-lg transition-all text-xs font-medium ${
                          isSelected(model.id)
                            ? 'bg-[var(--accent-color)] text-white'
                            : 'opacity-30 hover:opacity-70 hover:bg-[var(--accent-color)]/10'
                        }`}
                        title="Add to comparison"
                      >
                        ⚖️
                      </button>
                    </div>

                    <Link to={`/models/${model.id}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">{model.icon}</span>
                        <div className="flex-1 pr-16">
                          <h3 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors">{model.name}</h3>
                          <p className="text-sm opacity-60">{model.provider}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-[var(--accent-color)] mb-2">{model.tagline}</p>
                      <p className="text-sm opacity-70 mb-4 line-clamp-2">{model.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {model.category.slice(0, 4).map(cat => (
                          <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">{cat}</span>
                        ))}
                        {model.category.length > 4 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">+{model.category.length - 4}</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm font-medium text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity">
                        Read full essay <ArrowRight size={14} className="ml-1" />
                      </div>
                    </Link>
                  </div>
                </RevealCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg opacity-50">No models match your filters</p>
            <button onClick={clearFilters} className="mt-4 text-[var(--accent-color)] hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};
