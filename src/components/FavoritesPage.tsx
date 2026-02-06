import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { useFavorites } from '../context/FavoritesContext';
import { aiModels, aiProviders } from '../data/models';
import { ArrowRight, Heart, BookOpen } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { RevealCard } from './RevealCard';
import { SEO } from './SEO';

export const FavoritesPage: React.FC = () => {
  const { theme } = useTheme();
  const { panelVariants, getItemVariants } = useThemeAnimations();
  const { favorites } = useFavorites();

  const favoriteModels = aiModels.filter(m => favorites.includes(m.id));
  const favoriteProviders = aiProviders.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative">
      <SEO title="My Favorites" description="Your bookmarked AI models and providers." path="/favorites" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={panelVariants} initial="hidden" animate="visible" className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${theme === 'hacker' ? 'font-mono' : ''}`}>
            My <span className="text-[var(--accent-color)]">Favorites</span>
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Heart size={20} className="text-pink-400" fill="currentColor" />
            {favorites.length} favorite{favorites.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {favorites.length === 0 && (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg opacity-50 mb-6">No favorites yet. Start exploring and bookmark your favorites!</p>
            <Link to="/models" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-color)] text-white rounded-full font-medium hover:brightness-110 transition-all">
              <BookOpen size={18} /> Explore Models
            </Link>
          </div>
        )}

        {favoriteModels.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Models <span className="text-sm font-normal opacity-50">({favoriteModels.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {favoriteModels.map((model, index) => (
                <RevealCard key={model.id} variants={getItemVariants(index)}>
                  <Link
                    to={`/models/${model.id}`}
                    className="theme-card block h-full p-6 rounded-2xl bg-[var(--secondary-color)]/80 backdrop-blur border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <FavoriteButton id={model.id} name={model.name} />
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{model.icon}</span>
                      <div className="flex-1 pr-8">
                        <h3 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors">{model.name}</h3>
                        <p className="text-sm opacity-60">{model.provider}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[var(--accent-color)] mb-2">{model.tagline}</p>
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">{model.description}</p>
                    <div className="flex items-center text-sm font-medium text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read full essay <ArrowRight size={14} className="ml-1" />
                    </div>
                  </Link>
                </RevealCard>
              ))}
            </div>
          </>
        )}

        {favoriteProviders.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              Providers <span className="text-sm font-normal opacity-50">({favoriteProviders.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteProviders.map((provider, index) => (
                <RevealCard key={provider.id} variants={getItemVariants(index)}>
                  <Link
                    to={`/providers/${provider.id}`}
                    className="theme-card block h-full p-6 rounded-2xl bg-[var(--secondary-color)]/80 backdrop-blur border border-[var(--accent-color)]/20 hover:border-[var(--accent-color)] transition-all group relative"
                  >
                    <div className="absolute top-4 right-4">
                      <FavoriteButton id={provider.id} name={provider.name} />
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{provider.icon}</span>
                      <div className="flex-1 pr-8">
                        <h3 className="text-2xl font-bold group-hover:text-[var(--accent-color)] transition-colors">{provider.name}</h3>
                        <p className="text-sm opacity-70 mt-1">{provider.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-[var(--accent-color)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read full profile <ArrowRight size={14} className="ml-1" />
                    </div>
                  </Link>
                </RevealCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
