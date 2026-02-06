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
 *
 *  motionLevel scales ALL animation properties:
 *    0   = instant (no animation)
 *    50  = moderate
 *    100 = full dramatic entrance with extra effects
 * ──────────────────────────────────────────────────────────── */

interface ThemeMotion {
  container: Variants;
  panel: Variants;
  staggerStep: number;
  childTransition: Transition;
  /** Extra y-offset for grid items at max motion (default 24) */
  itemYMax?: number;
}

function darkMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 28, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.09,
    childTransition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 36,
  };
}

function lightMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
      exit: { opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.08,
    childTransition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    itemYMax: 30,
  };
}

function raveMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, scale: 0.85, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 18 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.75, rotate: -4 },
      visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 350, damping: 20 } },
      exit: { opacity: 0, y: -12, scale: 0.75, rotate: 4, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.05,
    childTransition: { type: 'spring', stiffness: 320, damping: 20 },
    itemYMax: 50,
  };
}

function neonMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 35, scale: 0.93 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      exit: { opacity: 0, y: -12, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.1,
    childTransition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    itemYMax: 40,
  };
}

function hackerMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'linear' } },
    },
    panel: {
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'linear' } },
      exit: { opacity: 0, y: -12, transition: { duration: 0.15, ease: 'linear' } },
    },
    staggerStep: 0.04,
    childTransition: { duration: 0.3, ease: 'linear' },
    itemYMax: 28,
  };
}

function toxicMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 35, scale: 0.93 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.88 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 18 } },
      exit: { opacity: 0, y: -12, scale: 0.88, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.08,
    childTransition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 38,
  };
}

function candyMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 25, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 16 } },
      exit: { opacity: 0, y: -12, scale: 0.92, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.09,
    childTransition: { type: 'spring', stiffness: 220, damping: 16 },
    itemYMax: 32,
  };
}

function cyberpunkMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 35, scale: 0.94 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -15, scale: 0.9, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.06,
    childTransition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 40,
  };
}

function oceanMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] } },
    },
    panel: {
      hidden: { opacity: 0, y: 20, scale: 0.97 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
      exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
    },
    staggerStep: 0.1,
    childTransition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
    itemYMax: 28,
  };
}

function sunsetMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 35 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.08,
    childTransition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 34,
  };
}

function retroMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 40, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 20 } },
      exit: { opacity: 0, y: -12, scale: 0.85, transition: { duration: 0.15, ease: 'easeIn' } },
    },
    staggerStep: 0.06,
    childTransition: { type: 'spring', stiffness: 260, damping: 18 },
    itemYMax: 44,
  };
}

function minimalistMotion(): ThemeMotion {
  return {
    container: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    },
    panel: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } },
    },
    staggerStep: 0.05,
    childTransition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 16,
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
  cyberpunk: cyberpunkMotion,
  ocean: oceanMotion,
  sunset: sunsetMotion,
  retro: retroMotion,
  minimalist: minimalistMotion,
  forest: () => ({
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    },
    panel: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    },
    staggerStep: 0.08,
    childTransition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 20,
  }),
  monochrome: () => ({
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
    },
    panel: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3, ease: 'linear' } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    },
    staggerStep: 0.04,
    childTransition: { duration: 0.3, ease: 'linear' },
    itemYMax: 10,
  }),
  synthwavex: () => ({
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
    },
    panel: {
      hidden: { opacity: 0, scale: 0.95, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
    },
    staggerStep: 0.07,
    childTransition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
    itemYMax: 28,
  }),
  seasonal: () => ({
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
    },
    panel: {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    },
    staggerStep: 0.06,
    childTransition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    itemYMax: 18,
  }),
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

  /** Grid items — ALWAYS uses simple opacity + y so whileInView never fails.
   *  At high motionLevel, y-offset and stagger increase for more dramatic effect. */
  const getItemVariants = (index: number = 0): Variants => {
    if (t < 0.05) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
    const yMax = m.itemYMax ?? 24;
    const yOffset = yMax * t;                         // bigger at high motion
    const delay = index * m.staggerStep * t;          // wider stagger at high
    const durationScale = 0.6 + t * 0.4;             // animations last longer at high
    return {
      hidden: { opacity: 0, y: yOffset },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...m.childTransition,
          delay,
          // scale duration/stiffness by motionLevel
          ...(m.childTransition as any).duration
            ? { duration: ((m.childTransition as any).duration as number) * durationScale }
            : { stiffness: ((m.childTransition as any).stiffness as number) * (0.7 + t * 0.3) },
        },
      },
    };
  };

  return { containerVariants, panelVariants, getItemVariants };
}
