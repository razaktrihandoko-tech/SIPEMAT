---
name: sipemat-design-system
description: Sistem desain SIPEMAT (Sistem Pengaduan & Manajemen Masalah Kota Terpadu, Pemkot Bandar Lampung × Universitas Teknokrat Indonesia) — Material Design 3 teal/biru, font Inter, Tailwind CDN, ikon Material Symbols, dashboard pemerintah yang padat, berlabel SLA, dan simulasi mobile. Gunakan skill ini setiap kali user meminta membuat, melanjutkan, memperluas, atau menyamakan tampilan SIPEMAT, atau membuat UI/dashboard/aplikasi pengaduan warga, smart city, command center, disposisi OPD, tim lapangan, tiket SLA, heatmap GIS, atau panel admin pemerintah daerah dengan gaya yang sama — walaupun user tidak menyebut "design system". Also use for building new SIPEMAT screens (View 1–15+), role switchers (Warga / Admin / Tim Lapangan), SLA warning tables, KPI cards, ticket cards, BAP/berita acara forms, and mobile phone-frame mockups in Indonesian.
---

# SIPEMAT Design System

Skill ini merekam bahasa visual SIPEMAT: aplikasi pengaduan kota dengan tiga peran (Warga, Admin Command Center, Tim Lapangan) yang dibangun sebagai satu halaman HTML berisi banyak "view" yang dipindah lewat JavaScript. Tujuannya: layar baru yang Anda buat terlihat seperti bagian dari produk yang sama, bukan template baru.

## Karakter desain (pegang ini dulu)

- **Material Design 3, palet teal–biru.** Primary teal `#00685f`, tertiary biru `#0051d5`, permukaan biru-kelabu sangat muda (`#f8f9ff` → `#e5eeff`). Tidak ada hitam murni; teks utama `#0b1c30`.
- **Padat tapi rapi.** Ini perangkat kerja pemerintah: banyak data per layar, teks kecil (10–13px untuk metadata), kartu bersudut besar, bayangan halus, hampir tanpa garis tepi tebal.
- **Status selalu berwarna dan berlabel.** Merah = kritis/darurat, kuning-amber = peringatan, teal = valid/selesai, biru = sedang diproses, abu-slate = netral. Warna tidak pernah berdiri sendiri; selalu ada ikon + teks (mis. "KRITIS MERAH", "SISA 00:45:00").
- **Terasa "hidup".** Titik berdenyut (`animate-ping`/`animate-pulse`) untuk data live, SLA kritis, dan status sistem. Gunakan hemat — maksimal satu-dua per kartu.
- **Bahasa Indonesia resmi-administratif.** Istilah: OPD, SPT, BAP, TTE, NIP, SIAK, Perwali, Danru, TKP, SLA, WIB. Lihat bagian *Copywriting*.
- **Selalu ada konteks kolaborasi.** Header memuat lencana `Pemda` + `UTI`; footer memuat hak cipta dan lencana ISO. Pertahankan di setiap halaman penuh.

## Alur kerja

1. Tentukan apakah tugasnya (a) layar/view baru dalam shell yang sudah ada, (b) halaman mandiri baru, atau (c) mengedit file SIPEMAT yang diberikan user. Untuk (c), edit file itu apa adanya dan jangan menulis ulang shell-nya.
2. Untuk (a)/(b), mulai dari Lampiran D (sudah memuat konfigurasi Tailwind, shell, role switcher, `switchView`, `showToast`). Salin lalu isi view-nya.
3. Ambil token dari Lampiran A dan potongan komponen dari Lampiran B. Jangan mengarang warna hex baru; pakai nama token Tailwind (`bg-primary`, `text-on-surface-variant`, dst.).
4. Tentukan **peran** (Warga / Admin / Lapangan) lebih dulu, karena peran menentukan format layar (lihat tabel berikut).
5. Jalankan *Checklist akhir* di bawah sebelum menyerahkan hasil.

## Format layar per peran

| Peran | Format | Ciri |
|---|---|---|
| **Warga** | Bingkai ponsel sederhana `max-w-[420px]`, `rounded-2xl`, header bar `bg-primary` | Satu kolom, kartu foto + badge, CTA besar bergradien `from-primary to-primary-container`, upvote, linimasa progres |
| **Admin** | Lebar penuh desktop, grid 12 kolom (`xl:grid-cols-12`) | Header halaman putih + KPI 4 kartu, tabel padat, panel samping 4 kolom, peta/heatmap, daftar antrean kiri (5 kol) + formulir detail kanan (7 kol) |
| **Tim Lapangan** | Bingkai ponsel realistis `max-w-[390px]`, `rounded-[2.5rem] border-4 border-slate-900` + panel audit di kolom kanan desktop | Status bar palsu, banner geofence gelap, foto Before/After, tombol besar untuk jempol |

Setiap layar penuh diawali **kartu header halaman** (`bg-surface-container-lowest p-5 rounded-2xl shadow-sm border`) berisi: ikon 28px + judul `headline-md` + lencana status live + deskripsi satu baris + grup tombol aksi di kanan.

## Token inti (ringkas)

Lengkapnya ada di Lampiran A.

- **Font:** Inter 400/600/700 saja. Gunakan pasangan kelas `font-<nama> text-<nama>`, mis. `font-label-sm text-label-sm`, `font-headline-md text-headline-md`. Nama skala: `headline-xl/lg/md/sm`, `body-lg/md/sm`, `label-lg/md/sm`. Untuk 9–13px gunakan `text-[11px]` dsb.; ini lazim di SIPEMAT.
- **Spasi kustom:** `px-margin` (2rem), `px-margin-mobile` (1rem), `gap-space-xs/sm/md/lg/xl` (0.25/0.5/1/1.5/2rem), `gap-gutter`.
- **Radius:** kartu halaman `rounded-2xl`, kartu dalam & tombol `rounded-xl`, input & chip kecil `rounded-lg`, badge `rounded-full`. Lihat peringatan radius di *Jebakan*.
- **Bayangan:** `shadow-sm` untuk kartu, `shadow-md` untuk elemen terpilih/tombol utama, `shadow-xl/2xl` hanya untuk bingkai ponsel, popover, toast.
- **Permukaan berlapis:** latar halaman `bg-background`; kartu `bg-surface-container-lowest` (putih); sub-kartu/field `bg-surface-container-low` atau `bg-surface-container`; input `bg-surface-container` + `shadow-inner`.

## Semantik warna status

| Makna | Latar | Teks | Contoh label |
|---|---|---|---|
| Kritis / P1 / ditolak | `bg-error` + `text-white` (solid) atau `bg-error-container text-on-error-container` | — | `KRITIS MERAH`, `LEWAT BATAS +00:41:20`, `P1 - Darurat` |
| Peringatan / P2 / menunggu | `bg-amber-100`/`bg-amber-200` `text-amber-900` | — | `WARNING KUNING`, `MENUNGGU VERIFIKASI` |
| Valid / selesai / aman | `bg-primary-fixed text-on-primary-fixed` | | `SELESAI`, `Terverifikasi`, `100% COMPLIANT` |
| Sedang diproses | `bg-tertiary-fixed text-on-tertiary-fixed` | | `DIPROSES`, `Menuju TKP` |
| Netral / P3 / rutin | `bg-surface-container text-secondary` atau `bg-secondary-container text-on-secondary-container` | | `NORMAL`, `P3 - Rutin` |

Aturan baris tabel SLA: baris kritis diberi `bg-error-container/20`, baris peringatan `bg-amber-50`, baris normal tanpa latar. Kartu KPI kritis memakai `border-2 border-error/40` + gradien `from-white to-error-container/30`.

## Pola yang wajib konsisten

- **Lencana peran/organisasi** di header: ikon + label `uppercase` kecil.
- **Role switcher + dropdown "Lompat Layar"** (sub-header sticky) + **pill sub-navigasi per peran**. Lihat Lampiran C.
- **ID tiket** `#SPM-2026-0856` (font mono, tebal); **SPT** `#SPT-PUPR-2026-0419`. Selalu `font-mono`.
- **Waktu** format `31 Mar 2026, 09:35 WIB`; durasi SLA `SISA 00:45:00` (mono).
- **Kartu data + ikon**: ikon 28px di kotak `w-12 h-12 rounded-xl` berwarna lembut di sisi kanan, angka `headline-xl`.
- **Label bagian form:** `font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold` dengan ikon 15–16px berwarna `text-primary` di depannya.
- **Toast** di kanan-bawah (`showToast`) untuk setiap tombol aksi demo, supaya prototipe terasa responsif tanpa backend.
- **Tombol navigasi antar-view** di tiap layar ("Kembali ke Dashboard (View 7)") supaya alur lintas peran bisa didemokan.

## Interaksi & motion

- Transisi: `transition-all` / `transition-colors`; tombol utama `active:scale-[0.98]`, tombol kecil `active:scale-95`.
- Hover: kartu `hover:bg-surface-container`, tombol sekunder `hover:bg-surface-container-high`, tombol primer `hover:bg-primary-container`.
- Denyut: `animate-ping` untuk titik "LIVE", `animate-pulse` untuk badge peringatan, `animate-bounce` hanya untuk pin peta.
- Tidak ada animasi masuk halaman; perpindahan view instan (toggle kelas `hidden`).

## Copywriting

- Judul layar deskriptif dan panjang: "Meja Verifikasi & Validasi Laporan Masuk", "Disposisi & Penugasan Regu Teknis OPD".
- Label tombol berupa kata kerja lengkap: "Verifikasi & Teruskan ke Disposisi OPD", "Kirim Berita Acara & Tutup Tiket Resmi".
- Sertakan rujukan regulasi fiktif-realistis seperlunya (mis. "Perwali No. 14/2026") dan data kontekstual lokal Bandar Lampung: Kedaton, Tanjung Karang, Way Halim, Sukarame, Teluk Betung, Jl. ZA. Pagar Alam, Jl. Soekarno-Hatta.
- Gunakan "Warga", "Petugas", "Danru", "Kadis", "Verifikator ASN". Hindari bahasa gaul kecuali pada kolom komentar warga.
- Data contoh harus konsisten antar layar (satu tiket yang sama muncul di dashboard, verifikasi, disposisi, dan BAP dengan ID, lokasi, koordinat, dan jam yang cocok). Pakai tiket acuan `#SPM-2026-0856` / `#SPM-2026-0842` bila membuat demo.
- Jangan menaruh data pribadi asli. NIK/NIP/nama pada contoh harus rekaan.

## Jebakan yang sudah diketahui

