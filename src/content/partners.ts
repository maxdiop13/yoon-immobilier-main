/**
 * Partenaires. Ton prudent, premium (vouvoiement).
 * RÈGLE : on n'affiche publiquement QUE les partenaires `published: true`, dont les
 * informations et autorisations (dont le logo) sont validées. Tant que ce n'est pas le
 * cas, on présente un « réseau de confiance » sans nommer personne.
 *
 * L'entrée Charles & Rémy est PRÊTE (emplacement futur) mais `published: false` :
 * dès validation (logo, URL, autorisation), passer à true.
 */
export type Partner = {
  name: string;
  city: string;
  role: string;
  description: string;
  url: string; // lien externe — à fournir
  logo: string; // chemin logo — ne pas utiliser sans autorisation
  published: boolean;
};

export const PARTNERS: Partner[] = [
  {
    name: "Charles & Rémy Immobilier",
    city: "Paris",
    role: "Partenaire immobilier — France",
    description:
      "Un partenaire immobilier basé à Paris, mobilisable pour renforcer l'accompagnement des clients de la diaspora entre la France et le Sénégal.",
    url: "",
    logo: "",
    published: false,
  },
];

export const PUBLISHED_PARTNERS = PARTNERS.filter((p) => p.published);

/** Familles de partenaires du réseau (présentation générique, sans nommer). */
export const NETWORK_ROLES: { title: string; text: string }[] = [
  { title: "Notaires & juristes", text: "Pour sécuriser les actes et lever les doutes sur le foncier." },
  { title: "Géomètres", text: "Pour confirmer les limites, le bornage et la réalité d'un terrain." },
  { title: "Architectes & artisans", text: "Pour cadrer, chiffrer et exécuter les travaux avec sérieux." },
  { title: "Agences en France", text: "Pour accompagner la diaspora au plus près, des deux côtés." },
];
