/**
 * Nos projets — vitrine de réalisations que YOoN porte/suit directement.
 * Preuve de méthode, PAS un catalogue de biens.
 *
 * Modèle éditable : ajouter un projet = ajouter un objet ici (aucun projet codé en dur
 * dans les composants). Garde-fous : tout projet DOIT avoir `pointsVerifies`
 * (papiers / structure / environnement) ; aucune promesse de rendement ; tout chiffre
 * éventuel reste « à titre indicatif, sous réserve de vérification ».
 */
export type ProjetStatut = "en_cours" | "livre" | "bientot";

export type ProjetImage = { src: string; alt: string };

export type Projet = {
  slug: string;
  titre: string;
  zone: string; // quartier de Dakar
  statut: ProjetStatut;
  pitch: string; // 1 phrase
  histoire: string[]; // récit (paragraphes)
  pointsVerifies: { papiers: string; structure: string; environnement: string };
  imagesAvant: ProjetImage[];
  imagesApres: ProjetImage[];
  /** Met le projet en avant sur la liste. */
  featured?: boolean;
};

export const STATUT_LABEL: Record<ProjetStatut, string> = {
  en_cours: "En cours",
  livre: "Livré",
  bientot: "Bientôt",
};

export const PROJETS: Projet[] = [
  {
    slug: "ouest-foire",
    titre: "Immeuble Maison Diaspora — Ouest Foire",
    zone: "Ouest Foire, Dakar",
    statut: "en_cours",
    featured: true,
    pitch:
      "Notre projet pilote : un immeuble repris, vérifié et rénové étape par étape — la méthode YOoN appliquée à notre propre bâtiment.",
    histoire: [
      "Avant d'accompagner les autres, on a voulu faire nos preuves chez nous. À Ouest Foire, on a repris un immeuble à l'état brut : murs fatigués, finitions d'origine, toiture-terrasse inexploitée.",
      "Plutôt que de promettre, on montre. Chaque décision du chantier est cadrée, documentée et suivie sur place : ce qu'on garde, ce qu'on reprend, ce qu'on transforme. Les rendus ci-dessous sont l'intention de résultat ; les photos « avant » montrent le point de départ réel, sans le maquiller.",
      "Au programme : une agence et un patio au rez-de-chaussée, des logements à l'étage et une toiture-terrasse partagée — un lieu pensé pour la diaspora, suivi du premier diagnostic au reporting final.",
    ],
    pointsVerifies: {
      papiers:
        "Statut foncier et chaîne de propriété examinés et recoupés ; points à confirmer signalés au notaire avant toute étape engageante.",
      structure:
        "État réel du bâti relevé sur place (murs, toiture, réseaux) ; travaux visibles et invisibles identifiés avant chiffrage.",
      environnement:
        "Quartier, accès et voisinage vérifiés à Ouest Foire ; cohérence avec l'usage projeté (agence + logements) confirmée sur le terrain.",
    },
    imagesAvant: [
      { src: "/img/projets/ouest-foire-avant-1.webp", alt: "Pièce de l'immeuble de Ouest Foire avant rénovation" },
      { src: "/img/projets/ouest-foire-avant-2.webp", alt: "Couloir et murs à reprendre avant rénovation, Ouest Foire" },
      { src: "/img/projets/ouest-foire-avant-3.webp", alt: "Cage d'escalier d'origine avant rénovation, Ouest Foire" },
      { src: "/img/projets/ouest-foire-avant-4.webp", alt: "Toiture-terrasse à l'état brut avant aménagement, Ouest Foire" },
    ],
    imagesApres: [
      { src: "/img/facade.webp", alt: "Façade rénovée de l'immeuble YOoN à Ouest Foire — rendu d'architecture" },
      { src: "/img/interieur-sejour.webp", alt: "Séjour rénové, lumineux et meublé — rendu d'architecture" },
      { src: "/img/studio-meuble.webp", alt: "Studio meublé prêt à louer — rendu d'architecture" },
      { src: "/img/rooftop-terrasse.webp", alt: "Toiture-terrasse aménagée au coucher du soleil — rendu d'architecture" },
      { src: "/img/patio.webp", alt: "Patio végétalisé en cœur d'îlot — rendu d'architecture" },
    ],
  },
];

export const PROJET_SLUGS = PROJETS.map((p) => p.slug);
export function getProjet(slug: string): Projet | undefined {
  return PROJETS.find((p) => p.slug === slug);
}
