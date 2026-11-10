'use client';

import React from 'react';

export type UserRole = 'warga' | 'admin' | 'lapangan';

export interface ViewDefinition {
  id: string;
  role: UserRole;
  number: number;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  badge?: string;
}

export const ALL_VIEWS: ViewDefinition[] = [
  // WARGA (1 - 5)
  {
    id: 'v1',
    role: 'warga',
    number: 1,
    title: 'Autentikasi NIK & Verifikasi OTP',
    shortTitle: '1. Login NIK + OTP',
    icon: 'badge',
    description: 'Login kependudukan terpadu dengan integrasi SIAK dan OTP SMS',
  },
  {
    id: 'v2',
    role: 'warga',
    number: 2,
    title: 'Beranda (Home) & Laporan Sekitar',
    shortTitle: '2. Beranda & Sekitar',
    icon: 'home',
    description: 'Tombol lapor cepat, ringkasan statistik warga, dan feed isu lokal',
  },
  {
    id: 'v3',
    role: 'warga',
    number: 3,
    title: 'Form Lapor Pengaduan & Geotagging GPS',
    shortTitle: '3. Form Lapor Kamera',
    icon: 'photo_camera',
    description: 'Upload bukti foto kamera, kategori OPD, deskripsi, dan koordinat real-time',
    badge: 'Form Lapor',
  },
  {
    id: 'v4',
    role: 'warga',
    number: 4,
    title: 'Riwayat & Lacak Status SLA Tiket',
    shortTitle: '4. Riwayat & Stepper SLA',
    icon: 'history',
    description: 'Pelacakan linimasa 4 tahap tiket dari verifikasi hingga berita acara tuntas',
  },
  {
    id: 'v5',
    role: 'warga',
    number: 5,
    title: 'Detail Laporan Warga & Interaksi Upvote',
    shortTitle: '5. Detail & Upvote',
    icon: 'thumb_up',
    description: 'Detail investigasi foto, EXIF metadata terverifikasi, dan dukungan warga',
    badge: 'Interaktif',
  },

  // ADMIN (6 - 11)
  {
    id: 'v6',
    role: 'admin',
    number: 6,
    title: 'Portal Login Khusus Administrator',
    shortTitle: '6. Login Admin',
    icon: 'admin_panel_settings',
    description: 'Autentikasi NIP operator Command Center Pemkot Bandar Lampung',
  },
  {
    id: 'v7',
    role: 'admin',
    number: 7,
    title: 'Dashboard Utama & Monitoring SLA Real-time',
    shortTitle: '7. Dashboard & Warning SLA',
    icon: 'speed',
    description: '4 KPI agregat kota, tabel peringatan SLA darurat, dan beban per dinas',
    badge: 'Command Center',
  },
  {
    id: 'v8',
    role: 'admin',
    number: 8,
    title: 'Peta Heatmap GIS & Kluster Masalah Kota',
    shortTitle: '8. Heatmap GIS Kota',
    icon: 'map',
    description: 'Visualisasi spasial hotspot sebaran keluhan warga di Bandar Lampung',
  },
  {
    id: 'v9',
    role: 'admin',
    number: 9,
    title: 'Meja Verifikasi Tiket Masuk & Anti-Hoax',
    shortTitle: '9. Verifikasi Masuk',
    icon: 'fact_check',
    description: 'Validasi bukti visual, seleksi spam/hoax, dan penerbitan nomor registrasi',
  },
  {
    id: 'v10',
    role: 'admin',
    number: 10,
    title: 'Disposisi & Penugasan Regu Teknis OPD',
    shortTitle: '10. Disposisi OPD',
    icon: 'assignment_ind',
    description: 'Penerbitan Surat Perintah Tugas (SPT) dan penunjukan regu penanganan',
  },
  {
    id: 'v11',
    role: 'admin',
    number: 11,
    title: 'Master Data Pengguna & Tata Kelola Akun',
    shortTitle: '11. Master Data User',
    icon: 'manage_accounts',
    description: 'Manajemen akun verifikator, koordinator OPD, dan regu teknisi lapangan',
  },

  // TIM LAPANGAN (12 - 15)
  {
    id: 'v12',
    role: 'lapangan',
    number: 12,
    title: 'Login Petugas & Absensi Shift Regu',
    shortTitle: '12. Login Tim Lapangan',
    icon: 'engineering',
    description: 'Akses masuk teknisi mobile dan validasi kesiapan armada kerja',
  },
  {
    id: 'v13',
    role: 'lapangan',
    number: 13,
    title: 'Daftar Tugas Aktif & Hitung Mundur SLA',
    shortTitle: '13. Daftar Tugas & SLA',
    icon: 'assignment',
    description: 'Antrean pekerjaan urut batas waktu tercepat dan status geofence lokasi',
  },
  {
    id: 'v14',
    role: 'lapangan',
    number: 14,
    title: 'Detail Tugas Kerusakan & Rute Navigasi TKP',
    shortTitle: '14. Detail TKP & Maps',
    icon: 'near_me',
    description: 'Panduan navigasi turn-by-turn ke lokasi laporan warga dan data teknis',
  },
  {
    id: 'v15',
    role: 'lapangan',
    number: 15,
    title: 'Upload Bukti Before/After & BAP Resmi',
    shortTitle: '15. BAP & Validasi Selesai',
    icon: 'task_alt',
    description: 'Dokumentasi perbaikan selesai, perbandingan foto kamera, dan tutup tiket',
    badge: 'Final BAP',
  },
];

