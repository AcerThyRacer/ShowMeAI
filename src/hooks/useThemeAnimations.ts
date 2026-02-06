import type { Variants, Transition } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/* ────────────────────────────────────────────────────────────
 *  Theme-specific animation variants.
 *
 *  Three variant sets:
 *    containerVariants – scroll-reveal for section headings (whileInView)
 *    panelVariants     – instant page / tab transitions (animate / AnimatePresence)
 *    getItemVariants   – staggered grid cards (whileInView) — ALWAYS uses
 *                        simple opacity+y so Intersection Observer never fails
 * ──────────────────────────────────────────────────────────── */

interface ThemeMotion {
  container: Variants;
  panel: Variants;
  staggerStep: number;
  childTransition: Transition;
}

function darkMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 24, scale: 0.97 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25, ease: 'easeIn' } },
    },
    staggerStep: 0.08,
    childTransition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };
}

function lightMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
      exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
    },
    staggerStep: 0.07,
    childTransition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  };
}

function raveMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.8, rotate: -3 },
      visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } },
      exit: { opacity: 0, scale: 0.8, rotate: 3, transition: { duration: 0.25 } },
    },
    staggerStep: 0.06,
    childTransition: { type: 'spring', stiffness: 280, damping: 22 },
  };
}

function neonMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
    },
    staggerStep: 0.09,
    childTransition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  };
}

function hackerMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'linear' } },
    },
    panel: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'linear' } },
      exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: 'linear' } },
    },
    staggerStep: 0.04,
    childTransition: { duration: 0.28, ease: 'linear' },
  };
}

function toxicMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
    },
    staggerStep: 0.07,
    childTransition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };
}

function candyMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 20, scale: 0.97 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 16 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.94 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 18 } },
      exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
    },
    staggerStep: 0.08,
    childTransition: { type: 'spring', stiffness: 200, damping: 18 },
  };
}

const motionMap: Record<string, () => ThemeMotion> = {
  dark: darkMotion,
  light: lightMotion,
  rave: raveMotion,
  neon: neonMotion,
  hacker: hackerMotion,
  toxic: toxicMotion,
  candy: candyMotion,
};

export function useThemeAnimations() {
  const { theme, motionLevel } = useTheme();
  const m = (motionMap[theme] ?? darkMotion)();

  // Scale animation properties by motionLevel (0 = no animations, 100 = full)
  const t = motionLevel / 100; // 0..1

  const containerVariants = t < 0.05
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : m.container;

  const panelVariants = t < 0.05
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0.1 } } }
    : m.panel;

  /** Grid items — ALWAYS uses simple opacity + y so whileInView never fails */
  const getItemVariants = (index: number = 0): Variants => {
    if (t < 0.05) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
    const delay = index * m.staggerStep * t;
    return {
      hidden: { opacity: 0, y: 24 * t },
      visible: {
        opacity: 1,
        y: 0,
        transition: { ...m.childTransition, delay },
      },
    };
  };

  return { containerVariants, panelVariants, getItemVariants };
}
