'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ToastContext';
import { useTickets, TicketPriority } from '@/components/TicketContext';

interface View3FormLaporProps {
  onNavigate: (viewId: string) => void;
}

export const View3FormLapor: React.FC<View3FormLaporProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { addTicket } = useTickets();
  const [photoTaken, setPhotoTaken] = useState(true);
  const [category, setCategory] = useState('Infrastruktur Jalan & Jembatan (Dinas PUPR)');
  const [description, setDescription] = useState(
    'Aspal amblas sedalam sekitar 20 cm di lajur kiri dekat halte pasar. Sangat membahayakan pengendara motor saat malam hari dan jam pulang kerja.'
  );
  const [urgency, setUrgency] = useState<'Tinggi' | 'Sedang' | 'Rendah'>('Tinggi');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('Harap isi deskripsi pengaduan secara jelas', 'warning', 'warning');
      return;
    }
    if (!photoTaken) {
      showToast('Wajib melampirkan foto bukti kondisi fisik kerusakan', 'photo_camera', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const priorityMap: Record<'Tinggi' | 'Sedang' | 'Rendah', TicketPriority> = {
        Tinggi: 'P1 - Darurat',
        Sedang: 'P2 - Sedang',
        Rendah: 'P3 - Rutin',
      };

      const newId = addTicket({
        title: `${category.split('(')[0].trim()} di Kedaton`,
        category: category.split('(')[0].trim(),
        priority: priorityMap[urgency],
        reporterName: 'Budi Darmawan, S.T.',
        reporterNik: '1871032508960002',
        location: 'Jl. Teuku Umar No. 88, Kedaton, Bandar Lampung',
        coords: '-5.380120, 105.258140',
        distance: '150 meter dari Anda',
        description: description.trim(),
        photoBefore: '/placeholder-damage.jpg',
        slaLimit: urgency === 'Tinggi' ? 'Batas: 3 Jam dari Lapor' : 'Batas: 8 Jam dari Lapor',
      });

      showToast(
        `Laporan Berhasil Terkirim! Tiket #${newId} diterbitkan dan masuk antrean verifikasi.`,
        'task_alt',
        'success'
      );
      onNavigate('v4');
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto max-h-[720px]">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <button
          onClick={() => onNavigate('v2')}
          className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Beranda</span>
        </button>
        <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
          Form Pengaduan
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Camera / Photo Capture Section */}
        <div className="space-y-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
              Bukti Foto Kerusakan (Kamera Langsung)
            </span>
            <span className="text-[10px] text-error font-bold">*Wajib</span>
          </label>

          {photoTaken ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/50 bg-slate-900 shadow-md">
              {/* Simulated Photo View */}
              <div className="h-44 w-full bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 flex flex-col justify-between p-3 relative">
                {/* Visual Representation of Road Damage */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <span className="material-symbols-outlined text-[96px] text-slate-300">
                    broken_image
                  </span>
                </div>

                {/* Status Badges Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-emerald-600 text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    EXIF Metadata Valid
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoTaken(false);
                      showToast('Foto dihapus, silakan ambil foto baru', 'delete');
                    }}
                    className="bg-black/60 hover:bg-black/80 text-white px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 backdrop-blur-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    Foto Ulang
                  </button>
                </div>

                {/* Bottom Watermark Details */}
                <div className="relative z-10 bg-black/75 backdrop-blur-sm p-2 rounded-xl text-white font-mono text-[9px] space-y-0.5 border border-white/10">
                  <div className="flex justify-between text-teal-300 font-bold">
                    <span>GPS: -5.380120, 105.258140</span>
                    <span>Akurasi: ±3m</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Waktu: 2026-11-10 18:32 WIB</span>
                    <span>Device: Camera Live Sensor</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setPhotoTaken(true);
                showToast('Foto berhasil ditangkap dari kamera dengan koordinat GPS', 'camera');
              }}
              className="h-36 rounded-2xl border-2 border-dashed border-primary/40 bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-2 cursor-pointer p-4 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-[26px]">photo_camera</span>
              </div>
              <div>
                <span className="font-label-md text-xs font-bold text-on-surface block">
                  Ketuk untuk Membuka Kamera
                </span>
                <span className="text-[10px] text-secondary">
                  Aplikasi akan otomatis mengunci koordinat GPS saat foto diambil
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Geotagging & Lokasi Presisi */}
        <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
              Titik Koordinat Lokasi (Otomatis)
            </span>
            <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.2 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              GPS Terkunci
            </span>
          </div>

          <div className="flex items-start gap-2 bg-surface-container-lowest p-2.5 rounded-lg border border-surface-container text-xs">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              place
            </span>
            <div className="space-y-0.5">
              <p className="font-bold text-on-surface text-[11px]">
                Jl. Teuku Umar No. 88, Kedaton
              </p>
              <p className="text-[10px] text-secondary">
                Kec. Kedaton, Kota Bandar Lampung, Lampung 35148
              </p>
              <div className="font-mono text-[9px] text-primary font-semibold pt-0.5">
                Lat: -5.38012 • Long: 105.25814 • Elevasi: 84m
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dropdown Kategori Masalah */}
        <div className="space-y-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">category</span>
            Kategori Permasalahan (OPD Tujuan)
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 bg-surface-container text-on-surface font-body-sm text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer border border-surface-container-high"
            >
              <option value="Infrastruktur Jalan & Jembatan (Dinas PUPR)">
                Infrastruktur Jalan & Jembatan (Dinas PUPR)
              </option>
              <option value="Penerangan Jalan Umum / PJU (Dishub)">
                Penerangan Jalan Umum / PJU (Dinas Perhubungan)
              </option>
              <option value="Sampah & Kebersihan Kota (Dinas Lingkungan Hidup)">
                Sampah & Kebersihan Kota (Dinas Lingkungan Hidup)
              </option>
              <option value="Drainase & Penanganan Banjir (Dinas PUPR SDA)">
                Drainase & Saluran Banjir (Dinas PUPR SDA)
              </option>
              <option value="Ketertiban & Fasilitas Umum (Satpol PP)">
                Ketertiban Fasilitas Umum (Satpol PP)
              </option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
        </div>

        {/* 4. Deskripsi Detail Masalah */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-primary">edit_note</span>
              Deskripsi Masalah & Titik Patokan
            </label>
            <span className="text-[10px] text-secondary font-mono">{description.length}/300</span>
          </div>
          <textarea
            rows={3}
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-surface-container text-on-surface font-body-sm text-xs focus:ring-2 focus:ring-primary focus:outline-none shadow-inner border border-surface-container-high placeholder:text-outline-variant"
            placeholder="Sebutkan patokan jelas (dekat ruko apa, marka kilometer, atau arah arus lalu lintas)..."
            required
          />
        </div>

        {/* 5. Tingkat Urgensi */}
        <div className="space-y-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">priority_high</span>
            Tingkat Urgensi Menurut Pelapor
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Tinggi', 'Sedang', 'Rendah'] as const).map((level) => {
              const isSelected = urgency === level;
              return (
                <button
                  type="button"
                  key={level}
                  onClick={() => setUrgency(level)}
                  className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border transition-all cursor-pointer ${isSelected
                    ? level === 'Tinggi'
                      ? 'bg-error-container text-on-error-container border-error shadow-sm'
                      : level === 'Sedang'
                        ? 'bg-amber-100 text-amber-900 border-amber-500 shadow-sm'
                        : 'bg-primary-fixed text-on-primary-fixed border-primary shadow-sm'
                    : 'bg-surface-container text-secondary border-transparent hover:bg-surface-container-high'
                    }`}
                >
                  <span className="text-xs uppercase">{level}</span>
                  <span className="text-[9px] font-normal opacity-85">
                    {level === 'Tinggi' ? 'SLA Darurat' : level === 'Sedang' ? 'SLA 6 Jam' : 'SLA 24 Jam'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Persetujuan */}
        <label className="flex items-start gap-2 p-2.5 bg-surface-container-low rounded-xl text-[11px] text-secondary cursor-pointer border border-surface-container">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 rounded accent-primary"
            required
          />
          <span>
            Saya menyatakan laporan ini dibuat berdasarkan kondisi riil di lapangan, bukan informasi hoax atau rekayasa data.
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-xl font-label-lg text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Mengirim & Menerbitkan Tiket...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Kirim Laporan Pengaduan Sekarang</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

