'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets } from '@/components/TicketContext';

interface View7DashboardSLAProps {
  onNavigate: (viewId: string) => void;
}

export const View7DashboardSLA: React.FC<View7DashboardSLAProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { tickets } = useTickets();
  const [filterDept, setFilterDept] = useState('Semua OPD');

  const inProgressTickets = tickets.filter((t) => t.statusStep === 2 || t.statusStep === 3);
  const criticalTickets = tickets.filter((t) => t.slaStatus === 'critical');
  const resolvedTickets = tickets.filter((t) => t.statusStep === 4);

  const slaAlerts = [
    {
      id: 'SPM-2026-0791',
      priority: 'P1 - Darurat',
      title: 'Pohon Tumbang Timpa Kabel Listrik Utama',
      location: 'Jl. RA Kartini No. 42, Tanjung Karang Pusat',
      dept: 'Dinas Lingkungan Hidup',
      team: 'Regu DLH-02 (Belum Tiba di TKP)',
      reportedTime: '10 Nov, 06:30 WIB',
      slaLimit: 'Batas: 09:00 WIB (SLA 2.5j)',
      slaRemaining: 'LEWAT BATAS +00:41:20',
      statusType: 'critical',
      warningLabel: 'KRITIS MERAH',
    },
    {
      id: 'SPM-2026-0842',
      priority: 'P1 - Darurat',
      title: 'Jalan Berlubang Parah Depan Kampus UTI',
      location: 'Jl. Teuku Umar No. 88, Kedaton',
      dept: 'Dinas Bina Marga (PUPR)',
      team: 'Regu PU Jalan-01 (Sedang di TKP)',
      reportedTime: '10 Nov, 08:15 WIB',
      slaLimit: 'Batas: 11:30 WIB (SLA 3j)',
      slaRemaining: 'SISA 00:42:10 (Kritis)',
      statusType: 'warning',
      warningLabel: 'WARNING KUNING',
    },
    {
      id: 'SPM-2026-0818',
      priority: 'P2 - Sedang',
      title: 'Penerangan Jalan Umum (PJU) Mati di Flyover MBK',
      location: 'Jl. ZA. Pagar Alam, Kedaton',
      dept: 'Dinas Perhubungan',
      team: 'Regu PJU-03 (Menuju Lokasi)',
      reportedTime: '10 Nov, 07:10 WIB',
      slaLimit: 'Batas: 13:00 WIB (SLA 6j)',
      slaRemaining: 'SISA 01:15:30',
      statusType: 'warning',
      warningLabel: 'WARNING KUNING',
    },
    {
      id: 'SPM-2026-0850',
      priority: 'P3 - Rutin',
      title: 'Pembersihan Endapan Drainase Air Hujan',
      location: 'Jl. Raden Intan No. 12',
      dept: 'Dinas PUPR SDA',
      team: 'Regu Saluran-01 (Shift Siang)',
      reportedTime: '10 Nov, 08:30 WIB',
      slaLimit: 'Batas: 18:00 WIB (SLA 10j)',
      slaRemaining: 'SISA 07:18:20 (Aman)',
      statusType: 'normal',
      warningLabel: 'NORMAL',
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* 1. Header Kartu Halaman */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">speed</span>
            <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold">
              Dashboard Utama & Monitoring SLA Real-time
            </h1>
            <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              LIVE SENSOR
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Pusat Kendali Pengaduan Pemkot Bandar Lampung</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-secondary font-mono text-xs">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              Update: 10 Nov 2026, 18:40 WIB
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onNavigate('v8')}
            className="px-3.5 py-2 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-xs font-bold rounded-xl border border-primary/40 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Peta Heatmap (View 8)</span>
          </button>

          <button
            onClick={() => onNavigate('v9')}
            className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Meja Verifikasi (View 9)</span>
          </button>

          <button
            onClick={() => showToast('Mengekspor laporan analitik ke file format PDF/Excel...', 'download')}
            className="px-3 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">download</span>
            <span className="hidden sm:inline">Ekspor</span>
          </button>
        </div>
      </div>

      {/* 2. Empat Kartu KPI Agregat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Total Pengaduan Masuk */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Total Pengaduan Masuk
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">
              {1280 + tickets.length}
            </div>
            <div className="font-label-sm text-xs text-primary flex items-center gap-1 mt-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +{tickets.length} pengaduan aktif
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">inbox</span>
          </div>
        </div>

        {/* KPI 2: Dalam Penanganan OPD */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Dalam Penanganan OPD
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-tertiary mt-1">
              {inProgressTickets.length} Tiket
            </div>
            <div className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">engineering</span>
              Regu PU & Dishub Aktif
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]">pending_actions</span>
          </div>
        </div>

        {/* KPI 3: Peringatan Kritis SLA (Variant Kritis) */}
        <div className="p-5 rounded-2xl shadow-sm border-2 border-error/50 flex items-center justify-between bg-gradient-to-br from-white to-error-container/40 relative overflow-hidden">
          <div>
            <span className="font-label-sm text-xs text-error uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              Peringatan Kritis SLA
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-error mt-1">
              {criticalTickets.length} Tiket
            </div>
            <div className="font-label-sm text-xs text-error flex items-center gap-1 mt-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              Memerlukan Eskalasi Kadis
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[28px]">timer_off</span>
          </div>
        </div>

        {/* KPI 4: Tingkat Penyelesaian */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Kepatuhan SLA Kota
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-primary mt-1">
              94.2%
            </div>
            <div className="font-label-sm text-xs text-primary flex items-center gap-1 mt-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Rata-rata Tuntas: 4.8 Jam
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined text-[28px]">check_circle</span>
          </div>
        </div>
      </div>

      {/* 3. Grid 8 Kolom (Tabel SLA Darurat) + 4 Kolom (Distribusi Beban OPD) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Kolom Kiri: Tabel Peringatan SLA Darurat (8 Kolom) */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden flex flex-col justify-between">
          <div>
            {/* Table Header Card */}
            <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-[22px]">timer_off</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base font-bold text-on-surface">
                    Tabel Peringatan SLA Darurat
                  </h2>
                  <p className="text-xs text-secondary">
                    Tiket yang mendekati tenggat atau telah melewati Service Level Agreement Perwali
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="h-8 px-2.5 bg-surface-container text-xs rounded-lg font-medium border border-surface-container-high focus:outline-none"
                >
                  <option>Semua OPD</option>
                  <option>Dinas PUPR</option>
                  <option>Dinas LH</option>
                  <option>Dinas Perhubungan</option>
                </select>
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-xs">
                <thead className="bg-surface-container font-label-md text-[11px] text-secondary uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">No. Tiket</th>
                    <th className="p-3.5">Kategori & Lokasi Masalah</th>
                    <th className="p-3.5">OPD & Regu</th>
                    <th className="p-3.5">Batas SLA & Sisa Waktu</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {slaAlerts.map((row) => (
                    <tr
                      key={row.id}
                      className={`transition-colors ${
                        row.statusType === 'critical'
                          ? 'bg-error-container/20 hover:bg-error-container/30'
                          : row.statusType === 'warning'
                          ? 'bg-amber-50 hover:bg-amber-100/50'
                          : 'hover:bg-surface-container-low'
                      }`}
                    >
                      {/* 1. ID Tiket */}
                      <td className="p-3.5 font-mono">
                        <span className={`font-bold block ${row.statusType === 'critical' ? 'text-error' : 'text-on-surface'}`}>
                          #{row.id}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase inline-block mt-0.5 ${
                          row.priority.includes('P1') ? 'bg-error text-white' : 'bg-surface-container text-secondary'
                        }`}>
                          {row.priority}
                        </span>
                      </td>

                      {/* 2. Judul & Lokasi */}
                      <td className="p-3.5 max-w-xs">
                        <div className="font-bold text-on-surface line-clamp-1">
                          {row.title}
                        </div>
                        <div className="text-[11px] text-secondary flex items-center gap-1 mt-0.5 truncate">
                          <span className="material-symbols-outlined text-[13px] text-primary">place</span>
                          {row.location}
                        </div>
                      </td>

                      {/* 3. OPD & Regu */}
                      <td className="p-3.5">
                        <span className="font-semibold text-on-surface block">
                          {row.dept}
                        </span>
                        <span className="text-[10px] text-secondary font-mono">
                          {row.team}
                        </span>
                      </td>

                      {/* 4. SLA Remaining */}
                      <td className="p-3.5">
                        <div className="text-[10px] text-secondary font-mono">
                          {row.slaLimit}
                        </div>
                        <span
                          className={`font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1 mt-1 font-mono ${
                            row.statusType === 'critical'
                              ? 'bg-error text-white animate-pulse shadow-sm'
                              : row.statusType === 'warning'
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-surface-container text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">alarm</span>
                          {row.slaRemaining}
                        </span>
                      </td>

                      {/* 5. Warning Badge */}
                      <td className="p-3.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                            row.statusType === 'critical'
                              ? 'bg-error text-white'
                              : row.statusType === 'warning'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-surface-container text-secondary'
                          }`}
                        >
                          {row.warningLabel}
                        </span>
                      </td>

                      {/* 6. Action Button */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        {row.statusType === 'critical' ? (
                          <button
                            onClick={() => showToast(`Peringatan Eskalasi Kadis terkirim via WhatsApp resmi untuk tiket #${row.id}`, 'emergency', 'error')}
                            className="px-2.5 py-1.5 bg-error text-white font-label-sm text-[11px] font-bold rounded-lg hover:opacity-90 shadow-sm flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">call</span>
                            <span>Eskalasi Kadis</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onNavigate('v10')}
                            className="px-2.5 py-1.5 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-sm text-[11px] rounded-lg shadow-sm flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px] text-primary">visibility</span>
                            <span>Disposisi</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footer Navigation */}
          <div className="p-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="text-secondary font-mono text-[11px]">
              Menampilkan 4 dari 8 tiket kritis darurat
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('v8')}
                className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-primary font-bold rounded-lg border border-primary/30 flex items-center gap-1 text-[11px]"
              >
                <span className="material-symbols-outlined text-[14px]">map</span>
                <span>Buka Heatmap GIS (View 8)</span>
              </button>
              <button
                onClick={() => onNavigate('v10')}
                className="px-2.5 py-1 bg-primary text-white font-bold rounded-lg flex items-center gap-1 text-[11px]"
              >
                <span>Kelola Disposisi (View 10)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Distribusi Beban OPD & Kepatuhan SLA (4 Kolom) */}
        <div className="xl:col-span-4 space-y-5">
          {/* Beban per OPD */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
              <span className="material-symbols-outlined text-primary text-[22px]">pie_chart</span>
              <h3 className="font-label-lg text-sm font-bold text-on-surface">
                Distribusi Beban per OPD
              </h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-on-surface">1. Dinas Bina Marga (PUPR)</span>
                  <span className="font-mono font-bold text-primary">42% (539 Tiket)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-on-surface">2. Dinas Perhubungan</span>
                  <span className="font-mono font-bold text-tertiary">28% (359 Tiket)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-on-surface">3. Dinas Lingkungan Hidup</span>
                  <span className="font-mono font-bold text-amber-600">18% (231 Tiket)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-on-surface">4. Satpol PP & Ketertiban</span>
                  <span className="font-mono font-bold text-secondary">12% (155 Tiket)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Kepatuhan SLA Tertinggi */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
              <span className="material-symbols-outlined text-primary text-[22px]">military_tech</span>
              <h3 className="font-label-lg text-sm font-bold text-on-surface">
                Ranking Kepatuhan SLA OPD
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px]">1</span>
                  <span className="font-medium text-on-surface">Dinas Bina Marga (PUPR)</span>
                </div>
                <span className="font-bold font-mono text-primary">96.4% Terpenuhi</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-tertiary text-white flex items-center justify-center font-bold text-[10px]">2</span>
                  <span className="font-medium text-on-surface">Dinas Perhubungan</span>
                </div>
                <span className="font-bold font-mono text-tertiary">94.1% Terpenuhi</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-[10px]">3</span>
                  <span className="font-medium text-on-surface">Dinas Lingkungan Hidup</span>
                </div>
                <span className="font-bold font-mono text-amber-700">92.8% Terpenuhi</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Menerbitkan Peringatan Tertulis ke OPD di bawah target 95% SLA', 'warning', 'warning')}
              className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">notification_important</span>
              <span>Peringatkan Kepatuhan OPD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
