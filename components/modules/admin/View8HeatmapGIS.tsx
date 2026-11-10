'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';

interface View8HeatmapGISProps {
  onNavigate: (viewId: string) => void;
}

interface Hotspot {
  id: string;
  name: string;
  district: string;
  reportsCount: number;
  criticalCount: number;
  inProgressCount: number;
  resolvedCount: number;
  topIssue: string;
  status: 'critical' | 'warning' | 'normal';
  coords: string;
  xPercent: number; // position on map
  yPercent: number;
}

export const View8HeatmapGIS: React.FC<View8HeatmapGISProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [activeLayers, setActiveLayers] = useState({
    jalan: true,
    pju: true,
    sampah: true,
    banjir: true,
  });
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>({
    id: 'HS-KEDATON',
    name: 'Kluster Kedaton (Pusat Kota)',
    district: 'Kec. Kedaton',
    reportsCount: 38,
    criticalCount: 14,
    inProgressCount: 18,
    resolvedCount: 6,
    topIssue: 'Jalan Rusak Berlubang & Aspal Amblas',
    status: 'critical',
    coords: '-5.380120, 105.258140',
    xPercent: 48,
    yPercent: 42,
  });

  const hotspots: Hotspot[] = [
    {
      id: 'HS-KEDATON',
      name: 'Kluster Kedaton (Depan Kampus UTI - Pasar Koga)',
      district: 'Kec. Kedaton',
      reportsCount: 38,
      criticalCount: 14,
      inProgressCount: 18,
      resolvedCount: 6,
      topIssue: 'Jalan Rusak Berlubang & PJU Padam',
      status: 'critical',
      coords: '-5.380120, 105.258140',
      xPercent: 48,
      yPercent: 42,
    },
    {
      id: 'HS-TKP',
      name: 'Kluster Tanjung Karang Pusat (Kawasan Bisnis Kartini)',
      district: 'Kec. Tanjung Karang Pusat',
      reportsCount: 29,
      criticalCount: 11,
      inProgressCount: 13,
      resolvedCount: 5,
      topIssue: 'Pohon Tumbang & Kabel Listrik Semrawut',
      status: 'critical',
      coords: '-5.412350, 105.255800',
      xPercent: 38,
      yPercent: 62,
    },
    {
      id: 'HS-WAYHALIM',
      name: 'Kluster Way Halim (Stadion PKOR & Pemukiman)',
      district: 'Kec. Way Halim',
      reportsCount: 19,
      criticalCount: 4,
      inProgressCount: 9,
      resolvedCount: 6,
      topIssue: 'Sampah Liar di Bahu Jalan & Drainase Mampet',
      status: 'warning',
      coords: '-5.394100, 105.279200',
      xPercent: 65,
      yPercent: 48,
    },
    {
      id: 'HS-RAJABASA',
      name: 'Kluster Terminal Rajabasa - Bundaran Haji Mena',
      district: 'Kec. Rajabasa',
      reportsCount: 22,
      criticalCount: 7,
      inProgressCount: 10,
      resolvedCount: 5,
      topIssue: 'Kemacetan Akibat Lubang Jalan & Marka Pudar',
      status: 'warning',
      coords: '-5.358900, 105.234100',
      xPercent: 32,
      yPercent: 24,
    },
    {
      id: 'HS-SUKARAME',
      name: 'Kluster Sukarame (Jalur Tol Ryacudu)',
      district: 'Kec. Sukarame',
      reportsCount: 8,
      criticalCount: 1,
      inProgressCount: 3,
      resolvedCount: 4,
      topIssue: 'Lampu Penerangan Tol Padam',
      status: 'normal',
      coords: '-5.388700, 105.301200',
      xPercent: 78,
      yPercent: 38,
    },
    {
      id: 'HS-TELUKBETUNG',
      name: 'Kluster Pesisir Teluk Betung Selatan',
      district: 'Kec. Teluk Betung',
      reportsCount: 15,
      criticalCount: 3,
      inProgressCount: 7,
      resolvedCount: 5,
      topIssue: 'Genangan Air Pasang Rob Pantai',
      status: 'warning',
      coords: '-5.448900, 105.263100',
      xPercent: 52,
      yPercent: 82,
    },
  ];

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    showToast(`Layer spasial ${layer.toUpperCase()} diperbarui`, 'layers');
  };

  return (
    <div className="w-full space-y-5">
      {/* 1. Header Kartu Halaman */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">map</span>
            <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold">
              Peta Heatmap GIS & Kluster Masalah Kota
            </h1>
            <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              POSTGIS LIVE
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Visualisasi Sebaran 131 Laporan Aktif di Wilayah Kota Bandar Lampung</span>
            <span>•</span>
            <span className="text-secondary font-mono text-xs">Akurasi Geospasial PostGIS EPSG:4326</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('v7')}
            className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">speed</span>
            <span>Kembali ke Dashboard (View 7)</span>
          </button>
          <button
            onClick={() => onNavigate('v9')}
            className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Meja Verifikasi Tiket (View 9)</span>
          </button>
        </div>
      </div>

      {/* 2. Layout Grid: Peta GIS Kiri (8 Kolom) + Panel Kluster Kanan (4 Kolom) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Kolom Kiri: Peta Spasial Interaktif (8 Kolom) */}
        <div className="xl:col-span-8 space-y-3">
          {/* Layer Filter Toolbar */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-secondary uppercase text-[11px] mr-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">layers</span>
                Filter Layer:
              </span>

              <button
                onClick={() => toggleLayer('jalan')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeLayers.jalan ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">add_road</span>
                <span>Jalan (58)</span>
              </button>

              <button
                onClick={() => toggleLayer('pju')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeLayers.pju ? 'bg-tertiary text-white shadow-sm' : 'bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                <span>PJU (34)</span>
              </button>

              <button
                onClick={() => toggleLayer('sampah')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeLayers.sampah ? 'bg-amber-600 text-white shadow-sm' : 'bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">delete</span>
                <span>Sampah (22)</span>
              </button>

              <button
                onClick={() => toggleLayer('banjir')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  activeLayers.banjir ? 'bg-cyan-700 text-white shadow-sm' : 'bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">water_damage</span>
                <span>Drainase (17)</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-secondary">
              GPS Center: -5.4000, 105.2667
            </div>
          </div>

          {/* Canvas Peta Digital Bergaya Dark Command Center */}
          <div className="relative w-full h-[540px] bg-slate-950 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-xl select-none">
            {/* Grid Lines Pattern */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>

            {/* Simulated Bandar Lampung Coastline & Main Arterials */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Main Arterial: Jl. Soekarno-Hatta ByPass */}
              <path
                d="M 50 40 Q 250 150 450 180 T 800 480"
                fill="none"
                stroke="#008378"
                strokeWidth="4"
                strokeDasharray="8 4"
              />
              {/* Arterial: Jl. Teuku Umar - Jl. ZA Pagar Alam */}
              <path
                d="M 200 80 L 400 300 L 520 520"
                fill="none"
                stroke="#316bf3"
                strokeWidth="3"
              />
              {/* Coastline Teluk Lampung */}
              <path
                d="M 100 520 Q 300 490 500 520 T 850 540"
                fill="none"
                stroke="#0284c7"
                strokeWidth="6"
              />
            </svg>

            {/* Telemetri Kiri Atas */}
            <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-white font-mono text-[11px] space-y-1 shadow-lg max-w-xs">
              <div className="flex items-center gap-2 text-primary-fixed font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>GEOGRAPHIC INFORMATION SYSTEM</span>
              </div>
              <div className="text-slate-300 text-[10px]">
                Pemkot Bandar Lampung × UTI GIS Lab
              </div>
              <div className="text-[10px] text-slate-400 pt-0.5 border-t border-slate-800">
                Peta Kerapatan Masalah (*Kernel Density Estimation*)
              </div>
            </div>

            {/* Hotspots Pin Map */}
            {hotspots.map((hs) => {
              const isSelected = selectedHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  onClick={() => {
                    setSelectedHotspot(hs);
                    showToast(`Kluster ${hs.name} dipilih`, 'pin_drop');
                  }}
                  style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  {/* Ping Animation for Critical Hotspots */}
                  {hs.status === 'critical' && (
                    <span className="absolute -inset-3 rounded-full bg-red-500/30 animate-ping pointer-events-none"></span>
                  )}
                  {hs.status === 'warning' && (
                    <span className="absolute -inset-2 rounded-full bg-amber-500/25 animate-pulse pointer-events-none"></span>
                  )}

                  {/* Pin Circle */}
                  <div
                    className={`w-11 h-11 rounded-full flex flex-col items-center justify-center font-bold text-white shadow-2xl transition-all border-2 ${
                      isSelected
                        ? 'ring-4 ring-white scale-125 z-40'
                        : 'group-hover:scale-110'
                    } ${
                      hs.status === 'critical'
                        ? 'bg-error border-red-300'
                        : hs.status === 'warning'
                        ? 'bg-amber-600 border-amber-300'
                        : 'bg-teal-600 border-teal-300'
                    }`}
                  >
                    <span className="text-[12px] font-extrabold">{hs.reportsCount}</span>
                    <span className="text-[7px] font-mono leading-none uppercase">TIKET</span>
                  </div>

                  {/* Pin Tag Label */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[9px] px-2 py-0.5 rounded shadow whitespace-nowrap pointer-events-none border border-slate-700 opacity-90 group-hover:opacity-100">
                    {hs.district}
                  </div>
                </div>
              );
            })}

            {/* Legenda Kiri Bawah */}
            <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-white text-xs space-y-2 shadow-lg">
              <span className="font-bold text-[11px] block uppercase tracking-wider text-slate-300">
                Tingkat Kepadatan Insiden
              </span>
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error border border-white"></span>
                  <span>Zona Merah (Kritis &gt; 25 Laporan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
                  <span>Zona Kuning (Peringatan 10-25 Laporan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-500 border border-white"></span>
                  <span>Zona Hijau (Terkendali &lt; 10 Laporan)</span>
                </div>
              </div>
            </div>

            {/* Zoom / Navigation Controls Kanan Atas */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
              <button
                onClick={() => showToast('Memperbesar skala peta GIS (+10%)', 'zoom_in')}
                className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
              <button
                onClick={() => showToast('Memperkecil skala peta GIS (-10%)', 'zoom_out')}
                className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <button
                onClick={() => showToast('Reset orientasi GIS ke pusat Kota Bandar Lampung', 'center_focus_strong')}
                className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow"
                title="Reset View"
              >
                <span className="material-symbols-outlined text-[18px]">my_location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Detail Popover Kluster Terpilih & Daftar Wilayah (4 Kolom) */}
        <div className="xl:col-span-4 space-y-4">
          {/* Popover Detail Hotspot Terpilih */}
          {selectedHotspot && (
            <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-md border-2 border-primary/50 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    selectedHotspot.status === 'critical'
                      ? 'bg-error text-white'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {selectedHotspot.status === 'critical' ? 'Zona Kritis P1' : 'Zona Peringatan P2'}
                </span>
                <span className="font-mono text-xs text-secondary">
                  {selectedHotspot.coords}
                </span>
              </div>

              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  {selectedHotspot.name}
                </h3>
                <p className="text-xs text-secondary mt-0.5">
                  Isu Dominan: <span className="font-bold text-on-surface">{selectedHotspot.topIssue}</span>
                </p>
              </div>

              {/* 3 Mini Stats Kluster */}
              <div className="grid grid-cols-3 gap-2 bg-surface-container p-2.5 rounded-xl text-center">
                <div>
                  <span className="text-[10px] text-error font-bold uppercase block">Darurat P1</span>
                  <span className="font-headline-sm text-lg font-extrabold text-error">
                    {selectedHotspot.criticalCount}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-tertiary font-bold uppercase block">Diproses</span>
                  <span className="font-headline-sm text-lg font-extrabold text-tertiary">
                    {selectedHotspot.inProgressCount}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-primary font-bold uppercase block">Tuntas</span>
                  <span className="font-headline-sm text-lg font-extrabold text-primary">
                    {selectedHotspot.resolvedCount}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onNavigate('v9')}
                  className="w-full py-2.5 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                  <span>Verifikasi Antrean Tiket Kluster Ini</span>
                </button>
                <button
                  onClick={() => onNavigate('v10')}
                  className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">assignment_ind</span>
                  <span>Disposisikan Armada ke TKP Kluster</span>
                </button>
              </div>
            </div>
          )}

          {/* Daftar Kluster Wilayah */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <h4 className="font-label-lg text-xs uppercase tracking-wider font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                Daftar Kluster Wilayah ({hotspots.length})
              </h4>
              <span className="text-[11px] text-secondary font-mono">Real-time</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {hotspots.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedHotspot?.id === h.id
                      ? 'bg-surface-container border-primary shadow-sm'
                      : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="font-bold text-xs text-on-surface truncate">
                      {h.district}
                    </div>
                    <div className="text-[10px] text-secondary truncate">
                      {h.topIssue}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                      h.status === 'critical'
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {h.reportsCount} Tiket
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
