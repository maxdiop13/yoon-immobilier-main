// ============================================================
// Génère des placeholders de marque pour les images de guides.
// Remplacement trivial : déposer le vrai fichier au même chemin.
//   node scripts/make-guide-placeholders.mjs
// Sorties :
//   public/img/guides/<base>.webp  (1600×900, hero)
//   public/img/og/<base>.jpg       (1200×630, partage)
// ============================================================
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const GUIDES = [
  { base: "eviter-arnaques", eyebrow: "Pièges à éviter", lines: ["Éviter les arnaques", "immobilières au Sénégal"] },
  { base: "titre-foncier", eyebrow: "Guide foncier", lines: ["Titre foncier", "au Sénégal"] },
  { base: "verifier-bien", eyebrow: "Méthode & vérification", lines: ["Vérifier un bien", "avant d'acheter"] },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/'/g, "&#39;");

function svg(w, h, g) {
  const cx = Math.round(w * 0.08);
  const gap = 64;
  const titleSize = Math.round(w * 0.052);
  const titleY = Math.round(h * 0.46);
  const lines = g.lines
    .map((l, i) => `<text x="${cx}" y="${titleY + i * (titleSize + 12)}" font-family="Georgia, serif" font-size="${titleSize}" font-weight="600" fill="#F4EFE5">${esc(l)}</text>`)
    .join("");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <pattern id="grid" width="${gap}" height="${gap}" patternUnits="userSpaceOnUse">
      <path d="M ${gap} 0 L 0 0 0 ${gap}" fill="none" stroke="#F4EFE5" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="85%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#C2703D" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#1E5C45" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1E5C45"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <text x="${cx}" y="${Math.round(h * 0.30)}" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.017)}" letter-spacing="4" font-weight="700" fill="#C2A14D">${esc(g.eyebrow.toUpperCase())}</text>
  ${lines}
  <text x="${cx}" y="${Math.round(h * 0.86)}" font-family="Georgia, serif" font-size="${Math.round(w * 0.026)}" font-weight="700" fill="#F4EFE5">Yoon</text>
  <text x="${cx}" y="${Math.round(h * 0.92)}" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.013)}" fill="#F4EFE5" fill-opacity="0.55">Visuel provisoire — à remplacer</text>
</svg>`);
}

async function run() {
  await mkdir(path.resolve("public/img/guides"), { recursive: true });
  await mkdir(path.resolve("public/img/og"), { recursive: true });
  for (const g of GUIDES) {
    await sharp(svg(1600, 900, g)).webp({ quality: 82 }).toFile(path.resolve(`public/img/guides/${g.base}.webp`));
    await sharp(svg(1200, 630, g)).jpeg({ quality: 82 }).toFile(path.resolve(`public/img/og/${g.base}.jpg`));
    console.log(`✓ ${g.base} — hero webp 1600×900 + og jpg 1200×630`);
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
