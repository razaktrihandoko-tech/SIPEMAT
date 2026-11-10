'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets, Ticket } from '@/components/TicketContext';

interface View10DisposisiOPDProps {
  onNavigate: (viewId: string) => void;
}

export const View10DisposisiOPD: React.FC<View10DisposisiOPDProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets, dispatchTicket } = useTickets();

  const disposisiTickets = tickets.filter((t) => t.statusStep === 2 || t.status === 'Disposisi OPD');
  const readyTickets = disposisiTickets.length > 0 ? disposisiTickets : tickets;

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    readyTickets[0]?.id || 'SPM-2026-0856'
  );
  const [targetDept, setTargetDept] = useState('Dinas Bina Marga & Bina Konstruksi (PUPR)');
  const [assignedTeam, setAssignedTeam] = useState('Regu PU Jalan-01 (Danru: Supriyadi • Armada BE 9012 AZ)');
  const [slaDuration, setSlaDuration] = useState('2 Jam (Prioritas Darurat P1)');
  const [specialInstruction, setSpecialInstruction] = useState(
    'Prioritas tinggi lajur kiri arah Tanjung Karang. Lakukan penambalan aspal cold mix dan pasang rambu peringatan selama pengerjaan berlangsung.'
  );
  const [materialsNeeded, setMaterialsNeeded] = useState('2 Drum Aspal Cold Mix, 0.5 m³ Agregat Split, Stamper Kodok');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTicket =
    readyTickets.find((t) => t.id === selectedTicketId) || readyTickets[0];

  const handleIssueSPT = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTicket) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      dispatchTicket(
        currentTicket.id,
        targetDept,
        assignedTeam,
        slaDuration,
        specialInstruction,
        materialsNeeded
      );

      showToast(
        `Surat Perintah Tugas Resmi Diterbitkan untuk #${currentTicket.id}! Ditugaskan ke ${assignedTeam.split('(')[0].trim()}.`,
        'send',
        'success'
      );
      // Navigate to View 13 (Tim Lapangan) so the user can immediately test the receiving end!
      onNavigate('v13');
    }, 800);
  };

  return (
    <div className="w-full space-y-5">
      {/* 1. Header Kartu Halaman */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">assignment_ind</span>
            <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold">
              Disposisi & Penugasan Regu Teknis OPD
            </h1>
            <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              2 TIKET SIAP DISPOSISI
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Penerbitan Surat Perintah Tugas (SPT) Resmi Berdasarkan Regulasi Perwali No. 14/2026</span>
            <span>•</span>
            <span className="text-secondary font-mono text-xs">Sistem Terintegrasi GPS Regu Taktis</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate('v9')}
            className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Kembali ke Verifikasi (View 9)</span>
          </button>
          <button
            onClick={() => onNavigate('v13')}
            className="px-3.5 py-2 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-xs font-bold rounded-xl border border-primary/40 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">engineering</span>
            <span>Lihat Modul Lapangan (View 13)</span>
          </button>
        </div>
      </div>

      {/* 2. Master-Detail Layout (5 Kolom Kiri, 7 Kolom Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Kolom Kiri: Antrean Tiket Siap Disposisi (5 Kolom) */}
        <div className="xl:col-span-5 space-y-3">
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between">
            <h4 className="font-label-lg text-xs uppercase tracking-wider font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">inbox</span>
              Tiket Tervalidasi Siap Disposisi ({readyTickets.length})
            </h4>
            <span className="text-[10px] text-secondary font-mono">Antrean Prioritas</span>
          </div>

          <div className="space-y-3">
            {readyTickets.map((t) => {
              const isSelected = currentTicket.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
                      : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="bg-primary text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
                      #{t.id}
                    </span>
                    <span className="bg-error text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                      {t.priority}
                    </span>
                  </div>

                  <h5 className="font-label-lg text-xs font-bold text-on-surface">
                    {t.title}
                  </h5>

                  <div className="text-[11px] text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-primary">place</span>
                    <span>{t.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-surface-container">
                    <span className="text-secondary font-mono">Terverifikasi: {t.verifiedAt || t.reportedAt}</span>
                    <span className="bg-primary-fixed/40 text-on-primary-fixed px-2 py-0.5 rounded font-bold">
                      {t.distanceToDepot || t.distance || '1.2 km dari Posko'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Formulir Penerbitan SPT Resmi (7 Kolom) */}
        <div className="xl:col-span-7 bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between space-y-4">
          <form onSubmit={handleIssueSPT} className="space-y-4">
            {/* Header Form SPT */}
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div>
                <span className="text-[10px] font-mono text-secondary uppercase font-bold block">
                  Format Berita Acara Penerbitan Disposisi
                </span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Penerbitan Surat Perintah Tugas (SPT)
                </h3>
              </div>
              <span className="bg-surface-container text-on-surface font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-surface-container-high">
                #SPT-PUPR-2026-0419
              </span>
            </div>

            {/* Target Tiket Info Banner */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-on-surface">Tiket Rujukan: #{currentTicket.id}</span>
                <span className="text-[10px] text-primary font-bold font-mono">156 Dukungan Warga</span>
              </div>
              <p className="text-on-surface-variant text-[11px]">{currentTicket.title}</p>
            </div>

            {/* Dropdown 1: Instansi OPD Tujuan */}
            <div className="space-y-1">
              <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">account_balance</span>
                Dinas Teknis Penerima Disposisi
              </label>
              <div className="relative">
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="w-full h-11 px-3 bg-surface-container text-on-surface text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer border border-surface-container-high"
                >
                  <option value="Dinas Bina Marga & Bina Konstruksi (PUPR)">
                    Dinas Bina Marga & Bina Konstruksi (PUPR Kota)
                  </option>
                  <option value="Dinas Perhubungan (Dishub Kota)">
                    Dinas Perhubungan (Dishub Kota Bandar Lampung)
                  </option>
                  <option value="Dinas Lingkungan Hidup (DLH Kota)">
                    Dinas Lingkungan Hidup (DLH Kota Bandar Lampung)
                  </option>
                  <option value="Satpol PP & Ketertiban Umum">
                    Satuan Polisi Pamong Praja (Satpol PP)
                  </option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Dropdown 2: Regu Teknis Lapangan */}
            <div className="space-y-1">
              <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">engineering</span>
                Pilih Regu Lapangan & Armada Kendaraan
              </label>
              <div className="relative">
                <select
                  value={assignedTeam}
                  onChange={(e) => setAssignedTeam(e.target.value)}
                  className="w-full h-11 px-3 bg-surface-container text-on-surface text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer border border-surface-container-high"
                >
                  <option value="Regu PU Jalan-01 (Danru: Supriyadi • Armada BE 9012 AZ)">
                    Regu PU Jalan-01 (Danru: Supriyadi • Armada Pikap BE 9012 AZ - Status Siap)
                  </option>
                  <option value="Regu PU Jalan-02 (Danru: Hermawan • Armada BE 8810 AZ)">
                    Regu PU Jalan-02 (Danru: Hermawan • Armada Dump Truck BE 8810 AZ)
                  </option>
                  <option value="Regu Reaksi Cepat 24 Jam (Shift Malam)">
                    Regu Reaksi Cepat 24 Jam (Shift Khusus Malam)
                  </option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Pilihan Target Waktu SLA */}
            <div className="space-y-1">
              <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">timer</span>
                Target Batas Waktu Penyelesaian (SLA)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '2 Jam (P1 Darurat)', sub: 'Batas 11:30 WIB', color: 'border-error text-error bg-error-container/20' },
                  { label: '6 Jam (P2 Standar)', sub: 'Batas 15:30 WIB', color: 'border-amber-500 text-amber-900 bg-amber-50' },
                  { label: '24 Jam (P3 Rutin)', sub: 'Batas Besok Pagi', color: 'border-primary text-primary bg-primary-fixed/20' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlaDuration(item.label)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      slaDuration === item.label
                        ? `${item.color} shadow-sm ring-2 ring-primary/40`
                        : 'bg-surface-container text-secondary border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-normal opacity-80 font-mono mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instruksi Khusus & Bahan yang Diperlukan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold block">
                  Instruksi Khusus Danru:
                </label>
                <textarea
                  rows={2}
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-surface-container-high"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold block">
                  Alokasi Bahan & Peralatan:
                </label>
                <textarea
                  rows={2}
                  value={materialsNeeded}
                  onChange={(e) => setMaterialsNeeded(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-surface-container-high"
                />
              </div>
            </div>

            {/* Action Bar Terbitkan SPT */}
            <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-3">
              <span className="text-[11px] text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                Ditandatangani secara elektronik (TTE ASN)
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menerbitkan SPT...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Terbitkan SPT & Kirim ke Tim Lapangan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
