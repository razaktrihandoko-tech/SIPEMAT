'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  currentRole: 'warga' | 'admin' | 'lapangan';
  currentView: string;
  onSelectRole: (role: 'warga' | 'admin' | 'lapangan') => void;
  onSelectView: (viewId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  currentView,
  onSelectRole,
  onSelectView,
}) => {
  const [timeStr, setTimeStr] = useState<string>('Memuat waktu sistem...');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(`${now.toLocaleDateString('id-ID', options)} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-surface-container">
      {/* Baris 1: Logo & Identitas Institusi Kolaborasi */}
      <div className="h-20 w-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
        {/* Sisi Kiri: Logo Kota Balam & Logo UTI Berdampingan + Nama Aplikasi */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Logo Duo Berdampingan (Strict Requirement) */}
          <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 bg-surface-container-low rounded-xl border border-surface-container shadow-sm shrink-0">
            {/* Logo Kota Bandar Lampung */}
            <div className="relative w-9 h-11 sm:w-11 sm:h-12 flex items-center justify-center" title="Pemerintah Kota Bandar Lampung">
              <Image
                src="/logo-balam.png"
                alt="Logo Kota Balam"
                width={44}
                height={48}
                className="object-contain max-h-full drop-shadow-sm"
                priority
              />
            </div>

            <div className="h-8 w-[1px] bg-outline-variant/60"></div>

            {/* Logo Universitas Teknokrat Indonesia (UTI) */}
            <div className="relative w-9 h-11 sm:w-11 sm:h-12 flex items-center justify-center" title="Universitas Teknokrat Indonesia">
              <Image
                src="/logo-uti.png"
                alt="Logo UTI"
                width={44}
                height={48}
                className="object-contain max-h-full drop-shadow-sm"
                priority
              />
            </div>
          </div>

          {/* Label Instansi & SIPEMAT Brand */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                SIPEMAT
              </span>
              <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] sm:text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 border border-primary/20">
                Inovasi Kolaboratif
              </span>
              <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[10px] sm:text-label-sm px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-flex">
                Smart City v2.4
              </span>
            </div>
            <p className="font-body-sm text-xs sm:text-[13px] text-on-surface-variant truncate hidden md:block">
              Sistem Informasi Pelaporan dan Penanganan Masalah Kota Terpadu • Pemkot Bandar Lampung × UTI
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Status Sistem Live & Akun Petugas/Warga */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-2.5 bg-surface-container-low px-3 py-1.5 rounded-xl border border-surface-container">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <div className="text-left">
              <div className="font-label-md text-[11px] font-bold text-on-surface flex items-center gap-1">
                <span>Bandar Lampung Command Center</span>
              </div>
              <div className="font-mono text-[10px] text-secondary">
                {mounted ? timeStr : 'Memuat waktu sistem...'}
              </div>
            </div>
          </div>

          {/* Role Indicator Button with Cycle Switching */}
          <div className="flex items-center gap-2 pl-2 border-l border-surface-container">
            <button
              onClick={() => {
                const nextRole: Record<'warga' | 'admin' | 'lapangan', 'warga' | 'admin' | 'lapangan'> = {
                  warga: 'admin',
                  admin: 'lapangan',
                  lapangan: 'warga',
                };
                onSelectRole(nextRole[currentRole]);
              }}
              title="Klik untuk beralih peran (Warga / Admin / Lapangan)"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:opacity-90 active:scale-95 cursor-pointer ${
                currentRole === 'warga'
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : currentRole === 'admin'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {currentRole === 'warga' ? 'person' : currentRole === 'admin' ? 'admin_panel_settings' : 'engineering'}
              </span>
              <span className="hidden sm:inline">Peran:</span> {currentRole}
              <span className="material-symbols-outlined text-[14px] opacity-70">swap_horiz</span>
            </button>

            <div
              onClick={() => onSelectView(currentRole === 'warga' ? 'v1' : currentRole === 'admin' ? 'v6' : 'v12')}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-primary-fixed/50 cursor-pointer hover:bg-primary-container transition-colors"
              title="Login / Profil Pengguna"
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

