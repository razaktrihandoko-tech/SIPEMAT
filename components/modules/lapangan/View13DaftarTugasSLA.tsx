'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets, Ticket } from '@/components/TicketContext';

interface View13DaftarTugasSLAProps {
  onNavigate: (viewId: string) => void;
}

export const View13DaftarTugasSLA: React.FC<View13DaftarTugasSLAProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets } = useTickets();
  const [filterPriority, setFilterPriority] = useState('Semua');

  // Filter tasks that have been dispatched (statusStep >= 2)
  const activeTickets = tickets.filter((t) => t.statusStep >= 2);
  const tasksToDisplay = activeTickets.length > 0 ? activeTickets : tickets;

  const tasks = tasksToDisplay.map((t) => ({
    id: t.id,
    sptNumber: t.sptNumber || 'SPT-PUPR-2026-0419',
    title: t.title,
    location: t.location,
    district: t.location.includes('Kedaton') ? 'Kedaton' : 'Bandar Lampung',
    priority: t.priority,
    priorityBadge: t.priority.includes('P1') ? 'bg-error text-white' : 'bg-secondary-container text-on-secondary-container',
    slaRemaining: t.slaRemaining,
    slaStatus: t.slaStatus,
    targetFinish: t.slaLimit,
    status: t.statusStep === 4 ? 'Selesai & BAP' : t.statusStep === 3 ? 'Pengerjaan Fisik' : 'Menuju TKP',
    distance: t.distance || '180 meter (Dalam Geofence)',
    category: t.category,
    instruction: t.instruction || 'Lakukan penanganan teknis sesuai standar operasional dinas.',
  }));

  const filteredTasks = tasks.filter((t) => {
    if (filterPriority === 'Semua') return true;
    if (filterPriority === 'Darurat') return t.priority.includes('P1');
    if (filterPriority === 'Sedang') return t.priority.includes('P2');
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto max-h-[720px]">
      {/* Realtime Geofence Active Alert Banner */}
      <div className="p-3 bg-slate-900 text-white rounded-2xl border-2 border-emerald-500 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Geofence Radius Aktif
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700">
                180m dari TKP
              </span>
            </div>
            <p className="text-xs font-semibold truncate text-slate-100">
              Unit Berada di Zona Pengerjaan Jl. Teuku Umar
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            showToast('GPS diperbarui. Posisi tim akurat dalam radius 3.8 meter.', 'my_location');
          }}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs shrink-0"
          title="Sinkronkan GPS"
        >
          <span className="material-symbols-outlined text-[16px]">sync</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-base font-bold text-on-surface">
            Antrean Tugas Lapangan
          </h3>
          <p className="text-[11px] text-secondary">
            Urut berdasarkan batas toleransi SLA terdekat
          </p>
        </div>
        <span className="bg-primary-fixed text-on-primary-fixed font-mono text-xs px-2.5 py-1 rounded-full font-bold">
          3 Tugas Aktif
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl">
        {['Semua', 'Darurat', 'Sedang'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterPriority(tab)}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
              filterPriority === tab
                ? 'bg-surface-container-lowest text-primary shadow-sm font-extrabold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="p-3.5 bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-3 hover:border-primary/40 transition-all"
          >
            {/* Top Bar: SPT Number & SLA Countdown */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-secondary bg-surface-container px-2 py-0.5 rounded font-bold">
                {t.sptNumber}
              </span>
              <span
                className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  t.slaStatus === 'critical'
                    ? 'bg-error-container text-on-error-container animate-pulse border border-error/30'
                    : t.slaStatus === 'warning'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-surface-container text-secondary'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <span>Sisa: {t.slaRemaining}</span>
              </span>
            </div>

            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${t.priorityBadge}`}>
                  {t.priority}
                </span>
                <span className="text-[10px] text-primary font-bold">
                  {t.category}
                </span>
              </div>
              <h4 className="font-label-lg text-sm font-bold text-on-surface leading-tight">
                {t.title}
              </h4>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">place</span>
                <span className="truncate">{t.location}</span>
              </p>
            </div>

            {/* Instruction Box */}
            <div className="p-2 bg-surface-container-low rounded-xl text-[11px] text-on-surface-variant border border-surface-container">
              <span className="font-bold text-on-surface block mb-0.5">Instruksi Danru:</span>
              <p className="line-clamp-2">{t.instruction}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate('v14')}
                className="py-2 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
                <span>Rute Maps (V14)</span>
              </button>

              <button
                onClick={() => onNavigate('v15')}
                className="py-2 px-3 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                <span>BAP Selesai (V15)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