1. **`rounded-full` bukan lingkaran.** Konfigurasi menimpa `full` menjadi `0.75rem`. Untuk avatar/titik/pin yang harus bulat sempurna gunakan `rounded-[9999px]` (atau `rounded-full` hanya pada elemen ≤ 24px). Untuk pill badge kecil `rounded-full` sudah cukup.
2. **Nilai Tailwind tidak valid** seperti `py-0.2`, `rows="2.5"`, `w-18 h-18` diabaikan diam-diam. Gunakan `py-0.5`, `rows="3"`, `w-[72px]`.
3. **Dropdown/`select`** memakai `appearance-none` + ikon `expand_more` absolut; jangan lupa ikonnya, kalau tidak panahnya hilang.
4. **Font ikon** Material Symbols dimuat dari Google Fonts; di lingkungan tanpa internet ikon tampil sebagai teks. Beri `title`/label teks pada tombol penting.
5. **Gambar placeholder** pada contoh sumber adalah URL CDN sementara. Untuk karya baru pakai gradien `bg-surface-container-high` + ikon, atau `data:` URI, bukan URL acak.
6. **Pembungkus peran** (`role-container-*`) dan **panel view** (`view-v<n>`) harus ber-ID persis dan terdaftar di `roleViewMap`, atau `switchView` tidak menemukannya.
7. Angka teks kecil (`text-[9px]`) hanya untuk metadata mono; jangan untuk isi utama.

## Checklist akhir

- [ ] Pakai token (`bg-primary`, `text-secondary`, dst.), bukan hex baru
- [ ] Header (Pemda + UTI), sidebar, footer ISO ada pada halaman penuh
- [ ] Setiap status = warna + ikon + teks
- [ ] ID tiket/SPT/koordinat/waktu dalam `font-mono`, konsisten lintas layar
- [ ] Tombol aksi demo memanggil `showToast` atau `switchView`
- [ ] Layar ponsel memakai salah satu dari dua bingkai standar
- [ ] Responsif: `grid-cols-1` → `xl:grid-cols-12`, tabel di dalam `overflow-x-auto`
- [ ] Teks UI berbahasa Indonesia, tidak ada lorem ipsum
- [ ] Tidak memakai `localStorage` bila ditampilkan sebagai artifact di claude.ai

## Lampiran (di dalam berkas ini)

- **Lampiran A — Token:** konfigurasi Tailwind lengkap, palet, tipografi, spasi, radius, font & ikon
- **Lampiran B — Komponen:** potongan HTML siap salin (badge, tombol, KPI, kartu tiket, tabel SLA, form, stepper, foto Before/After, bingkai ponsel, toast)
- **Lampiran C — Pola layout:** geometri shell, header, sidebar, footer, role switcher, JavaScript navigasi, grid admin
- **Lampiran D — Kerangka HTML:** template lengkap yang langsung jalan (3 peran, beberapa view contoh)


---

# Lampiran A — Token SIPEMAT

## Daftar isi
1. Konfigurasi Tailwind (salin utuh)
2. Palet warna per peran
3. Skala tipografi
4. Spasi & radius
5. Pemuatan font & ikon

## 1. Konfigurasi Tailwind (salin utuh ke `<script id="tailwind-config">`)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{
"colors":{"surface-container-high":"#dce9ff","on-tertiary-fixed-variant":"#003ea8","secondary":"#565e74","on-primary-fixed-variant":"#005049","tertiary-fixed":"#dbe1ff","on-primary-container":"#f4fffc","background":"#f8f9ff","inverse-on-surface":"#eaf1ff","outline":"#6d7a77","on-surface":"#0b1c30","inverse-surface":"#213145","primary-fixed-dim":"#6bd8cb","primary":"#00685f","on-secondary-container":"#5c647a","outline-variant":"#bcc9c6","on-error":"#ffffff","on-error-container":"#93000a","surface-variant":"#d3e4fe","surface-container-highest":"#d3e4fe","primary-fixed":"#89f5e7","on-tertiary-container":"#fefcff","inverse-primary":"#6bd8cb","primary-container":"#008378","on-secondary":"#ffffff","surface-tint":"#006a61","surface-container-low":"#eff4ff","surface":"#f8f9ff","surface-container":"#e5eeff","on-primary":"#ffffff","surface-bright":"#f8f9ff","error-container":"#ffdad6","on-surface-variant":"#3d4947","on-secondary-fixed":"#131b2e","secondary-container":"#dae2fd","error":"#ba1a1a","secondary-fixed-dim":"#bec6e0","tertiary-container":"#316bf3","tertiary":"#0051d5","surface-container-lowest":"#ffffff","on-secondary-fixed-variant":"#3f465c","on-background":"#0b1c30","surface-dim":"#cbdbf5","on-tertiary-fixed":"#00174b","on-primary-fixed":"#00201d","on-tertiary":"#ffffff","tertiary-fixed-dim":"#b4c5ff","secondary-fixed":"#dae2fd"},
"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},
"spacing":{"margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem","space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","gutter-mobile":"1rem","space-xl":"2rem","space-md":"1rem"},
"fontFamily":{"body-md":["Inter"],"label-sm":["Inter"],"headline-sm":["Inter"],"headline-xl":["Inter"],"headline-lg-mobile":["Inter"],"headline-xl-mobile":["Inter"],"headline-lg":["Inter"],"headline-md":["Inter"],"label-md":["Inter"],"body-lg":["Inter"],"label-lg":["Inter"],"body-sm":["Inter"]},
"fontSize":{"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"label-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.04em","fontWeight":"700"}],"headline-sm":["20px",{"lineHeight":"28px","letterSpacing":"-0.005em","fontWeight":"600"}],"headline-xl":["40px",{"lineHeight":"48px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-xl-mobile":["30px",{"lineHeight":"38px","letterSpacing":"-0.015em","fontWeight":"700"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-lg":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"600"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}]}
}}}</script>
```

Tailwind core punya warna `amber`, `slate` yang juga dipakai (peringatan kuning, bingkai ponsel gelap, latar peta).

## 2. Palet — peran tiap warna

| Token | Hex | Dipakai untuk |
|---|---|---|
| `background` / `surface` | `#f8f9ff` | Latar halaman |
| `surface-container-lowest` | `#ffffff` | Kartu utama, header, sidebar, popover |
| `surface-container-low` | `#eff4ff` | Sub-kartu, bar sub-header, footer kartu |
| `surface-container` | `#e5eeff` | Input, chip, sel kecil, track progress |
| `surface-container-high` | `#dce9ff` | Hover, tombol sekunder, ikon-kotak |
| `surface-container-highest` / `surface-variant` | `#d3e4fe` | Counter, hover kuat |
| `primary` | `#00685f` | Tombol utama, ikon aksen, link, bagian selesai |
| `primary-container` | `#008378` | Hover tombol primer, tab/pill aktif, akhir gradien CTA |
| `primary-fixed` | `#89f5e7` | Badge "valid/live/selesai" (teks `on-primary-fixed`) |
| `primary-fixed-dim` | `#6bd8cb` | Teks kecil di atas gradien primer |
| `tertiary` | `#0051d5` | Angka "dalam proses", info, tautan teknis |
| `tertiary-fixed` | `#dbe1ff` | Badge "diproses", lencana UTI/akademik |
| `tertiary-container` | `#316bf3` | Badge status "Sedang Ditangani" di atas foto |
| `secondary` | `#565e74` | Teks sekunder, metadata, label |
| `secondary-container` | `#dae2fd` | Badge netral, kategori |
| `error` | `#ba1a1a` | Kritis, pin lokasi, tombol eskalasi |
| `error-container` | `#ffdad6` | Badge kritis lembut (`on-error-container` `#93000a`) |
| `on-surface` | `#0b1c30` | Teks utama |
| `on-surface-variant` | `#3d4947` | Teks pendukung, label form |
| `outline` / `outline-variant` | `#6d7a77` / `#bcc9c6` | Teks sangat redup / placeholder |
| `inverse-surface` | `#213145` | Overlay gelap, banner geofence, toast, tooltip peta |
| `on-secondary-fixed` | `#131b2e` | Latar footer |

Opasitas lazim: `/20`–`/30` untuk latar tint (`bg-primary-fixed/20`, `bg-error-container/30`), `/40`–`/50` untuk border tint (`border-primary/40`), `/90`–`/95` + `backdrop-blur` untuk elemen mengambang.

## 3. Skala tipografi

| Kelas | Ukuran | Berat | Pakai untuk |
|---|---|---|---|
| `headline-xl` | 40/48 | 700 | Angka KPI |
| `headline-lg` | 32/40 | 700 | Judul landing (jarang) |
| `headline-md` | 24/32 | 600–700 | Judul halaman (tambah `font-bold`) |
| `headline-sm` | 20/28 | 600 | Judul kartu, angka kecil, nama aplikasi |
| `body-lg` | 18/28 | 400 | Paragraf pengantar |
| `body-md` | 16/24 | 400 | Teks dasar `<body>` |
| `body-sm` | 14/20 | 400 | Deskripsi, input |
| `label-lg` | 14/20 | 600 | Judul item, tombol besar |
| `label-md` | 12/16 | 600 | Tombol, tab, dropdown |
| `label-sm` | 11/14 | 700 | Badge, label bagian (uppercase) |
| `text-[10px]`/`[11px]`/`[12px]` | — | — | Metadata, mono, tabel padat |

`font-mono` dipakai untuk: ID tiket, koordinat, NIP, checksum, hitung mundur SLA, jam, nomor polisi.

## 4. Spasi & radius

- Padding halaman: `px-margin-mobile md:px-gutter py-space-md`; header `px-margin`.
- Jarak antar blok: `space-y-space-md` (1rem) atau `gap-space-md`; antar kartu KPI `gap-space-sm`.
- Padding kartu: halaman `p-5`, kartu sedang `p-3.5`–`p-4`, sub-kartu `p-3`.
- Tinggi kontrol: tombol bar `h-11`/`h-12` (mobile `h-12`), input `h-9`–`h-11`, dropdown halaman `h-9`.
- Radius: `rounded-2xl` kartu halaman & bingkai ponsel sederhana; `rounded-xl` tombol, sub-kartu; `rounded-lg` input, chip; `rounded-[2.5rem]` ponsel realistis. Ingat: `rounded-full` = 0.75rem (lihat Jebakan di SKILL.md).

## 5. Pemuatan font & ikon

