import type { IconName } from "@/components/Icon";

/* ====== Les 4 verbes méthode (bandeau réassurance) ====== */
export const VERBES: { label: string; icon: IconName; text: string }[] = [
  { label: "Visiter", icon: "eye", text: "On se déplace, on regarde le bien et le quartier en vrai." },
  { label: "Vérifier", icon: "papiers", text: "On contrôle les papiers, la structure, l'environnement." },
  { label: "Documenter", icon: "camera", text: "Photos, vidéos datées, documents source : tout est tracé." },
  { label: "Conseiller", icon: "shield", text: "On te dit ce qu'on ferait à ta place. Franchement." },
];

/* ====== Les 3 contrôles ====== */
export const CONTROLES: {
  icon: IconName;
  titre: string;
  resume: string;
  points: string[];
}[] = [
  {
    icon: "papiers",
    titre: "Les papiers",
    resume: "Le statut du terrain et la chaîne de propriété, avant tout le reste.",
    points: [
      "Titre foncier, bail, délibération : quel est le vrai statut ?",
      "Cohérence entre le vendeur, les documents et le cadastre",
      "Points à faire valider par un notaire avant de signer",
    ],
  },
  {
    icon: "structure",
    titre: "La structure",
    resume: "L'état réel du bâti, ce qui se voit et ce qui se cache.",
    points: [
      "Fissures, humidité, toiture, réseaux : l'état honnête du bien",
      "Travaux visibles et travaux invisibles à anticiper",
      "Estimation indicative du budget de remise en état",
    ],
  },
  {
    icon: "environnement",
    titre: "L'environnement",
    resume: "Le quartier, les accès, les nuisances — ce qu'une annonce ne dit jamais.",
    points: [
      "Accès, voisinage, services, projets autour du bien",
      "Risques (zone inondable, litiges connus, voirie)",
      "Potentiel locatif réaliste du secteur",
    ],
  },
];

/* ====== Chaîne d'évidences ====== */
export const EVIDENCES: { icon: IconName; label: string }[] = [
  { icon: "camera", label: "Photo sur place" },
  { icon: "video", label: "Vidéo datée" },
  { icon: "document", label: "Document source" },
  { icon: "scale", label: "Vérification administrative" },
  { icon: "clipboard", label: "Rapport clair" },
  { icon: "loop", label: "Recoupement" },
];

/* ====== Services ====== */
export const SERVICES: {
  slug: string;
  icon: IconName;
  titre: string;
  accroche: string;
  description: string;
  livrables: string[];
}[] = [
  {
    slug: "analyse-de-bien",
    icon: "search",
    titre: "Analyse de bien",
    accroche: "Avant de te lancer, on te dit ce que vaut vraiment le bien.",
    description:
      "Tu as repéré un bien ou une annonce ? On l'examine : cohérence du prix, premiers signaux, questions à poser au vendeur avant d'aller plus loin.",
    livrables: ["Première lecture sous 48 h", "Points de vigilance", "Questions à poser au vendeur"],
  },
  {
    slug: "verification-documentaire",
    icon: "papiers",
    titre: "Vérification documentaire",
    accroche: "Le statut foncier, lu et expliqué simplement.",
    description:
      "On rassemble et on lit les documents (titre, bail, plans), on vérifie leur cohérence administrative et on signale ce qui doit passer par un notaire.",
    livrables: ["Lecture des documents", "Cohérence administrative", "Alertes à lever avant signature"],
  },
  {
    slug: "visite-reportage",
    icon: "camera",
    titre: "Visite & reportage terrain",
    accroche: "Tes yeux sur place, en photo et en vidéo datée.",
    description:
      "Mohamed se rend sur le bien et te livre un reportage honnête : ce qui va, ce qui ne va pas, le quartier, les accès. Sans filtre, sans embellir.",
    livrables: ["Visite physique", "Reportage photo + vidéo datée", "Compte-rendu franc"],
  },
  {
    slug: "suivi-de-chantier",
    icon: "hammer",
    titre: "Suivi de chantier à distance",
    accroche: "Tu construis ou tu rénoves ? On garde un œil chaque semaine.",
    description:
      "Point d'avancement régulier, photos datées, contrôle de l'usage des fonds et de la qualité d'exécution. Tu suis ton chantier comme si tu étais là.",
    livrables: ["Points d'avancement réguliers", "Photos/vidéos datées", "Contrôle qualité & budget"],
  },
  {
    slug: "calcul-revenu-net",
    icon: "calculator",
    titre: "Calcul de revenu net",
    accroche: "Le vrai chiffre, pas le chiffre d'affaires affiché.",
    description:
      "On distingue chiffre d'affaires et revenu net : charges, gestion, vacance, fiscalité locale. Des estimations réalistes, toujours présentées à titre indicatif.",
    livrables: ["CA vs revenu net (indicatif)", "Charges & vacance estimées", "Scénarios prudents"],
  },
  {
    slug: "conseil-meuble-airbnb",
    icon: "key",
    titre: "Conseil meublé / Airbnb",
    accroche: "Mettre en location courte durée, sans illusions.",
    description:
      "Avec la sous-marque Maison Diaspora, on conseille l'aménagement, la mise en location meublée et la gestion — en restant lucides sur le rendement réel.",
    livrables: ["Aménagement & équipement", "Mise en location", "Gestion & arbitrages"],
  },
];

