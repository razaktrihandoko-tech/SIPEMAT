'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';

interface View12LoginLapanganProps {
  onNavigate: (viewId: string) => void;
}

export const View12LoginLapangan: React.FC<View12LoginLapanganProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [nip, setNip] = useState('198305142008011009');
  const [pin, setPin] = useState('4821');
  const [selectedUnit, setSelectedUnit] = useState('PU-JALAN-01');
  const [selectedShift, setSelectedShift] = useState('Pagi (07.00 - 15.00 WIB)');
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const units = [
    {
      id: 'PU-JALAN-01',
      name: 'Regu PU Jalan-01 (Dinas PUPR)',
      armada: 'Dump Truck BE 9012 AZ • Peralatan Baby Roller & Cold Mix',
      danru: 'Supriyadi (Danru)',
      badge: 'Bina Marga',
    },
    {
      id: 'DLH-POHON-02',
      name: 'Regu DLH-02 (Dinas Lingkungan Hidup)',
      armada: 'Truk Crane Pemangkas BE 9120 BZ • Chainsaw Unit',
      danru: 'Herman Sutisna',
      badge: 'Lingkungan',
    },
    {
      id: 'DISHUB-PJU-03',
      name: 'Regu PJU-03 (Dinas Perhubungan)',
      armada: 'Skylift Hidrolik BE 9044 BZ • Perkakas Kelistrikan',
      danru: 'Bambang Irawan',
      badge: 'Dishub PJU',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip || !pin) {
      showToast('NIP dan PIN regu wajib diisi', 'warning', 'warning');
      return;
    }
    setIsCheckingIn(true);
    setTimeout(() => {
      setIsCheckingIn(false);
      showToast(
        'Absensi Shift & Check-in Armada Berhasil! Menerima 3 Surat Perintah Tugas Aktif.',
        'engineering',
        'success'
      );
      onNavigate('v13');
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 space-y-4 overflow-y-auto max-h-[720px]">
      <div className="space-y-4">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-2 pt-1">
          <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-on-tertiary-fixed shadow-md border border-tertiary/20">
            <span className="material-symbols-outlined text-[36px]">engineering</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-lg font-bold text-on-surface">
              Akses Tim Lapangan
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mt-0.5">
              Sistem Operasional Unit Reaksi Cepat • Pemkot Bandar Lampung
            </p>
          </div>
        </div>

        {/* GPS Geofence Check-in Status */}
        <div className="p-3 bg-surface-container rounded-xl border border-surface-container-high flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
            location_searching
          </span>
          <div className="text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-on-surface">
              <span>Geofence Posko Terverifikasi</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-on-surface-variant mt-0.5">
              Workshop Dinas PUPR, Jl. Gatot Subroto No. 12 (Akurasi GPS: 4.2 meter)
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          <div className="space-y-1">
            <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">badge</span>
              NIP Komandan Regu (Danru)
            </label>
            <input
              type="text"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface font-mono text-xs focus:ring-2 focus:ring-primary focus:outline-none border border-surface-container-high"
              placeholder="18 digit NIP"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">pin</span>
              PIN Cepat Petugas (4 Digit)
            </label>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface font-mono text-sm tracking-widest text-center focus:ring-2 focus:ring-primary focus:outline-none border border-surface-container-high"
              placeholder="••••"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">local_shipping</span>
              Pilih Unit Taktis & Armada
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container text-on-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none border border-surface-container-high"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.danru}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
              Shift Operasional Hari Ini
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Pagi (07.00 - 15.00 WIB)', 'Siang/Malam (15.00 - 23.00 WIB)'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedShift(s)}
                  className={`p-2 rounded-lg text-[11px] font-bold border text-left transition-all ${
                    selectedShift === s
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant border-surface-container-high hover:bg-surface-container-high'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isCheckingIn}
            className="w-full h-12 bg-primary text-white rounded-xl font-label-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
          >
            {isCheckingIn ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Memvalidasi Shift & Kesiapan Armada...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Mulai Shift & Terima Penugasan SPT</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Emergency Hotline Info */}
      <div className="p-3 bg-error-container/20 border border-error/20 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-[18px]">phone_in_talk</span>
          <span className="text-[11px] text-on-surface font-medium">Radio Command Center: Kanal VHF 154.200</span>
        </div>
        <span className="font-mono font-bold text-error text-[11px]">CC-01</span>
      </div>
    </div>
  );
};

