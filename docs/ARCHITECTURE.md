# Arsitektur — Shopemas v1.1.0

## Gambaran

Situs statis murni: satu halaman Next.js yang di-build menjadi HTML statis
(`out/`) dan disajikan Cloudflare Pages. Tidak ada server, database, atau
API key. Semua "aksi" pengguna adalah tautan keluar ke WhatsApp (`wa.me`)
atau Instagram / Google Maps.

```
Pengunjung ──► Cloudflare Pages (shopemas.pages.dev)
                    └─► out/index.html (prerender, React SSR saat build)
                          ├─► _next/*.js (React + Framer Motion, client-side)
                          ├─► hero.png (foto lokal)
                          └─► hotlink images.unsplash.com (foto katalog)
```

Lihat `diagram.html` untuk diagram visual.

## Komponen (`src/app/page.tsx`, satu file)

| Komponen | Tanggung jawab |
|---|---|
| `Header` | Navigasi sticky, link GitHub + Instagram, menu mobile |
| `Hero` | Dua kolom: teks + foto `hero.png` + chip harga acuan |
| `HargaEmas` | Tabel `GOLD_PRICES` + kalkulator mayam → rupiah |
| `Katalog` | Filter kategori + grid kartu dari `CATALOG_DATA` |
| `TentangKami` | Cerita, nilai, statistik, tautan sosial |
| `Keunggulan` | 6 kartu layanan |
| `Testimoni` | Ringkasan rating + 3 kartu (isi contoh) |
| `FAQ` | Akordeon 5 Q&A |
| `KontakKami` | Kartu kontak + iframe Google Maps + CTA |
| `Footer` | Menu, kontak, link GitHub |
| `FloatingWA` | Tombol WA melayang (muncul setelah 1,2 dtk) |

## Data

- `src/data/catalog.ts` — `CATALOG_DATA`: 18 produk (id, kategori, nama,
  kadar, berat, tag, foto Unsplash). Tanpa harga per produk (harga mengikuti
  tabel kadar; konfirmasi via WA).
- `src/app/page.tsx` — `GOLD_PRICES` (5 kadar, harga/gram) +
  `PRICE_AS_OF` (tanggal acuan). Konstanta manual, bukan API.
- `WA_NUMBER = "6281279939946"` — nomor admin, dipakai semua tombol WA.

## Alur build & deploy

```
npm ci → npm run typecheck (tsc) → npm run lint (eslint)
  → npm run build (next build, output: export → out/)
  → node scripts/smoke.mjs out (cek marker di index.html)
  → deploy out/ ke Cloudflare Pages (project shopemas)
```

CI: `.github/workflows/ci.yml` (push/PR ke `main`).

## Keputusan

- **Static export, bukan SSR:** situs tidak butuh server; Pages direct
  upload paling sederhana dan gratis.
- **`<img>` biasa, bukan `next/image`:** gambar katalog hotlink eksternal;
  optimasi Next tidak berlaku untuk static export tanpa loader.
- **Satu file halaman:** situs satu halaman; memecah per komponen belum
  sepadan. Bila halaman bertambah, pecah `page.tsx` per seksi.
- **Harga manual:** tidak ada API key harga emas; kejujuran lebih penting
  daripada label "live" palsu. Bila suatu saat ada API, ganti `GOLD_PRICES`
  dengan fetch + cache, dan ubah label tanggalnya menjadi waktu fetch.
