// ============================================================
// Génère une présentation HTML autonome (images intégrées en base64)
// pour montrer le projet YOoN Immobilier à un associé.
//   node scripts/build-presentation.mjs
// Sortie : presentation-yoon.html (à la racine du projet)
// ============================================================
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/img");

// Images embarquées (recompressées plus petites pour rester légères).
const IMAGES = {
  facade: { file: "facade.webp", w: 1100 },
  coupe: { file: "coupe-axo.webp", w: 1100 },
  agence: { file: "agence-reception.webp", w: 900 },
  sejour: { file: "interieur-sejour.webp", w: 900 },
  studio: { file: "studio-meuble.webp", w: 900 },
  rooftop: { file: "rooftop-terrasse.webp", w: 900 },
  patio: { file: "patio.webp", w: 900 },
  carte: { file: "carte-ouest-foire.webp", w: 900 },
};

async function dataUri(file, w) {
  const buf = await sharp(path.join(SRC, file))
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const img = {};
for (const [k, v] of Object.entries(IMAGES)) {
  img[k] = await dataUri(v.file, v.w);
}

const PAGES = [
  ["Accueil", "La pièce maîtresse de conversion : promesse, méthode, preuve, formulaire."],
  ["Notre méthode", "Les 3 contrôles (papiers · structure · environnement) et la chaîne de preuves."],
  ["Services", "Analyse, vérification, visite terrain, suivi de chantier, revenu net, meublé."],
  ["Investir à Dakar", "Pédagogie foncière, quartiers, et checklist diaspora (capture email)."],
  ["Projet pilote — Ouest Foire", "L'immeuble rénové comme preuve vivante de la méthode."],
  ["À propos", "Mohamed, l'intention, les valeurs et les lignes rouges."],
  ["Contact", "WhatsApp, appel découverte, et formulaires qualifiants."],
  ["Mentions légales", "Page obligatoire — prête à compléter."],
  ["Politique de confidentialité", "RGPD — pensée pour la diaspora en UE."],
];

const FEATURES = [
  ["Générer des leads", "3 chemins de conversion partout (WhatsApp, être rappelé, réserver un appel) et 4 formulaires accessibles. Chaque clic est traçable pour l'analytics."],
  ["Inspirer confiance", "Tampon « Vérifié sur place », chaîne de preuves, le différenciateur « on a dit : n'achète pas ». La transparence comme argument."],
  ["Être trouvé sur Google", "SEO local Dakar/Sénégal : titres uniques, données structurées RealEstateAgent, sitemap, URLs propres — sans bourrage de mots-clés."],
  ["Aller vite, partout", "Mobile-first, images optimisées (20 Mo → ~1,5 Mo), zéro débordement horizontal, chargement léger. Pensé pour le mobile de la diaspora."],
  ["Accessible & sérieux", "HTML sémantique, navigation clavier, contrastes respectés, consentement RGPD, anti-spam. Le sérieux jusque dans le code."],
  ["Sans rien inventer", "Aucun tarif, témoignage ou chiffre fictif. Tout ce qui manque est signalé par un repère « À compléter »."],
];

const SWATCHES = [
  ["Ivoire", "#F4EFE5", "#1C1C1A"],
  ["Anthracite", "#1C1C1A", "#F4EFE5"],
  ["Vert YOoN", "#1E5C45", "#F4EFE5"],
  ["Ocre terre", "#C2703D", "#FBF9F4"],
  ["Doré", "#C2A14D", "#1C1C1A"],
  ["Validation", "#3E8E6A", "#FBF9F4"],
];

const GALLERY = [
  [img.coupe, "Coupe de l'immeuble", "5 niveaux : agence, suites, studios, appartement familial, toiture-terrasse"],
  [img.agence, "L'agence (RDC)", "L'accueil de la diaspora, sur place à Ouest Foire"],
  [img.sejour, "Séjour familial", "L'appartement signature, lumineux et meublé"],
  [img.studio, "Studio à rendement", "Pensé pour un locatif réaliste"],
  [img.rooftop, "Toiture-terrasse", "L'espace commun, à la lumière du soir"],
  [img.patio, "Le patio", "La respiration en cœur d'îlot"],
];

const FAIT = [
  "10 pages complètes, responsive et premium",
  "Charte YOoN intégrée (couleurs, typo, logo)",
  "Formulaires accessibles + endpoint configurable",
  "Images optimisées (WebP/AVIF)",
  "SEO : metadata, sitemap, robots, données structurées",
  "Build, lint et typecheck : aucun défaut",
];

const ACOMPLETER = [
  "WhatsApp, email, lien de RDV, adresse de l'agence",
  "Tarifs des prestations",
  "Mentions légales (société) + détails RGPD",
  "Témoignages réels de clients",
  "Photo de Mohamed",
  "Photos chantier « avant » + carrousels",
];

const logoSvg = `<svg viewBox="0 0 34 30" width="30" height="27" fill="none" aria-hidden="true" style="flex:none">
  <path d="M3 24 C 8 14, 13 26, 18 16 S 27 6, 31 9" stroke="#C2703D" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.1 5.2"/>
  <circle cx="3" cy="24" r="2.6" fill="currentColor"/>
  <circle cx="31" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="2.2"/>
  <circle cx="31" cy="9" r="0.7" fill="currentColor"/>
</svg>`;

const logo = (tone = "#1C1C1A") =>
  `<span class="logo" style="color:${tone}">${logoSvg}<span class="wm">Yoon</span><span class="wm-sub">Immobilier</span></span>`;

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>YOoN Immobilier — Présentation du site</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Inter:wght@400;500;600&family=Fraunces:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
<style>
  :root{
    --ivoire:#F4EFE5; --anthracite:#1C1C1A; --forest:#1E5C45; --forest-deep:#16432F;
    --ocre:#C2703D; --ocre-deep:#A85A2C; --dore:#C2A14D; --valide:#3E8E6A;
    --sable:#E5D9C3; --casse:#FBF9F4; --pierre:#8A8278;
    --display:'Archivo',system-ui,sans-serif; --sans:'Inter',system-ui,sans-serif; --serif:'Fraunces',Georgia,serif;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--ivoire);color:var(--anthracite);font-family:var(--sans);
    line-height:1.6;-webkit-font-smoothing:antialiased}
  img{max-width:100%;display:block}
  .cadastre{background-image:linear-gradient(to right,rgba(28,28,26,.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(28,28,26,.04) 1px,transparent 1px);background-size:64px 64px}
  .cadastre-light{background-image:linear-gradient(to right,rgba(244,239,229,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(244,239,229,.06) 1px,transparent 1px);background-size:64px 64px}
  .shell{max-width:1120px;margin:0 auto;padding:0 24px}
  section{padding:72px 0;position:relative}
  h1,h2,h3{font-family:var(--display);font-weight:700;letter-spacing:-.02em;line-height:1.06;margin:0;text-wrap:balance}
  .eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ocre);display:flex;align-items:center;gap:12px;margin:0 0 18px}
  .eyebrow::before{content:"";width:28px;height:1px;background:var(--ocre);opacity:.7}
  .eyebrow.light{color:var(--dore)}
  .eyebrow.light::before{background:var(--dore)}
  .lead{font-size:1.12rem;color:rgba(28,28,26,.72);max-width:62ch}
  .serif{font-family:var(--serif)}
  /* logo */
  .logo{display:inline-flex;align-items:center;gap:10px;line-height:1}
  .logo .wm{font-family:var(--serif);font-weight:600;font-size:1.5rem}
  .logo .wm-sub{font-size:.5rem;font-weight:600;text-transform:uppercase;letter-spacing:.3em;color:var(--pierre);align-self:center}
  /* header */
  header{position:sticky;top:0;z-index:10;background:rgba(244,239,229,.88);backdrop-filter:blur(8px);border-bottom:1px solid var(--sable)}
  header .shell{display:flex;align-items:center;justify-content:space-between;height:64px}
  .tag{font-size:.78rem;color:var(--pierre);font-weight:500}
  /* hero */
  .hero{background:var(--ivoire);overflow:hidden}
  .hero .grid{display:grid;gap:40px;align-items:center;grid-template-columns:1fr}
  @media(min-width:880px){.hero .grid{grid-template-columns:1.05fr 1fr}}
  .pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(28,28,26,.15);background:var(--casse);
    border-radius:999px;padding:6px 14px;font-size:.85rem;font-weight:600}
  .pill .dot{width:8px;height:8px;border-radius:999px;background:var(--ocre)}
  .h-title{font-size:clamp(2.3rem,5.5vw,3.6rem);margin:18px 0 0}
  .h-title .g{color:var(--forest)}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
  .chip{background:var(--casse);border:1px solid var(--sable);border-radius:12px;padding:8px 14px;font-size:.85rem;font-weight:600}
  .chip b{color:var(--forest)}
  .hero-img{position:relative;border-radius:24px;overflow:hidden;border:1px solid var(--sable);box-shadow:0 30px 60px -30px rgba(28,28,26,.45)}
  .hero-img .loc{position:absolute;left:16px;bottom:16px;display:inline-flex;align-items:center;gap:8px;background:rgba(244,239,229,.16);
    border:1px solid rgba(244,239,229,.4);backdrop-filter:blur(4px);color:#fff;border-radius:999px;padding:8px 14px;font-size:.85rem;font-weight:600}
  .hero-img .loc .dot{width:8px;height:8px;border-radius:999px;background:var(--ocre)}
  .quote{font-family:var(--serif);font-style:italic;color:var(--ocre-deep);font-size:1.15rem;margin-top:22px}
  /* sections tone */
  .tone-casse{background:var(--casse)}
  .tone-forest{background:var(--forest);color:var(--ivoire)}
  .tone-anthracite{background:var(--anthracite);color:var(--ivoire)}
  .tone-forest h2,.tone-anthracite h2{color:var(--ivoire)}
  .tone-forest .lead,.tone-anthracite .lead{color:rgba(244,239,229,.8)}
  /* cards grid */
  .grid-cards{display:grid;gap:18px;grid-template-columns:1fr;margin-top:36px}
  @media(min-width:640px){.grid-cards{grid-template-columns:1fr 1fr}}
  @media(min-width:960px){.grid-cards.c3{grid-template-columns:1fr 1fr 1fr}}
  .card{background:var(--casse);border:1px solid var(--sable);border-radius:18px;padding:24px;height:100%}
  .card h3{font-size:1.15rem;margin:0 0 8px}
  .card p{margin:0;color:rgba(28,28,26,.72);font-size:.95rem}
  .card .n{font-family:var(--serif);font-weight:600;color:var(--ocre);font-size:1.5rem}
  /* verbs */
  .verbs{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px}
  @media(min-width:760px){.verbs{grid-template-columns:repeat(4,1fr)}}
  .verb b{display:block;font-family:var(--display);text-transform:uppercase;letter-spacing:.04em;font-size:1.05rem;color:var(--ivoire)}
  .verb span{font-size:.85rem;color:rgba(244,239,229,.65)}
  .verb .k{color:var(--ocre);font-weight:700}
  /* swatches */
  .swatches{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:32px}
  @media(min-width:680px){.swatches{grid-template-columns:repeat(3,1fr)}}
  .sw{border-radius:14px;overflow:hidden;border:1px solid var(--sable)}
  .sw .c{height:80px;display:flex;align-items:flex-end;padding:10px;font-family:var(--serif);font-weight:600}
  .sw .m{background:var(--casse);padding:10px 12px;font-size:.8rem}
  .sw .m b{display:block;font-family:var(--sans);font-weight:700;font-size:.85rem}
  .sw .m span{color:var(--pierre);letter-spacing:.03em}
  .fonts{display:flex;flex-wrap:wrap;gap:24px;margin-top:28px}
  .fonts div{border:1px solid var(--sable);border-radius:14px;padding:16px 20px;background:var(--casse);flex:1;min-width:180px}
  .fonts .lbl{font-size:.72rem;text-transform:uppercase;letter-spacing:.14em;color:var(--pierre);font-weight:700}
  /* gallery */
  .gallery{display:grid;gap:16px;grid-template-columns:1fr;margin-top:36px}
  @media(min-width:640px){.gallery{grid-template-columns:1fr 1fr}}
  @media(min-width:960px){.gallery{grid-template-columns:1fr 1fr 1fr}}
  figure{margin:0;border-radius:16px;overflow:hidden;border:1px solid var(--sable);background:var(--casse)}
  figure img{aspect-ratio:4/3;object-fit:cover;width:100%}
  figcaption{padding:12px 14px}
  figcaption b{display:block;font-family:var(--display);font-weight:600}
  figcaption span{font-size:.82rem;color:var(--pierre)}
  /* status two cols */
  .status{display:grid;gap:18px;grid-template-columns:1fr;margin-top:36px}
  @media(min-width:760px){.status{grid-template-columns:1fr 1fr}}
  .panel{border-radius:18px;padding:24px 26px}
  .panel.ok{background:rgba(62,142,106,.1);border:1px solid rgba(62,142,106,.35)}
  .panel.todo{background:rgba(194,112,61,.1);border:1px solid rgba(194,112,61,.35)}
  .panel h3{font-size:1.1rem;margin:0 0 14px}
  .panel ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}
  .panel li{display:flex;gap:10px;font-size:.95rem;color:rgba(28,28,26,.82)}
  .panel li::before{content:"";flex:none;width:18px;height:18px;border-radius:6px;margin-top:2px}
  .panel.ok li::before{background:var(--valide)}
  .panel.todo li::before{background:var(--ocre);border-radius:999px}
  /* stat band */
  .stats{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
  @media(min-width:760px){.stats{grid-template-columns:repeat(4,1fr)}}
  .stat .num{font-family:var(--serif);font-weight:600;font-size:2.4rem;color:var(--dore);line-height:1}
  .stat .lbl{color:rgba(244,239,229,.7);font-size:.9rem;margin-top:6px}
  /* hairline */
  .hr{height:1px;background:var(--dore);width:48px;margin:0 0 24px}
  /* footer */
  footer{background:var(--anthracite);color:rgba(244,239,229,.7);padding:40px 0}
  footer .shell{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
  footer .note{font-size:.85rem;max-width:60ch}
  .stamp{display:inline-flex;align-items:center;gap:8px;border:2px solid rgba(62,142,106,.7);color:var(--valide);
    background:rgba(62,142,106,.08);border-radius:12px;padding:8px 12px;font-size:.72rem;font-weight:700;
    text-transform:uppercase;letter-spacing:.12em;transform:rotate(-3deg)}
  .center{text-align:center}
  .mt0{margin-top:0}
</style>
</head>
<body>

<header>
  <div class="shell">
    ${logo()}
    <span class="tag">Présentation du site · Juin 2026</span>
  </div>
</header>

<!-- HERO -->
<section class="hero cadastre">
  <div class="shell grid">
    <div>
      <span class="pill"><span class="dot"></span> Site vitrine premium · orienté leads</span>
      <h1 class="h-title">Le nouveau site<br><span class="g">YOoN Immobilier</span></h1>
      <p class="lead" style="margin-top:18px">Un site clair, sobre et haut de gamme pour transformer la confiance de la diaspora en demandes qualifiées. « On ne vend pas du rêve. On montre le terrain. »</p>
      <div class="chips">
        <span class="chip"><b>10</b> pages</span>
        <span class="chip"><b>4</b> formulaires</span>
        <span class="chip"><b>Mobile</b>-first</span>
        <span class="chip"><b>SEO</b> Dakar</span>
      </div>
      <p class="quote">« Avant de te dire oui, je vérifie. »</p>
    </div>
    <div class="hero-img">
      <img src="${img.facade}" alt="Façade de l'immeuble YOoN à Ouest Foire, Dakar">
      <span class="loc"><span class="dot"></span> Ouest Foire — Dakar</span>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="tone-anthracite cadastre-light" style="padding:48px 0">
  <div class="shell stats">
    <div class="stat"><div class="num">10</div><div class="lbl">pages complètes</div></div>
    <div class="stat"><div class="num">3</div><div class="lbl">chemins de conversion</div></div>
    <div class="stat"><div class="num">~1,5 Mo</div><div class="lbl">d'images (depuis 20 Mo)</div></div>
    <div class="stat"><div class="num">0</div><div class="lbl">défaut de build / lint</div></div>
  </div>
</section>

<!-- POSITIONNEMENT + VERBES -->
<section class="tone-forest cadastre-light">
  <div class="shell">
    <p class="eyebrow light">Le positionnement</p>
    <h2 style="font-size:clamp(1.7rem,3.6vw,2.5rem)">Ton œil sur place, pas un catalogue de plus</h2>
    <p class="lead">Le site incarne la promesse de YOoN : un relais de confiance à Dakar qui visite, vérifie, documente et conseille. Chaque page pousse, en douceur, vers une prise de contact.</p>
    <div class="verbs">
      <div class="verb"><b><span class="k">Visiter</span></b><span>On regarde le bien et le quartier en vrai.</span></div>
      <div class="verb"><b><span class="k">Vérifier</span></b><span>Papiers, structure, environnement.</span></div>
      <div class="verb"><b><span class="k">Documenter</span></b><span>Photos, vidéos datées, documents source.</span></div>
      <div class="verb"><b><span class="k">Conseiller</span></b><span>On dit la vérité, franchement.</span></div>
    </div>
  </div>
</section>

<!-- PAGES -->
<section>
  <div class="shell">
    <p class="eyebrow">Les pages du site</p>
    <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">Un parcours complet, sans pages superflues</h2>
    <div class="grid-cards c3">
      ${PAGES.map(([t, d]) => `<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join("")}
    </div>
  </div>
</section>

<!-- FONCTIONNALITÉS -->
<section class="tone-casse">
  <div class="shell">
    <p class="eyebrow">Ce que le site sait faire</p>
    <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">Pensé pour convertir, sans jamais survendre</h2>
    <div class="grid-cards c3">
      ${FEATURES.map(([t, d], i) => `<div class="card"><div class="n">${String(i + 1).padStart(2, "0")}</div><h3 style="margin-top:8px">${t}</h3><p>${d}</p></div>`).join("")}
    </div>
  </div>
</section>

<!-- CHARTE -->
<section>
  <div class="shell">
    <p class="eyebrow">La charte respectée</p>
    <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">« Le document foncier rencontre l'architecture africaine »</h2>
    <p class="lead">Palette terre et vert profond, typographies nettes, beaucoup d'air. Sobre et premium, jamais bling.</p>
    <div class="swatches">
      ${SWATCHES.map(([n, hex, txt]) => `<div class="sw"><div class="c" style="background:${hex};color:${txt}">${n}</div><div class="m"><b>${n}</b><span>${hex}</span></div></div>`).join("")}
    </div>
    <div class="fonts">
      <div><div class="lbl">Titres</div><div style="font-family:var(--display);font-weight:700;font-size:1.6rem">Archivo</div></div>
      <div><div class="lbl">Texte</div><div style="font-family:var(--sans);font-weight:500;font-size:1.6rem">Inter</div></div>
      <div><div class="lbl">Accent</div><div style="font-family:var(--serif);font-style:italic;font-weight:600;font-size:1.6rem">Fraunces</div></div>
    </div>
  </div>
</section>

<!-- GALERIE OUEST FOIRE -->
<section class="tone-casse">
  <div class="shell">
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:end;justify-content:space-between">
      <div>
        <p class="eyebrow">Projet pilote — Ouest Foire</p>
        <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">La preuve vivante de la méthode</h2>
      </div>
      <span class="stamp">✓ Vérifié sur place</span>
    </div>
    <div class="gallery">
      ${GALLERY.map(([src, t, d]) => `<figure><img src="${src}" alt="${t}"><figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`).join("")}
    </div>
  </div>
</section>

<!-- ÉTAT DU PROJET -->
<section>
  <div class="shell">
    <p class="eyebrow">Où en est le projet</p>
    <h2 style="font-size:clamp(1.7rem,3.6vw,2.4rem)">Le site est prêt. Il manque tes infos.</h2>
    <div class="status">
      <div class="panel ok">
        <h3>✓ Déjà fait</h3>
        <ul>${FAIT.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
      <div class="panel todo">
        <h3>À fournir ensemble</h3>
        <ul>${ACOMPLETER.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    </div>
    <p class="lead" style="margin-top:28px">Aucune donnée n'a été inventée : tarifs, coordonnées, témoignages et mentions légales sont en attente de tes informations réelles. Dès qu'on les a, le site peut partir en ligne.</p>
  </div>
</section>

<footer>
  <div class="shell">
    ${logo("#F4EFE5")}
    <p class="note">Présentation interne du site vitrine YOoN Immobilier. Visuels : rendus 3D du projet d'Ouest Foire (Dakar). Document à usage de présentation — non destiné à la publication en l'état.</p>
  </div>
</footer>

</body>
</html>`;

await writeFile(path.resolve("presentation-yoon.html"), html, "utf8");
const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log(`✓ presentation-yoon.html généré (${kb} Ko)`);
