'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets, Ticket } from '@/components/TicketContext';

interface View9VerifikasiTiketProps {
  onNavigate: (viewId: string) => void;
}

export const View9VerifikasiTiket: React.FC<View9VerifikasiTiketProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, verifyTicket, rejectTicket } = useTickets();
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Get tickets pending verification, or all tickets
  const pendingTickets = tickets.filter((t) => t.status === 'Menunggu Verifikasi');
  const displayTickets = pendingTickets.length > 0 ? pendingTickets : tickets;

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    displayTickets[0]?.id || 'SPM-2026-0856'
  );

  const selectedTicket =
    displayTickets.find((t) => t.id === selectedTicketId) || displayTickets[0];

  const handleVerifyAndForward = () => {
    if (!selectedTicket) return;
    verifyTicket(selectedTicket.id);
    showToast(
      `Tiket #${selectedTicket.id} Terverifikasi Sah! Diteruskan ke Meja Disposisi OPD.`,
      'task_alt',
      'success'
    );
    setTimeout(() => {
      onNavigate('v10');
    }, 600);
  };

  const handleRejectSpam = () => {
    if (!selectedTicket) return;
    rejectTicket(selectedTicket.id);
    showToast(
      `Tiket #${selectedTicket.id} Ditolak (Kategori Spam/Hoax). Notifikasi dikirim ke pelapor.`,
      'block',
      'error'
    );
  };

  return (
    <div className="w-full space-y-5">
      {/* 1. Header Kartu Halaman */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">fact_check</span>
            <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold">
              Meja Verifikasi & Validasi Laporan Masuk
            </h1>
            <span className="bg-amber-100 text-amber-900 font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1 border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              3 MENUNGGU VALIDASI
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Pemeriksaan Bukti Visual, Pencegahan Laporan Hoax/Spam, dan Integrasi SIAK</span>
            <span>•</span>
            <span className="text-secondary font-mono text-xs">Operator: NIP 198804152012011003</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('v7')}
            className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">speed</span>
            <span>Dashboard SLA (View 7)</span>
          </button>
          <button
            onClick={() => onNavigate('v10')}
            className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
            <span>Disposisi OPD (View 10)</span>
          </button>
        </div>
      </div>

      {/* 2. Master-Detail Layout (5 Kolom Kiri, 7 Kolom Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Kolom Kiri: Antrean Tiket Masuk (5 Kolom) */}
        <div className="xl:col-span-5 space-y-3">
          {/* Search & Filter Bar */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container shadow-sm space-y-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari ID tiket, nama pelapor, atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {['Semua', 'Darurat P1', 'Belum Verifikasi'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                    filterStatus === f
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container text-secondary hover:bg-surface-container-high'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List Kartu Tiket Masuk */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {displayTickets.map((t) => {
              const isSelected = selectedTicket.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
                      : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-primary text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
                        #{t.id}
                      </span>
                      <span className="bg-error text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                        {t.priority}
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary font-mono flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {t.timeAgo || t.reportedAt}
                    </span>
                  </div>

                  <h4 className="font-label-lg text-xs font-bold text-on-surface leading-snug">
                    {t.title}
                  </h4>

                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-surface-container">
                    <span className="text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      {t.upvotes} Dukungan Warga
                    </span>
                    <span className="bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-label-sm text-[10px] font-bold">
                      Keaslian: {t.aiAuthenticity}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Meja Detail Validasi (7 Kolom) */}
        <div className="xl:col-span-7 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header Detail */}
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div>
                <span className="text-[11px] font-mono text-secondary uppercase tracking-wider block">
                  Pemeriksaan Detail Bukti Visual & Geospasial
                </span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  #{selectedTicket.id} — {selectedTicket.title}
                </h3>
              </div>
              <span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-2.5 py-1 rounded-full">
                {selectedTicket.category}
              </span>
            </div>

            {/* Inspeksi Foto & AI Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Box Foto Kamera Bukti */}
              <div className="space-y-1.5">
                <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">photo_camera</span>
                  Foto Asli Laporan Warga
                </span>
                <div className="h-44 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden relative flex flex-col justify-between p-2.5 shadow-inner">
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-[72px] opacity-40">broken_image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    EXIF Live Camera Verified
                  </div>
                  <div className="absolute bottom-2 inset-x-2 bg-black/80 backdrop-blur-sm p-1.5 rounded-lg text-white font-mono text-[9px] flex justify-between">
                    <span>GPS: {selectedTicket.coords}</span>
                    <span>Device: Android Mobile</span>
                  </div>
                </div>
              </div>

              {/* Box Hasil Anti-Hoax & AI Engine */}
              <div className="space-y-1.5">
                <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">psychology</span>
                  Analisis Validasi Sistem Anti-Hoax
                </span>
                <div className="h-44 p-3 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between text-xs space-y-1.5">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-secondary text-[11px]">Skor Keaslian Foto:</span>
                      <span className="font-mono font-bold text-primary text-xs">
                        {selectedTicket.aiAuthenticity}% Sah
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${selectedTicket.aiAuthenticity}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] pt-1 border-t border-surface-container">
                    <div className="flex justify-between">
                      <span className="text-secondary">Pendeteksian Duplikasi:</span>
                      <span className="font-bold text-emerald-700">{selectedTicket.aiDuplicateRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Pencocokan Geofence:</span>
                      <span className="font-bold text-on-surface">Radius 0m (Presisi Tinggi)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Status Identitas:</span>
                      <span className="font-bold text-primary">SIAK Disdukcapil Valid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Identitas Pelapor & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-surface-container rounded-xl space-y-1">
                <span className="text-secondary text-[10px] uppercase font-bold block">
                  Identitas Pelapor Terdaftar
                </span>
                <div className="font-bold text-on-surface">{selectedTicket.reporterName}</div>
                <div className="font-mono text-secondary text-[11px]">{selectedTicket.reporterNik}</div>
              </div>

              <div className="p-3 bg-surface-container rounded-xl space-y-1">
                <span className="text-secondary text-[10px] uppercase font-bold block">
                  Lokasi Kejadian Laporan
                </span>
                <div className="font-bold text-on-surface line-clamp-1">{selectedTicket.location}</div>
                <div className="font-mono text-primary text-[11px]">Koordinat: {selectedTicket.coords}</div>
              </div>
            </div>

            {/* Deskripsi Masalah */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container space-y-1 text-xs">
              <span className="font-bold text-secondary text-[11px] uppercase tracking-wider block">
                Deskripsi Lengkap dari Warga:
              </span>
              <p className="text-on-surface leading-relaxed">
                {selectedTicket.description}
              </p>
            </div>
          </div>

          {/* Action Bar Bawah */}
          <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={handleRejectSpam}
              className="px-3.5 py-2.5 bg-error-container hover:bg-error hover:text-white text-on-error-container font-label-md text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">block</span>
              <span>Tolak (Spam / Hoax)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('Meminta foto konfirmasi tambahan ke nomor HP pelapor', 'chat')}
                className="px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Minta Foto Ulang
              </button>

              <button
                onClick={handleVerifyAndForward}
                className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Verifikasi & Teruskan ke Disposisi OPD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
