import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiModels } from '../data/models';
import { ArrowRight } from 'lucide-react';
import { RevealCard } from './RevealCard';
import { TiltCard } from './TiltCard';
import { FavoriteButton } from './FavoriteButton';
import { useComparison } from '../context/ComparisonContext';

const categories = [
  { id: 'all', label: 'All Models' },
  { id: 'autonomous', label: 'Autonomous' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'multimodal', label: 'Multimodal' },
  { id: 'coding', label: 'Coding' },
  { id: 'creative', label: 'Creative' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'research', label: 'Research' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'science', label: 'Science' },
  { id: 'speed', label: 'Speed' },
] as const;

/** Grouped aliases — clicking a tab matches any of these values */
const categoryAliases: Record<string, string[]> = {
  creative: ['creative', 'image', 'video', 'music', 'audio', 'art', 'voice'],
  'open-source': ['open-source', 'open-weights', 'sovereign', 'local'],
  enterprise: ['enterprise', 'rag', 'business', 'platform', 'compliance'],
  research: ['research', 'search', 'workspace'],
  speed: ['speed', 'production', 'edge', 'real-time'],
};

function filterModels(cat: string) {
  if (cat === 'all') return aiModels;
  const aliases = categoryAliases[cat];
  if (aliases) return aiModels.filter(m => m.category.some(c => aliases.includes(c)));
  return aiModels.filter(m => m.category.includes(cat));
}

export const ModelsGrid: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants, getItemVariants } = useThemeAnimations();
  const { toggleModel, isSelected } = useComparison();

  const [activeCategory, setActiveCategory] = React.useState('all');

  const filtered = useMemo(() => filterModels(activeCategory), [activeCategory]);

  // Pre-compute counts for each tab
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of categories) map[cat.id] = filterModels(cat.id).length;
    return map;
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className={`text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            State of the Art <span className="text-[var(--accent-color)]">Intelligence</span>
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            The Strategic Landscape of AI in Late 2026. A use-case-driven analysis.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[var(--accent-color)] text-white shadow-lg scale-105'
                  : 'bg-[var(--secondary-color)] hover:bg-[var(--accent-color)]/20 hover:scale-[1.02]'
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-xs ${activeCategory === cat.id ? 'opacity-80' : 'opacity-50'}`}>
                {counts[cat.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-center text-sm opacity-50 mb-8">
          Showing {filtered.length} model{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Models Grid */}
        <LayoutGroup>
          <motion.div layout="position" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((model, index) => (
                <RevealCard
                  key={model.id}
                  variants={getItemVariants(index % 10)}
                >
                  <TiltCard className="h-full">
                  <Link
                    to={`/models/${model.id}`}
                    className="theme-card block h-full p-6 rounded-2xl bg-[var(--secondary-color)]/80 backdrop-blur border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group relative"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1" onClick={e => e.preventDefault()}>
                      <FavoriteButton id={model.id} name={model.name} size={16} />
                      <button
                        onClick={(e) => { e.preventDefault(); toggleModel(model.id); }}
                        className={`p-1.5 rounded-lg transition-all text-xs ${
                          isSelected(model.id)
                            ? 'bg-[var(--accent-color)] text-white'
                            : 'opacity-30 hover:opacity-70 hover:bg-[var(--accent-color)]/10'
                        }`}
                        title="Add to comparison"
                      >
                        ⚖️
                      </button>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{model.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors">
                          {model.name}
                        </h3>
                        <p className="text-sm opacity-60">{model.provider}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[var(--accent-color)] mb-2">{model.tagline}</p>
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">{model.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {model.category.slice(0, 4).map((cat) => (
                        <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                          {cat}
                        </span>
                      ))}
                      {model.category.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                          +{model.category.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm font-medium text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read full essay <ArrowRight size={14} className="ml-1" />
                    </div>
                  </Link>
                  </TiltCard>
                </RevealCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