```html
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

Ikon: `<span class="material-symbols-outlined text-[20px]">nama_ikon</span>`. Ukuran lazim 12–18px di badge, 20px di tombol/menu, 22–28px di judul kartu. Ikon yang konsisten dipakai: `account_balance`, `school`, `verified`, `verified_user`, `badge`, `timer`, `timer_off`, `crisis_alert`, `warning`, `engineering`, `assignment_ind`, `inbox`, `pending_actions`, `map`, `layers`, `pin_drop`, `near_me`, `my_location`, `photo_camera`, `thumb_up`, `task_alt`, `check_circle`, `send`, `smartphone`, `history`, `dashboard`, `analytics`.

Scrollbar disembunyikan global: `::-webkit-scrollbar{display:none;}`; `body{overscroll-behavior:none}`.


---

# Lampiran B — Komponen SIPEMAT (siap salin)

## Daftar isi
1. Badge & chip
2. Tombol
3. Kartu header halaman
4. Kartu KPI
5. Kartu tiket (daftar antrean)
6. Tabel peringatan SLA
7. Field form
8. Stepper progres penanganan
9. Kartu foto + overlay (warga)
10. Foto Before/After (lapangan)
11. Banner geofence & status bar ponsel
12. Bingkai ponsel (2 varian)
13. Panel samping (progress bar OPD, daftar kepatuhan)
14. Popover peta / hotspot
15. Toast

Ikon = `<span class="material-symbols-outlined text-[Npx]">nama</span>`. Di bawah, `ICON` berarti ikon tersebut.

---

## 1. Badge & chip

```html
<!-- Live (header halaman) -->
<span class="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
  <span class="w-2 h-2 rounded-[9999px] bg-primary animate-ping"></span> LIVE SENSOR
</span>

<!-- Kategori -->
<span class="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Infrastruktur Jalan</span>

<!-- Prioritas -->
<span class="bg-error text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">P1 - Darurat</span>
<span class="bg-amber-100 text-amber-900 font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">P2 - Sedang</span>
<span class="bg-surface-container text-on-surface-variant font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">P3 - Rutin</span>

<!-- Status tiket -->
<span class="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
  <span class="w-1.5 h-1.5 rounded-[9999px] bg-tertiary animate-pulse"></span> DIPROSES</span>
<span class="bg-amber-100 text-amber-900 font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
  <span class="material-symbols-outlined text-[12px]">pending</span> MENUNGGU VERIFIKASI</span>
<span class="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
  <span class="material-symbols-outlined text-[13px]">check_circle</span> SELESAI</span>

<!-- ID tiket -->
<span class="font-mono font-bold text-[11px] text-secondary">TIKET #SPM-2026-0842</span>

<!-- Chip filter (aktif / tidak aktif) -->
<button class="px-3 py-1 bg-primary text-on-primary rounded-full font-label-sm text-label-sm font-bold shrink-0 shadow-sm">Semua (14)</button>
<button class="px-3 py-1 bg-surface-container text-on-surface-variant hover:bg-surface-container-high rounded-full font-label-sm text-label-sm font-semibold shrink-0">Infrastruktur</button>

<!-- Lencana organisasi (header) -->
<div class="h-10 px-space-sm bg-surface-container rounded-lg flex items-center gap-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
  <span class="material-symbols-outlined text-primary text-[20px]">account_balance</span>
  <span class="font-label-sm text-label-sm text-on-surface uppercase">Pemda</span></div>
<div class="h-10 px-space-sm bg-tertiary-fixed rounded-lg flex items-center gap-1.5">
  <span class="material-symbols-outlined text-tertiary text-[20px]">school</span>
  <span class="font-label-sm text-label-sm text-on-tertiary-fixed uppercase">UTI</span></div>
```

## 2. Tombol

```html
<!-- Primer -->
<button class="px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors" onclick="showToast('Berhasil')">
  <span class="material-symbols-outlined text-[18px]">task_alt</span><span>Kirim</span></button>

<!-- Sekunder -->
<button class="px-3.5 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-colors">
  <span class="material-symbols-outlined text-[18px] text-primary">download</span><span>Ekspor Laporan</span></button>

<!-- Outline primer (navigasi antar-view) -->
<button class="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold rounded-lg border border-primary/40 flex items-center gap-1 shadow-sm" onclick="switchView('v8')">
  <span class="material-symbols-outlined text-[16px]">map</span> Peta Heatmap (View 8)</button>

<!-- Bahaya / eskalasi -->
<button class="px-3 py-1.5 bg-error text-white font-label-sm text-label-sm font-bold rounded-lg hover:opacity-90 shadow-sm flex items-center gap-1">
  <span class="material-symbols-outlined text-[15px]">call</span> Eskalasi Kadis</button>

<!-- Peringatan -->
<button class="px-3 py-1.5 bg-amber-600 text-white font-label-sm text-label-sm rounded-lg hover:bg-amber-700 shadow-sm flex items-center gap-1">
  <span class="material-symbols-outlined text-[15px]">notification_important</span> Peringatkan</button>

<!-- Ikon-saja (aksi baris tabel) -->
<button class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors" title="Edit">
  <span class="material-symbols-outlined text-[17px]">edit</span></button>

<!-- CTA mobile lebar penuh -->
<button class="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
  <span class="material-symbols-outlined text-[20px]">send</span><span>Kirim Laporan Pengaduan Sekarang</span></button>

<!-- CTA hero warga (gradien) -->
<button class="w-full p-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl shadow-lg flex items-center justify-between group active:scale-[0.98] transition-all">
  <div class="flex items-center gap-3">
    <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><span class="material-symbols-outlined text-[30px]">photo_camera</span></div>
    <div class="text-left"><div class="font-headline-sm text-headline-sm leading-tight text-white">Buat Laporan Baru</div>
    <div class="font-label-sm text-label-sm text-primary-fixed">Foto, tandai lokasi, kirim langsung</div></div></div>
  <span class="material-symbols-outlined text-white text-[28px] group-hover:translate-x-1 transition-transform">add_circle</span></button>
```

Urutan aksi di bar bawah kartu: tombol destruktif/sekunder di kiri, tombol primer di kanan (`ml-auto`), tinggi `h-11`, radius `rounded-xl`.

## 3. Kartu header halaman

```html
<div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
  <div class="space-y-1">
    <div class="flex items-center gap-2.5 flex-wrap">
      <span class="material-symbols-outlined text-primary text-[28px]">speed</span>
      <h1 class="font-headline-md text-headline-md text-on-surface font-bold">Dashboard Utama &amp; Monitoring SLA Real-time</h1>
      <!-- badge live di sini -->
    </div>
    <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 flex-wrap">
      <span>Deskripsi satu kalimat</span><span>•</span>
      <span class="flex items-center gap-1 text-secondary font-mono text-[12px]"><span class="material-symbols-outlined text-[15px]">schedule</span> Update: 31 Mar 2026, 09:41 WIB</span>
    </p>
  </div>
  <div class="flex items-center gap-2.5 flex-wrap"><!-- tombol sekunder, lalu 1 tombol primer --></div>
</div>
```

## 4. Kartu KPI (grid 4)

```html
<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm">
  <div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
    <div>
      <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Total Pengaduan Masuk</span>
      <div class="font-headline-xl text-headline-xl text-on-surface mt-1">1,284</div>
      <div class="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-1 font-bold">
        <span class="material-symbols-outlined text-[16px]">trending_up</span> +12.4% bln ini</div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary"><span class="material-symbols-outlined text-[28px]">inbox</span></div>
  </div>

  <!-- Varian KRITIS -->
  <div class="p-5 rounded-xl shadow-sm border-2 border-error/40 flex items-center justify-between bg-gradient-to-br from-white to-error-container/30 relative overflow-hidden">
    <div>
      <span class="font-label-sm text-label-sm text-error uppercase tracking-wider font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-[9999px] bg-error animate-ping"></span> Peringatan Kritis SLA</span>
      <div class="font-headline-xl text-headline-xl text-error mt-1">8 Tiket</div>
      <div class="font-label-sm text-label-sm text-error flex items-center gap-1 mt-1 font-bold"><span class="material-symbols-outlined text-[16px]">warning</span> Memerlukan Eskalasi Kadis</div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-error"><span class="material-symbols-outlined text-[28px]">crisis_alert</span></div>
  </div>
</div>
```

Warna angka: `text-on-surface` (total), `text-tertiary` (dalam proses), `text-error` (kritis), `text-primary` (capaian baik). Kotak ikon: `bg-surface-container-high` / `bg-tertiary-fixed` / `bg-error-container` / `bg-primary-fixed`.

## 5. Kartu tiket (daftar antrean kiri)

```html
<!-- Terpilih -->
<div class="p-3.5 bg-surface-container-lowest rounded-2xl border-2 border-primary shadow-md space-y-2 cursor-pointer relative">
  <div class="flex items-center justify-between gap-1">
    <div class="flex items-center gap-1.5">
      <span class="bg-primary text-on-primary font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">#SPM-2026-0856</span>
      <span class="bg-error text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">P1 - Darurat</span>
    </div>
    <span class="text-[11px] text-secondary font-mono flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span> 12 Menit lalu</span>
  </div>
  <h4 class="font-label-lg text-label-lg font-bold text-on-surface leading-tight">Judul laporan</h4>
  <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 text-[12px]">Ringkasan masalah…</p>
  <div class="flex items-center justify-between text-[11px] pt-1 border-t border-surface-container">
    <span class="text-primary font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">thumb_up</span> 156 Dukungan Warga</span>
    <span class="bg-primary-fixed/30 text-on-primary-fixed px-2 py-0.5 rounded font-label-sm font-bold">Jarak Posko: 1.2 km</span>
  </div>
</div>
<!-- Tidak terpilih: ganti kelas luar menjadi
     "p-3.5 bg-surface-container-lowest hover:bg-surface-container-low rounded-2xl border border-surface-container shadow-sm space-y-2 cursor-pointer transition-colors"
     dan ID tiket menjadi teks "font-mono text-[11px] font-bold text-secondary" tanpa pil. -->
