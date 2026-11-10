'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';

interface View1LoginProps {
  onNavigate: (viewId: string) => void;
}

export const View1Login: React.FC<View1LoginProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [nik, setNik] = useState('1871032508960002');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['5', '2', '8', '1']);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (nik.length < 16) {
      showToast('NIK harus terdiri dari 16 digit angka', 'warning', 'warning');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      showToast('Kode OTP 4-digit dikirim ke nomor HP terdaftar (SIAK)', 'sms');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Autentikasi Berhasil! Selamat Datang di SIPEMAT Warga', 'verified_user', 'success');
      onNavigate('v2');
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 space-y-6">
      {/* Header Form */}
      <div className="space-y-5 pt-2">
        <div className="flex flex-col items-center text-center space-y-2.5">
          <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-[36px]">badge</span>
          </div>
          <div>
            <h2 className="font-headline-md text-xl font-bold text-on-surface">
              Masuk Layanan Warga
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mt-1">
              Sistem Pelaporan Aspirasi & Masalah Kota Bandar Lampung berbasis NIK resmi.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
            verified_user
          </span>
          <div className="text-[11px] text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface block">Identitas Tunggal Terverifikasi</span>
            Data NIK disinkronkan langsung dengan database kependudukan SIAK Disdukcapil Kota Bandar Lampung.
          </div>
        </div>

        {!otpStep ? (
          /* Step 1: Input NIK */
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center justify-between">
                <span>Nomor Induk Kependudukan (NIK)</span>
                <span className="text-[10px] text-primary lowercase font-normal">16 digit KTP-el</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px]">
                  credit_card
                </span>
                <input
                  type="text"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                  className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container text-on-surface font-mono text-sm tracking-wide focus:ring-2 focus:ring-primary focus:outline-none shadow-inner border border-surface-container-high"
                  placeholder="Contoh: 1871032508960002"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-surface-container rounded-lg space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">Nama Terdaftar:</span>
                <span className="font-bold text-on-surface">Budi Darmawan, S.T.</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">Kecamatan:</span>
                <span className="font-bold text-on-surface">Kedaton, Bandar Lampung</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-label-lg text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Memeriksa Data SIAK...</span>
                </>
              ) : (
                <>
                  <span>Kirim Kode OTP Verifikasi</span>
                  <span className="material-symbols-outlined text-[18px]">sms</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: Input OTP */
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Masukkan Kode OTP (SMS)
                </label>
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  Ubah NIK
                </button>
              </div>

              <p className="text-[11px] text-secondary">
                Kode verifikasi 4-digit telah dikirimkan ke nomor HP <span className="font-mono font-bold text-on-surface">0812-****-4412</span>
              </p>

              <div className="grid grid-cols-4 gap-2.5 pt-1">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="h-12 text-center text-xl font-mono font-extrabold bg-surface-container rounded-xl focus:ring-2 focus:ring-primary focus:outline-none shadow-inner border border-surface-container-high"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-secondary pt-1">
              <span>Tidak menerima SMS?</span>
              <button
                type="button"
                onClick={() => showToast('Kode OTP baru telah dikirim kembali', 'refresh')}
                className="text-primary font-bold hover:underline"
              >
                Kirim Ulang (00:48)
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-label-lg text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Verifikasi & Masuk Beranda</span>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-surface-container space-y-2 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-secondary">
          <span className="material-symbols-outlined text-[15px] text-primary">security</span>
          <span>Koneksi Terenkripsi TLS 1.3 • Dilindungi UU PDP</span>
        </div>
        <p className="text-[10px] text-outline">
          Pemerintah Kota Bandar Lampung bekerja sama dengan Universitas Teknokrat Indonesia.
        </p>
      </div>
    </div>
  );
};

