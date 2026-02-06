import React, { useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from './Toast';
import { useTheme } from '../context/ThemeContext';
import { useConfetti } from '../hooks/useConfetti';

interface FavoriteButtonProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, name, size = 20, className = '' }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const { theme } = useTheme();
  const { burst } = useConfetti();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const favorited = isFavorite(id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasNotFavorited = !favorited;
    toggleFavorite(id);
    showToast(
      favorited ? `Removed ${name} from favorites` : `Added ${name} to favorites`,
      'favorite'
    );
    // Confetti burst on candy theme when adding to favorites
    if (wasNotFavorited && theme === 'candy' && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      whileTap={{ scale: 0.8 }}
      onClick={handleClick}
      className={`p-1.5 rounded-lg transition-all ${
        favorited
          ? 'text-pink-400 bg-pink-400/10'
          : 'text-[var(--text-color)] opacity-30 hover:opacity-70 hover:bg-[var(--accent-color)]/10'
      } ${className}`}
      aria-label={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
    >
      <Heart size={size} fill={favorited ? 'currentColor' : 'none'} />
    </motion.button>
  );
};
