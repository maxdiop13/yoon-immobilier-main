// ============================================================
// Optimisation des images sources (rendus 3D, cartes, plans).
// Convertit les PNG bruts (~2-3 Mo) en WebP nets et légers,
// dimensionnés pour l'usage web. `next/image` génère ensuite
// les variantes responsive + AVIF à la volée.
//
//   node scripts/optimize-images.mjs
// ============================================================
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("_source-images");
const OUT_DIR = path.resolve("public/img");

// width = largeur max de sortie ; quality = qualité WebP.
const PLAN = {
  "facade.png": { width: 2000, quality: 82 },
  "agence-reception.png": { width: 1600, quality: 80 },
  "interieur-sejour.png": { width: 1600, quality: 80 },
  "studio-meuble.png": { width: 1600, quality: 80 },
  "rooftop-terrasse.png": { width: 1600, quality: 80 },
  "patio.png": { width: 1600, quality: 80 },
  "coupe-axo.png": { width: 1800, quality: 84 },
  "carte-ouest-foire.png": { width: 1600, quality: 82 },
  "plans-architecte.png": { width: 1600, quality: 84 },
};

async function run() {
  if (!existsSync(SRC_DIR)) {
    console.error(`Dossier source introuvable : ${SRC_DIR}`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let done = 0;

  for (const file of files) {
    const cfg = PLAN[file] ?? { width: 1600, quality: 80 };
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    const out = path.join(OUT_DIR, `${base}.webp`);

    const img = sharp(path.join(SRC_DIR, file));
    const meta = await img.metadata();
    const resizeW = Math.min(cfg.width, meta.width ?? cfg.width);

    await img
      .resize({ width: resizeW, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 6 })
      .toFile(out);

    const sized = await sharp(out).metadata();
    console.log(`✓ ${base}.webp  ${sized.width}×${sized.height}`);
    done += 1;
  }

  // Image Open Graph (1200×630) générée à partir de la façade.
  const ogSrc = path.join(SRC_DIR, "facade.png");
  if (existsSync(ogSrc)) {
    await sharp(ogSrc)
      .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT_DIR, "og.jpg"));
    console.log("✓ og.jpg  1200×630");
  }

  console.log(`\nTerminé — ${done} image(s) optimisée(s) vers public/img/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