/* ====== Zones Dakar ====== */
export const ZONES = [
  "Ouest Foire",
  "Almadies",
  "Ngor",
  "Mermoz",
  "Yoff",
  "Sacré-Cœur",
  "Plateau",
  "Périphérie",
];

/* ====== Statuts fonciers (pédagogie, à titre indicatif) ====== */
export const FONCIER: { terme: string; definition: string }[] = [
  {
    terme: "Titre foncier (TF)",
    definition:
      "Le statut le plus protecteur : la propriété est définitive et inscrite. C'est ce qu'on cherche à confirmer en priorité.",
  },
  {
    terme: "Bail emphytéotique",
    definition:
      "Un droit d'usage long sur un terrain de l'État. Utile, mais à comprendre dans ses conditions et sa durée.",
  },
  {
    terme: "Délibération",
    definition:
      "Une attribution communale, étape avant un titre. À sécuriser : ce n'est pas encore une pleine propriété.",
  },
  {
    terme: "Domaine national",
    definition:
      "Terres gérées par l'État/les communes. Le statut conditionne ce que tu peux réellement faire et transmettre.",
  },
];

/* ====== Programme Ouest Foire (issu de coupe-axo / plans architecte) ====== */
export const OUEST_FOIRE_NIVEAUX: { niveau: string; titre: string; detail: string }[] = [
  {
    niveau: "RDC",
    titre: "Agence, conciergerie & patio",
    detail: "L'agence YOoN, l'accueil de la diaspora et un patio végétalisé en cœur d'îlot.",
  },
  {
    niveau: "Étage 1",
    titre: "Suites premium (T1 bis)",
    detail: "Deux logements confortables et indépendants, pensés pour les courts séjours.",
  },
  {
    niveau: "Étage 2",
    titre: "Studios à rendement optimisé",
    detail: "Deux studios lumineux et fonctionnels, dimensionnés pour un locatif réaliste.",
  },
  {
    niveau: "Étage 3",
    titre: "Appartement familial signature (T3)",
    detail: "Grand séjour, cuisine ouverte, suite parentale : le logement « maison de famille ».",
  },
  {
    niveau: "Toiture",
    titre: "Toiture-terrasse & espace commun",
    detail: "Une terrasse partagée et un espace technique, ouverts sur le ciel de Dakar.",
  },
];

/* ====== Valeurs ====== */
export const VALEURS: { titre: string; texte: string }[] = [
  {
    titre: "Confiance",
    texte: "On dit la vérité, même quand elle ne t'arrange pas. C'est ça, la base.",
  },
  {
    titre: "Terrain",
    texte: "On ne parle que de ce qu'on a vu, touché, vérifié sur place.",
  },
  {
    titre: "Modernité africaine",
    texte: "Le premium sans ostentation : sobre, clair, sérieux. Une Afrique contemporaine.",
  },
];

/* ====== Hero — mini-réassurance ====== */
export const HERO_TRUST: { icon: IconName; label: string }[] = [
  { icon: "clipboard", label: "Méthode claire" },
  { icon: "network", label: "Réseau local" },
  { icon: "globe", label: "Suivi à distance" },
];

/* ====== Bloc situations (portes d'entrée par besoin) ====== */
export const SITUATIONS: {
  icon: IconName;
  titre: string;
  texte: string;
  cta: string;
}[] = [
  {
    icon: "globe",
    titre: "J'achète depuis l'étranger",
    texte:
      "Tu vis en France, en Belgique, au Canada… et tu veux acheter à Dakar sans y être. On devient tes yeux et tes mains sur place.",
    cta: "Cadrer mon achat",
  },
  {
    icon: "map",
    titre: "Je cherche un terrain fiable",
    texte:
      "Un terrain, c'est d'abord un statut foncier. On vérifie le titre, les limites et l'environnement avant que tu t'engages.",
    cta: "Vérifier un terrain",
  },
  {
    icon: "hammer",
    titre: "Je veux faire construire",
    texte:
      "Du plan à la livraison, on suit le chantier, on contrôle l'usage des fonds et on te rend des comptes à chaque étape.",
    cta: "Suivre mon chantier",
  },
  {
    icon: "family",
    titre: "Je sécurise un projet familial",
    texte:
      "Bien hérité, projet à plusieurs, maison pour les parents : on apporte méthode et neutralité pour avancer sereinement.",
    cta: "Sécuriser mon projet",
  },
];

