// Smoke test for the static export in out/.
// Usage: node scripts/smoke.mjs [outDir]
// Checks the built index.html (React SSR inserts <!-- --> between text and
// interpolated expressions, so comments are stripped before matching).
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2] ?? "out";
const htmlPath = join(outDir, "index.html");

let failures = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failures++;
}

check("out/index.html exists", existsSync(htmlPath));
check("out/hero.png exists", existsSync(join(outDir, "hero.png")));
check("out/og-image.png exists", existsSync(join(outDir, "og-image.png")));
check("out/_next/ exists", existsSync(join(outDir, "_next")));

const html = existsSync(htmlPath)
  ? readFileSync(htmlPath, "utf8").replace(/<!-- -->/g, "")
  : "";

const markers = [
  ["hero headline", "Pusat Perhiasan Emas"],
  ["hero sub-headline", "Logam Mulia Terpercaya"],
  ["hero image", "/hero.png"],
  ["price honesty label", "Harga acuan per 18 November 2026"],
  ["price table", "Daftar Harga Emas"],
  ["calculator", "Kalkulator Estimasi"],
  ["catalog", "Katalog Perhiasan"],
  ["about", "Kepercayaan &amp; Kejujuran"],
  ["services", "Kenapa Pilih Mulia Raya?"],
  ["testimonials", "Kata Pelanggan Kami"],
  ["faq", "Pertanyaan Umum"],
  ["contact", "Siap Melayani Anda"],
  ["github link", "github.com/dezzorigin/shopemas"],
  ["JSON-LD JewelryStore", "JewelryStore"],
  ["og:url", "https://shopemas.pages.dev"],
  ["og:image absolut", "https://shopemas.pages.dev/og-image.png"],
  ["twitter:card", "summary_large_image"],
];
// WA number lives only in client JS (click handlers), not prerendered HTML.
import { readdirSync } from "node:fs";
const jsBundle = readdirSync(join(outDir, "_next", "static"))
  .flatMap((d) => {
    const dir = join(outDir, "_next", "static", d);
    try {
      return readdirSync(dir).map((f) => join(dir, f));
    } catch {
      return [];
    }
  })
  .filter((f) => f.endsWith(".js"))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");
check("marker: whatsapp number (JS bundle)", jsBundle.includes("6281279939946"));
for (const [name, marker] of markers) {
  check(`marker: ${name}`, html.includes(marker));
}

// Every catalog item name must be present in the prerendered HTML.
const catalogNames = [
  "Gelang Rantai Bunga Emas 23K",
  "Cincin Kawin Solitaire 99%",
  "Kalung Rantai Padi Emas",
  "Anting Jurai Love Emas Murni",
  "Logam Mulia Antam 100g",
];
for (const name of catalogNames) {
  check(`catalog item: ${name}`, html.includes(name));
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nsmoke OK");
