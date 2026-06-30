export type UsageType =
  | "habiter"
  | "louer"
  | "construire"
  | "immeuble-de-rapport"
  | "patrimoine";

export type RadarScore = {
  prixAccessibilite: number;
  securiteFonciere: number;
  rendementLocatif: number;
  qualiteVie: number;
  transports: number;
  projetsDeveloppement: number;
};

export type QuartierActif = {
  slug: string;
  nom: string;
  tagline: string;
  usage: UsageType;
  profilAcheteur: string;
  description: string;
  radar: RadarScore;
  pointsVigilance: string[];
  opportunites: string[];
  photos: string[];
  statut: "actif";
};

export type QuartierStub = {
  slug: string;
  nom: string;
  statut: "stub";
};

export type Quartier = QuartierActif | QuartierStub;

export const QUARTIERS: Quartier[] = [
  {
    slug: "ouest-foire",
    nom: "Ouest Foire",
    tagline: "Le quartier résidentiel de la diaspora établie",
    usage: "habiter",
    profilAcheteur: "Diaspora cherchant résidence principale ou secondaire premium",
    description:
      "Ouest Foire est le quartier résidentiel de référence de la diaspora dakaroise. Situé entre la VDN et le littoral nord, il concentre villas, immeubles de standing et une population largement issue de la diaspora ou expatriée. L'offre y est diverse — villa individuelle, appartement en immeuble, terrain —, mais le marché est tendu et la pression foncière forte. La qualité de vie y est élevée, les commerces et services bien représentés.",
    radar: {
      prixAccessibilite: 2,
      securiteFonciere: 4,
      rendementLocatif: 3,
      qualiteVie: 5,
      transports: 4,
      projetsDeveloppement: 3,
    },
    pointsVigilance: [
      "Vérifier les titres fonciers parcelle par parcelle — le morcellement est courant",
      "Nuisances sonores possibles côté VDN",
      "Pression foncière élevée — éviter les terrains sans TF",
    ],
    opportunites: [
      "Immeuble en cours de qualification — statut foncier et prix à confirmer",
    ],
    photos: [],
    statut: "actif",
  },
  {
    slug: "yoff",
    nom: "Yoff",
    tagline: "Bord de mer, village urbain et fort potentiel locatif",
    usage: "louer",
    profilAcheteur: "Investisseur cherchant rendement locatif ou location saisonnière",
    description:
      "Yoff est un village urbain historique en bord de mer, situé entre Ngor et l'aéroport international. Le quartier présente une double nature : une partie moderne avec immeubles et accès facilité, et l'ancien village coutumier dense. La proximité de la mer et de l'aéroport en fait un secteur attractif pour la location saisonnière et longue durée. La demande locative est soutenue.",
    radar: {
      prixAccessibilite: 3,
      securiteFonciere: 3,
      rendementLocatif: 4,
      qualiteVie: 4,
      transports: 3,
      projetsDeveloppement: 4,
    },
    pointsVigilance: [
      "Partie du village de Yoff sous régime coutumier — exiger TF, pas juste lettre d'attribution",
      "Vérifier proximité zone inondable côtière",
      "Forte densité bâtie dans le vieux village",
    ],
    opportunites: [],
    photos: [],
    statut: "actif",
  },
  {
    slug: "ngor",
    nom: "Ngor",
    tagline: "Le prestige discret de la péninsule",
    usage: "patrimoine",
    profilAcheteur: "Profil patrimoine — horizon long terme, appréciation du capital",
    description:
      "Ngor est une péninsule résidentielle calme à l'extrémité nord-ouest de Dakar, face à l'île de Ngor. Ambiance village, villas avec vue mer, calme et discrétion. Le quartier attire des profils aisés et expatriés cherchant un cadre de vie premium. Le stock de biens disponibles est très limité, ce qui soutient des prix parmi les plus élevés de Dakar.",
    radar: {
      prixAccessibilite: 1,
      securiteFonciere: 3,
      rendementLocatif: 3,
      qualiteVie: 5,
      transports: 3,
      projetsDeveloppement: 3,
    },
    pointsVigilance: [
      "Foncier complexe : village coutumier coexiste avec TF — due diligence obligatoire",
      "Accès limité et trafic possible en haute saison",
      "Rareté des biens disponibles — attention aux prix gonflés",
    ],
    opportunites: [],
    photos: [],
    statut: "actif",
  },
  {
    slug: "almadies",
    nom: "Les Almadies",
    tagline: "Le quartier international — prime à la liquidité",
    usage: "patrimoine",
    profilAcheteur: "Diaspora cadre ou investisseur cherchant liquidité et prestige",
    description:
      "Les Almadies forment le quartier le plus international de Dakar : ambassades, hôtels de luxe, restaurants, clubs. Localisé sur la pointe ouest de Dakar avec vue Atlantique, le quartier affiche une ambiance cosmopolite. Le marché y est très liquide mais aussi très cher et peu fourni. Profil acheteur : investisseur qui mise sur la valeur refuge et la liquidité à la revente.",
    radar: {
      prixAccessibilite: 1,
      securiteFonciere: 4,
      rendementLocatif: 3,
      qualiteVie: 5,
      transports: 4,
      projetsDeveloppement: 3,
    },
    pointsVigilance: [
      "Marché très cher — vérifier que le prix reflète un TF propre et non juste l'adresse",
      "Concurrence forte d'acheteurs étrangers et institutionnels",
      "Peu de stocks disponibles",
    ],
    opportunites: [],
    photos: [],
    statut: "actif",
  },
  {
    slug: "guediawaye",
    nom: "Guédiawaye",
    tagline: "Le grand levier des petits budgets à fort potentiel",
    usage: "immeuble-de-rapport",
    profilAcheteur: "Primo-investisseur diaspora avec budget 30-80k€ cherchant rendement",
    description:
      "Guédiawaye est une commune de la banlieue nord de Dakar, densément peuplée et en plein essor. Le marché immobilier y est accessible : terrain à bâtir, immeuble de rapport, appartement — avec des prix très inférieurs au centre de Dakar. La demande locative locale est forte, portée par une population jeune et en croissance. Zone à surveiller : certaines cités sont en zone inondable.",
    radar: {
      prixAccessibilite: 5,
      securiteFonciere: 3,
      rendementLocatif: 4,
      qualiteVie: 3,
      transports: 3,
      projetsDeveloppement: 4,
    },
    pointsVigilance: [
      "Vérifier absence de zone inondable (cartes ONAS à consulter)",
      "Qualité de construction variable — indispensable d'avoir un regard technique local",
      "Titres fonciers pas systématiques dans toutes les cités — exiger TF ou BA",
    ],
    opportunites: [
      "Opportunité immeuble de rapport en cours de qualification — prix et surfaces à confirmer",
    ],
    photos: [],
    statut: "actif",
  },
  {
    slug: "face-mbao",
    nom: "Face Mbao / Grand-Mbao",
    tagline: "Le pari du développement axe Dakar-Thiès",
    usage: "construire",
    profilAcheteur: "Investisseur patient cherchant terrain à bâtir avec plus-value à 5-10 ans",
    description:
      "Face Mbao et Grand-Mbao se développent le long de l'axe Dakar-Thiès, à mi-chemin entre la capitale et la nouvelle ville de Diamniadio. Zone en cours d'urbanisation rapide, avec des terrains encore accessibles et de larges projets d'infrastructure à venir. Profil « investisseur patient » : les plus-values sont attendues sur un horizon 5-10 ans.",
    radar: {
      prixAccessibilite: 4,
      securiteFonciere: 3,
      rendementLocatif: 3,
      qualiteVie: 3,
      transports: 4,
      projetsDeveloppement: 5,
    },
    pointsVigilance: [
      "Zone en développement — vérifier les plans d'urbanisme et risques d'expropriation",
      "Accès route dépend du tronçon exact — visiter aux heures de pointe",
      "TF non systématique : certains terrains sur lettre d'attribution seulement",
    ],
    opportunites: [
      "Terrain(s) en cours de qualification — TF N°11.058/DP à vérifier, prix et surfaces non confirmés",
    ],
    photos: [],
    statut: "actif",
  },
  // Stubs — analyses à venir
  { slug: "pikine", nom: "Pikine", statut: "stub" },
  { slug: "grand-yoff", nom: "Grand-Yoff", statut: "stub" },
  { slug: "mermoz", nom: "Mermoz", statut: "stub" },
  { slug: "sacre-coeur", nom: "Sacré-Cœur", statut: "stub" },
  { slug: "plateau", nom: "Plateau", statut: "stub" },
  { slug: "medina", nom: "Médina", statut: "stub" },
  { slug: "liberte", nom: "Liberté", statut: "stub" },
  { slug: "parcelles-assainies", nom: "Parcelles Assainies", statut: "stub" },
  { slug: "thiaroye", nom: "Thiaroye", statut: "stub" },
  { slug: "rufisque", nom: "Rufisque", statut: "stub" },
];

export const QUARTIER_SLUGS = QUARTIERS.filter(
  (q): q is QuartierActif => q.statut === "actif"
).map((q) => q.slug);

export function getQuartier(slug: string): QuartierActif | undefined {
  return QUARTIERS.find(
    (q): q is QuartierActif => q.statut === "actif" && q.slug === slug
  );
}