/* ====== Bloc problème (risques, lucide sans être anxiogène) ====== */
export const RISQUES: { titre: string; texte: string }[] = [
  {
    titre: "Intermédiaires non fiables",
    texte: "Des « démarcheurs » qui promettent tout, encaissent un acompte… et disparaissent.",
  },
  {
    titre: "Documents non vérifiés",
    texte: "Un titre flou, un bail mal compris, une vente sans base légale solide.",
  },
  {
    titre: "Prix gonflés",
    texte: "Le « tarif diaspora » : un surcoût appliqué dès qu'on te sait à l'étranger.",
  },
  {
    titre: "Travaux mal suivis",
    texte: "Un chantier qui dérape, des fonds mal employés, des finitions bâclées.",
  },
  {
    titre: "Absence de reporting",
    texte: "Aucune preuve, aucune nouvelle. Tu paies à l'aveugle, sans savoir où ça en est.",
  },
];

/* ====== Bloc méthode YOoN — 6 étapes ====== */
export const METHODE_ETAPES: { icon: IconName; titre: string; texte: string }[] = [
  {
    icon: "ruler",
    titre: "Cadrage du projet",
    texte: "On clarifie ton objectif, un budget réaliste et tes contraintes depuis l'étranger.",
  },
  {
    icon: "papiers",
    titre: "Vérification des informations",
    texte: "Papiers, statut foncier, structure, environnement : on contrôle et on recoupe.",
  },
  {
    icon: "target",
    titre: "Sélection des opportunités",
    texte: "On ne te montre que ce qui tient debout — à titre indicatif, sous réserve de vérification.",
  },
  {
    icon: "handshake",
    titre: "Négociation & sécurisation",
    texte: "On t'aide à négocier juste et à sécuriser chaque étape avec les bons interlocuteurs.",
  },
  {
    icon: "pin",
    titre: "Suivi local",
    texte: "Visites, chantier, démarches : on est physiquement sur place, pour toi.",
  },
  {
    icon: "document",
    titre: "Reporting au client",
    texte: "Photos, vidéos datées, comptes-rendus clairs : tu sais toujours où ça en est.",
  },
];

/* ====== Bloc preuve / confiance ====== */
export const PROOF_POINTS: { icon: IconName; titre: string; texte: string }[] = [
  {
    icon: "globe",
    titre: "Accompagnement à distance",
    texte: "Où que tu sois, tu pilotes ton projet comme si tu étais sur place.",
  },
  {
    icon: "user",
    titre: "Interlocuteur unique",
    texte: "Une personne de confiance qui connaît ton dossier de A à Z.",
  },
  {
    icon: "network",
    titre: "Réseau local",
    texte: "Artisans, notaires, administrations : les bons contacts, déjà éprouvés.",
  },
  {
    icon: "document",
    titre: "Reporting clair",
    texte: "Des preuves datées et des comptes-rendus, pas des promesses.",
  },
  {
    icon: "eye",
    titre: "Approche transparente",
    texte: "On te dit la vérité, même quand elle ne t'arrange pas.",
  },
];

/* ====== FAQ (objections) ====== */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Je suis loin, comment savoir si ce que tu me dis est vrai ?",
    a: "Chaque constat est appuyé par des preuves : photos, vidéos datées, documents source. On ne te demande pas de nous croire sur parole — on te montre.",
  },
  {
    q: "Tu vends des biens, ou tu accompagnes ?",
    a: "On n'est pas un catalogue. Notre métier, c'est d'être tes yeux sur place : vérifier, documenter, conseiller. Quand on présente une opportunité, c'est à titre indicatif et sous réserve de vérification.",
  },
  {
    q: "Et si le bien que je vise n'est pas une bonne affaire ?",
    a: "On te le dira. Il nous est déjà arrivé de dire à un client « n'achète pas ». Notre intérêt, c'est ta confiance dans la durée, pas une transaction à tout prix.",
  },
  {
    q: "Tu garantis un rendement locatif ?",
    a: "Non, et personne de sérieux ne le devrait. On te donne des estimations réalistes, à titre indicatif, en distinguant bien chiffre d'affaires et revenu net.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Les tarifs dépendent de la prestation (analyse, vérification, suivi de chantier). On en parle clairement lors de l'appel découverte, sans engagement.",
  },
  {
    q: "Je débute, est-ce que c'est pour moi ?",
    a: "Oui. On explique sans jargon et sans te faire la leçon. L'appel découverte est gratuit, justement pour répondre à tes premières questions.",
  },
];
