'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastData {
  id: number;
  message: string;
  icon: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, icon?: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, icon = 'check_circle', type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, icon, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-14 right-4 z-[999] flex flex-col gap-2 pointer-events-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-bounce-short border ${
              toast.type === 'error'
                ? 'border-error/50 bg-[#2d1b1f]'
                : toast.type === 'warning'
                ? 'border-amber-500/50 bg-[#2d2417]'
                : 'border-primary/40'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] shrink-0 ${
                toast.type === 'error'
                  ? 'text-error'
                  : toast.type === 'warning'
                  ? 'text-amber-400'
                  : 'text-primary-fixed'
              }`}
            >
              {toast.icon}
            </span>
            <div className="flex-1 text-sm font-medium leading-tight">
              {toast.message}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-on-surface-variant hover:text-white p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

