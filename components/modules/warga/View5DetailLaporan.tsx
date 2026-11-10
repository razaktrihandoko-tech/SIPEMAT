'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets } from '@/components/TicketContext';

interface View5DetailLaporanProps {
  onNavigate: (viewId: string) => void;
}

export const View5DetailLaporan: React.FC<View5DetailLaporanProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, toggleUpvote } = useTickets();
  const ticket = tickets.find((t) => t.id === 'SPM-2026-0842') || tickets[0];

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ahmad Fauzi (Warga RT 04 Kedaton)',
      time: '25 Menit lalu',
      text: 'Kemarin malam ada pengendara motor matic hampir jatuh karena genangan air menutupi lubang ini. Mohon cepat ditambal!',
    },
    {
      id: 2,
      author: 'Dedy Irawan (Pengemudi Ojol)',
      time: '1 Jam lalu',
      text: 'Regu PU barusan tiba dengan mobil pikap dan material cold mix. Mantap respon cepatnya!',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleToggleUpvote = () => {
    toggleUpvote(ticket.id);
    if (!ticket.isUpvotedByMe) {
      showToast(
        'Upvote Berhasil Dicatat! Prioritas tiket dinaikkan di Command Center Pemkot.',
        'thumb_up',
        'success'
      );
    } else {
      showToast('Dukungan upvote dibatalkan', 'info', 'info');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: 'Budi Darmawan, S.T. (Anda)',
      time: 'Baru saja',
      text: newComment.trim(),
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
    showToast('Komentar warga berhasil ditambahkan ke linimasa publik', 'chat');
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto max-h-[720px]">
      {/* Back Header */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <button
          onClick={() => onNavigate('v2')}
          className="flex items-center gap-1 text-xs text-primary font-bold hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali</span>
        </button>
        <span className="font-mono text-xs font-bold text-secondary">
          TIKET #SPM-2026-0842
        </span>
      </div>

      {/* Hero Photo Card with Overlays */}
      <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-md border border-slate-700 bg-slate-900">
        {/* Background Visual Texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
          <span className="material-symbols-outlined text-[80px] opacity-30">road</span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between gap-1">
          <span className="bg-tertiary-container text-white font-label-sm text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Sedang Ditangani (Dinas PU)
          </span>
          <span className="bg-error text-white font-label-sm text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shadow-md">
            P1 - Prioritas Darurat
          </span>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-20 flex items-center justify-between text-white text-[10px] font-label-sm">
          <span className="bg-inverse-surface/85 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10">
            <span className="material-symbols-outlined text-[14px] text-primary-fixed">verified</span>
            Kamera Warga • EXIF Terverifikasi
          </span>
          <span className="bg-inverse-surface/85 backdrop-blur-md px-2 py-1 rounded-lg font-mono border border-white/10">
            SLA: 02j 15m
          </span>
        </div>
      </div>

      {/* Interactive Upvote Hero Banner */}
      <div className="p-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl shadow-lg space-y-2.5 border border-primary/20">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-headline-sm text-lg font-extrabold text-white flex items-center gap-1.5">
              <span>{ticket.upvotes} Dukungan Warga</span>
              <span className="text-[10px] bg-white/20 font-mono px-2 py-0.5 rounded-full uppercase">
                Trending #1
              </span>
            </div>
            <p className="text-[11px] text-primary-fixed leading-tight mt-0.5">
              Dukungan mempercepat respon eskalasi dinas terkait.
            </p>
          </div>

          <button
            onClick={handleToggleUpvote}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 ${
              ticket.isUpvotedByMe
                ? 'bg-white text-primary ring-2 ring-emerald-300'
                : 'bg-surface-container-lowest text-primary hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {ticket.isUpvotedByMe ? 'thumb_up_alt' : 'thumb_up'}
            </span>
            <span>{ticket.isUpvotedByMe ? 'Didukung!' : '+1 Upvote'}</span>
          </button>
        </div>

        <div className="p-2 bg-black/15 rounded-lg text-[10px] text-white/90 flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-primary-fixed shrink-0">
            tips_and_updates
          </span>
          <span>
            Setiap 50 upvote meningkatkan bobot prioritas tiket di Peta Heatmap Command Center.
          </span>
        </div>
      </div>

      {/* Detail Informasi Tiket */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm space-y-3">
        <div>
          <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Infrastruktur Jalan & Jembatan
          </span>
          <h3 className="font-headline-sm text-base font-bold text-on-surface mt-1.5">
            Lubang Menganga di Jl. Teuku Umar (Depan Pasar Koga)
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
            Kedalaman lubang sekitar 15-20 cm dan diameter 1.2 meter di lajur cepat. Sangat membahayakan keselamatan pengguna jalan, terutama kendaraan roda dua saat hujan lebat.
          </p>
        </div>

        {/* Lokasi Spasial */}
        <div className="p-2.5 bg-surface-container-low rounded-xl space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-on-surface flex items-center gap-1 text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-primary">place</span>
              Lokasi Kejadian
            </span>
            <button
              type="button"
              onClick={() => showToast('Membuka koordinat di Google Maps navigasi', 'map')}
              className="text-[10px] text-primary font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Buka Maps</span>
              <span className="material-symbols-outlined text-[12px]">open_in_new</span>
            </button>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Jl. Teuku Umar No. 88, Kel. Sidodadi, Kec. Kedaton, Kota Bandar Lampung
          </p>
          <div className="font-mono text-[10px] text-secondary">
            Kordinat PostGIS: -5.380120, 105.258140
          </div>
        </div>

        {/* Disposisi Info */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 bg-surface-container rounded-lg">
            <span className="text-secondary text-[10px] block">Instansi Pelaksana:</span>
            <span className="font-bold text-on-surface">Dinas Bina Marga (PUPR)</span>
          </div>
          <div className="p-2 bg-surface-container rounded-lg">
            <span className="text-secondary text-[10px] block">Surat Tugas (SPT):</span>
            <span className="font-bold font-mono text-primary">#SPT-PUPR-2026-0419</span>
          </div>
        </div>
      </div>

      {/* Citizen Comments & Discussion */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-label-sm text-xs uppercase tracking-wider font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">forum</span>
            Aspirasi & Diskusi Warga ({comments.length})
          </h4>
          <span className="text-[10px] text-secondary">Publik Terbuka</span>
        </div>

        {/* Input Comment */}
        <form onSubmit={handleAddComment} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis informasi atau update kondisi terbaru..."
            className="flex-1 h-9 px-3 rounded-lg bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
          />
          <button
            type="submit"
            className="px-3 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Kirim</span>
          </button>
        </form>

        {/* Comments Feed */}
        <div className="space-y-2 pt-1">
          {comments.map((c) => (
            <div key={c.id} className="p-2.5 bg-surface-container-low rounded-xl text-xs space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-on-surface">{c.author}</span>
                <span className="text-secondary font-mono">{c.time}</span>
              </div>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

