/**
 * Configuration centrale du site YOoN Immobilier.
 * Les coordonnées sont pilotées par variables d'environnement (voir .env.example).
 * Si une variable est absente, on expose un placeholder « À COMPLÉTER »
 * et les helpers renvoient `null` pour que l'UI dégrade proprement.
 */

const TODO = "À COMPLÉTER";

const rawWhatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") || "221786588741";
const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@yoon.immo";
const rawBooking = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export const siteConfig = {
  name: "YOoN Immobilier",
  shortName: "YOoN",
  tagline: "Ton œil sur place à Dakar.",
  promise: "On ne vend pas du rêve. On montre le terrain.",
  description:
    "YOoN Immobilier est ton relais de confiance sur place à Dakar. On visite, on vérifie les papiers, on suit les chantiers et on te dit la vérité — pour investir au Sénégal depuis la diaspora sans te faire avoir.",
  // Domaine yoon.immo pas encore branché en prod → canonical sur l'URL Vercel publique.
  // Quand yoon.immo sera actif : définir NEXT_PUBLIC_SITE_URL=https://yoon.immo (env/Vercel).
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://yoon-immobilier.vercel.app",
  locale: "fr",
  city: "Dakar",
  country: "Sénégal",
  // — Coordonnées validées —
  whatsappNumber: rawWhatsapp, // 221786588741
  email: rawEmail,
  bookingUrl: rawBooking,
  address: "Rue YF-543, Ouest Foire, Dakar",
  hours: "Sur rendez-vous", // horaires précis en cours de finalisation
  languages: ["Français", "Anglais", "Wolof"] as string[],
  // — Société (YOoN = nom commercial ; LEGAL CESSION AFRIQUE SAS = entité statutaire) —
  company: {
    legalName: "LEGAL CESSION AFRIQUE SAS",
    legalForm: "Société par Actions Simplifiée (SAS)",
    capital: "1 000 000 FCFA",
    rccm: "SN.DKR.2020.B.31726",
    ninea: "008263197",
    registeredOffice: "SICAP Liberté 6, Villa 6347, Dakar (Sénégal)",
    publicationDirector: "Gora Ngom",
    foundingDate: "2020-12-23",
  },
  // — Hero « video-ready » : vide → poster façade ; renseigné → la vidéo se lance —
  heroVideo: {
    mp4: process.env.NEXT_PUBLIC_HERO_VIDEO_SRC || "",
    webm: process.env.NEXT_PUBLIC_HERO_VIDEO_WEBM || "",
  },
} as const;

export const TODO_LABEL = TODO;

/**
 * Placeholders publics élégants (site en version de travail).
 * Jamais de donnée inventée : on indique « bientôt » plutôt qu'une fausse valeur.
 */
export const PLACEHOLDERS = {
  coords: "Coordonnées bientôt disponibles",
  callDetail: "Communiqué lors de l'appel découverte",
  booking: "Réservation en ligne bientôt disponible",
  partner: "Partenaire en cours de validation",
  logo: "Logo affiché après autorisation",
  finalizing: "Informations en cours de finalisation",
  photo: "Photo bientôt disponible",
  address: "Agence à Ouest Foire, Dakar — adresse communiquée prochainement",
} as const;

/** Message WhatsApp pré-rempli, contextualisable par page. */
export function whatsappHref(message?: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const text = message ?? "Bonjour YOoN, je souhaite être accompagné·e pour un projet à Dakar.";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function emailHref(subject?: string): string | null {
  if (!siteConfig.email) return null;
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${s}`;
}

export function bookingHref(): string | null {
  return siteConfig.bookingUrl || null;
}

/** Affichage humain du numéro WhatsApp, ou placeholder. */
export function whatsappDisplay(): string {
  if (!siteConfig.whatsappNumber) return TODO;
  return `+${siteConfig.whatsappNumber}`;
}

/** Navigation d'en-tête — compacte. */
export const NAV_LINKS = [
  { href: "/notre-methode", label: "Méthode" },
  { href: "/services", label: "Services" },
  { href: "/investir-a-dakar", label: "Investir" },
  { href: "/quartiers", label: "Quartiers" },
  { href: "/projets", label: "Projets" },
  { href: "/guides", label: "Guides" },
  { href: "/equipe", label: "Équipe" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
] as const;

/** Plan du site — pied de page (complet). */
export const FOOTER_LINKS = [
  { href: "/notre-methode", label: "Notre méthode" },
  { href: "/services", label: "Services" },
  { href: "/investir-a-dakar", label: "Investir à Dakar" },
  { href: "/projets", label: "Nos projets" },
  { href: "/ouest-foire", label: "Projet pilote — Ouest Foire" },
  { href: "/guides", label: "Guides diaspora" },
  { href: "/equipe", label: "Notre équipe" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;
