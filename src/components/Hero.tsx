import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useThemeAnimations } from '../hooks/useThemeAnimations';
import { Bot, Sparkles, BookOpen } from 'lucide-react';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { containerVariants } = useThemeAnimations();

  const getIconAnimation = () => {
    switch (theme) {
      case 'rave':
        return {
          animate: {
            scale: [1, 1.15, 0.95, 1.1, 1],
            rotate: [0, 10, -10, 5, 0],
            filter: [
              'drop-shadow(0 0 8px #ff00ff)',
              'drop-shadow(0 0 20px #00ffff)',
              'drop-shadow(0 0 20px #ffff00)',
              'drop-shadow(0 0 20px #ff00ff)',
              'drop-shadow(0 0 8px #ff00ff)',
            ],
          },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
        };
      case 'hacker':
        return {
          animate: {
            x: [0, -3, 3, -2, 2, 0],
            opacity: [1, 0.6, 1, 0.7, 1],
            filter: [
              'drop-shadow(0 0 5px #00ff00)',
              'drop-shadow(0 0 15px #00ff00)',
              'drop-shadow(0 0 5px #00ff00)',
            ],
          },
          transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 },
        };
      case 'neon':
        return {
          animate: {
            filter: [
              'drop-shadow(0 0 10px #d946ef) drop-shadow(0 0 20px #d946ef)',
              'drop-shadow(0 0 15px #00ffcc) drop-shadow(0 0 30px #00ffcc)',
              'drop-shadow(0 0 10px #d946ef) drop-shadow(0 0 20px #d946ef)',
            ],
            scale: [1, 1.05, 1],
          },
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
        };
      case 'light':
        return {
          animate: {
            y: [0, -8, 0],
            rotate: [0, 3, -3, 0],
          },
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const },
        };
      default:
        return {
          animate: {
            y: [0, -12, 0],
            filter: [
              'drop-shadow(0 0 5px rgba(59,130,246,0.3))',
              'drop-shadow(0 0 15px rgba(59,130,246,0.6))',
              'drop-shadow(0 0 5px rgba(59,130,246,0.3))',
            ],
          },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
        };
    }
  };

  const getTitleAnimation = () => {
    if (theme === 'rave') {
      return {
        animate: {
          textShadow: [
            '2px 2px #ff00de, -2px -2px #00ffff',
            '3px 3px #00ffff, -3px -3px #ff00de',
            '-2px 2px #ffff00, 2px -2px #ff00ff',
            '2px 2px #ff00de, -2px -2px #00ffff',
          ],
        },
        transition: { duration: 3, repeat: Infinity },
      };
    }
    if (theme === 'neon') {
      return {
        animate: {
          textShadow: [
            '0 0 10px var(--accent-color), 0 0 20px var(--accent-color)',
            '0 0 20px var(--accent-color), 0 0 40px var(--accent-color)',
            '0 0 10px var(--accent-color), 0 0 20px var(--accent-color)',
          ],
        },
        transition: { duration: 2, repeat: Infinity },
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-24 text-center relative overflow-hidden">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="z-10 max-w-4xl"
      >
        <motion.div
          className="mb-8 inline-block p-6 rounded-full bg-[var(--secondary-color)]/80 backdrop-blur border-2 border-[var(--accent-color)]"
          {...getIconAnimation()}
        >
          <Bot size={64} className="text-[var(--accent-color)]" />
        </motion.div>

        <motion.h1
          className={`text-5xl md:text-7xl font-bold mb-6 ${theme === 'hacker' ? 'font-mono' : ''}`}
          {...getTitleAnimation()}
        >
          Master Artificial Intelligence
        </motion.h1>

        <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
          The definitive 2026 guide to AI — learn to use AI{' '}
          <span className="text-[var(--accent-color)] font-bold">PROPERLY</span>, discover the{' '}
          <span className="text-[var(--accent-color)] font-bold">BEST</span> models, and explore every major provider.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[var(--accent-color)] text-white rounded-full font-bold text-lg shadow-lg flex items-center gap-2 mx-auto sm:mx-0 hover:brightness-110 transition-all"
            onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles size={20} />
            Start Learning
          </motion.button>

          <Link to="/models">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--secondary-color)] border-2 border-[var(--accent-color)] rounded-full font-bold text-lg shadow-lg flex items-center gap-2 mx-auto sm:mx-0 hover:bg-[var(--accent-color)]/10 transition-all"
            >
              <BookOpen size={20} />
              Explore All Models
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
