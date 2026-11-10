'use client';

import React, { useState, useEffect } from 'react';

export const Footer: React.FC = () => {
  const [liveClock, setLiveClock] = useState<string>('2026-11-10 18:30:00 WIB');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const da = String(now.getDate()).padStart(2, '0');
      const ho = String(now.getHours()).padStart(2, '0');
      const mi = String(now.getMinutes()).padStart(2, '0');
      const se = String(now.getSeconds()).padStart(2, '0');
      setLiveClock(`${yr}-${mo}-${da} ${ho}:${mi}:${se} WIB`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="fixed bottom-0 inset-x-0 h-12 bg-on-secondary-fixed text-on-secondary z-50 flex items-center shadow-[0_-1px_8px_rgba(0,0,0,0.18)] border-t border-slate-800">
      <div className="w-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3 font-label-sm text-label-sm">
        {/* Left: Strict Copyright Requirement */}
        <div className="flex items-center gap-2 truncate">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[17px] shrink-0">
            gavel
          </span>
          <span className="truncate text-slate-200 font-medium">
            Copyright©2026 by Razak Tri Handoko dan Dr. Erliyan Redy Susanto, M.Kom
          </span>
        </div>

        {/* Right: Security & Live Status Badges */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-secondary-fixed-dim font-mono text-[11px]">
            <span className="material-symbols-outlined text-[15px] text-primary-fixed">schedule</span>
            <span>Live: {mounted ? liveClock : '2026-11-10 18:30:00 WIB'}</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-teal-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Rust API • PostGIS Active</span>
          </div>

          <div className="flex items-center gap-1 bg-surface-container/20 px-2.5 py-0.5 rounded-full text-primary-fixed border border-primary-fixed/20">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span className="uppercase font-bold tracking-wider text-[10px]">
              ISO/IEC 27001 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

