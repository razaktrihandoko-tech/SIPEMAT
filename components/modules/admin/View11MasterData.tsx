'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';

interface View11MasterDataProps {
  onNavigate: (viewId: string) => void;
}

interface UserAccount {
  id: string;
  name: string;
  nip: string;
  role: string;
  roleBadge: string;
  agency: string;
  email: string;
  phone: string;
  status: 'Aktif' | 'Non-Aktif';
  lastLogin: string;
}

export const View11MasterData: React.FC<View11MasterDataProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [filterRole, setFilterRole] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  const userAccounts: UserAccount[] = [
    {
      id: 'USR-001',
      name: 'Ir. Ahmad Subarjo, M.T.',
      nip: '197508122000031002',
      role: 'Kepala Dinas (Kadis)',
      roleBadge: 'bg-error-container text-on-error-container',
      agency: 'Dinas Bina Marga & Bina Konstruksi (PUPR)',
      email: 'kadis.pu@bandarlampungkota.go.id',
      phone: '0811-7201-992',
      status: 'Aktif',
      lastLogin: '10 Nov 2026, 08:15 WIB',
    },
    {
      id: 'USR-002',
      name: 'Rahmat Kurniawan, S.Kom',
      nip: '198804152012011003',
      role: 'Verifikator Command Center',
      roleBadge: 'bg-primary-fixed text-on-primary-fixed',
      agency: 'Diskominfo / Command Center Pemkot',
      email: 'rahmat.cc@bandarlampungkota.go.id',
      phone: '0812-7988-442',
      status: 'Aktif',
      lastLogin: '10 Nov 2026, 08:35 WIB (Sesi Aktif)',
    },
    {
      id: 'USR-003',
      name: 'Supriyadi (Danru Regu-01)',
      nip: '198305142008011009',
      role: 'Komandan Regu Lapangan',
      roleBadge: 'bg-tertiary-fixed text-on-tertiary-fixed',
      agency: 'Dinas PUPR Jalan - Wilayah Kedaton',
      email: 'danru.pu01@bandarlampungkota.go.id',
      phone: '0852-6712-334',
      status: 'Aktif',
      lastLogin: '10 Nov 2026, 07:00 WIB (Shift Pagi)',
    },
    {
      id: 'USR-004',
      name: 'Hendra Saputra, S.T.',
      nip: '198602192010011005',
      role: 'Koordinator Disposisi OPD',
      roleBadge: 'bg-amber-100 text-amber-900',
      agency: 'Dinas Perhubungan (Dishub)',
      email: 'hendra.dishub@bandarlampungkota.go.id',
      phone: '0813-6901-881',
      status: 'Aktif',
      lastLogin: '09 Nov 2026, 17:20 WIB',
    },
    {
      id: 'USR-005',
      name: 'Bambang Irawan',
      nip: '199011042015021001',
      role: 'Teknisi Skylift PJU',
      roleBadge: 'bg-surface-container text-secondary',
      agency: 'Dinas Perhubungan (Unit PJU)',
      email: 'bambang.pju@bandarlampungkota.go.id',
      phone: '0821-8200-551',
      status: 'Aktif',
      lastLogin: '10 Nov 2026, 06:45 WIB',
    },
  ];

  const filteredUsers = userAccounts.filter((u) => {
    const matchRole =
      filterRole === 'Semua' || u.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.nip.includes(searchQuery) ||
      u.agency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="w-full space-y-5">
      {/* 1. Header Kartu Halaman */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="material-symbols-outlined text-primary text-[28px]">manage_accounts</span>
            <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface font-bold">
              Master Data Pengguna & Hak Akses RBAC
            </h1>
            <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-xs px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              142 PENGGUNA TERDAFTAR
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
            <span>Tata Kelola Autentikasi Pegawai ASN, Koordinator OPD, dan Regu Teknis Mobile</span>
            <span>•</span>
            <span className="text-secondary font-mono text-xs">Role-Based Access Control (RBAC)</span>
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
            onClick={() => showToast('Form Tambah Akun Baru dibuka', 'person_add')}
            className="px-3.5 py-2 bg-primary hover:bg-primary-container text-white font-label-md text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Pengguna Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Empat KPI Pengguna */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Total Pengguna Aktif
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-on-surface mt-1">142</div>
            <div className="font-label-sm text-xs text-primary font-bold mt-1">Semua Instansi Pemkot</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">group</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Verifikator Command Center
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-primary mt-1">18</div>
            <div className="font-label-sm text-xs text-primary font-bold mt-1">Tier-1 Validasi Laporan</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined text-[28px]">verified_user</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Koordinator OPD Teknis
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-tertiary mt-1">24</div>
            <div className="font-label-sm text-xs text-tertiary font-bold mt-1">Dinas PUPR, Dishub, DLH</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[28px]">assignment_ind</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div>
            <span className="font-label-sm text-xs text-secondary uppercase tracking-wider font-bold">
              Regu Teknisi Mobile
            </span>
            <div className="font-headline-xl text-3xl font-extrabold text-amber-700 mt-1">85</div>
            <div className="font-label-sm text-xs text-amber-800 font-bold mt-1">Unit Taktis Lapangan</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
            <span className="material-symbols-outlined text-[28px]">engineering</span>
          </div>
        </div>
      </div>

      {/* 3. Toolbar Pencarian & Filter */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NIP, atau instansi dinas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto">
          {['Semua', 'Command Center', 'Danru', 'Koordinator'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-full font-label-sm text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                filterRole === role
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-secondary hover:bg-surface-container-high'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tabel Master Data Akun */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-xs">
            <thead className="bg-surface-container font-label-md text-[11px] text-secondary uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Nama Pegawai & NIP</th>
                <th className="p-3.5">Peran Hak Akses</th>
                <th className="p-3.5">Instansi OPD Terdaftar</th>
                <th className="p-3.5">Kontak & Email</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                  {/* Nama & NIP */}
                  <td className="p-3.5">
                    <div className="font-bold text-on-surface">{user.name}</div>
                    <div className="font-mono text-[11px] text-secondary">NIP: {user.nip}</div>
                  </td>

                  {/* Role */}
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold uppercase tracking-wider ${user.roleBadge}`}>
                      {user.role}
                    </span>
                  </td>

                  {/* Agency */}
                  <td className="p-3.5">
                    <span className="font-medium text-on-surface">{user.agency}</span>
                  </td>

                  {/* Email & Phone */}
                  <td className="p-3.5 text-[11px]">
                    <div className="font-mono text-secondary">{user.email}</div>
                    <div className="font-mono text-on-surface-variant">{user.phone}</div>
                  </td>

                  {/* Status */}
                  <td className="p-3.5 text-center">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      {user.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          showToast(`Detail hak akses akun ${user.name} dimuat`, 'manage_accounts');
                        }}
                        className="px-2.5 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-bold text-[11px] transition-colors"
                        title="Lihat Kredensial"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => showToast(`Instruksi reset sandi dikirim ke email ${user.email}`, 'key')}
                        className="p-1.5 bg-surface-container hover:bg-primary-container hover:text-white rounded-lg text-secondary transition-colors"
                        title="Reset Sandi"
                      >
                        <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected User Modal / Detail Panel Preview */}
        {selectedUser && (
          <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <div className="text-xs">
                <div className="font-bold text-on-surface">
                  {selectedUser.name} — {selectedUser.role}
                </div>
                <div className="text-secondary font-mono text-[10px]">
                  Terakhir Login: {selectedUser.lastLogin}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded-lg text-xs font-semibold"
              >
                Tutup Panel
              </button>
              <button
                onClick={() => showToast(`Hak akses RBAC ${selectedUser.name} diperbarui`, 'task_alt', 'success')}
                className="px-3.5 py-1 bg-primary text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
