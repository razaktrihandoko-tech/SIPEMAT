'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets } from '@/components/TicketContext';

interface View15FormValidasiSelesaiProps {
  onNavigate: (viewId: string) => void;
}

export const View15FormValidasiSelesai: React.FC<View15FormValidasiSelesaiProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, completeTicketWithBAP } = useTickets();
  const ticket = tickets.find((t) => t.id === 'SPM-2026-0842') || tickets[0];

  const [photoAfterTaken, setPhotoAfterTaken] = useState(true);
  const [materialsUsed, setMaterialsUsed] = useState('4 Sak Aspal Cold Mix (100 kg), Pemadatan Baby Roller 45 menit');
  const [technicianNote, setTechnicianNote] = useState(
    'Lubang telah ditambal padat rata dengan elevasi jalan eksisting. Rambu jalan telah dilepas dan lalu lintas kembali normal.'
  );
  const [tteSigned, setTteSigned] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [bapCode, setBapCode] = useState('BAP-PUPR-2026-0842');

  const handleSubmitBAP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoAfterTaken) {
      showToast('Wajib melampirkan foto hasil perbaikan dari kamera langsung', 'photo_camera', 'warning');
      return;
    }
    if (!materialsUsed.trim() || !technicianNote.trim()) {
      showToast('Mohon lengkapi data material dan catatan teknisi', 'warning', 'warning');
      return;
    }
    if (!tteSigned) {
      showToast('Mohon bubuhkan Tanda Tangan Elektronik (TTE) Danru', 'draw', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      if (ticket) {
        const generated = completeTicketWithBAP(
          ticket.id,
          '/placeholder-done.jpg',
          materialsUsed,
          technicianNote
        );
        setBapCode(generated);
      }

      setIsCompletedModalOpen(true);
      showToast(
        `Berita Acara Pemeriksaan (BAP) Berhasil Disahkan! Tiket #${ticket?.id || 'SPM-2026-0842'} Resmi Ditutup.`,
        'verified',
        'success'
      );
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto max-h-[720px] relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <button
          onClick={() => onNavigate('v14')}
          className="flex items-center gap-1 text-xs text-primary font-bold hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Detail TKP (V14)</span>
        </button>
        <span className="bg-emerald-100 text-emerald-900 font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-300">
          Form Validasi BAP
        </span>
      </div>

      <form onSubmit={handleSubmitBAP} className="space-y-3.5">
        {/* Ticket Header Bar */}
        <div className="p-3 bg-surface-container rounded-xl border border-surface-container-high flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold text-secondary">
              SPT-PUPR-2026-0419 • SPM-2026-0842
            </span>
            <h4 className="text-xs font-bold text-on-surface">
              Penambalan Aspal Jl. Teuku Umar (Koga)
            </h4>
          </div>
          <span className="text-[10px] bg-primary text-white font-mono px-2 py-0.5 rounded font-bold">
            PUPR-01
          </span>
        </div>

        {/* 1. Before & After Photo Comparison (Strict Requirement Section 10) */}
        <div className="space-y-1.5">
          <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">compare</span>
              Komparasi Foto Before & After (Bukti Fisik)
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Validasi AI 99.4%</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {/* Foto Before (Laporan Warga) */}
            <div className="rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-sm relative">
              <div className="h-28 w-full bg-slate-800 flex flex-col justify-between p-2 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <span className="material-symbols-outlined text-[48px] text-slate-300">broken_image</span>
                </div>
                <span className="relative z-10 bg-error text-white text-[9px] font-bold px-1.5 py-0.5 rounded w-fit">
                  BEFORE (Awal)
                </span>
                <div className="relative z-10 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] text-white font-mono truncate">
                  10 Nov 08.15 • Warga
                </div>
              </div>
            </div>

            {/* Foto After (Teknisi Lapangan) */}
            <div className="rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-900 shadow-sm relative">
              {photoAfterTaken ? (
                <div className="h-28 w-full bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 flex flex-col justify-between p-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-35">
                    <span className="material-symbols-outlined text-[48px] text-emerald-400">check_circle</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      AFTER (Selesai)
                    </span>
                    <button
                      type="button"
                      onClick={() => setPhotoAfterTaken(false)}
                      className="bg-black/60 text-white p-0.5 rounded hover:bg-black text-[9px]"
                      title="Foto Ulang"
                    >
                      <span className="material-symbols-outlined text-[12px]">refresh</span>
                    </button>
                  </div>
                  <div className="relative z-10 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] text-emerald-300 font-mono truncate">
                    10 Nov 10.45 • Live Kamera
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhotoAfterTaken(true)}
                  className="h-28 w-full bg-surface-container flex flex-col items-center justify-center text-primary gap-1 border-2 border-dashed border-primary/40 hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                  <span className="text-[10px] font-bold">Ambil Foto After</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Material Yang Digunakan */}
        <div className="space-y-1">
          <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">inventory_2</span>
            Material & Volume Penanganan
          </label>
          <input
            type="text"
            value={materialsUsed}
            onChange={(e) => setMaterialsUsed(e.target.value)}
            className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none border border-surface-container-high"
            placeholder="Contoh: 4 Sak Cold Mix, 1 Liter Tack Coat"
            required
          />
        </div>

        {/* 3. Catatan Penyelesaian Danru */}
        <div className="space-y-1">
          <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">notes</span>
            Catatan Teknisi / Laporan BAP
          </label>
          <textarea
            rows={2}
            value={technicianNote}
            onChange={(e) => setTechnicianNote(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none border border-surface-container-high"
            placeholder="Jelaskan kondisi penanganan..."
            required
          ></textarea>
        </div>

        {/* 4. Tanda Tangan Elektronik (TTE) Danru */}
        <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">draw</span>
              Pengesahan BAP (TTE Danru)
            </span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">BSrE Terintegrasi</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={tteSigned}
              onChange={(e) => setTteSigned(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-outline cursor-pointer"
            />
            <span className="text-[11px] text-on-surface-variant leading-tight">
              Saya menyatakan atas nama <strong>Supriyadi (NIP 198305142008011009)</strong> bahwa pekerjaan fisik telah tuntas 100% dan memenuhi standar teknis Dinas PUPR.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-label-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Memproses Penutupan Tiket Resmi...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Kirim BAP & Tutup Tiket Resmi</span>
            </>
          )}
        </button>
      </form>

      {/* MODAL SUCCESS BAP SELESAI */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-surface-container space-y-4 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-200">
                Tiket Ditutup Tuntas (SLA On-Time)
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                Penanganan Berhasil Disahkan!
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Nomor Registrasi BAP: <span className="font-mono font-bold text-on-surface">{bapCode}</span> telah diterbitkan dan tersimpan dalam audit trail PostGIS.
              </p>
            </div>

            <div className="p-3 bg-surface-container rounded-2xl text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary">Waktu Lapor:</span>
                <span className="font-mono font-medium">10 Nov 08.15 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Waktu Tuntas:</span>
                <span className="font-mono font-medium">10 Nov 10.45 WIB</span>
              </div>
              <div className="flex justify-between border-t border-surface-container-high pt-1 font-bold">
                <span className="text-on-surface">Durasi SLA Tercatat:</span>
                <span className="text-emerald-600 font-mono">2 Jam 30 Menit (Memenuhi Target)</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  onNavigate('v4');
                }}
                className="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                Lihat di Riwayat Warga (View 4)
              </button>
              <button
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  onNavigate('v13');
                }}
                className="w-full py-2 bg-surface-container text-on-surface rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors"
              >
                Kembali ke Antrean Tugas (View 13)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

