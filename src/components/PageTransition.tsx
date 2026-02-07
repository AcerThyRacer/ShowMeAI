import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface PageTransitionProps {
  children: React.ReactNode;
  locationKey: string;
}

function getTransitionVariants(theme: string) {
  switch (theme) {
    case 'cyberpunk':
      return {
        initial: { opacity: 0, x: -8, filter: 'blur(4px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: 8, filter: 'blur(4px)' },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };
    case 'ocean':
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
      };
    case 'rave':
      return {
        initial: { opacity: 0, scale: 0.95, rotate: -1 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 1.05, rotate: 1 },
        transition: { duration: 0.25, ease: 'easeInOut' as const },
      };
    case 'sunset':
      return {
        initial: { opacity: 0, filter: 'blur(8px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, filter: 'blur(8px)' },
        transition: { duration: 0.4, ease: 'easeInOut' as const },
      };
    case 'hacker':
      return {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.15, ease: 'linear' as const },
      };
    case 'minimalist':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2, ease: 'easeInOut' as const },
      };
    default:
      return {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };
  }
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, locationKey }) => {
  const { theme, motionLevel } = useTheme();
  const variants = getTransitionVariants(theme);

  if (motionLevel < 10) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
