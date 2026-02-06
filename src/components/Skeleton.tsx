import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface SkeletonProps {
  className?: string;
}

const shimmerClass = (theme: string): string => {
  switch (theme) {
    case 'hacker': return 'skeleton-hacker';
    case 'rave': return 'skeleton-rave';
    case 'neon': return 'skeleton-neon';
    default: return 'skeleton-default';
  }
};

export const SkeletonCard: React.FC<SkeletonProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const anim = shimmerClass(theme);
  return (
    <div className={`rounded-2xl bg-[var(--secondary-color)]/60 border border-[var(--accent-color)]/10 p-6 ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-[var(--accent-color)]/10 ${anim}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-5 w-3/4 rounded bg-[var(--accent-color)]/10 ${anim}`} />
          <div className={`h-3 w-1/2 rounded bg-[var(--accent-color)]/5 ${anim}`} />
        </div>
      </div>
      <div className={`h-3 w-full rounded bg-[var(--accent-color)]/5 mb-2 ${anim}`} />
      <div className={`h-3 w-5/6 rounded bg-[var(--accent-color)]/5 mb-4 ${anim}`} />
      <div className="flex gap-2">
        <div className={`h-5 w-16 rounded-full bg-[var(--accent-color)]/10 ${anim}`} />
        <div className={`h-5 w-14 rounded-full bg-[var(--accent-color)]/10 ${anim}`} />
        <div className={`h-5 w-20 rounded-full bg-[var(--accent-color)]/10 ${anim}`} />
      </div>
    </div>
  );
};

export const SkeletonText: React.FC<SkeletonProps & { lines?: number }> = ({ className = '', lines = 3 }) => {
  const { theme } = useTheme();
  const anim = shimmerClass(theme);
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 rounded bg-[var(--accent-color)]/8 ${anim}`}
          style={{ width: `${85 + Math.random() * 15}%` }}
        />
      ))}
    </div>
  );
};

export const SkeletonPage: React.FC = () => {
  const { theme } = useTheme();
  const anim = shimmerClass(theme);
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className={`h-10 w-64 mx-auto rounded-lg bg-[var(--accent-color)]/10 mb-4 ${anim}`} />
          <div className={`h-4 w-96 max-w-full mx-auto rounded bg-[var(--accent-color)]/5 ${anim}`} />
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
