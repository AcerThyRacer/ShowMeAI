import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiProviders, aiModels } from '../data/models';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { ShareButton } from './ShareButton';
import { FavoriteButton } from './FavoriteButton';

export const ProviderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const provider = aiProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Provider Not Found</h1>
          <Link to="/providers" className="text-[var(--accent-color)] hover:underline">← Back to Providers</Link>
        </div>
      </div>
    );
  }

  const providerModels = aiModels.filter((m) => m.providerSlug === provider.id);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm opacity-60 mb-8">
          <Link to="/" className="hover:text-[var(--accent-color)]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/providers" className="hover:text-[var(--accent-color)]">Providers</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--accent-color)]">{provider.name}</span>
        </div>

        <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <span className="text-6xl">{provider.icon}</span>
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'hacker' ? 'font-mono' : ''}`}>
                {provider.name}
              </h1>
              <p className="text-lg opacity-80">{provider.description}</p>
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-[var(--accent-color)] hover:underline text-sm"
              >
                {provider.website} <ExternalLink size={14} />
              </a>
              <div className="flex items-center gap-3 mt-4">
                <FavoriteButton id={provider.id} name={provider.name} size={22} />
                <ShareButton title={provider.name} text={`Explore ${provider.name} — ${provider.description}`} />
              </div>
            </div>
          </div>

          {/* Essay */}
          <div className="mb-12">
            <div className="p-8 rounded-2xl bg-[var(--secondary-color)]/60 backdrop-blur border border-[var(--accent-color)]/10">
              {provider.essay.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed opacity-90 mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Provider's Models */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Models by <span className="text-[var(--accent-color)]">{provider.name}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {providerModels.map((model) => (
                <Link
                  key={model.id}
                  to={`/models/${model.id}`}
                  className="flex items-center gap-4 p-5 rounded-xl bg-[var(--secondary-color)]/80 border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group hover:-translate-y-0.5"
                >
                  <span className="text-3xl">{model.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-[var(--accent-color)] transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-sm opacity-60">{model.tagline}</p>
                  </div>
                  <ChevronRight size={20} className="opacity-30 group-hover:opacity-100 group-hover:text-[var(--accent-color)] transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/providers"
            className="inline-flex items-center gap-2 text-[var(--accent-color)] hover:underline font-medium"
          >
            <ArrowLeft size={16} /> Back to All Providers
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
