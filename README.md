# SIPEMAT — Sistem Informasi Pelaporan dan Penanganan Masalah Kota Terpadu

**Inovasi Kolaboratif:** Pemerintah Kota Bandar Lampung × Universitas Teknokrat Indonesia  
**Versi:** 1.0 (MVP 15 Halaman Interaktif)  
**Hak Cipta:** Copyright©2026 by Razak Tri Handoko dan Dr. Erliyan Redy Susanto, M.Kom

---

## 📌 Ringkasan Eksekutif

**SIPEMAT** adalah platform *crowdsourcing* terpadu yang memfasilitasi warga kota untuk melaporkan masalah infrastruktur dan layanan publik secara *real-time* berbasis lokasi (*geotagging*). Aplikasi ini dirancang untuk memangkas birokrasi, meningkatkan transparansi penanganan, dan memberikan data analitik kepada kepala daerah untuk pengambilan keputusan berbasis data.

Sistem ini dirancang dengan standar desain **Material Design 3 (Teal/Blue palette)**, tipografi Inter, ikonografi Google Material Symbols, dan tata letak responsif (*mobile app mockup frame* untuk modul publik & lapangan, serta *web dashboard table* untuk modul Command Center).

---

## 🏛️ Arsitektur & Teknologi

- **Frontend Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling & Desain Sistem:** Tailwind CSS + Material Design 3 + Material Symbols
- **State Management:** Reactive React Context (`TicketContext`, `ToastContext`) tersinkronisasi lintas peran
- **Backend Architecture (Target):** Rust API (Kinerja tinggi konkurensi, memory safety, respon < 200ms)
- **Database Architecture (Target):** PostgreSQL + PostGIS (Spatial Geotagging & Heatmap Analysis)

---

## 📱 Daftar 15 Halaman (Views) Sistem

Aplikasi terbagi ke dalam **3 Modul Peran Terintegrasi**:

### 1. Modul Warga (Mobile App)
1. **View 1: Login & Verifikasi OTP** — Autentikasi NIK resmi tersinkronisasi SIAK Disdukcapil & OTP SMS.
2. **View 2: Beranda (Home) & Sekitar** — Tombol lapor cepat, ringkasan GPS pengguna, dan feed isu lokal sekitar.
3. **View 3: Form Lapor Kamera GPS** — Pengambilan bukti foto fisik kamera langsung, kategori OPD, deskripsi, dan geotagging otomatis.
4. **View 4: Riwayat & Stepper SLA** — Pelacakan linimasa 4 tahap tiket dari verifikasi hingga berita acara tuntas.
5. **View 5: Detail & Upvote Laporan** — Investigasi foto, metadata EXIF, dan interaksi upvote dukungan warga.

### 2. Modul Admin Verifikator (Web Command Center)
6. **View 6: Login Khusus Administrator** — Autentikasi NIP resmi operator Command Center Pemkot.
7. **View 7: Dashboard SLA Monitoring** — Ringkasan 4 KPI agregat kota, tabel peringatan SLA darurat, dan beban kerja per dinas.
8. **View 8: Peta Heatmap GIS Kota** — Visualisasi spasial hotspot sebaran keluhan warga di Bandar Lampung.
9. **View 9: Meja Verifikasi Tiket Masuk** — Validasi bukti visual, seleksi spam/hoax berbasis AI, dan penerbitan nomor registrasi.
10. **View 10: Disposisi Penugasan OPD** — Penerbitan Surat Perintah Tugas (SPT) resmi ke instansi teknis (PUPR, Dishub, DLH).
11. **View 11: Master Data Pengguna & RBAC** — Tata kelola akun ASN, koordinator dinas, dan regu teknisi lapangan.

### 3. Modul Tim Lapangan (Unit Taktis Mobile)
12. **View 12: Login Petugas & Absensi Shift** — Akses masuk teknisi, validasi kesiapan armada (dump truck, skylift, crane), dan geofence posko.
13. **View 13: Daftar Tugas & Countdown SLA** — Antrean pekerjaan darurat urut batas waktu terdekat dengan banner status geofence lokasi.
14. **View 14: Detail TKP & Rute Google Maps** — Data teknis kerusakan, instruksi Danru, dan rute navigasi turn-by-turn ke TKP.
15. **View 15: Validasi Selesai & BAP Resmi** — Komparasi foto *Before* & *After*, input pemakaian material, TTE Danru, dan penerbitan nomor BAP resmi.

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat:
- Node.js (v18 atau lebih baru)
- npm / yarn / bun

### Langkah Instalasi:
```bash
# Clone repositori
git clone https://github.com/razaktrihandoko-tech/SIPEMAT.git
cd SIPEMAT

# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

Buka peramban di [http://localhost:3000](http://localhost:3000) untuk mengakses aplikasi.

### Build Produksi:
```bash
npm run build
npm run start
```

---

###### Copyright©2026 by Razak Tri Handoko dan Dr. Erliyan Redy Susanto, M.Kom
