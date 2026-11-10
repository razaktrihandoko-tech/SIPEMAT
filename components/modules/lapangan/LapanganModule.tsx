'use client';

import React from 'react';
import { View12LoginLapangan } from './View12LoginLapangan';
import { View13DaftarTugasSLA } from './View13DaftarTugasSLA';
import { View14DetailTugasNavigasi } from './View14DetailTugasNavigasi';
import { View15FormValidasiSelesai } from './View15FormValidasiSelesai';

interface LapanganModuleProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const LapanganModule: React.FC<LapanganModuleProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="w-full flex justify-center py-2 px-2">
      {/* Mobile Frame Realistis Tim Lapangan sesuai PRD & Desain Sistem SIPEMAT (max-w-[430px]) */}
      <div className="w-full max-w-[430px] bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden min-h-[720px] flex flex-col relative border-4 border-slate-900">
        {/* Simulated Mobile Status & App Bar Lapangan */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md select-none border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed animate-pulse">
              engineering
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider font-extrabold text-white">
                SIPEMAT Tim Lapangan
              </span>
              <span className="text-[10px] text-tertiary-fixed font-mono">
                Regu PU Jalan-01 • URC
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-tertiary-fixed text-xs font-mono">
            <span className="text-[10px] font-bold bg-slate-800 px-1.5 py-0.5 rounded">GPS OK</span>
            <span className="material-symbols-outlined text-[16px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* View Switcher Container */}
        <div className="flex-1 flex flex-col bg-surface-container-lowest overflow-hidden">
          {currentView === 'v12' && <View12LoginLapangan onNavigate={onNavigate} />}
          {currentView === 'v13' && <View13DaftarTugasSLA onNavigate={onNavigate} />}
          {currentView === 'v14' && <View14DetailTugasNavigasi onNavigate={onNavigate} />}
          {currentView === 'v15' && <View15FormValidasiSelesai onNavigate={onNavigate} />}
          {!['v12', 'v13', 'v14', 'v15'].includes(currentView) && (
            <View13DaftarTugasSLA onNavigate={onNavigate} />
          )}
        </div>
      </div>
    </div>
  );
};
