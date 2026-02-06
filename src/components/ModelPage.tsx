import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { aiModels, aiProviders } from '../data/models';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';

export const ModelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { panelVariants } = useThemeAnimations();
  const model = aiModels.find((m) => m.id === id);

  if (!model) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Model Not Found</h1>
          <Link to="/models" className="text-[var(--accent-color)] hover:underline">← Back to Models</Link>
        </div>
      </div>
    );
  }

  const provider = aiProviders.find((p) => p.id === model.providerSlug);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm opacity-60 mb-8">
          <Link to="/" className="hover:text-[var(--accent-color)]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/models" className="hover:text-[var(--accent-color)]">Models</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--accent-color)]">{model.name}</span>
        </div>

        <motion.div 
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <span className="text-6xl">{model.icon}</span>
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'hacker' ? 'font-mono' : ''}`}>
                {model.name}
              </h1>
              <div className="flex items-center gap-3 mb-3">
                <Link
                  to={`/providers/${model.providerSlug}`}
                  className="text-[var(--accent-color)] hover:underline font-medium"
                >
                  {model.provider}
                </Link>
                <span className="text-sm opacity-40">•</span>
                <span className="text-sm opacity-60">{model.releaseYear}</span>
              </div>
              <p className="text-lg font-medium text-[var(--accent-color)]">{model.tagline}</p>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {model.category.map((cat) => (
              <span key={cat} className="px-3 py-1 rounded-full text-sm bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30">
                {cat}
              </span>
            ))}
          </div>

          {/* Essay */}
          <div className="prose max-w-none mb-12">
            <div className="p-8 rounded-2xl bg-[var(--secondary-color)]/60 backdrop-blur border border-[var(--accent-color)]/10">
              {model.essay.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed opacity-90 mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-400">✅ Strengths</h3>
              <ul className="space-y-2">
                {model.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm opacity-80">
                    <span className="text-green-400 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-400">⚠️ Weaknesses</h3>
              <ul className="space-y-2">
                {model.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm opacity-80">
                    <span className="text-red-400 mt-0.5">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-6 rounded-2xl bg-[var(--secondary-color)]/60 backdrop-blur border border-[var(--accent-color)]/20 mb-12">
            <h3 className="text-xl font-bold mb-2">💰 Pricing</h3>
            <p className="text-lg">{model.pricing}</p>
          </div>

          {/* Provider link */}
          {provider && (
            <div className="p-6 rounded-2xl bg-[var(--secondary-color)]/60 backdrop-blur border border-[var(--accent-color)]/20 mb-12">
              <h3 className="text-xl font-bold mb-2">About {provider.name}</h3>
              <p className="opacity-80 mb-4">{provider.description}</p>
              <div className="flex gap-4">
                <Link
                  to={`/providers/${provider.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-color)] text-white rounded-lg hover:brightness-110 transition-all text-sm font-medium"
                >
                  Learn more about {provider.name} <ChevronRight size={14} />
                </Link>
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--accent-color)]/20 transition-all text-sm font-medium"
                >
                  Visit Website <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}

          <Link
            to="/models"
            className="inline-flex items-center gap-2 text-[var(--accent-color)] hover:underline font-medium"
          >
            <ArrowLeft size={16} /> Back to All Models
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
