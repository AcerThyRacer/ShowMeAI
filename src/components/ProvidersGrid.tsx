import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiProviders, aiModels } from '../data/models';
import { ArrowRight } from 'lucide-react';
import { RevealCard } from './RevealCard';
import { TiltCard } from './TiltCard';

export const ProvidersGrid: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants, getItemVariants } = useThemeAnimations();

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
            AI <span className="text-[var(--accent-color)]">Providers</span>
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            The companies and organizations building the AI models that are shaping our world in 2026.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiProviders.map((provider, index) => {
            const providerModels = aiModels.filter(m => m.providerSlug === provider.id);
            return (
              <RevealCard key={provider.id} variants={getItemVariants(index)}>
                <TiltCard className="h-full">
                <Link
                  to={`/providers/${provider.id}`}
                  className="theme-card block h-full p-6 rounded-2xl bg-[var(--secondary-color)]/80 backdrop-blur border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl">{provider.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold group-hover:text-[var(--accent-color)] transition-colors">
                        {provider.name}
                      </h3>
                      <p className="text-sm opacity-70 mt-1">{provider.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {providerModels.map((m) => (
                      <span key={m.id} className="text-xs px-2 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                        {m.icon} {m.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-medium text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Read full profile <ArrowRight size={14} className="ml-1" />
                  </div>
                </Link>
                </TiltCard>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
