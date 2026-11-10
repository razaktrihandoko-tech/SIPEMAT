'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';

interface View6LoginAdminProps {
  onNavigate: (viewId: string) => void;
}

export const View6LoginAdmin: React.FC<View6LoginAdminProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [nip, setNip] = useState('198804152012011003');
  const [password, setPassword] = useState('••••••••••••');
  const [roleSelection, setRoleSelection] = useState('Verifikator Command Center');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(
        'Login Berhasil! Selamat Datang di Command Center Smart City Bandar Lampung',
        'verified_user',
        'success'
      );
      onNavigate('v7');
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Kolom Kiri: Form Login (7 kolom) */}
        <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-error-container text-error flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
              </span>
              <div>
                <span className="font-label-sm text-[10px] text-error font-bold uppercase tracking-wider">
                  Akses Terbatas Pegawai ASN
                </span>
                <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  Portal Command Center
                </h2>
              </div>
            </div>

            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Pusat kendali verifikasi, disposisi penugasan OPD, dan pengawasan Service Level Agreement (SLA) Pemerintah Kota Bandar Lampung.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">badge</span>
                  Nomor Induk Pegawai (NIP Kedinasan)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">
                    account_circle
                  </span>
                  <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="18 digit NIP resmi"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container text-on-surface font-mono text-xs focus:ring-2 focus:ring-primary focus:outline-none shadow-inner border border-surface-container-high"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
                    Kata Sandi Keamanan
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); showToast('Hubungi Diskominfo untuk reset sandi ASN', 'info'); }} className="text-[11px] text-primary hover:underline">
                    Lupa Sandi?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">
                    key
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan sandi..."
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container text-on-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none shadow-inner border border-surface-container-high"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary">manage_accounts</span>
                  Hak Akses Peran Masuk
                </label>
                <div className="relative">
                  <select
                    value={roleSelection}
                    onChange={(e) => setRoleSelection(e.target.value)}
                    className="w-full h-11 px-3 bg-surface-container text-on-surface font-body-sm text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer border border-surface-container-high"
                  >
                    <option value="Verifikator Command Center">Verifikator Command Center (Tier 1)</option>
                    <option value="Koordinator Disposisi OPD PUPR">Koordinator Disposisi OPD (Dinas PUPR)</option>
                    <option value="Koordinator Disposisi OPD Dishub">Koordinator Disposisi OPD (Dinas Perhubungan)</option>
                    <option value="Administrator Utama Smart City">Administrator Utama Smart City (Super Admin)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-label-lg text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Mengautentikasi Kredensial...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard Command Center</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-surface-container text-[11px] text-secondary flex items-center justify-between">
            <span>Standar Keamanan Siber BSSN</span>
            <span className="font-mono text-primary font-bold">SESI AKTIF: 8 JAM</span>
          </div>
        </div>

        {/* Kolom Kanan: Panel Telemetri Infrastruktur (5 kolom) */}
        <div className="md:col-span-5 bg-surface-container p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-container-high space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Sistem Online
              </span>
              <span className="font-mono text-[10px] text-secondary">CLUSTER-BL-01</span>
            </div>

            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">
                Status Infrastruktur Terpadu
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Monitoring konektivitas kluster Pemkot Bandar Lampung & UTI.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Rust High-Performance API', status: 'Optimal (28 ms latency)', color: 'text-emerald-700', icon: 'bolt' },
                { label: 'PostGIS Spatial Engine', status: 'Terhubung (3,840 nodes)', color: 'text-emerald-700', icon: 'database' },
                { label: 'SIAK Kependudukan Gateway', status: 'Terverifikasi 100%', color: 'text-emerald-700', icon: 'badge' },
                { label: 'SLA Monitoring Watchdog', status: '8 Tiket Kritis Memerlukan Aksi', color: 'text-error font-bold', icon: 'warning' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-surface-container-lowest rounded-xl flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">{item.icon}</span>
                    <span className="font-medium text-on-surface text-[11px]">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-primary-fixed/20 rounded-xl border border-primary/30 text-xs space-y-1">
            <span className="font-bold text-on-primary-fixed text-[11px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">security</span>
              Protokol Keamanan Data
            </span>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              Seluruh mutasi data tiket dan penerbitan Surat Perintah Tugas (SPT) dicatat dalam immutable audit log berstandar ISO 27001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
