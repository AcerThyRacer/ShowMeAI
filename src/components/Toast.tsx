import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Heart, Palette, Search, X, Info } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  icon?: 'success' | 'favorite' | 'theme' | 'search' | 'info';
}

interface ToastContextType {
  showToast: (message: string, icon?: Toast['icon']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let nextId = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, icon: Toast['icon'] = 'info') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const iconMap = {
    success: <CheckCircle size={18} className="text-green-400" />,
    favorite: <Heart size={18} className="text-pink-400" />,
    theme: <Palette size={18} className="text-purple-400" />,
    search: <Search size={18} className="text-blue-400" />,
    info: <Info size={18} className="text-[var(--accent-color)]" />,
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--secondary-color)] border border-[var(--accent-color)]/20 shadow-2xl backdrop-blur-xl min-w-[250px] max-w-[380px]"
            >
              {toast.icon && iconMap[toast.icon]}
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
