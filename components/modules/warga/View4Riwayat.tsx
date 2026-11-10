'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets, Ticket } from '@/components/TicketContext';

interface View4RiwayatProps {
  onNavigate: (viewId: string) => void;
}

export const View4Riwayat: React.FC<View4RiwayatProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets } = useTickets();
  const [activeTab, setActiveTab] = useState<'Semua' | 'Diproses' | 'Selesai'>('Semua');

  // Filter only tickets reported by this citizen or relevant tickets
  const myTickets = tickets;

  const getTicketSteps = (ticket: Ticket) => [
    {
      label: 'Laporan Diterima & Verifikasi SIAK',
      time: ticket.reportedAt,
      desc: ticket.statusStep >= 2 ? 'Validasi identitas SIAK tuntas oleh Admin' : 'Menunggu seleksi verifikator Command Center',
      done: ticket.statusStep > 1,
      active: ticket.statusStep === 1,
    },
    {
      label: ticket.assignedDept ? `Disposisi OPD (${ticket.assignedDept.split('(')[0].trim()})` : 'Disposisi OPD Terkait',
      time: ticket.statusStep >= 2 ? 'Disetujui' : 'Menunggu',
      desc: ticket.sptNumber ? `${ticket.sptNumber} diterbitkan untuk ${ticket.assignedTeam || 'Regu Teknis'}` : 'Penugasan tim regu teknis lapangan',
      done: ticket.statusStep > 2,
      active: ticket.statusStep === 2,
    },
    {
      label: 'Pengerjaan Lapangan (Fisik)',
      time: ticket.statusStep === 3 ? 'Sedang Berjalan' : ticket.statusStep > 3 ? 'Selesai 100%' : 'Menunggu',
      desc: ticket.statusStep >= 3 ? 'Regu teknis melakukan perbaikan fisik di TKP' : 'Menunggu armada tiba di TKP',
      done: ticket.statusStep > 3,
      active: ticket.statusStep === 3,
    },
    {
      label: 'Berita Acara (BAP) & Tutup Tiket',
      time: ticket.completedAt || (ticket.statusStep === 4 ? 'Tuntas' : 'Estimasi Selesai'),
      desc: ticket.bapNumber ? `Nomor BAP #${ticket.bapNumber} disahkan` : 'Verifikasi hasil pengerjaan & komparasi foto',
      done: ticket.statusStep === 4,
      active: false,
    },
  ];

  const filteredTickets = myTickets.filter((t) => {
    if (activeTab === 'Diproses') return t.statusStep < 4;
    if (activeTab === 'Selesai') return t.statusStep === 4;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto max-h-[720px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <div>
          <h3 className="font-headline-sm text-base font-bold text-on-surface">
            Riwayat & Lacak Status Pengaduan
          </h3>
          <p className="text-[11px] text-secondary">
            Pantau transparansi penanganan masalah secara real-time
          </p>
        </div>
        <button
          onClick={() => {
            showToast('Data status tiket disinkronkan dengan server backend', 'refresh');
          }}
          className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary"
          title="Refresh Status"
        >
          <span className="material-symbols-outlined text-[16px]">sync</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl">
        {(['Semua', 'Diproses', 'Selesai'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab} ({
              tab === 'Semua'
                ? myTickets.length
                : tab === 'Diproses'
                ? myTickets.filter((t) => t.statusStep < 4).length
                : myTickets.filter((t) => t.statusStep === 4).length
            })
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4 pb-2">
        {filteredTickets.map((ticket) => {
          const steps = getTicketSteps(ticket);
          return (
            <div
              key={ticket.id}
              className="p-4 bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-3.5 hover:border-primary/40 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="font-mono text-xs font-bold text-primary bg-primary-fixed/20 px-2.5 py-0.5 rounded-full border border-primary/20">
                  #{ticket.id}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    ticket.statusStep === 4
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : ticket.slaStatus === 'critical'
                      ? 'bg-error-container text-on-error-container border-error/30 animate-pulse'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  Sisa: {ticket.slaRemaining}
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-secondary block">
                  {ticket.category} • {ticket.reportedAt}
                </span>
                <h4 className="font-label-lg text-sm font-bold text-on-surface mt-0.5">
                  {ticket.title}
                </h4>
              </div>

              {/* 4-Step Stepper Component */}
              <div className="bg-surface-container p-3 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase font-bold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">timeline</span>
                    Tahapan Penanganan Masalah
                  </span>
                  <span className="text-[10px] text-primary font-bold">
                    Langkah {ticket.statusStep} dari 4
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  {steps.map((st, sIdx) => {
                  return (
                    <div
                      key={sIdx}
                      className={`flex items-start gap-2.5 ${
                        st.done
                          ? 'text-on-surface'
                          : st.active
                          ? 'text-primary font-bold'
                          : 'text-secondary/70'
                      }`}
                    >
                      {/* Step Circle */}
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          st.done
                            ? 'bg-primary text-white'
                            : st.active
                            ? 'bg-primary text-white ring-4 ring-primary-fixed/50 animate-pulse'
                            : 'bg-outline-variant/60 text-on-surface'
                        }`}
                      >
                        {st.done ? '✓' : st.active ? '•' : sIdx + 1}
                      </span>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={st.active ? 'font-bold text-primary' : 'font-semibold text-on-surface'}>
                            {st.label}
                          </span>
                          <span className="text-[10px] font-mono text-secondary">
                            {st.time}
                          </span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                Integrasi PostGIS & SLA Terkawal
              </span>

              <button
                onClick={() => onNavigate('v5')}
                className="px-3 py-1.5 bg-surface-container hover:bg-primary hover:text-white text-primary rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Detail & Upvote</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

