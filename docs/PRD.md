# PRD — Shopemas / Toko Emas Mulia Raya (v1.1.0)

> Revisi jujur dari PRD lama (dulu `README.MD`). Klaim yang tidak terbukti
> dihapus: tidak ada auto-fetch harga via API, tidak ada Vite, tidak ada
> deploy Vercel. Yang tertulis di sini = yang benar-benar ada di kode.

## 1. Ringkasan

Situs satu halaman (SPA) untuk **Toko Emas Mulia Raya Banda Aceh**
(Jl. Tgk. Chik Pante Kulu No. 58, Pasar Aceh) — menggantikan tautan Linktree
menjadi showroom digital. Pengunjung melihat harga acuan & katalog, lalu
menghubungi admin via WhatsApp. Tidak ada keranjang, pembayaran, atau akun:
semua transaksi terjadi di WhatsApp / di toko.

- Live: https://shopemas.pages.dev
- Repo: https://github.com/dezzorigin/shopemas

## 2. Pengguna

1. **Calon pengantin (Aceh):** cek harga per mayam untuk mahar, lihat cincin custom.
2. **Penabung / investor logam mulia:** cek harga Antam & buyback.
3. **Orang tua:** tindik telinga anak, hadiah perhiasan.

## 3. Fitur

### 3.1 Header (sticky)
Logo + nama toko, navigasi anchor (Harga Emas, Katalog, Tentang Kami, Kontak),
ikon GitHub (ke repo ini) & Instagram (@muliaraya.emas), menu mobile.

### 3.2 Hero (dua kolom)
Kiri: badge lokasi, headline, sub-headline, CTA "Lihat Katalog" & "Cek Harga
Emas", statistik toko. Kanan: foto perhiasan (`public/hero.png`) + chip harga
acuan Emas 24K per mayam.

### 3.3 Harga Emas (acuan, bukan live)
Tabel 5 kadar per gram & per mayam (1 mayam ≈ 3,33 gram) + kalkulator
estimasi (kadar + berat mayam → total rupiah) + tombol konfirmasi via
WhatsApp. **Harga = konstanta manual** (`GOLD_PRICES` di `src/app/page.tsx`)
dengan tanggal acuan (`PRICE_AS_OF`) yang selalu ditampilkan. Tidak ada
pemanggilan API harga apa pun.

### 3.4 Katalog
18 produk, 5 kategori (Gelang 4, Cincin 4, Kalung 4, Anting 3, Antam 3).
Filter kategori, kartu produk (foto, tag, kadar, berat), klik kartu →
WhatsApp dengan pesan "saya berminat dengan produk *X*, apakah stoknya
tersedia?". Foto produk = hotlink Unsplash (bukan foto toko), kecuali hero.

### 3.5 Tentang Kami, Layanan, Testimoni, FAQ, Kontak
- Tentang: cerita + 3 nilai + statistik + tautan sosial (WA/IG/lokasi/jam).
- Layanan: 6 kartu (emas asli, timbangan transparan, buyback, mahar custom,
  tindik steril, konsultasi gratis).
- Testimoni: ringkasan rating + 3 kartu — **isi contoh ilustratif, bukan
  ulasan terverifikasi** (lihat README § Batasan).
- FAQ: 5 Q&A akordeon.
- Kontak: kartu WA/lokasi/jam + embed Google Maps (area Masjid Raya
  Baiturrahman, bukan pin toko terverifikasi) + CTA chat. Tombol WA melayang
  muncul 1,2 detik setelah halaman dimuat.

## 4. Non-fungsional

- **Desain:** krem `#FAF5F0`, marun `#2C0A0A`/`#8B1A1A`, emas `#C47F00`;
  font Playfair Display (judul) + Plus Jakarta Sans (isi) via `next/font`.
- **SEO:** title/description id, OpenGraph, JSON-LD `JewelryStore`
  (alamat, telepon, jam buka, Instagram).
- **Performa:** static export, gambar katalog lazy via `<img>` biasa,
  target muat < 3 detik di HP.
- **Responsif:** mobile-first; grid katalog 2 kolom di HP, 4 di desktop;
  hero menumpuk di HP (teks dulu, foto di bawah).

## 5. Teknologi

Next.js 16 (App Router, `output: "export"`) + React 19 + Tailwind CSS 4 +
Framer Motion + lucide-react. Tanpa backend, tanpa database, tanpa API key.
Deploy: folder `out/` → Cloudflare Pages. CI: typecheck → lint → build →
smoke (`scripts/smoke.mjs`).

## 6. Yang sengaja TIDAK ada

Keranjang/checkout, pembayaran online, login, harga live via API,
manajemen stok, dan foto produk asli toko — semuanya di luar cakupan v1.1.0.
