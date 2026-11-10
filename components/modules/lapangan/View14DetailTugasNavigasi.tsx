'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets } from '@/components/TicketContext';

interface View14DetailTugasNavigasiProps {
  onNavigate: (viewId: string) => void;
}

export const View14DetailTugasNavigasi: React.FC<View14DetailTugasNavigasiProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, startFieldWork } = useTickets();
  const [hasArrived, setHasArrived] = useState(true);
  const [workStarted, setWorkStarted] = useState(true);

  const ticket = tickets.find((t) => t.id === 'SPM-2026-0842') || tickets[0];
  const coords = ticket?.coords || '-5.397140, 105.266790';
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;

  const handleOpenGoogleMaps = () => {
    showToast('Membuka rute navigasi Google Maps turn-by-turn...', 'near_me');
    if (typeof window !== 'undefined') {
      window.open(mapsUrl, '_blank');
    }
  };

  const handleCheckInArrival = () => {
    setHasArrived(true);
    showToast('Check-in TKP Berhasil! Waktu kedatangan terekam di sistem Command Center.', 'pin_drop', 'success');
  };

  const handleStartWork = () => {
    setWorkStarted(true);
    if (ticket) {
      startFieldWork(ticket.id);
    }
    showToast('Status diperbarui: Regu sedang melakukan perbaikan fisik di TKP.', 'construction', 'success');
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto max-h-[720px]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <button
          onClick={() => onNavigate('v13')}
          className="flex items-center gap-1 text-xs text-primary font-bold hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Daftar Tugas (V13)</span>
        </button>
        <span className="font-mono text-xs font-bold text-secondary">
          TKP #SPM-2026-0842
        </span>
      </div>

      {/* Simulated GPS Navigation Map Container */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-md border-2 border-slate-700 bg-slate-900 flex flex-col justify-between p-3">
        {/* Map Graphical Grid & Route Line */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* SVG Route Path Visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <path
            d="M 40 180 Q 140 120, 200 130 T 310 50"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-1">
          <span className="bg-slate-900/90 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 border border-emerald-500/40 backdrop-blur-sm shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Turn-by-Turn GPS Live
          </span>

          <span className="bg-error text-white font-label-sm text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shadow">
            Sisa SLA: 42m
          </span>
        </div>

        {/* Destination Pin Overlay */}
        <div className="absolute right-12 top-8 z-10 flex flex-col items-center animate-bounce">
          <div className="p-1 bg-red-600 text-white rounded-full shadow-lg">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
          </div>
          <span className="bg-slate-950/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow mt-0.5 border border-red-500/50">
            TKP Koga
          </span>
        </div>

        {/* Start Position Pin */}
        <div className="absolute left-6 bottom-12 z-10 flex flex-col items-center">
          <div className="p-1 bg-sky-500 text-white rounded-full shadow-lg">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          </div>
          <span className="bg-slate-950/90 text-sky-300 text-[9px] font-mono px-1.5 py-0.5 rounded shadow mt-0.5 border border-sky-500/50">
            Regu PU-01
          </span>
        </div>

        {/* Bottom Route Navigation Bar */}
        <div className="relative z-10 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-slate-100 font-bold text-xs">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">turn_slight_right</span>
              <span className="truncate">Jl. Teuku Umar (Depan Pasar Koga)</span>
            </div>
            <div className="text-[10px] text-slate-300 font-mono mt-0.5">
              180 meter • Estimasi 2 Menit • Akurasi PostGIS
            </div>
          </div>

          <button
            onClick={handleOpenGoogleMaps}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 shadow transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">directions</span>
            <span>Buka Maps</span>
          </button>
        </div>
      </div>

      {/* Detail Kerusakan & Catatan Disposisi */}
      <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-secondary bg-surface-container px-2 py-0.5 rounded font-bold">
              SPT-PUPR-2026-0419
            </span>
            <h4 className="font-bold text-sm text-on-surface mt-1">
              Lubang Menganga di Jl. Teuku Umar
            </h4>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Kedaton, Bandar Lampung (Koordinat: {coords})
            </p>
          </div>
          <span className="bg-error-container text-on-error-container font-bold text-[10px] px-2 py-0.5 rounded-full shrink-0">
            P1 Darurat
          </span>
        </div>

        {/* Laporan Awal Warga */}
        <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-secondary">
            <span>Pelapor: Budi Darmawan, S.T.</span>
            <span>10 Nov, 08.15 WIB</span>
          </div>
          <p className="text-xs text-on-surface-variant italic">
            "Aspal amblas sedalam sekitar 20 cm di lajur kiri dekat halte pasar. Sangat membahayakan pengendara motor saat malam hari."
          </p>
        </div>

        {/* Action Workflow Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCheckInArrival}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                hasArrived
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {hasArrived ? 'check_circle' : 'pin_drop'}
              </span>
              <span>{hasArrived ? 'Sudah di Lokasi' : 'Check-in TKP'}</span>
            </button>

            <button
              onClick={handleStartWork}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                workStarted
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary/30'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {workStarted ? 'engineering' : 'build'}
              </span>
              <span>{workStarted ? 'Sedang Dikerjakan' : 'Mulai Fisik'}</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('v15')}
            className="w-full py-2.5 px-4 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">task_alt</span>
            <span>Lanjut Unggah Bukti & Selesai BAP (View 15)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

