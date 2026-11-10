'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets } from '@/components/TicketContext';

interface View2HomeProps {
  onNavigate: (viewId: string) => void;
}

export const View2Home: React.FC<View2HomeProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, toggleUpvote } = useTickets();
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const reportFeeds = tickets.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
    priority: t.priority,
    status: t.status,
    statusColor:
      t.statusStep === 4
        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
        : t.statusStep === 3
        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
        : 'bg-amber-100 text-amber-900',
    dept: t.assignedDept || 'Menunggu Disposisi',
    location: t.location,
    distance: t.distance || 'Sekitar lokasi Anda',
    time: t.reportedAt,
    upvotes: t.upvotes,
    isUpvotedByMe: t.isUpvotedByMe,
    icon:
      t.category.toLowerCase().includes('jalan')
        ? 'add_road'
        : t.category.toLowerCase().includes('pju') || t.category.toLowerCase().includes('listrik')
        ? 'lightbulb'
        : t.category.toLowerCase().includes('pohon') || t.category.toLowerCase().includes('lingkungan')
        ? 'park'
        : 'delete_sweep',
  }));

  const filteredReports =
    selectedFilter === 'Semua'
      ? reportFeeds
      : reportFeeds.filter((r) => r.category.toLowerCase().includes(selectedFilter.toLowerCase()) || r.status.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto max-h-[720px]">
      {/* Citizen Welcome Bar */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-secondary">Selamat Datang,</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <h3 className="font-headline-sm text-base font-bold text-on-surface">
            Budi Darmawan, S.T.
          </h3>
          <p className="text-[11px] text-secondary font-mono flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-primary">my_location</span>
            Kedaton, Bandar Lampung (GPS Aktif)
          </p>
        </div>
        <button
          onClick={() => {
            showToast('Memperbarui data laporan terbaru di sekitar...', 'refresh');
          }}
          className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
          title="Sinkronisasi GPS & Data"
        >
          <span className="material-symbols-outlined text-[18px]">sync</span>
        </button>
      </div>

      {/* Hero CTA Lapor Baru */}
      <button
        onClick={() => onNavigate('v3')}
        className="w-full p-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl shadow-lg flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer border border-primary/20 hover:shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[30px]">photo_camera</span>
          </div>
          <div className="text-left">
            <div className="font-headline-sm text-base font-bold leading-tight text-white flex items-center gap-1.5">
              <span>Buat Laporan Baru</span>
              <span className="bg-white/25 text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold">
                Kamera GPS
              </span>
            </div>
            <div className="font-label-sm text-[11px] text-primary-fixed mt-0.5">
              Foto kondisi, otomatis geotagging, kirim cepat
            </div>
          </div>
        </div>
        <span className="material-symbols-outlined text-white text-[28px] group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </button>

      {/* Mini Stats 3 Grid */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onNavigate('v4')}
          className="bg-surface-container p-2.5 rounded-xl text-center hover:bg-surface-container-high transition-all border border-surface-container-high cursor-pointer"
        >
          <span className="font-headline-sm text-lg font-extrabold text-primary block">
            3
          </span>
          <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
            Laporan Saya
          </span>
        </button>

        <div className="bg-surface-container p-2.5 rounded-xl text-center border border-surface-container-high">
          <span className="font-headline-sm text-lg font-extrabold text-tertiary block">
            14
          </span>
          <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
            Di Sekitar
          </span>
        </div>

        <div className="bg-surface-container p-2.5 rounded-xl text-center border border-surface-container-high">
          <span className="font-headline-sm text-lg font-extrabold text-primary block">
            98.2%
          </span>
          <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
            SLA Tuntas
          </span>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="font-label-sm text-xs uppercase tracking-wider font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
            Laporan Sekitar Anda
          </h4>
          <span className="text-[11px] text-secondary font-mono">Radius 3 km</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['Semua', 'Jalan', 'PJU', 'Sampah'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 rounded-full font-label-sm text-[11px] font-bold shrink-0 transition-colors cursor-pointer ${
                selectedFilter === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List Laporan */}
      <div className="space-y-3 pb-2">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => onNavigate('v5')}
            className="p-3.5 bg-surface-container-low rounded-xl flex gap-3 cursor-pointer hover:bg-surface-container transition-all shadow-sm border border-surface-container group"
          >
            {/* Thumbnail / Icon Kotak */}
            <div className="w-16 h-16 rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-primary shrink-0 border border-surface-container-highest group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">{report.icon}</span>
              <span className="text-[9px] font-mono font-bold text-secondary mt-0.5">FOTO</span>
            </div>

            {/* Info Laporan */}
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {report.category}
                </span>
                <span className="text-[10px] text-secondary font-mono">
                  {report.distance}
                </span>
              </div>

              <h5 className="font-label-lg text-xs font-bold text-on-surface leading-snug line-clamp-2">
                {report.title}
              </h5>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container text-[11px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUpvote(report.id);
                    showToast(
                      report.isUpvotedByMe ? 'Dukungan upvote dibatalkan' : 'Dukungan suara Anda dicatat!',
                      'thumb_up'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded transition-colors ${
                    report.isUpvotedByMe
                      ? 'bg-primary text-white'
                      : 'text-primary hover:bg-primary-fixed/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                  <span>{report.upvotes} Dukungan</span>
                </button>

                <span className={`px-2 py-0.5 rounded-md font-label-sm text-[10px] font-bold flex items-center gap-1 ${report.statusColor}`}>
                  {report.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Mini App Bar */}
      <div className="bg-surface-container-lowest border-t border-surface-container -mx-4 -mb-4 p-2.5 flex items-center justify-around text-center shadow-md">
        <button
          onClick={() => onNavigate('v2')}
          className="flex flex-col items-center text-primary font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="text-[10px]">Beranda</span>
        </button>
        <button
          onClick={() => onNavigate('v3')}
          className="flex flex-col items-center text-secondary hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span className="text-[10px]">Lapor</span>
        </button>
        <button
          onClick={() => onNavigate('v4')}
          className="flex flex-col items-center text-secondary hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
          <span className="text-[10px]">Riwayat</span>
        </button>
        <button
          onClick={() => onNavigate('v5')}
          className="flex flex-col items-center text-secondary hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">explore</span>
          <span className="text-[10px]">Detail</span>
        </button>
      </div>
    </div>
  );
};

