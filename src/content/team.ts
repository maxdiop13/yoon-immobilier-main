import type { IconName } from "@/components/Icon";

/**
 * Équipe YOoN — ton institutionnel (vouvoiement).
 * Photos réelles à fournir → emplacements `À COMPLÉTER` (initiales en attendant).
 */
export type Member = {
  name: string;
  initials: string;
  role: string;
  accent: "forest" | "ocre" | "dore";
  pitch: string;
  focus: { icon: IconName; label: string }[];
};

export const TEAM: Member[] = [
  {
    name: "Ngom Mohamed",
    initials: "NM",
    role: "Responsable terrain & sourcing immobilier — Dakar",
    accent: "forest",
    pitch:
      "Après avoir accompagné des investisseurs à Dubaï sur l'un des marchés immobiliers les plus compétitifs au monde, Mohamed a choisi de rentrer au Sénégal avec une conviction : les meilleures opportunités sont ici. Basé à Dakar, il met son expérience internationale, son réseau et sa connaissance du terrain au service de la diaspora et des investisseurs qui veulent investir intelligemment, sans mauvaises surprises.",
    focus: [
      { icon: "globe", label: "Expérience internationale (Dubaï)" },
      { icon: "pin", label: "Présence terrain à Dakar" },
      { icon: "search", label: "Sourcing & vérification des opportunités" },
      { icon: "network", label: "Réseau local & accompagnement diaspora" },
    ],
  },
  {
    name: "Sarah",
    initials: "S",
    role: "Relation diaspora & communication",
    accent: "ocre",
    pitch:
      "Interlocutrice de la diaspora, Sarah assure une communication claire et un reporting régulier. Elle fait le lien permanent entre vous et l'équipe au Sénégal, et porte la voix de YOoN sur les contenus et les réseaux.",
    focus: [
      { icon: "user", label: "Relation client diaspora" },
      { icon: "document", label: "Reporting & suivi" },
      { icon: "camera", label: "Contenus & réseaux sociaux" },
      { icon: "globe", label: "Lien France ↔ Sénégal" },
    ],
  },
  {
    name: "Gora",
    initials: "G",
    role: "Vision & cadrage stratégique",
    accent: "dore",
    pitch:
      "Gora définit la vision et la méthode. Il cadre chaque projet en amont, sécurise les étapes clés du parcours et pilote la relation avec les partenaires de confiance, en France comme au Sénégal.",
    focus: [
      { icon: "ruler", label: "Cadrage stratégique" },
      { icon: "shield", label: "Sécurisation du parcours" },
      { icon: "handshake", label: "Relation partenaires" },
      { icon: "sparkles", label: "Exigence & qualité" },
    ],
  },
];
