import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface ComparisonContextType {
  selectedIds: string[];
  toggleModel: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
  count: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleModel = useCallback((id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const clearAll = useCallback(() => setSelectedIds([]), []);
  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  const value = useMemo(
    () => ({ selectedIds, toggleModel, clearAll, isSelected, count: selectedIds.length }),
    [selectedIds, toggleModel, clearAll, isSelected]
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider');
  return ctx;
};
