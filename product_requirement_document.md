# PRODUCT REQUIREMENT DOCUMENT (PRD)

**Nama Proyek:** Sistem Informasi Pelaporan dan Penanganan Masalah Kota Terpadu (SIPEMAT)  
**Versi Dokumen:** 1.0  
**Tanggal:** 10 November 2026  
**Pemangku Kepentingan:** Pemerintah Daerah & Universitas Teknokrat Indonesia  

---

## 1. Ringkasan Eksekutif
SIPEMAT adalah platform *crowdsourcing* terpadu yang memfasilitasi warga kota untuk melaporkan masalah infrastruktur dan layanan publik secara *real-time* berbasis lokasi (*geotagging*). Aplikasi ini dirancang untuk memangkas birokrasi, meningkatkan transparansi penanganan, dan memberikan data analitik kepada kepala daerah untuk pengambilan keputusan berbasis data.

## 2. Validasi Arsitektur Teknologi (Rust & PostgreSQL)

### A. Back-End API (Rust)
1. **Kinerja Tinggi & Konkurensi (*High Concurrency*):** Model konkurensi Rust memungkinkan server menangani beban tinggi dengan *overhead* memori yang sangat rendah saat menerima ribuan *request* bersamaan (misal: saat terjadi insiden massal).
2. **Keamanan Memori (*Memory Safety*):** Rust menghilangkan risiko *memory leaks* atau *buffer overflows* pada saat *runtime* berkat sistem *Ownership*, memastikan server tidak mudah *crash* atau diretas.
3. **Efisiensi Biaya Server (*Cost-Effective Scaling*):** Sangat hemat *resource* (CPU & RAM), menekan biaya komputasi di infrastruktur *cloud* Pemda.

### B. Database (PostgreSQL)
1. **PostGIS untuk Data Geospasial:** Standar industri terbaik untuk menyimpan, mengkueri, dan memanipulasi data spasial (kordinat GPS laporan warga).
2. **ACID Compliance & Integritas Data:** Menjamin transaksi data yang sangat ketat; memastikan data laporan, foto, dan status terikat dalam satu transaksi yang aman.
3. **Kesesuaian dengan Ekosistem Rust:** Dukungan *library* ORM (seperti *SQLx*) sangat matang di ekosistem Rust untuk komunikasi asinkron yang cepat.

---

## 3. Kebutuhan Antarmuka (UI/UX) & Branding
Sistem dibatasi pada **maksimal 15 halaman** untuk menjaga cakupan MVP (*Minimum Viable Product*). 

**Aturan Wajib (Global Layout):**
- **Header:** Wajib menampilkan berdampingan: `[LOGO PEMERINTAH DAERAH]` dan `[LOGO UNIVERSITAS TEKNOKRAT INDONESIA]` di semua halaman.
- **Footer:** Wajib menampilkan teks hak cipta statis di bagian paling bawah pada setiap halaman.

---

## 4. Kebutuhan Fungsional (*Functional Requirements*)

### 4.1. Modul Warga (Mobile App)
1. **Login & Registrasi NIK:** Autentikasi menggunakan Nomor Induk Kependudukan dan kata sandi via OTP.
2. **Beranda (Home):** Tombol lapor cepat dan daftar laporan terbaru di sekitar.
3. **Form Lapor:** Wajib memuat foto (langsung dari kamera), *dropdown* kategori, deksripsi, dan GPS *Geotagging* otomatis.
4. **Riwayat & Lacak Status:** Melihat riwayat laporan pribadi (*Menunggu Verifikasi ➔ Diteruskan ➔ Diproses ➔ Selesai*).
5. **Detail & Upvote:** Melihat detail laporan warga lain di area sekitar dan fitur *upvote* untuk menaikkan prioritas.

### 4.2. Modul Admin Verifikator (Web Dashboard)
6. **Login Admin:** Autentikasi khusus pegawai Pemda/Operator Command Center.
7. **Dashboard Metrik Utama:** Ringkasan statistik tiket dan peringatan SLA (*Service Level Agreement*).
8. **Peta Heatmap:** Visualisasi sebaran laporan warga ke dalam peta kota (*red/yellow zones*).
9. **Verifikasi Tiket Masuk:** Tabel untuk menyeleksi laporan baru (mencegah *spam/hoax*).
10. **Disposisi & Penugasan:** Meneruskan tiket valid ke instansi/dinas teknis terkait (misal: Dinas PU).
11. **Master Data Pengguna:** Manajemen akun Admin, Dinas, dan Tim Lapangan.

### 4.3. Modul Tim Lapangan (Mobile App)
12. **Login Tim Lapangan:** Akses masuk regu teknis (misal: Tim PU Jalan).
13. **Daftar Tugas Aktif:** Melihat daftar tugas yang diurutkan berdasarkan batas waktu SLA terdekat.
14. **Detail Tugas & Navigasi:** Detail kerusakan, kordinat lokasi, dan integrasi tombol navigasi rute ke Google Maps.
15. **Form Validasi Selesai:** Mengunggah foto bukti "Sesudah Perbaikan" dari kamera dan catatan teknisi untuk menutup tiket.

---

## 5. Kebutuhan Non-Fungsional (*Non-Functional Requirements*)

| Kategori | Spesifikasi |
| :--- | :--- |
| **Kinerja & Skalabilitas** | API (*Rust*) harus merespons di bawah 200 ms dan menangani hingga 10.000 koneksi bersamaan tanpa *bottleneck* (*PostgreSQL*). |
| **Ketersediaan (*Availability*)** | Waktu aktif minimum 99.9% (Toleransi *downtime* maksimal ~43 menit/bulan). |
| **Keamanan (*Security*)** | *Endpoint* API diamankan dengan JWT, sandi dengan enkripsi *Bcrypt*, dan komunikasi via HTTPS/TLS 1.3. |
| **Penyimpanan (*Storage*)** | Menggunakan arsitektur *Object Storage* (MinIO/S3) untuk file foto. |

---

###### Copyright©2026 by Razak Tri Handoko dan Dr. Erliyan Redy Susanto, M.Kom