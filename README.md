# YOoN Immobilier — site vitrine

Site vitrine premium orienté **acquisition de leads** pour **YOoN Immobilier**, le relais de
confiance sur place à Dakar pour la diaspora qui investit au Sénégal.

> « On ne vend pas du rêve. On montre le terrain. »

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** — design tokens centralisés (charte YOoN) dans `tailwind.config.ts`
- **next/font** — Archivo (titres), Inter (corps), Fraunces (accent serif), self-hostées
- **lucide-react** — pictogrammes linéaires
- **sharp** — optimisation des images (script local)

Choix justifié : le site est majoritairement statique mais nécessite des metadata SEO par page,
l'optimisation d'images (`next/image`), un endpoint de formulaire et des sitemaps/robots
générés — ce que Next.js App Router fournit nativement, sans dépendance lourde.

## Commandes

```bash
npm install              # installer les dépendances
npm run dev              # serveur de dev (http://localhost:3000)
npm run build            # build de production
npm run start            # servir le build
npm run lint             # ESLint (0 erreur attendue)
npm run typecheck        # TypeScript (tsc --noEmit)
npm run optimize:images  # (re)générer public/img/*.webp depuis _source-images/
```

## Variables d'environnement

Copier `.env.example` en `.env.local` puis renseigner :

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (metadata, OG, sitemap, JSON-LD) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp international **sans `+`** (ex. `221770000000`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contact |
| `NEXT_PUBLIC_BOOKING_URL` | Lien de réservation d'appel (Calendly / Cal.com…) |
| `NEXT_PUBLIC_HERO_VIDEO_SRC` | Vidéo de fond du hero (mp4). Vide → poster façade |
| `NEXT_PUBLIC_HERO_VIDEO_WEBM` | (optionnel) même vidéo en webm |
| `FORM_WEBHOOK_URL` | Endpoint qui reçoit les soumissions de formulaire (Make/Zapier/n8n/CRM…) |
| `FORM_WEBHOOK_TOKEN` | (optionnel) jeton `Bearer` envoyé au webhook |

**Comportement des formulaires** (`src/app/api/lead/route.ts`) :
1. si `FORM_WEBHOOK_URL` est défini → la soumission y est relayée en JSON ;
2. sinon, si un email de contact existe → repli automatique `mailto:` (l'utilisateur n'est jamais bloqué) ;
3. sinon → message clair invitant à passer par WhatsApp.

Aucun secret n'est committé. Tant que `FORM_WEBHOOK_URL` n'est pas configuré, les leads ne sont pas
collectés automatiquement.

> ℹ️ Un fichier `.env.local` de **démo** (valeurs fictives, gitignoré) est présent pour la
> prévisualisation locale. **Remplacer par les vraies valeurs avant la mise en production.**

## Hero « video-ready »

Le hero ([`src/components/HeroMedia.tsx`](src/components/HeroMedia.tsx)) est prêt pour une vidéo,
sans refonte le jour venu :

1. **Aujourd'hui** : `NEXT_PUBLIC_HERO_VIDEO_SRC` vide → le hero affiche le **poster** (rendu de
   façade `public/img/facade.webp`), jamais un trou.
2. **Activer la vidéo** : déposer le fichier dans `public/videos/` puis renseigner dans `.env.local` :
   ```bash
   NEXT_PUBLIC_HERO_VIDEO_SRC="/videos/hero-yoon.mp4"
   NEXT_PUBLIC_HERO_VIDEO_WEBM=""   # optionnel ; le mp4 h264 se lit partout (iOS/Safari compris)
   ```
   > Vidéo actuelle : `public/videos/hero-yoon.mp4` (848×432, 30 fps, sans audio, faststart, ~3,1 Mo).
3. La vidéo se lance alors en `autoplay muted loop playsinline` (`preload="metadata"`), avec le
   poster en attendant le chargement. **`prefers-reduced-motion` est respecté** : pas d'autoplay,
   on reste sur le poster.

Conseils d'encodage : viser un fichier court et léger (~3–8 s en boucle, < 3–4 Mo), 1080p max,
mp4 (H.264/AAC) **et** webm (VP9) pour la compatibilité et le poids.

## Structure

```
src/
  app/                 # routes (App Router) + api/lead + sitemap/robots/icon
  components/          # Logo, Header, Footer, WhatsAppFloat, CTAButton, primitives, sections…
    forms/             # formulaires accessibles + endpoint client + champs réutilisables
  content/             # contenu YOoN (méthode, services, foncier, FAQ, programme Ouest Foire…)
  lib/                 # config site (coordonnées env-driven), helpers
public/
  img/                 # images optimisées (.webp/.jpg) — versionnées
  brand/               # logo lockup d'origine (référence)
_source-images/        # PNG sources lourds (gitignorés) → npm run optimize:images
```

## Pages

Accueil · Notre méthode · Services · Investir à Dakar · Projet pilote Ouest Foire · À propos ·
Contact · Mentions légales · Politique de confidentialité · 404.

## Images

Les rendus 3D et plans (sources `_source-images/`, ~2–3 Mo chacun) sont convertis en WebP nets
(130–280 Ko) via `npm run optimize:images`. `next/image` génère ensuite les variantes responsive
et AVIF à la volée. Pour ajouter/mettre à jour une image : déposer le PNG dans `_source-images/`,
ajuster `scripts/optimize-images.mjs` si besoin, puis relancer le script.

---

## ⚠️ À COMPLÉTER par le client (placeholders dans le code)

Aucune donnée n'a été inventée. Les éléments suivants apparaissent en placeholder `À COMPLÉTER` :

- **Coordonnées** : numéro WhatsApp, email, lien de réservation d'appel, **adresse précise** de
  l'agence Ouest Foire → via variables d'environnement.
- **Tarifs** des prestations (analyse, vérification, suivi de chantier) → page Services.
- **Mentions légales** : raison sociale, forme juridique, RCCM/NINEA, directeur de la publication,
  hébergeur → `src/app/mentions-legales/page.tsx`.
- **Politique de confidentialité** : sous-traitants/outils, durée de conservation, email DPO/contact
  → `src/app/politique-de-confidentialite/page.tsx`.
- **Témoignages réels** (anonymisés, avec accord) → emplacements réservés sur l'accueil.
- **Portrait photo de Mohamed** → placeholders sur l'accueil et la page À propos.
- **Photos chantier « avant »** (Ouest Foire) et **carrousels pédagogiques** : non fournis dans
  l'archive de ce livrable → emplacements réservés sur la page Ouest Foire.
- **`FORM_WEBHOOK_URL`** : brancher le service de réception des leads.

## Garde-fous respectés

- Charte **exclusivement YOoN** (palette §9, Archivo/Inter/Fraunces). Aucun token d'une autre
  marque (design system parasite « LegalForge » jamais importé).
- Ton éditorial YOoN (tutoiement, transparence) ; aucun terme interdit (« rendement garanti »,
  « affaire en or », etc.) ; chiffres toujours « à titre indicatif ».
- Accessibilité : HTML sémantique, labels liés, focus visibles, `alt` sur toutes les images,
  navigation clavier, `prefers-reduced-motion` respecté.
- Logo officiel fourni, reproduit fidèlement en SVG vectoriel.
