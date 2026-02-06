import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useComparison } from '../context/ComparisonContext';
import { aiModels } from '../data/models';
import { Scale, X } from 'lucide-react';

export const ComparisonBar: React.FC = () => {
  const { selectedIds, clearAll, toggleModel, count } = useComparison();

  if (count === 0) return null;

  const selected = selectedIds.map(id => aiModels.find(m => m.id === id)).filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[80] bg-[var(--bg-color)]/95 backdrop-blur-xl border-t border-[var(--accent-color)]/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <Scale size={20} className="text-[var(--accent-color)] shrink-0" />
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {selected.map(model => model && (
              <div key={model.id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-sm shrink-0">
                <span>{model.icon}</span>
                <span className="font-medium">{model.name}</span>
                <button onClick={() => toggleModel(model.id)} className="hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={clearAll} className="px-3 py-1.5 text-sm opacity-60 hover:opacity-100 transition-opacity">
              Clear
            </button>
            <Link
              to={`/matrix?ids=${selectedIds.join(',')}`}
              className="px-4 py-2 bg-[var(--accent-color)] text-white rounded-lg font-medium text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Scale size={16} />
              Compare {count} model{count !== 1 ? 's' : ''}
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
