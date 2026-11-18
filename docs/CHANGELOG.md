# CHANGELOG — Shopemas

## v1.1.0 — 18 November 2026 (PR #1)

Rebuild "proper" pertama: situs sudah jalan, fokus ke kejujuran, landing,
CI, docs, dan deploy live.

### Diubah
- Hero jadi dua kolom (teks kiri, foto `hero.png` kanan) + chip harga acuan
  24K/mayam; foto hero yang tadinya tak terpakai kini tampil.
- Header & footer: logo GitHub → repo (standar open-source program).
- Metadata: OpenGraph + JSON-LD `JewelryStore` (dulu cuma diklaim di PRD).
- `next.config.ts`: `output: "export"` — build statis ke `out/`.

### Kejujuran (perbaikan isi)
- Harga dinyatakan **acuan, bukan live**: label "Harga acuan per 18 November
  2026" di hero/tabel/catatan kaki; timestamp "Update: <jam buka halaman>"
  yang menyesatkan dihapus. Harga tetap konstanta manual `GOLD_PRICES`.
- PRD ditulis ulang jujur: klaim auto-fetch API, Vite, dan Vercel dihapus.
- Testimoni ditandai contoh ilustratif di kode + README (bukan ulasan
  terverifikasi). Foto katalog Unsplash, peta bukan pin persis, dan statistik
  toko yang belum terverifikasi dicatat di README § Batasan.

### Perbaikan kecil
- ESLint: kutip testimoni di-escape (`&ldquo;`), import `Phone` tak terpakai
  dihapus.

### Ditambah
- LICENSE MIT, CI GitHub Actions (typecheck → lint → build → smoke),
  `scripts/smoke.mjs` (cek 20+ marker di `out/index.html`).
- `docs/`: PRD, ARCHITECTURE, CHANGELOG, diagram.html, screenshot, video demo.
- Deploy live: https://shopemas.pages.dev (project Pages `shopemas`).
- README ditulis ulang (dulu `README.MD` berupa PRD dengan instruksi salah:
  URL clone `username/mulia-raya-emas`, env `VITE_GOLD_API_KEY`, port 5173).

## v0.1.0 — 16 Agustus 2026 (awal repo)

Situs satu halaman Next.js: header, hero, tabel harga + kalkulator, katalog
18 produk + filter, tentang, layanan, testimoni, FAQ, kontak + peta, footer,
tombol WA melayang. Belum ada LICENSE, CI, docs, screenshot, video, deploy.
