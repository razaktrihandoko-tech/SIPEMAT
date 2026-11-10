'use client';

import React from 'react';
import { View6LoginAdmin } from './View6LoginAdmin';
import { View7DashboardSLA } from './View7DashboardSLA';
import { View8HeatmapGIS } from './View8HeatmapGIS';
import { View9VerifikasiTiket } from './View9VerifikasiTiket';
import { View10DisposisiOPD } from './View10DisposisiOPD';
import { View11MasterData } from './View11MasterData';

interface AdminModuleProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const AdminModule: React.FC<AdminModuleProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="w-full space-y-4">
      {currentView === 'v6' && <View6LoginAdmin onNavigate={onNavigate} />}
      {currentView === 'v7' && <View7DashboardSLA onNavigate={onNavigate} />}
      {currentView === 'v8' && <View8HeatmapGIS onNavigate={onNavigate} />}
      {currentView === 'v9' && <View9VerifikasiTiket onNavigate={onNavigate} />}
      {currentView === 'v10' && <View10DisposisiOPD onNavigate={onNavigate} />}
      {currentView === 'v11' && <View11MasterData onNavigate={onNavigate} />}
      {!['v6', 'v7', 'v8', 'v9', 'v10', 'v11'].includes(currentView) && (
        <View7DashboardSLA onNavigate={onNavigate} />
      )}
    </div>
  );
};
