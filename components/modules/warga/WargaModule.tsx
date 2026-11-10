'use client';

import React from 'react';
import { View1Login } from './View1Login';
import { View2Home } from './View2Home';
import { View3FormLapor } from './View3FormLapor';
import { View4Riwayat } from './View4Riwayat';
import { View5DetailLaporan } from './View5DetailLaporan';

interface WargaModuleProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const WargaModule: React.FC<WargaModuleProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="w-full flex justify-center py-2 px-2">
      {/* Mobile Frame Sederhana Standar SIPEMAT (max-w-[420px]) */}
      <div className="w-full max-w-[430px] bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden min-h-[720px] flex flex-col relative border-4 border-slate-800">
        {/* Simulated Mobile Status & App Bar */}
        <div className="bg-primary text-white px-4 py-3 flex items-center justify-between shadow-md select-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary-fixed animate-pulse">
              cell_tower
            </span>
            <span className="font-label-sm text-xs uppercase tracking-wider font-extrabold text-white">
              SIPEMAT Warga Mobile
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary-fixed text-xs font-mono">
            <span className="text-[10px] font-bold">5G</span>
            <span className="material-symbols-outlined text-[16px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_charging_full</span>
          </div>
        </div>

        {/* View Switcher Container */}
        <div className="flex-1 flex flex-col bg-surface-container-lowest overflow-hidden">
          {currentView === 'v1' && <View1Login onNavigate={onNavigate} />}
          {currentView === 'v2' && <View2Home onNavigate={onNavigate} />}
          {currentView === 'v3' && <View3FormLapor onNavigate={onNavigate} />}
          {currentView === 'v4' && <View4Riwayat onNavigate={onNavigate} />}
          {currentView === 'v5' && <View5DetailLaporan onNavigate={onNavigate} />}
          {!['v1', 'v2', 'v3', 'v4', 'v5'].includes(currentView) && (
            <View2Home onNavigate={onNavigate} />
          )}
        </div>
      </div>
    </div>
  );
};