```

## 6. Tabel peringatan SLA

```html
<div class="overflow-x-auto">
<table class="w-full text-left font-body-sm text-body-sm">
  <thead class="bg-surface-container font-label-md text-label-md text-secondary uppercase">
    <tr><th class="p-3.5">No. Tiket</th><th class="p-3.5">Kategori &amp; Lokasi</th><th class="p-3.5">OPD</th><th class="p-3.5">Waktu</th><th class="p-3.5">Batas SLA &amp; Sisa</th><th class="p-3.5 text-center">Peringatan</th><th class="p-3.5 text-right">Aksi</th></tr>
  </thead>
  <tbody class="divide-y divide-surface-container">
    <!-- KRITIS -->
    <tr class="bg-error-container/20 hover:bg-error-container/30 transition-colors">
      <td class="p-3.5 font-bold font-mono text-error">#SPM-2026-0791<span class="block text-[10px] text-error font-normal">Prioritas P1</span></td>
      <td class="p-3.5 max-w-xs"><div class="font-bold text-on-surface">Pohon Tumbang Timpa Kabel Listrik</div>
        <div class="text-[12px] text-secondary flex items-center gap-1 mt-0.5"><span class="material-symbols-outlined text-[14px] text-error">place</span> Jl. RA Kartini No. 42</div></td>
      <td class="p-3.5"><span class="font-semibold text-on-surface block">Dinas Lingkungan Hidup</span><span class="text-[11px] text-secondary font-mono">Regu DLH-02 (Belum Tiba)</span></td>
      <td class="p-3.5 text-secondary text-[12px]">31 Mar, 06:30 WIB</td>
      <td class="p-3.5"><div class="text-[11px] text-secondary font-mono">Batas: 09:00 WIB (SLA 2.5j)</div>
        <span class="bg-error text-white font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold animate-pulse inline-flex items-center gap-1 mt-1 shadow-sm"><span class="material-symbols-outlined text-[13px]">alarm</span> LEWAT BATAS +00:41:20</span></td>
      <td class="p-3.5 text-center"><span class="bg-error text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">KRITIS MERAH</span></td>
      <td class="p-3.5 text-right"><button class="px-3 py-1.5 bg-error text-white font-label-sm text-label-sm font-bold rounded-lg hover:opacity-90 shadow-sm flex items-center gap-1 ml-auto"><span class="material-symbols-outlined text-[15px]">call</span> Eskalasi Kadis</button></td>
    </tr>
    <!-- PERINGATAN: baris "bg-amber-50 hover:bg-amber-100/50", sisa waktu "bg-amber-200 text-amber-900", label "WARNING KUNING" -->
    <!-- NORMAL: baris "hover:bg-surface-container-low", sisa waktu "bg-surface-container text-on-surface", label "NORMAL" -->
  </tbody>
</table></div>
```

Kepala kartu tabel: `p-4 bg-surface-container-low border-b border-surface-container`, ikon dalam `w-9 h-9 rounded-lg bg-error-container text-error`. Kaki kartu: bar `p-3.5 bg-surface-container-low border-t` berisi tombol navigasi antar-view.

## 7. Field form

```html
<div class="space-y-1">
  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold flex items-center gap-1">
    <span class="material-symbols-outlined text-[15px] text-primary">account_circle</span> NIP / Email Kedinasan</label>
  <div class="relative flex items-center">
    <span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">badge</span>
    <input class="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none shadow-inner" type="text" placeholder="…">
  </div>
</div>

<!-- Select -->
<div class="relative">
  <select class="w-full h-11 px-3 bg-surface-container text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-inner appearance-none cursor-pointer"><option>…</option></select>
  <span class="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
</div>

<!-- Pilihan urgensi (3 radio kartu) -->
<div class="grid grid-cols-3 gap-2">
  <label class="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-error-container/30 border border-error text-on-error-container font-label-sm text-label-sm cursor-pointer"><input checked class="accent-error" name="urgency" type="radio"><span class="font-bold">Tinggi</span></label>
  <label class="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer hover:bg-surface-container-high"><input class="accent-primary" name="urgency" type="radio"><span>Sedang</span></label>
  <label class="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm cursor-pointer hover:bg-surface-container-high"><input class="accent-primary" name="urgency" type="radio"><span>Rendah</span></label>
</div>

<!-- OTP 4 kotak -->
<div class="grid grid-cols-4 gap-2">
  <input class="h-12 text-center text-headline-sm font-bold bg-surface-container rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" maxlength="1" type="text"> <!-- ×4 -->
</div>
```

## 8. Stepper progres penanganan (4 langkah)

```html
<div class="bg-surface-container p-3 rounded-xl space-y-3">
  <div class="flex items-center justify-between">
    <div class="font-label-sm text-label-sm text-secondary uppercase font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">timer</span> Progres Penanganan &amp; SLA</div>
    <span class="bg-amber-100 text-amber-900 font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">Sisa SLA: 2 Jam 45 Menit</span>
  </div>
  <div class="space-y-2 text-[11px]">
    <!-- selesai -->
    <div class="flex items-start gap-2.5 text-on-surface font-medium">
      <span class="w-5 h-5 rounded-[9999px] bg-primary text-on-primary flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">✓</span>
      <div class="flex-1"><div class="flex justify-between items-center font-bold text-on-surface"><span>Laporan Terverifikasi</span><span class="text-[10px] text-secondary font-mono">08:20 WIB</span></div>
      <p class="text-on-surface-variant text-[10px]">Keterangan singkat</p></div></div>
    <!-- aktif -->
    <div class="flex items-start gap-2.5 text-tertiary font-bold">
      <span class="w-5 h-5 rounded-[9999px] bg-tertiary text-on-tertiary flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5 animate-pulse">•</span>
      <div class="flex-1"><div class="flex justify-between items-center font-bold"><span>Pengerjaan Lapangan</span><span class="text-[10px] text-tertiary font-mono">Sedang Berjalan</span></div></div></div>
    <!-- belum -->
    <div class="flex items-start gap-2.5 text-secondary opacity-60">
      <span class="w-5 h-5 rounded-[9999px] bg-outline-variant text-on-surface flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">4</span>
      <div class="flex-1"><div class="font-bold">Penyelesaian &amp; Berita Acara</div></div></div>
  </div>
</div>
```

## 9. Kartu foto + overlay (detail laporan warga)

```html
<div class="relative w-full h-52 rounded-xl overflow-hidden shadow-md">
  <img class="w-full h-full object-cover" alt="…" src="…">
  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
  <span class="absolute top-2.5 left-2.5 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow"><span class="w-2 h-2 rounded-[9999px] bg-white animate-pulse"></span> Sedang Ditangani (Dinas PU)</span>
  <span class="absolute top-2.5 right-2.5 bg-error text-white font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase tracking-wider font-bold shadow">Prioritas Tinggi</span>
  <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-label-sm">
    <span class="bg-inverse-surface/80 backdrop-blur-sm px-2.5 py-1 rounded-md flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-primary-fixed">verified</span> Kamera Warga • EXIF Terverifikasi</span>
    <span class="bg-inverse-surface/80 backdrop-blur-sm px-2 py-1 rounded-md font-mono">#SPM-2026-0842</span></div>
</div>
```

Kartu upvote: `p-3.5 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl shadow-lg`, tombol putih `bg-surface-container-lowest text-primary rounded-xl font-bold`. JS: `handleUpvote()` menukar teks "+1 Upvote" ↔ "Didukung!" dan menyesuaikan angka.

## 10. Foto Before / After (lapangan)

```html
<div class="grid grid-cols-2 gap-2">
  <div class="space-y-1.5">
    <div class="relative h-32 rounded-xl overflow-hidden border border-surface-container shadow-sm">
      <img class="w-full h-full object-cover" alt="Foto sebelum" src="…">
      <div class="absolute top-1.5 left-1.5 bg-error text-white font-label-sm text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Foto Sebelum</div>
      <div class="absolute bottom-1 left-1 right-1 bg-inverse-surface/85 text-white text-[8px] font-mono px-1 py-0.5 rounded leading-tight">09:52 WIB • Lat -5.38012</div></div>
    <div class="text-center text-[10px] text-secondary font-semibold">Kondisi Awal</div></div>
  <div class="space-y-1.5">
    <div class="relative h-32 rounded-xl overflow-hidden border-2 border-primary shadow-sm"><!-- sama, badge "bg-primary text-on-primary … Foto Selesai" --></div></div>
</div>
```

Kartu SLA 100%: `p-3 bg-primary-fixed/20 border border-primary/40 rounded-xl` berisi dua sel mono `p-2 bg-surface-container-lowest rounded-lg` (Respon On-Site, Durasi Pengerjaan).

## 11. Banner geofence & status bar ponsel

```html
<!-- Status bar -->
<div class="bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-[12px] font-mono select-none">
  <span class="font-bold">10:28</span>
  <div class="w-24 h-4 bg-slate-950 rounded-lg mx-auto"></div>
  <div class="flex items-center gap-1.5 text-primary-fixed"><span class="text-[10px] font-bold">5G</span>
    <span class="material-symbols-outlined text-[14px]">wifi</span><span class="material-symbols-outlined text-[15px]">battery_charging_full</span><span class="text-[10px] font-bold">92%</span></div>
</div>
<!-- Banner geofence -->
<div class="bg-inverse-surface text-inverse-on-surface px-4 py-2 flex items-center justify-between shadow-md">
  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-[9999px] bg-primary animate-pulse"></div>
    <div class="font-mono text-[11px] text-primary-fixed font-bold">GEOFENCE VALID (0m)</div>
    <span class="text-secondary text-[10px]">•</span><span class="text-[11px] text-white font-mono font-semibold">Depan Kampus UTI</span></div>
  <div class="flex items-center gap-1 text-[11px] text-primary-fixed"><span class="material-symbols-outlined text-[14px]">check_circle</span><span>On-Site</span></div>
</div>
```

## 12. Bingkai ponsel

**Sederhana (Warga):**
```html
<div class="w-full flex justify-center py-2">
  <div class="w-full max-w-[420px] bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden min-h-[700px] flex flex-col relative">
    <div class="bg-primary text-on-primary px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2"><span class="material-symbols-outlined text-[20px]">cell_tower</span>
        <span class="font-label-sm text-label-sm uppercase tracking-wider font-bold">SIPEMAT Form Pengaduan</span></div>
      <div class="flex items-center gap-2 text-primary-fixed"><span class="material-symbols-outlined text-[16px]">wifi</span><span class="material-symbols-outlined text-[16px]">battery_charging_full</span></div>
    </div>
    <!-- .view-panel di sini: "flex-1 flex flex-col p-4 space-y-4 overflow-y-auto" -->
  </div>
</div>
```

**Realistis (Lapangan):** `w-full max-w-[390px] bg-surface-container-lowest rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-slate-900 flex flex-col relative` → status bar (bagian 11) → banner geofence → header tugas (`p-3.5 bg-surface-container-low border-b`) → konten `p-3.5 space-y-4 overflow-y-auto max-h-[560px]` → tab bar bawah:

```html
<div class="bg-surface-container-lowest border-t border-surface-container px-4 py-2 flex items-center justify-around text-center select-none shadow-lg">
  <button class="flex flex-col items-center gap-0.5 text-secondary hover:text-on-surface transition-colors" onclick="switchView('v13')"><span class="material-symbols-outlined text-[20px]">assignment</span><span class="text-[9px]">Tugas (3)</span></button>
  <button class="flex flex-col items-center gap-0.5 text-primary font-bold"><span class="material-symbols-outlined text-[20px]">fact_check</span><span class="text-[9px]">Berita Acara</span></button>