interface DevNavProps {
  currentRole: UserRole;
  currentView: string;
  onSelectRole: (role: UserRole) => void;
  onSelectView: (viewId: string) => void;
}

export const DevNav: React.FC<DevNavProps> = ({
  currentRole,
  currentView,
  onSelectRole,
  onSelectView,
}) => {
  const currentViewDef = ALL_VIEWS.find((v) => v.id === currentView);
  const viewsInRole = ALL_VIEWS.filter((v) => v.role === currentRole);

  const handleRoleClick = (role: UserRole) => {
    onSelectRole(role);
    const firstView = ALL_VIEWS.find((v) => v.role === role);
    if (firstView) {
      onSelectView(firstView.id);
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const targetView = ALL_VIEWS.find((v) => v.id === selectedId);
    if (targetView) {
      if (targetView.role !== currentRole) {
        onSelectRole(targetView.role);
      }
      onSelectView(targetView.id);
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm border-b border-surface-container py-2.5 px-4 sm:px-6 md:px-8 space-y-2.5">
      {/* Baris Atas: Role Switcher & Dropdown 15 Halaman */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Switcher Role 3 Modul Utama */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm uppercase tracking-wider pr-1">
            <span className="material-symbols-outlined text-[16px] text-primary">view_quilt</span>
            <span className="hidden sm:inline">Modul:</span>
          </div>

          <button
            onClick={() => handleRoleClick('warga')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-xs sm:text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
              currentRole === 'warga'
                ? 'bg-primary text-white shadow-md font-bold'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>1. Warga</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              currentRole === 'warga' ? 'bg-white/20 text-white' : 'bg-surface-container text-secondary'
            }`}>
              5 View
            </span>
          </button>

          <button
            onClick={() => handleRoleClick('admin')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-xs sm:text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-primary text-white shadow-md font-bold'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>2. Admin Command Center</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              currentRole === 'admin' ? 'bg-white/20 text-white' : 'bg-surface-container text-secondary'
            }`}>
              6 View
            </span>
          </button>

          <button
            onClick={() => handleRoleClick('lapangan')}
            className={`px-3 py-1.5 rounded-lg font-label-md text-xs sm:text-label-md flex items-center gap-1.5 transition-all cursor-pointer ${
              currentRole === 'lapangan'
                ? 'bg-primary text-white shadow-md font-bold'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">engineering</span>
            <span>3. Tim Lapangan</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              currentRole === 'lapangan' ? 'bg-white/20 text-white' : 'bg-surface-container text-secondary'
            }`}>
              4 View
            </span>
          </button>
        </div>

        {/* Lompat Layar (Dropdown Semua 15 View) */}
        <div className="flex items-center gap-2 min-w-[260px] sm:min-w-[320px] max-w-md w-full sm:w-auto">
          <label htmlFor="view-select" className="font-label-sm text-label-sm text-outline uppercase tracking-wider shrink-0 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">explore</span>
            <span className="hidden md:inline">Lompat</span> Layar:
          </label>
          <div className="relative w-full">
            <select
              id="view-select"
              value={currentView}
              onChange={handleDropdownChange}
              className="w-full h-9 pl-3 pr-8 bg-surface-container text-on-surface font-label-md text-xs sm:text-label-md rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer border border-surface-container-high"
            >
              <optgroup label="MODUL 1: WARGA (Aplikasi Publik Mobile)">
                {ALL_VIEWS.filter((v) => v.role === 'warga').map((v) => (
                  <option key={v.id} value={v.id}>
                    View {v.number} - {v.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="MODUL 2: ADMIN DISPOSISI (Web Command Center)">
                {ALL_VIEWS.filter((v) => v.role === 'admin').map((v) => (
                  <option key={v.id} value={v.id}>
                    View {v.number} - {v.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="MODUL 3: TIM LAPANGAN (Unit Taktis Mobile)">
                {ALL_VIEWS.filter((v) => v.role === 'lapangan').map((v) => (
                  <option key={v.id} value={v.id}>
                    View {v.number} - {v.title}
                  </option>
                ))}
              </optgroup>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2 text-on-surface-variant pointer-events-none text-[18px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Baris Bawah: View Pills Subnav untuk Role yang sedang aktif */}
      <div className="flex items-center justify-between gap-2 border-t border-surface-container/70 pt-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-label-sm text-[11px] uppercase font-bold text-secondary mr-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">tab</span>
            Halaman {currentRole.toUpperCase()}:
          </span>
          {viewsInRole.map((v) => {
            const isActive = v.id === currentView;
            return (
              <button
                key={v.id}
                onClick={() => onSelectView(v.id)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-xs flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-sm font-bold ring-1 ring-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {v.icon}
                </span>
                <span>{v.shortTitle}</span>
                {v.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white text-primary' : 'bg-primary-fixed text-on-primary-fixed'
                  }`}>
                    {v.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Indicator Label */}
        {currentViewDef && (
          <div className="hidden lg:flex items-center gap-2 text-xs text-secondary font-mono bg-surface-container px-2.5 py-1 rounded-md shrink-0">
            <span className="font-bold text-primary">VIEW {currentViewDef.number} DARI 15</span>
            <span>•</span>
            <span className="truncate max-w-xs">{currentViewDef.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

