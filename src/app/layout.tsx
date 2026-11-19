import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shopemas.pages.dev"),
  title: "Toko Emas Mulia Raya | Pusat Perhiasan Emas & Logam Mulia Banda Aceh",
  description: "Melayani Jual Beli Emas, Logam Mulia Antam, Mahar Nikah Khas Aceh, dan Layanan Tindik Telinga Steril Sejak Pasar Aceh.",
  openGraph: {
    title: "Toko Emas Mulia Raya — Banda Aceh",
    description:
      "Pusat perhiasan emas 99% & logam mulia Antam terpercaya di Pasar Aceh. Cek harga emas per mayam, lihat katalog, chat admin via WhatsApp.",
    type: "website",
    locale: "id_ID",
    url: "https://shopemas.pages.dev",
    images: [{ url: "https://shopemas.pages.dev/og-image.png", width: 1200, height: 630, alt: "Toko Emas Mulia Raya — showroom digital & katalog perhiasan emas Banda Aceh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toko Emas Mulia Raya — Banda Aceh",
    description:
      "Pusat perhiasan emas 99% & logam mulia Antam terpercaya di Pasar Aceh. Cek harga emas per mayam, lihat katalog, chat admin via WhatsApp.",
    images: ["https://shopemas.pages.dev/og-image.png"],
  },
};

// JSON-LD LocalBusiness — data toko asli (alamat & jam dari README/PRD).
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "Toko Emas Mulia Raya",
  description:
    "Toko emas di Banda Aceh: jual beli perhiasan emas, logam mulia Antam, mahar nikah custom, tindik telinga steril.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Tgk. Chik Pante Kulu No. 58, Pasar Aceh",
    addressLocality: "Banda Aceh",
    addressRegion: "Aceh",
    addressCountry: "ID",
  },
  telephone: "+62-812-7993-9946",
  openingHours: "Mo-Su 09:00-17:30",
  sameAs: ["https://instagram.com/muliaraya.emas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={clsx(
          playfair.variable,
          jakarta.variable,
          "antialiased font-jakarta"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