</div>
```

Layar ponsel realistis ditempatkan di kolom kiri `xl:col-span-7 flex justify-center`, dan panel "Audit & Validasi" (kartu `border-2 border-primary/40`) di kolom kanan `xl:col-span-5`.

## 13. Panel samping

```html
<!-- Distribusi beban: bar progres per OPD -->
<div>
  <div class="flex justify-between font-label-sm text-label-sm mb-1"><span class="text-on-surface font-semibold">Dinas PUPR</span><span class="text-primary font-bold font-mono">42% (539 Tiket)</span></div>
  <div class="w-full h-2.5 bg-surface-container rounded-lg overflow-hidden"><div class="h-full bg-primary rounded-lg" style="width:42%"></div></div>
</div>
<!-- warna bar: primary → tertiary → amber-500 → secondary -->

<!-- Daftar kepatuhan -->
<div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low text-[12px]">
  <span class="font-medium text-on-surface">1. Dinas Bina Marga (PUPR)</span><span class="font-bold text-primary font-mono">96.4% Terpenuhi</span></div>

<!-- Kartu CTA gradien -->
<div class="bg-gradient-to-br from-primary to-primary-container text-on-primary p-5 rounded-2xl shadow-md space-y-3.5"> … </div>

<!-- Daftar kluster (border kiri berwarna) -->
<div class="p-3 bg-surface-container-low hover:bg-surface-container rounded-xl border-l-4 border-error space-y-1.5 transition-colors cursor-pointer"> … </div>
```

Judul panel samping: ikon 22px `text-primary` + `font-label-lg text-label-lg text-on-surface font-bold`, dipisah `pb-2 border-b border-surface-container`.

## 14. Popover & hotspot peta

Latar peta: `bg-cover bg-center` di dalam `relative w-full h-[560px] bg-slate-900 overflow-hidden`, tindihan `absolute inset-0 bg-inverse-surface/30`. Hotspot: lingkaran bernomor `rounded-[9999px] bg-error text-white border-2 border-white shadow-2xl` + cincin `animate-ping bg-error/20`. Ukuran: merah besar 56px, sedang 44–48px (`bg-amber-500`), rendah 32–36px (`bg-primary/80`). Kontrol mengambang `bg-surface-container-lowest/95 backdrop-blur-md rounded-lg shadow-md`. Legenda kiri-bawah `p-3.5 rounded-xl shadow-xl max-w-xs`. Telemetri kanan-bawah `bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface font-mono text-[11px]`.

Popover: `w-80 bg-surface-container-lowest p-4 rounded-xl shadow-2xl border border-surface-container space-y-2` dengan grid 3 mini-statistik `bg-surface-container p-1 rounded`.

## 15. Toast

```html
<div class="fixed bottom-16 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform translate-y-20 opacity-0 pointer-events-none" id="toast-notif">
  <span class="material-symbols-outlined text-primary-fixed text-[20px]" id="toast-icon">check_circle</span>
  <span class="font-label-md text-label-md" id="toast-message">Operasi Berhasil</span>
</div>
```

`bottom-16` agar tidak tertutup footer tetap `h-12`. Fungsi `showToast(msg, icon)` ada di Lampiran D.


---

# Lampiran C — Pola layout SIPEMAT

## Daftar isi
1. Geometri shell
2. Header (dua baris)
3. Sidebar
4. Footer
5. Sub-header sticky: role switcher + lompat layar
6. Pill sub-navigasi per peran
7. Kontainer peran & panel view
8. JavaScript navigasi
9. Pola grid halaman admin
10. Penomoran view

## 1. Geometri shell

```
┌────────────────────────────────────────────────────────────┐  fixed top-0  z-50
│ Header baris 1  h-20  (lencana Pemda/UTI · SIPEMAT · badge) │
│ Header baris 2  h-12  (Switch Role · cari · Direktori View) │
├──────────┬─────────────────────────────────────────────────┤
│ Sidebar  │  <main>   lg:pl-64  pt-32  pb-12                 │
│ fixed    │  sub-header sticky → pill sub-nav → konten       │
│ w-64     │                                                  │
│ top-32   │                                                  │
│ bottom-12│                                                  │
├──────────┴─────────────────────────────────────────────────┤
│ Footer fixed bottom-0 h-12 z-50 (hak cipta · live · ISO)    │
└────────────────────────────────────────────────────────────┘
```

- Header tinggi total 8rem → konten `pt-32`; sidebar `top-32`.
- Footer 3rem → konten `pb-12`; sidebar `bottom-12`; toast `bottom-16`.
- Sidebar hanya tampil di `lg:` (`hidden lg:flex`), konten `lg:pl-64`.
- `body`: `bg-background font-body-md text-on-surface antialiased flex flex-col min-h-screen`.

## 2. Header (dua baris)

Baris 1 — `<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">`
- `div.h-20.w-full.px-margin.flex.items-center.justify-between.gap-space-md`
- Kiri: dua lencana (Pemda `bg-surface-container`, UTI `bg-tertiary-fixed`), lalu blok judul: `SIPEMAT` (`headline-sm`), badge `Inovasi Kolaboratif` (`bg-primary-fixed`), badge `Smart City v2.4` (`bg-secondary-container`), subjudul `Sistem Pengaduan & Manajemen Masalah Kota Terpadu` (`hidden md:inline`).
- Kanan: indikator "Sistem Aktif (Bandar Lampung)" (`hidden xl:flex bg-surface-container-low`) + avatar `w-8 h-8 bg-primary` berisi ikon `person`.

Baris 2 — `div.h-12.w-full.px-margin.bg-surface-container-low.flex.items-center.justify-between.gap-space-md.overflow-x-auto`
- Kiri: label "Switch Role:" + tiga tautan peran dengan counter jumlah view (`bg-surface-container-highest px-1.5 rounded-full`). Peran aktif: `bg-primary-container text-on-primary-container font-bold rounded-lg shadow-sm`.
- Kanan: kolom cari (`h-8 w-56 md:w-64 bg-surface-container-lowest`, ikon `search`) dan tombol `Direktori View (N)` (`bg-surface-container-high hover:bg-primary hover:text-on-primary`).

## 3. Sidebar

```html
<aside class="fixed left-0 top-32 bottom-12 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 hidden lg:flex flex-col py-space-md">
  <div class="px-space-md pb-space-sm"><span class="font-label-sm text-label-sm uppercase text-outline tracking-wider">Navigasi Operasional</span></div>
  <nav class="flex-1 px-space-sm space-y-1 overflow-y-auto">
    <div class="pt-space-xs pb-1"><span class="px-space-sm font-label-sm text-label-sm text-secondary uppercase">Command Center Admin</span></div>
    <!-- item biasa -->
    <a class="flex items-center gap-2 px-space-sm py-2 rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high hover:text-on-surface transition-all" href="#"><span class="material-symbols-outlined text-[20px]">dashboard</span> Dashboard Utama</a>
    <!-- item aktif -->
    <a aria-current="page" class="flex items-center gap-2 px-space-sm py-2 transition-all bg-primary-container text-on-primary-container font-bold rounded-lg shadow-sm" href="#"><span class="material-symbols-outlined text-[20px]">task_alt</span> Daftar Tugas (Shift Aktif)</a>
  </nav>
</aside>
```

Kelompokkan menu per peran dengan judul bagian kecil: "Command Center Admin", "Modul Warga", "Operasional Lapangan".

## 4. Footer

```html
<footer class="fixed bottom-0 inset-x-0 h-12 bg-on-secondary-fixed text-on-secondary z-50 flex items-center shadow-[0_-1px_6px_rgba(0,0,0,0.1)]">
  <div class="w-full px-margin flex items-center justify-between gap-space-sm font-label-sm text-label-sm">
    <div class="flex items-center gap-space-sm truncate"><span class="material-symbols-outlined text-primary-fixed-dim text-[16px]">gavel</span><span class="truncate">Copyright©2026 …</span></div>
    <div class="flex items-center gap-space-md shrink-0">
      <div class="hidden sm:flex items-center gap-1 text-secondary-fixed-dim"><span class="material-symbols-outlined text-[15px]">schedule</span><span>Live: 2026-03-31 09:41:20 WIB</span></div>
      <div class="flex items-center gap-1 bg-surface-container/20 px-2 py-0.5 rounded-full text-primary-fixed"><span class="material-symbols-outlined text-[15px]">verified</span><span class="uppercase font-bold tracking-wider">ISO/IEC 27001 Certified</span></div>
    </div>
  </div>
</footer>
```

Isi hak cipta mengikuti pemilik proyek yang diberikan user; jangan menyalin nama dari contoh bila proyeknya berbeda.

## 5. Sub-header sticky (role switcher + lompat layar)

Di dalam `<main>`, bar putih transparan yang menempel:

```html
<div class="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm rounded-xl p-space-sm mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
  <div class="flex items-center gap-space-xs flex-wrap">
    <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider px-2 flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">view_quilt</span> Modul Switcher:</span>
    <button id="btn-role-warga" onclick="setRole('warga')" class="px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all bg-surface-container-high text-on-surface-variant hover:bg-surface-variant">…Warga</button>
    <!-- admin, lapangan -->
  </div>
  <div class="flex items-center gap-space-xs min-w-[280px]">
    <label class="font-label-sm text-label-sm text-outline uppercase tracking-wider shrink-0" for="view-dropdown">Lompat Layar:</label>
    <div class="relative w-full">
      <select id="view-dropdown" onchange="switchView(this.value)" class="w-full h-9 pl-3 pr-8 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg shadow-inner focus:outline-none appearance-none cursor-pointer">
        <optgroup label="ROLE 1: WARGA (Aplikasi Publik)"><option value="v1">1. Warga - …</option></optgroup>
      </select>
      <span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
    </div>
  </div>
</div>
```

Tombol peran aktif memakai `bg-primary-container text-on-primary-container shadow-sm font-bold`; yang tidak aktif `bg-surface-container-high text-on-surface-variant hover:bg-surface-variant`. Dropdown dikelompokkan dengan `<optgroup>` per peran, judul "ROLE n: NAMA (Deskripsi)".

## 6. Pill sub-navigasi per peran

Satu bar per peran (`id="subnav-warga"` dst.), hanya yang aktif tampil. Pill: `view-pill px-3 py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container`, id `pill-v<n>`. Pill aktif: `bg-primary-container text-on-primary-container shadow-sm`. Pill boleh memuat ikon 16px dan badge kecil (`bg-primary text-on-primary text-[10px] px-1.5 rounded-full font-bold`, mis. "Final BAP").

## 7. Kontainer peran & panel view

```html
<div id="role-container-warga" class="w-full flex justify-center py-2 hidden"> … panel view warga … </div>
<div id="role-container-admin" class="w-full space-y-space-md hidden">
  <div id="view-v7" class="view-panel space-y-space-md hidden"> … </div>
</div>
<div id="role-container-lapangan" class="w-full space-y-space-md hidden"> … </div>
```

Aturan: setiap layar = elemen `.view-panel#view-v<n>` yang disembunyikan dengan kelas `hidden`; ID mengikuti nomor view di `roleViewMap`. Admin dan Lapangan boleh punya satu panel per view.

## 8. JavaScript navigasi

Inti (lihat bentuk lengkap di Lampiran D):

```js
const roleViewMap = { warga:['v1','v2','v3','v4','v5'], admin:['v6','v7','v8','v9','v10','v11'], lapangan:['v12','v13','v14','v15'] };
function setRole(role){ /* ganti gaya tombol peran, tampil/sembunyi role-container-* dan subnav-*, lalu switchView(view pertama peran) */ }
function switchView(id){
  // jika view milik peran lain → setRole(peran itu) lalu return
  // sembunyikan semua .view-panel, tampilkan #view-<id>
  // sinkronkan #view-dropdown dan gaya .view-pill aktif
}
function showToast(msg, icon='check_circle'){ /* tampilkan #toast-notif 2.8 detik */ }
```

Untuk tombol demo yang "mengirim lalu pindah": `onclick="showToast('…'); setTimeout(() => switchView('v10'), 900);"`. Hindari `&gt;` pada atribut `onclick` — tulis `=>` langsung.

## 9. Pola grid halaman admin

- **Dashboard/analitik:** header kartu → 4 KPI → `grid xl:grid-cols-12 gap-space-md` dengan tabel/peta `xl:col-span-8` + panel samping `xl:col-span-4 space-y-space-md`.
- **Verifikasi / Disposisi (master–detail):** header kartu → `xl:grid-cols-12`: kiri `xl:col-span-5` (kartu pencarian + chip filter + daftar tiket `overflow-y-auto max-h-[720px] pr-1`), kanan `xl:col-span-7` (kartu detail `p-5 space-y-5 flex flex-col justify-between` dengan bar aksi di bawah, dipisah `pt-3 border-t`).
- **Master data:** header kartu → 4 KPI → bar filter (`p-4 rounded-xl border flex flex-wrap gap-space-md`) → tabel 8 kolom + panel detail kredensial `border-2 border-primary/40`.
- **Login admin:** kartu `max-w-4xl` grid 12 kolom: form `md:col-span-7`, panel status infrastruktur `md:col-span-5 bg-surface-container`.
- Kartu dalam: `bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container`.

## 10. Penomoran view

Pertahankan penomoran sehingga tautan lintas layar tidak putus; bila menambah view, lanjutkan dari angka terbesar dan perbarui `roleViewMap`, dropdown, pill, dan counter di header.

| View | Peran | Isi |
|---|---|---|
| v1–v5 | Warga | Login NIK+OTP · Beranda · Form laporan · Riwayat · Detail & upvote |
| v6–v11 | Admin | Login · Dashboard & SLA · Heatmap · Verifikasi · Disposisi · Master data |
| v12–v15 | Lapangan | Autentikasi & absensi shift · Daftar tugas & SLA · Navigasi TKP · Upload bukti & BAP |


---

# Lampiran D — Kerangka HTML (`shell-template.html`)

Salin utuh, simpan sebagai `.html`, lalu tambahkan view baru dan daftarkan di `roleViewMap`, dropdown, dan pill.

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SIPEMAT — Sistem Pengaduan &amp; Manajemen Masalah Kota Terpadu</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;padding:0;}
  body{overscroll-behavior:none;font-family:'Inter',system-ui,sans-serif;}
  ::-webkit-scrollbar{display:none;}
  .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;}
</style>
<script src="https://cdn.tailwindcss.com"></script>
<script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{
"colors":{"surface-container-high":"#dce9ff","on-tertiary-fixed-variant":"#003ea8","secondary":"#565e74","on-primary-fixed-variant":"#005049","tertiary-fixed":"#dbe1ff","on-primary-container":"#f4fffc","background":"#f8f9ff","inverse-on-surface":"#eaf1ff","outline":"#6d7a77","on-surface":"#0b1c30","inverse-surface":"#213145","primary-fixed-dim":"#6bd8cb","primary":"#00685f","on-secondary-container":"#5c647a","outline-variant":"#bcc9c6","on-error":"#ffffff","on-error-container":"#93000a","surface-variant":"#d3e4fe","surface-container-highest":"#d3e4fe","primary-fixed":"#89f5e7","on-tertiary-container":"#fefcff","inverse-primary":"#6bd8cb","primary-container":"#008378","on-secondary":"#ffffff","surface-tint":"#006a61","surface-container-low":"#eff4ff","surface":"#f8f9ff","surface-container":"#e5eeff","on-primary":"#ffffff","surface-bright":"#f8f9ff","error-container":"#ffdad6","on-surface-variant":"#3d4947","on-secondary-fixed":"#131b2e","secondary-container":"#dae2fd","error":"#ba1a1a","secondary-fixed-dim":"#bec6e0","tertiary-container":"#316bf3","tertiary":"#0051d5","surface-container-lowest":"#ffffff","on-secondary-fixed-variant":"#3f465c","on-background":"#0b1c30","surface-dim":"#cbdbf5","on-tertiary-fixed":"#00174b","on-primary-fixed":"#00201d","on-tertiary":"#ffffff","tertiary-fixed-dim":"#b4c5ff","secondary-fixed":"#dae2fd"},
"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},
"spacing":{"margin-mobile":"1rem","gutter":"1.5rem","space-sm":"0.5rem","space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","gutter-mobile":"1rem","space-xl":"2rem","space-md":"1rem"},
"fontFamily":{"body-md":["Inter"],"label-sm":["Inter"],"headline-sm":["Inter"],"headline-xl":["Inter"],"headline-lg-mobile":["Inter"],"headline-xl-mobile":["Inter"],"headline-lg":["Inter"],"headline-md":["Inter"],"label-md":["Inter"],"body-lg":["Inter"],"label-lg":["Inter"],"body-sm":["Inter"]},
"fontSize":{"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"label-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.04em","fontWeight":"700"}],"headline-sm":["20px",{"lineHeight":"28px","letterSpacing":"-0.005em","fontWeight":"600"}],"headline-xl":["40px",{"lineHeight":"48px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-xl-mobile":["30px",{"lineHeight":"38px","letterSpacing":"-0.015em","fontWeight":"700"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.02em","fontWeight":"700"}],"headline-md":["24px",{"lineHeight":"32px","letterSpacing":"-0.01em","fontWeight":"600"}],"label-md":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-lg":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"600"}],"body-sm":["14px",{"lineHeight":"20px","fontWeight":"400"}]}
}}}</script>
</head>

<body class="bg-background font-body-md text-on-surface antialiased flex flex-col min-h-screen">

<!-- ============ HEADER (2 baris, fixed) ============ -->
<header class="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="h-20 w-full px-margin flex items-center justify-between gap-space-md">
    <div class="flex items-center gap-space-md min-w-0">
      <div class="flex items-center gap-space-xs shrink-0">
        <div class="h-10 px-space-sm bg-surface-container rounded-lg flex items-center gap-1.5"><span class="material-symbols-outlined text-primary text-[20px]">account_balance</span><span class="font-label-sm text-label-sm text-on-surface uppercase">Pemda</span></div>
        <div class="h-10 px-space-sm bg-tertiary-fixed rounded-lg flex items-center gap-1.5"><span class="material-symbols-outlined text-tertiary text-[20px]">school</span><span class="font-label-sm text-label-sm text-on-tertiary-fixed uppercase">UTI</span></div>
      </div>
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-space-sm flex-wrap">
          <span class="font-headline-sm text-headline-sm text-on-surface truncate">SIPEMAT</span>
          <span class="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">Inovasi Kolaboratif</span>
          <span class="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full shrink-0">Smart City v2.4</span>
        </div>
        <span class="font-body-sm text-body-sm text-on-surface-variant truncate hidden md:inline">Sistem Pengaduan &amp; Manajemen Masalah Kota Terpadu</span>
      </div>
    </div>
    <div class="flex items-center gap-space-md shrink-0">
      <div class="hidden xl:flex items-center gap-2 bg-surface-container-low px-space-sm py-1 rounded-lg">
        <span class="inline-block w-2 h-2 rounded-[9999px] bg-primary animate-pulse"></span>
        <span class="font-label-md text-label-md text-on-surface-variant">Sistem Aktif (Bandar Lampung)</span>
      </div>
      <div class="w-8 h-8 rounded-[9999px] bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
    </div>
  </div>
  <div class="h-12 w-full px-margin bg-surface-container-low flex items-center justify-between gap-space-md overflow-x-auto">
    <div class="flex items-center gap-space-sm shrink-0">
      <span class="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">tune</span> Switch Role:</span>
      <nav class="flex items-center gap-space-xs">
        <a href="#" onclick="setRole('warga');return false" class="font-label-md text-label-md px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">Warga</a>
        <a href="#" onclick="setRole('admin');return false" class="font-label-md text-label-md px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">Admin</a>
        <a href="#" onclick="setRole('lapangan');return false" class="font-label-md text-label-md px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">Tim Lapangan</a>
      </nav>
    </div>
    <div class="relative flex items-center">
      <span class="material-symbols-outlined absolute left-2 text-on-surface-variant text-[18px]">search</span>
      <input class="h-8 pl-8 pr-3 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-56 md:w-64 placeholder:text-outline-variant" placeholder="Cari &amp; Lompat ke View…" type="text">
    </div>
  </div>
</header>

<!-- ============ SIDEBAR (lg+) ============ -->
<aside class="fixed left-0 top-32 bottom-12 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 hidden lg:flex flex-col py-space-md">
  <div class="px-space-md pb-space-sm"><span class="font-label-sm text-label-sm uppercase text-outline tracking-wider">Navigasi Operasional</span></div>
  <nav class="flex-1 px-space-sm space-y-1 overflow-y-auto">
    <div class="pt-space-xs pb-1"><span class="px-space-sm font-label-sm text-label-sm text-secondary uppercase">Command Center Admin</span></div>
    <a href="#" onclick="switchView('v7');return false" class="flex items-center gap-2 px-space-sm py-2 rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high hover:text-on-surface transition-all"><span class="material-symbols-outlined text-[20px]">dashboard</span> Dashboard Utama</a>
    <div class="pt-space-sm pb-1"><span class="px-space-sm font-label-sm text-label-sm text-secondary uppercase">Modul Warga</span></div>
    <a href="#" onclick="switchView('v2');return false" class="flex items-center gap-2 px-space-sm py-2 rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high hover:text-on-surface transition-all"><span class="material-symbols-outlined text-[20px]">home</span> Beranda Warga</a>
    <div class="pt-space-sm pb-1"><span class="px-space-sm font-label-sm text-label-sm text-secondary uppercase">Operasional Lapangan</span></div>
    <a href="#" onclick="switchView('v13');return false" class="flex items-center gap-2 px-space-sm py-2 rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high hover:text-on-surface transition-all"><span class="material-symbols-outlined text-[20px]">task_alt</span> Daftar Tugas (Shift Aktif)</a>
  </nav>
</aside>

<!-- ============ KONTEN ============ -->
<div class="lg:pl-64 flex-1 flex flex-col pt-32 pb-12">
<main class="flex-1 w-full px-margin-mobile md:px-gutter py-space-md">
<div class="flex flex-col w-full">

  <!-- Sub-header sticky: role switcher + lompat layar -->
  <div class="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm rounded-xl p-space-sm mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-xs flex-wrap">
      <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider px-2 flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">view_quilt</span> Modul Switcher:</span>
      <button id="btn-role-warga" onclick="setRole('warga')" class="px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all"><span class="material-symbols-outlined text-[16px]">person</span> Warga</button>
      <button id="btn-role-admin" onclick="setRole('admin')" class="px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all"><span class="material-symbols-outlined text-[16px]">admin_panel_settings</span> Admin</button>
      <button id="btn-role-lapangan" onclick="setRole('lapangan')" class="px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all"><span class="material-symbols-outlined text-[16px]">engineering</span> Tim Lapangan</button>
    </div>
    <div class="flex items-center gap-space-xs min-w-[280px]">
      <label class="font-label-sm text-label-sm text-outline uppercase tracking-wider shrink-0" for="view-dropdown">Lompat Layar:</label>
      <div class="relative w-full">
        <select id="view-dropdown" onchange="switchView(this.value)" class="w-full h-9 pl-3 pr-8 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg shadow-inner focus:outline-none appearance-none cursor-pointer">
          <optgroup label="ROLE 1: WARGA (Aplikasi Publik)">
            <option value="v1">1. Warga - Autentikasi NIK &amp; OTP</option>
            <option value="v2">2. Warga - Dashboard &amp; Laporan Sekitar</option>
          </optgroup>
          <optgroup label="ROLE 2: ADMIN DISPOSISI (Enterprise Command)">
            <option value="v7">7. Admin - Command Center &amp; Warning SLA</option>
          </optgroup>
          <optgroup label="ROLE 3: TIM LAPANGAN (Unit Taktis Mobile)">
            <option value="v13">13. Lapangan - Daftar Tugas &amp; SLA Countdown</option>
          </optgroup>
        </select>
        <span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
      </div>
    </div>
  </div>

  <!-- Pill sub-navigasi per peran -->
  <div id="subnav-warga" class="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm hidden">
    <button class="view-pill" id="pill-v1" onclick="switchView('v1')">1. NIK Login</button>
    <button class="view-pill" id="pill-v2" onclick="switchView('v2')">2. Beranda</button>
  </div>
  <div id="subnav-admin" class="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm hidden">
    <button class="view-pill" id="pill-v7" onclick="switchView('v7')">7. Dashboard &amp; SLA</button>
  </div>
  <div id="subnav-lapangan" class="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm hidden">
    <button class="view-pill" id="pill-v13" onclick="switchView('v13')">13. Task List Tiket</button>
  </div>

  <!-- ===== ROLE 1: WARGA (ponsel sederhana 420px) ===== -->
  <div id="role-container-warga" class="w-full flex justify-center py-2 hidden">
    <div class="w-full max-w-[420px] bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden min-h-[700px] flex flex-col relative">
      <div class="bg-primary text-on-primary px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2"><span class="material-symbols-outlined text-[20px]">cell_tower</span><span class="font-label-sm text-label-sm uppercase tracking-wider font-bold">SIPEMAT Warga</span></div>
        <div class="flex items-center gap-2 text-primary-fixed"><span class="material-symbols-outlined text-[16px]">wifi</span><span class="material-symbols-outlined text-[16px]">battery_charging_full</span></div>
      </div>

      <!-- v1: Login -->
      <div id="view-v1" class="view-panel p-6 flex-1 flex flex-col justify-between hidden">
        <div class="space-y-6 pt-4">
          <div class="flex flex-col items-center text-center space-y-2">
            <div class="w-16 h-16 bg-surface-container-high rounded-[9999px] flex items-center justify-center text-primary shadow-sm"><span class="material-symbols-outlined text-[36px]">badge</span></div>
            <h2 class="font-headline-md text-headline-md text-on-surface">Masuk SIPEMAT</h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Layanan aspirasi kota berbasis identitas kependudukan terintegrasi.</p>
          </div>
          <div>
            <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Nomor Induk Kependudukan (NIK)</label>
            <div class="relative mt-1">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">credit_card</span>
              <input class="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" placeholder="16 digit NIK KTP Anda" type="text">
            </div>
          </div>
        </div>
        <div class="space-y-3 pt-6 pb-2">
          <button class="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]" onclick="switchView('v2')"><span>Autentikasi &amp; Masuk</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span></button>
          <div class="p-3 bg-surface-container-low rounded-lg flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">verified_user</span><span class="font-label-sm text-label-sm text-on-surface-variant">Terverifikasi SIAK Terpusat</span></div>
        </div>
      </div>

      <!-- v2: Beranda -->
      <div id="view-v2" class="view-panel hidden flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        <button class="w-full p-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl shadow-lg flex items-center justify-between group active:scale-[0.98] transition-all" onclick="showToast('Form laporan dibuka')">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"><span class="material-symbols-outlined text-[30px]">photo_camera</span></div>
            <div class="text-left"><div class="font-headline-sm text-headline-sm leading-tight text-white">Buat Laporan Baru</div><div class="font-label-sm text-label-sm text-primary-fixed">Foto, tandai lokasi, kirim langsung</div></div>
          </div>
          <span class="material-symbols-outlined text-white text-[28px] group-hover:translate-x-1 transition-transform">add_circle</span>
        </button>
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-surface-container p-2.5 rounded-xl text-center"><span class="font-headline-sm text-headline-sm text-primary">3</span><span class="block font-label-sm text-label-sm text-on-surface-variant">Laporan Saya</span></div>
          <div class="bg-surface-container p-2.5 rounded-xl text-center"><span class="font-headline-sm text-headline-sm text-tertiary">14</span><span class="block font-label-sm text-label-sm text-on-surface-variant">Di Sekitar</span></div>
          <div class="bg-surface-container p-2.5 rounded-xl text-center"><span class="font-headline-sm text-headline-sm text-primary">98%</span><span class="block font-label-sm text-label-sm text-on-surface-variant">SLA Terpenuhi</span></div>
        </div>
        <div class="p-3 bg-surface-container-low rounded-xl flex gap-3 cursor-pointer hover:bg-surface-container transition-colors shadow-sm">
          <div class="w-20 h-20 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0"><span class="material-symbols-outlined text-[32px]">add_road</span></div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-1"><span class="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded-full">Jalan Rusak</span><span class="font-label-sm text-label-sm text-secondary">300m lalu</span></div>
            <h4 class="font-label-lg text-label-lg text-on-surface font-semibold truncate mt-1">Lubang Menganga di Jl. Teuku Umar</h4>
            <div class="flex items-center justify-between mt-2 font-label-sm text-label-sm text-outline"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">thumb_up</span> 42 Dukungan</span><span class="text-tertiary font-semibold">Diproses</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== ROLE 2: ADMIN (lebar penuh) ===== -->
  <div id="role-container-admin" class="w-full space-y-space-md hidden">
    <div id="view-v7" class="view-panel space-y-space-md hidden">
      <!-- kartu header halaman -->
      <div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="material-symbols-outlined text-primary text-[28px]">speed</span>
            <h1 class="font-headline-md text-headline-md text-on-surface font-bold">Dashboard Utama &amp; Monitoring SLA Real-time</h1>
            <span class="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center gap-1"><span class="w-2 h-2 rounded-[9999px] bg-primary animate-ping"></span> LIVE SENSOR</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 flex-wrap"><span>Pusat Kendali Pengaduan Pemkot Bandar Lampung</span><span>•</span><span class="flex items-center gap-1 text-secondary font-mono text-[12px]"><span class="material-symbols-outlined text-[15px]">schedule</span> Update: 31 Mar 2026, 09:41 WIB</span></p>
        </div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <button class="px-3.5 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-colors" onclick="showToast('Laporan berhasil diekspor')"><span class="material-symbols-outlined text-[18px] text-primary">download</span><span>Ekspor Laporan</span></button>
        </div>
      </div>
      <!-- KPI -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-sm">
        <div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
          <div><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Total Pengaduan Masuk</span><div class="font-headline-xl text-headline-xl text-on-surface mt-1">1,284</div><div class="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-1 font-bold"><span class="material-symbols-outlined text-[16px]">trending_up</span> +12.4% bln ini</div></div>
          <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary"><span class="material-symbols-outlined text-[28px]">inbox</span></div>
        </div>
        <div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
          <div><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Dalam Penanganan OPD</span><div class="font-headline-xl text-headline-xl text-tertiary mt-1">43</div><div class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mt-1"><span class="material-symbols-outlined text-[16px] text-tertiary">engineering</span> 14 Tim Regu Aktif</div></div>
          <div class="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary"><span class="material-symbols-outlined text-[28px]">pending_actions</span></div>
        </div>
        <div class="p-5 rounded-xl shadow-sm border-2 border-error/40 flex items-center justify-between bg-gradient-to-br from-white to-error-container/30">
          <div><span class="font-label-sm text-label-sm text-error uppercase tracking-wider font-bold flex items-center gap-1"><span class="w-2 h-2 rounded-[9999px] bg-error animate-ping"></span> Peringatan Kritis SLA</span><div class="font-headline-xl text-headline-xl text-error mt-1">8 Tiket</div><div class="font-label-sm text-label-sm text-error flex items-center gap-1 mt-1 font-bold"><span class="material-symbols-outlined text-[16px]">warning</span> Memerlukan Eskalasi Kadis</div></div>
          <div class="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-error"><span class="material-symbols-outlined text-[28px]">crisis_alert</span></div>
        </div>
        <div class="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-surface-container flex items-center justify-between">
          <div><span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">Tingkat Penyelesaian</span><div class="font-headline-xl text-headline-xl text-primary mt-1">94.2%</div><div class="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-1 font-bold"><span class="material-symbols-outlined text-[16px]">timer</span> Rata-rata Tuntas: 4.8 Jam</div></div>
          <div class="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed"><span class="material-symbols-outlined text-[28px]">verified_user</span></div>
        </div>
      </div>
      <!-- Grid 8/4 -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-md">
        <div class="xl:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div class="p-4 bg-surface-container-low border-b border-surface-container flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-lg bg-error-container flex items-center justify-center text-error"><span class="material-symbols-outlined text-[22px]">timer_off</span></div>
            <div><h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Tabel Peringatan SLA Darurat</h2><p class="text-[12px] text-secondary">Tiket yang mendekati atau melewati tenggat</p></div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead class="bg-surface-container font-label-md text-label-md text-secondary uppercase"><tr><th class="p-3.5">No. Tiket</th><th class="p-3.5">Kategori &amp; Lokasi</th><th class="p-3.5">Sisa Waktu</th><th class="p-3.5 text-center">Peringatan</th><th class="p-3.5 text-right">Aksi</th></tr></thead>
              <tbody class="divide-y divide-surface-container">
                <tr class="bg-error-container/20 hover:bg-error-container/30 transition-colors">
                  <td class="p-3.5 font-bold font-mono text-error">#SPM-2026-0791</td>
                  <td class="p-3.5"><div class="font-bold text-on-surface">Pohon Tumbang Timpa Kabel Listrik</div><div class="text-[12px] text-secondary">Jl. RA Kartini No. 42</div></td>
                  <td class="p-3.5"><span class="bg-error text-white font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold animate-pulse inline-flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">alarm</span> LEWAT BATAS +00:41:20</span></td>
                  <td class="p-3.5 text-center"><span class="bg-error text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">KRITIS MERAH</span></td>
                  <td class="p-3.5 text-right"><button class="px-3 py-1.5 bg-error text-white font-label-sm text-label-sm font-bold rounded-lg hover:opacity-90 shadow-sm flex items-center gap-1 ml-auto" onclick="showToast('Eskalasi dikirim ke Kadis')"><span class="material-symbols-outlined text-[15px]">call</span> Eskalasi Kadis</button></td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="p-3.5 font-bold font-mono text-secondary">#SPM-2026-0850</td>
                  <td class="p-3.5"><div class="font-bold text-on-surface">Pembersihan Endapan Drainase</div><div class="text-[12px] text-secondary">Jl. Raden Intan</div></td>
                  <td class="p-3.5"><span class="bg-surface-container text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">schedule</span> SISA 07:18:20 (Aman)</span></td>
                  <td class="p-3.5 text-center"><span class="bg-surface-container text-secondary px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">NORMAL</span></td>
                  <td class="p-3.5 text-right"><button class="px-3 py-1.5 bg-surface-container-high text-on-surface font-label-sm text-label-sm rounded-lg hover:bg-surface-container flex items-center gap-1 ml-auto"><span class="material-symbols-outlined text-[15px]">visibility</span> Cek Tiket</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="xl:col-span-4 space-y-space-md">
          <div class="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container space-y-4">
            <div class="flex items-center gap-2 pb-2 border-b border-surface-container"><span class="material-symbols-outlined text-primary text-[22px]">pie_chart</span><h3 class="font-label-lg text-label-lg text-on-surface font-bold">Distribusi Beban per OPD</h3></div>
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1"><span class="text-on-surface font-semibold">Dinas PUPR</span><span class="text-primary font-bold font-mono">42% (539 Tiket)</span></div>
              <div class="w-full h-2.5 bg-surface-container rounded-lg overflow-hidden"><div class="h-full bg-primary rounded-lg" style="width:42%"></div></div>
            </div>
            <div>
              <div class="flex justify-between font-label-sm text-label-sm mb-1"><span class="text-on-surface font-semibold">Dinas Perhubungan</span><span class="text-tertiary font-bold font-mono">28% (359 Tiket)</span></div>
              <div class="w-full h-2.5 bg-surface-container rounded-lg overflow-hidden"><div class="h-full bg-tertiary rounded-lg" style="width:28%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== ROLE 3: TIM LAPANGAN (ponsel realistis 390px) ===== -->
  <div id="role-container-lapangan" class="w-full space-y-space-md hidden">
    <div id="view-v13" class="view-panel flex justify-center py-2 hidden">
      <div class="w-full max-w-[390px] bg-surface-container-lowest rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-slate-900 flex flex-col relative">
        <div class="bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-[12px] font-mono select-none">
          <span class="font-bold">10:28</span><div class="w-24 h-4 bg-slate-950 rounded-lg mx-auto"></div>
          <div class="flex items-center gap-1.5 text-primary-fixed"><span class="text-[10px] font-bold">5G</span><span class="material-symbols-outlined text-[14px]">wifi</span><span class="material-symbols-outlined text-[15px]">battery_charging_full</span><span class="text-[10px] font-bold">92%</span></div>
        </div>
        <div class="bg-inverse-surface text-inverse-on-surface px-4 py-2 flex items-center justify-between shadow-md">
          <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-[9999px] bg-primary animate-pulse"></div><div class="font-mono text-[11px] text-primary-fixed font-bold">GEOFENCE VALID (0m)</div></div>
          <div class="flex items-center gap-1 text-[11px] text-primary-fixed"><span class="material-symbols-outlined text-[14px]">check_circle</span><span>On-Site</span></div>
        </div>
        <div class="p-3.5 space-y-3 overflow-y-auto max-h-[560px]">
          <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">Daftar Tugas Aktif</h2>
          <div class="p-3.5 bg-surface-container-low rounded-xl border-2 border-primary space-y-2">
            <div class="flex items-center justify-between"><span class="font-mono text-[11px] font-bold text-secondary">#SPT-PUPR-2026-0419</span><span class="bg-error text-white font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">P1 - Darurat</span></div>
            <div class="font-label-lg text-label-lg font-bold text-on-surface">Jalan Berlubang Parah Depan Kampus UTI</div>
            <div class="flex items-center justify-between text-[11px]"><span class="text-secondary">Batas respon</span><span class="bg-amber-200 text-amber-900 font-mono font-bold px-2 py-0.5 rounded-full">SISA 00:42:10</span></div>
          </div>
          <button class="w-full py-3 px-4 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]" onclick="showToast('Navigasi ke TKP dimulai','near_me')"><span class="material-symbols-outlined text-[20px]">near_me</span><span>Mulai Navigasi ke TKP</span></button>
        </div>
        <div class="bg-surface-container-lowest border-t border-surface-container px-4 py-2 flex items-center justify-around text-center select-none shadow-lg">
          <button class="flex flex-col items-center gap-0.5 text-primary font-bold"><span class="material-symbols-outlined text-[20px]">assignment</span><span class="text-[9px]">Tugas</span></button>
          <button class="flex flex-col items-center gap-0.5 text-secondary hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">near_me</span><span class="text-[9px]">Peta TKP</span></button>
          <button class="flex flex-col items-center gap-0.5 text-secondary hover:text-on-surface transition-colors"><span class="material-symbols-outlined text-[20px]">fact_check</span><span class="text-[9px]">Berita Acara</span></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast-notif" class="fixed bottom-16 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform translate-y-20 opacity-0 pointer-events-none">
    <span id="toast-icon" class="material-symbols-outlined text-primary-fixed text-[20px]">check_circle</span>
    <span id="toast-message" class="font-label-md text-label-md">Operasi Berhasil</span>
  </div>

</div>
</main>
</div>

<!-- ============ FOOTER ============ -->
<footer class="fixed bottom-0 inset-x-0 h-12 bg-on-secondary-fixed text-on-secondary z-50 flex items-center shadow-[0_-1px_6px_rgba(0,0,0,0.1)]">
  <div class="w-full px-margin flex items-center justify-between gap-space-sm font-label-sm text-label-sm">
    <div class="flex items-center gap-space-sm truncate"><span class="material-symbols-outlined text-primary-fixed-dim text-[16px]">gavel</span><span class="truncate">Copyright©2026 — [Nama pemilik proyek]</span></div>
    <div class="flex items-center gap-space-md shrink-0">
      <div class="hidden sm:flex items-center gap-1 text-secondary-fixed-dim"><span class="material-symbols-outlined text-[15px]">schedule</span><span>Live: 2026-03-31 09:41:20 WIB</span></div>
      <div class="flex items-center gap-1 bg-surface-container/20 px-2 py-0.5 rounded-full text-primary-fixed"><span class="material-symbols-outlined text-[15px]">verified</span><span class="uppercase font-bold tracking-wider">ISO/IEC 27001 Certified</span></div>
    </div>
  </div>
</footer>

<script>
  let currentRole = 'warga';

  const roleContainers = {
    warga: document.getElementById('role-container-warga'),
    admin: document.getElementById('role-container-admin'),
    lapangan: document.getElementById('role-container-lapangan')
  };
  const subnavBars = {
    warga: document.getElementById('subnav-warga'),
    admin: document.getElementById('subnav-admin'),
    lapangan: document.getElementById('subnav-lapangan')
  };
  // Daftarkan setiap view baru di sini
  const roleViewMap = {
    warga: ['v1', 'v2'],
    admin: ['v7'],
    lapangan: ['v13']
  };

  const PILL_BASE = 'view-pill px-3 py-1.5 rounded-lg font-label-md text-label-md ';
  const PILL_OFF = PILL_BASE + 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container';
  const PILL_ON  = PILL_BASE + 'bg-primary-container text-on-primary-container shadow-sm font-bold';

  function showToast(msg, icon = 'check_circle') {
    const toast = document.getElementById('toast-notif');
    document.getElementById('toast-message').textContent = msg;
    document.getElementById('toast-icon').textContent = icon;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }

  function setRole(role) {
    currentRole = role;
    Object.keys(roleContainers).forEach(r => {
      const btn = document.getElementById('btn-role-' + r);
      btn.className = 'px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-all ' +
        (r === role
          ? 'bg-primary-container text-on-primary-container shadow-sm font-bold'
          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant');
      roleContainers[r].classList.toggle('hidden', r !== role);
      subnavBars[r].classList.toggle('hidden', r !== role);
    });
    switchView(roleViewMap[role][0]);
  }

  function switchView(viewId) {
    // Jika view milik peran lain, pindah peran dulu (setRole memanggil switchView lagi)
    for (const [r, views] of Object.entries(roleViewMap)) {
      if (views.includes(viewId) && currentRole !== r) {
        currentRole = r;
        setRole(r);
        switchView(viewId);
        return;
      }
    }
    document.querySelectorAll('.view-panel').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById('view-' + viewId);
    if (target) target.classList.remove('hidden');

    const dropdown = document.getElementById('view-dropdown');
    if (dropdown) dropdown.value = viewId;

    document.querySelectorAll('.view-pill').forEach(p => { p.className = PILL_OFF; });
    const activePill = document.getElementById('pill-' + viewId);
    if (activePill) activePill.className = PILL_ON;
  }

  document.addEventListener('DOMContentLoaded', () => { setRole('warga'); });
</script>
</body>
</html>
```
