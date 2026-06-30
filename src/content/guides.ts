/**
 * Guides diaspora — contenu SEO éditorial (vouvoiement, ton premium).
 * Conseils généraux à titre indicatif : aucun chiffre/tarif inventé, aucune promesse absolue.
 * Toujours « vérifier », « réduire les angles morts », « sécuriser les étapes ».
 */
export type GuideSection = {
  h2: string;
  /** Ancre pour le sommaire (auto-slug du h2 si absent). */
  id?: string;
  /**
   * Rendu spécial :
   * - checklist / mistakes : listes à coches (✓) ou croix (✗)
   * - essentiel : encadré « L'essentiel en 30 secondes » (bullets)
   * - note : encadré (disclaimer / avertissement / astuce) via `tone` + `paras`
   * - table : tableau responsive via `table`
   * - cta : encart d'appel à l'action via `cta`
   */
  kind?: "checklist" | "mistakes" | "essentiel" | "note" | "table" | "cta";
  /** Ton de l'encadré `note`. */
  tone?: "info" | "warn" | "tip";
  paras?: string[];
  bullets?: string[];
  /** Sous-sections H3 (titre + paragraphe). */
  sub?: { h3: string; body: string }[];
  /** Tableau (kind="table"). */
  table?: { headers: string[]; rows: string[][] };
  /** Encart CTA (kind="cta"). */
  cta?: { kind: "guide" | "diagnostic" | "whatsapp"; label: string; text: string };
  /** Illustration intégrée à la section (lazy). */
  image?: string;
  imageAlt?: string;
};

export type Guide = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  readingHint: string;
  /** Guide long premium → affiche le sommaire et un rythme éditorial enrichi. */
  longform?: boolean;
  /** Date de mise à jour (guides parlant de prix, quartiers, règles). */
  updated?: string;
  /** Dates ISO pour le schéma Article. */
  datePublished?: string;
  dateModified?: string;
  /** Image hero (WebP) — pilote aussi le LCP. */
  image?: string;
  /** Image de partage Open Graph (1200×630, JPG). */
  ogImage?: string;
  imageAlt?: string;
  intro: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  related: string[]; // slugs
};

/** Slug → id d'ancre lisible pour le sommaire. */
export function sectionId(s: GuideSection): string {
  return (
    s.id ||
    s.h2
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export const GUIDES: Guide[] = [
  {
    slug: "investir-au-senegal-depuis-la-france",
    h1: "Investir au Sénégal depuis la France : le guide de la diaspora",
    metaTitle: "Investir au Sénégal depuis la France — guide diaspora",
    metaDescription:
      "Comment investir dans l'immobilier au Sénégal quand on vit en France : étapes, statut foncier, vérifications et erreurs à éviter. Le guide YOoN pour la diaspora.",
    eyebrow: "Guide diaspora",
    readingHint: "8 min de lecture",
    intro: [
      "Investir au Sénégal depuis la France est tout à fait possible — à condition d'avancer avec méthode. La distance crée des angles morts : c'est précisément là que se concentrent les risques.",
      "Ce guide vous donne une trame claire : cadrer votre projet, comprendre le foncier, vérifier avant d'engager des fonds, et garder le contrôle à distance grâce à un reporting régulier.",
    ],
    sections: [
      {
        h2: "Clarifier votre projet avant tout",
        paras: [
          "Un bon investissement commence par un objectif net. Habiter plus tard, louer, préparer un retour, transmettre : chaque intention appelle un bien, un quartier et un budget différents.",
        ],
        bullets: [
          "Définissez l'usage visé : résidence, locatif, projet familial.",
          "Fixez un budget réaliste, frais et imprévus inclus.",
          "Identifiez vos contraintes de distance et de disponibilité.",
        ],
      },
      {
        h2: "Comprendre le statut foncier",
        paras: [
          "Au Sénégal, tout repose sur le statut du terrain. Le connaître, c'est savoir ce que vous achetez réellement — et ce que vous pourrez transmettre.",
        ],
        bullets: [
          "Titre foncier : le statut le plus protecteur, à confirmer en priorité.",
          "Bail emphytéotique : un droit d'usage long à comprendre dans ses conditions.",
          "Délibération : une étape vers le titre, à sécuriser.",
          "À vérifier systématiquement avec un notaire, à titre indicatif.",
        ],
      },
      {
        h2: "Vérifier avant d'engager des fonds",
        paras: [
          "La règle d'or à distance : aucune somme ne part avant vérification. Documents, structure du bien, environnement réel : chaque point doit être recoupé et documenté.",
        ],
        bullets: [
          "Cohérence entre le vendeur, les documents et le cadastre.",
          "État réel du bâti et travaux à anticiper.",
          "Preuves datées : photos, vidéos, comptes-rendus.",
        ],
      },
      {
        h2: "Garder le contrôle à distance",
        paras: [
          "Investir à distance ne veut pas dire investir à l'aveugle. Un interlocuteur unique sur place et un reporting régulier réduisent fortement les angles morts.",
        ],
      },
    ],
    faq: [
      {
        q: "Peut-on vraiment acheter au Sénégal sans se déplacer ?",
        a: "Oui, à condition de s'appuyer sur une présence locale de confiance qui visite, vérifie et documente. Un déplacement reste utile aux étapes clés, mais l'essentiel peut être sécurisé à distance.",
      },
      {
        q: "Quels documents demander en priorité ?",
        a: "Les pièces relatives au statut foncier et à la propriété, à faire lire et confirmer par un notaire. La liste exacte dépend du bien — c'est l'un des premiers points que nous vérifions.",
      },
      {
        q: "Comment éviter les intermédiaires non fiables ?",
        a: "En ne versant aucun fonds avant vérification, en exigeant des preuves datées et en passant par des interlocuteurs identifiés et responsables.",
      },
    ],
    related: ["eviter-arnaques-immobilieres-senegal", "verifier-un-bien-immobilier-au-senegal"],
  },
  {
    slug: "acheter-terrain-dakar-depuis-france",
    h1: "Acheter un terrain à Dakar depuis la France",
    metaTitle: "Acheter un terrain à Dakar depuis la France — guide diaspora",
    metaDescription:
      "Statut foncier, bornage, parcours d'achat à distance, checklist et erreurs fréquentes : le guide complet pour acheter un terrain à Dakar quand on vit en France. À titre indicatif.",
    eyebrow: "Guide foncier",
    readingHint: "10 min de lecture",
    longform: true,
    updated: "Juin 2026",
    intro: [
      "Acheter un terrain à Dakar quand on vit en France fait rêver beaucoup de membres de la diaspora : c'est souvent la première marche d'un projet de vie — une maison, un retour, un patrimoine à transmettre. Mais le terrain est aussi le terrain de jeu favori des litiges fonciers.",
      "La bonne nouvelle : la quasi-totalité des mauvaises surprises se joue AVANT la signature, sur des points qui se vérifient. Ce guide vous donne la trame complète, étape par étape, pour acheter à distance en réduisant les angles morts — sans remplacer l'avis d'un notaire ou des administrations compétentes.",
    ],
    sections: [
      {
        h2: "Pourquoi le terrain demande encore plus de vigilance",
        paras: [
          "Contrairement à un appartement, un terrain n'a ni murs à inspecter ni voisins à interroger : tout repose sur des documents et des limites. À distance, vous ne pouvez ni marcher dessus, ni constater une double vente, ni voir qu'un mur empiète. C'est exactement là que se logent les risques — et là qu'une présence locale fait la différence.",
        ],
      },
      {
        h2: "Le statut foncier : la première chose à vérifier",
        paras: [
          "Avant le prix, avant l'emplacement : le statut. Au Sénégal, il détermine ce que vous achetez réellement et ce que vous pourrez construire ou transmettre. Les principaux cas, à titre indicatif :",
        ],
        sub: [
          {
            h3: "Le titre foncier (TF)",
            body: "Le statut le plus protecteur : propriété définitive et inscrite. C'est ce qu'on cherche à confirmer en priorité, en vérifiant que le vendeur est bien le titulaire.",
          },
          {
            h3: "Le bail emphytéotique",
            body: "Un droit d'usage long sur un terrain de l'État. Utile, mais à comprendre dans sa durée, ses conditions et ce qu'il autorise vraiment.",
          },
          {
            h3: "La délibération",
            body: "Une attribution communale, étape vers le titre. Ce n'est pas encore une pleine propriété : les étapes restantes doivent être comprises et sécurisées.",
          },
          {
            h3: "Le domaine national",
            body: "Des terres gérées par l'État et les communes. Le statut conditionne fortement ce que vous pouvez faire — prudence et vérification s'imposent.",
          },
        ],
      },
      {
        h2: "Vérifier les limites et la réalité du terrain",
        paras: [
          "Un terrain se résume rarement à une annonce. Avant d'engager des fonds, ces points se contrôlent sur place et sur documents :",
        ],
        bullets: [
          "Bornage et superficie réelle, cohérents avec les documents officiels.",
          "Cohérence entre le vendeur, les pièces et le cadastre (pas de double vente).",
          "Accès et viabilisation : eau, électricité, assainissement, voirie.",
          "Risques : zone inondable, servitudes, litige connu, projet d'urbanisme.",
          "Environnement réel : voisinage, nuisances, dynamique du quartier.",
        ],
      },
      {
        h2: "Acheter depuis la France : le parcours étape par étape",
        paras: [
          "Exemple concret : un client repère un terrain à la périphérie de Dakar via une connaissance. Plutôt que de verser un acompte « pour réserver », on procède dans l'ordre : visite et reportage daté, lecture des documents, vérification administrative, puis seulement, si tout est cohérent, la signature chez le notaire. Résultat : pas de précipitation, pas de fonds engagés à l'aveugle.",
        ],
        bullets: [
          "Cadrer le projet et un budget réaliste (frais et imprévus inclus).",
          "Faire visiter et documenter le terrain (photos, vidéos datées).",
          "Réunir et faire lire les documents par un notaire.",
          "Vérifier le statut et les limites auprès des services compétents.",
          "Sécuriser la transaction et la signature — jamais d'espèces à un inconnu.",
        ],
      },
      {
        h2: "Checklist avant de vous engager",
        kind: "checklist",
        bullets: [
          "Le statut foncier est identifié et confirmé par un notaire.",
          "Le vendeur est bien le titulaire (pièces cohérentes).",
          "Le bornage et la superficie correspondent aux documents.",
          "Aucun litige ni double vente connus.",
          "Les accès et la viabilisation sont vérifiés.",
          "Aucun fonds versé avant ces vérifications.",
        ],
      },
      {
        h2: "Les erreurs fréquentes",
        kind: "mistakes",
        bullets: [
          "Verser un « acompte de réservation » avant toute vérification.",
          "Se fier à une photocopie de document sans contrôle administratif.",
          "Acheter sur la seule parole d'un intermédiaire non identifié.",
          "Négliger le bornage et découvrir un empiètement après coup.",
          "Confondre délibération et titre foncier.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment savoir si un terrain a un vrai titre foncier ?",
        a: "Le statut se vérifie via les documents officiels et un contrôle administratif, à confirmer avec un notaire. C'est l'un des premiers points que nous vérifions sur place avant toute décision.",
      },
      {
        q: "Faut-il un bornage avant d'acheter ?",
        a: "Connaître les limites réelles est essentiel pour éviter les litiges. Un bornage à jour et cohérent avec les documents est un bon signal ; en cas de doute, un géomètre peut intervenir.",
      },
      {
        q: "Peut-on acheter un terrain à Dakar sans se déplacer ?",
        a: "Oui, à condition de s'appuyer sur une présence locale qui visite, vérifie et documente, et de ne signer qu'après les contrôles, chez un notaire. À titre indicatif, sous réserve de vérification.",
      },
      {
        q: "Un terrain en délibération est-il sûr ?",
        a: "Ce n'est pas encore une pleine propriété : il faut comprendre les conditions et les étapes restantes avant de s'engager. Faites-vous accompagner.",
      },
    ],
    related: ["titre-foncier-senegal", "eviter-arnaques-immobilieres-senegal"],
  },
  {
    slug: "verifier-un-bien-immobilier-au-senegal",
    h1: "Vérifier un bien immobilier au Sénégal avant d'acheter",
    metaTitle: "Vérifier un bien immobilier au Sénégal avant d'acheter",
    metaDescription:
      "Les 3 contrôles à mener dans l'ordre — papiers, terrain, environnement — pour vérifier un bien au Sénégal avant de signer, quand on achète depuis l'étranger.",
    eyebrow: "Méthode & vérification",
    readingHint: "4 min de lecture",
    longform: true,
    updated: "Juin 2026",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    image: "/img/verification-documents.webp",
    ogImage: "/img/og/verifier-bien.jpg",
    imageAlt: "Examen à la loupe des documents d'un bien",
    intro: [
      "Vérifier un bien, ce n'est pas se rassurer : c'est recouper des faits. Quand on achète depuis l'étranger, trois contrôles menés dans le bon ordre permettent d'écarter l'essentiel des risques — avant de signer, et avant de payer.",
    ],
    sections: [
      {
        h2: "L'essentiel en 30 secondes",
        kind: "essentiel",
        bullets: [
          "Vérifier, c'est recouper des faits indépendants du vendeur — pas se contenter de ce qu'on vous montre.",
          "Trois contrôles, dans cet ordre : les papiers, puis le bien et le terrain, puis l'environnement.",
          "Ce qui relève du notaire reste au notaire : la vérification prépare la décision, elle ne remplace pas l'acte.",
        ],
      },
      {
        h2: "Pourquoi vérifier change tout",
        paras: [
          "À distance, le danger n'est presque jamais le bien lui-même : c'est ce que vous ne pouvez pas voir. Une annonce soignée, des photos avantageuses et un vendeur convaincant ne disent rien du statut réel du terrain, de l'état véritable de la construction, ni de ce qui se passe autour. Vérifier, c'est transformer ces zones d'ombre en informations claires.",
          "L'erreur classique consiste à vérifier dans le désordre — tomber amoureux d'un bien, négocier le prix, puis découvrir trop tard un problème de papiers. La bonne méthode fait l'inverse : on commence par ce qui peut tout arrêter (le statut), et on ne dépense de l'énergie sur le reste que si la base est saine.",
        ],
      },
      {
        h2: "Précision importante",
        kind: "note",
        tone: "info",
        paras: [
          "Ce guide est d'ordre général et fourni à titre indicatif. Il ne remplace pas l'avis d'un notaire ou d'un avocat, seuls habilités à confirmer le statut d'un bien et à sécuriser une transaction.",
        ],
      },
      {
        h2: "Contrôle n°1 — Les papiers (le statut foncier d'abord)",
        paras: [
          "C'est le contrôle qui prime sur tous les autres, parce qu'il détermine ce que vous achetez vraiment. Avant le prix, avant l'emplacement : le statut.",
        ],
        bullets: [
          "Identifier le statut exact : titre foncier, bail, délibération ou domaine national — chacun n'offre pas la même sécurité.",
          "Contrôler les documents auprès des services compétents (conservation foncière, cadastre) et les recouper avec la réalité du terrain. Une photo de document ne prouve rien.",
          "Vérifier la chaîne de propriété : s'assurer que le vendeur est bien le propriétaire en titre (ou dûment mandaté), sans charge ni litige connu.",
        ],
      },
      {
        h2: "Contrôle n°2 — Le bien et le terrain (la réalité physique)",
        image: "/img/verification-terrain.webp",
        imageAlt: "Vérification d'un terrain et de ses limites à Dakar",
        paras: [
          "Une fois les papiers sains, on confronte le bien à sa réalité — celle qu'on ne voit pas sur des photos.",
        ],
        bullets: [
          "Le terrain : bornage et superficie réelle cohérents avec les documents, limites claires, absence d'empiètement.",
          "La viabilisation : accès, eau, électricité, assainissement — ce qui existe vraiment, et ce qui reste à faire.",
          "La construction : état de la structure, qualité d'exécution, signes de désordre. Un reportage photo et vidéo daté vaut mille promesses.",
          "Les risques physiques : zone inondable, servitudes, voirie ou projet à venir.",
        ],
      },
      {
        h2: "Contrôle n°3 — L'environnement (ce qui fait la valeur dans le temps)",
        paras: [
          "Un bien ne se résume pas à ses murs et à ses bornes. Son environnement conditionne sa valeur, son usage et votre tranquillité future.",
        ],
        bullets: [
          "Le voisinage et le quartier : usage dominant, nuisances, dynamique du secteur.",
          "Les projets alentour : constructions, voirie, équipements à venir — en bien comme en mal.",
          "La cohérence avec votre projet : un bon bien pour habiter n'est pas forcément un bon bien pour du locatif.",
        ],
      },
      {
        h2: "La checklist « avant de signer »",
        kind: "checklist",
        bullets: [
          "Le statut foncier est identifié, contrôlé et confirmé par un notaire.",
          "Le vendeur est bien le propriétaire (ou dûment mandaté), sans litige connu.",
          "Le terrain est borné, sa superficie et ses limites cohérentes avec les documents.",
          "La viabilisation et l'état du bien ont été constatés sur place (preuves datées).",
          "L'environnement et les projets alentour ont été vérifiés.",
          "Aucun versement n'a eu lieu hors d'un cadre notarié.",
        ],
      },
      {
        h2: "Recevoir le guide diaspora",
        kind: "cta",
        cta: {
          kind: "guide",
          label: "Recevoir le guide →",
          text: "« Investir au Sénégal sans vous faire avoir » : les documents à exiger, le statut foncier expliqué et votre checklist avant de signer. Clair, sans jargon, désinscription en un clic.",
        },
      },
      {
        h2: "Ce qui relève du notaire (et ce que nous faisons)",
        paras: [
          "Vérifier n'est pas signer. Notre rôle s'arrête là où commence celui du notaire — et c'est très bien ainsi.",
        ],
        bullets: [
          "Ce que nous faisons : lecture et recoupement des documents, contrôle de cohérence administrative, visite et reportage daté, vérification de l'environnement, et signalement de ce qui doit impérativement passer par un notaire.",
          "Ce qui revient au notaire (et à lui seul) : la confirmation officielle du statut, la sécurisation juridique de la vente et la rédaction de l'acte.",
        ],
      },
    ],
    faq: [
      {
        q: "Dans quel ordre faut-il vérifier un bien ?",
        a: "Toujours les papiers d'abord (le statut foncier), puis la réalité physique du bien et du terrain, et enfin l'environnement. On commence par ce qui peut tout arrêter, pour ne pas dépenser d'énergie sur un dossier qui ne tient pas.",
      },
      {
        q: "La vérification remplace-t-elle le notaire ?",
        a: "Non. La vérification prépare la décision en recoupant les faits ; le notaire confirme le statut et sécurise la transaction. Les deux sont complémentaires.",
      },
      {
        q: "Peut-on vérifier un bien sans se déplacer au Sénégal ?",
        a: "Oui, avec quelqu'un de fiable sur place : les documents se contrôlent et la visite se fait par un tiers indépendant du vendeur, avec des preuves datées (photos, vidéos).",
      },
      {
        q: "Combien de temps prend une première vérification ?",
        a: "Une première lecture peut se faire souvent sous 48 h ; les contrôles approfondis (terrain, administration) dépendent de la situation du bien.",
      },
    ],
    related: [
      "titre-foncier-senegal",
      "eviter-arnaques-immobilieres-senegal",
      "acheter-terrain-dakar-depuis-france",
    ],
  },
  {
    slug: "eviter-arnaques-immobilieres-senegal",
    h1: "Éviter les arnaques immobilières au Sénégal : 7 pièges fréquents",
    metaTitle: "Arnaques immobilières au Sénégal : 7 pièges à éviter",
    metaDescription:
      "Démarcheurs fantômes, faux titres, prix gonflés « tarif diaspora »… Les 7 arnaques immobilières fréquentes au Sénégal et comment les désamorcer avant de payer.",
    eyebrow: "Pièges à éviter",
    readingHint: "8 min de lecture",
    longform: true,
    updated: "Juin 2026",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    image: "/img/reperage-immeuble-dakar.webp",
    ogImage: "/img/og/eviter-arnaques.jpg",
    imageAlt: "Repérage d'un immeuble neuf dans une rue de Dakar",
    intro: [
      "La plupart des mauvaises expériences ne viennent pas du bien lui-même, mais de ce qu'on n'a pas vérifié à temps. Voici les sept pièges les plus fréquents quand on achète depuis l'étranger — et, pour chacun, comment le désamorcer avant de payer.",
    ],
    sections: [
      {
        h2: "L'essentiel en 30 secondes",
        kind: "essentiel",
        bullets: [
          "Le risque ne vient presque jamais du bien : il vient de la distance et du manque de vérification.",
          "Sept pièges reviennent sans cesse : démarcheur fantôme, faux document, faux propriétaire, délibération vendue comme une propriété, « tarif diaspora », acompte hors cadre, procuration trop large.",
          "La parade tient en trois mots : vérifier, recouper, formaliser. On ne paie jamais sur une promesse, toujours sur des faits confirmés et un cadre notarié.",
        ],
      },
      {
        h2: "Pourquoi la distance crée le risque",
        paras: [
          "Quand on vit en France, en Belgique, en Italie, au Canada ou aux États-Unis, on ne peut ni se rendre sur place du jour au lendemain, ni croiser les bonnes personnes, ni sentir ce qui cloche. On avance sur la base de photos, de messages WhatsApp et de la parole d'un intermédiaire. C'est précisément dans cet écart — entre ce qu'on vous montre et ce qui est réellement vrai — que se logent les arnaques.",
          "La bonne nouvelle, c'est que ces fraudes ne sont pas mystérieuses : elles suivent presque toujours les mêmes scénarios. Les connaître, c'est déjà reprendre la main. Aucun de ces pièges ne résiste à une vérification sérieuse, faite dans le bon ordre, avant le moindre versement.",
        ],
      },
      {
        h2: "Précision importante",
        kind: "note",
        tone: "info",
        paras: [
          "Ce guide est d'ordre général et fourni à titre indicatif. Il ne remplace pas l'avis d'un notaire ou d'un avocat, seuls habilités à confirmer le statut d'un bien et à sécuriser une transaction.",
        ],
      },
      {
        h2: "Les 7 pièges les plus fréquents",
        sub: [
          {
            h3: "Piège n°1 — Le démarcheur fantôme",
            body: "Signal d'alerte : un intermédiaire très réactif, joignable uniquement par WhatsApp, qui presse pour un acompte « afin de bloquer le bien » mais reste flou sur son identité et son rôle, puis devient injoignable. La parade : exigez une identité vérifiable et un interlocuteur traçable, ne versez jamais d'argent pour « réserver » à quelqu'un que vous ne pouvez pas identifier, et passez par un cadre écrit.",
          },
          {
            h3: "Piège n°2 — Le faux document (titre ou bail falsifié)",
            body: "Signal d'alerte : on vous envoie la photo d'un « titre foncier » qui semble en règle, mais modifié, périmé ou sans lien avec le terrain présenté. La parade : un document ne se croit pas, il se contrôle auprès des services compétents (conservation foncière, cadastre) et se fait confirmer par un notaire. Ne vous fiez jamais à une simple photo.",
          },
          {
            h3: "Piège n°3 — Le vendeur qui n'est pas le propriétaire (double vente)",
            body: "Signal d'alerte : le vendeur n'est pas le vrai propriétaire, ou le même terrain a déjà été « vendu » à plusieurs acheteurs (fréquent en périphérie). La parade : remontez la chaîne de propriété, vérifiez l'absence de litige et que le signataire est bien le propriétaire en titre (ou dûment mandaté). Un historique flou est un signal d'arrêt.",
          },
          {
            h3: "Piège n°4 — La délibération vendue comme une pleine propriété",
            body: "Signal d'alerte : on présente une « délibération » communale comme un titre définitif, alors que ce n'est qu'une étape conditionnelle et révocable. La parade : identifiez précisément le statut (titre foncier, bail, délibération, domaine national), demandez ce qui manque pour aboutir à un titre, et faites confirmer par un notaire.",
          },
          {
            h3: "Piège n°5 — Le « tarif diaspora »",
            body: "Signal d'alerte : dès qu'on vous sait à l'étranger, le prix grimpe. La parade : appuyez-vous sur des repères de prix indépendants du vendeur, par quartier et type de bien, et faites porter la négociation par quelqu'un qui connaît le marché local. Un écart inexpliqué se questionne, ne s'accepte jamais par défaut.",
          },
          {
            h3: "Piège n°6 — L'acompte versé hors de tout cadre",
            body: "Signal d'alerte : on vous demande de virer un acompte sur un compte personnel, avant tout acte, sans notaire ni garantie de restitution. La parade : aucun versement hors d'un cadre formalisé. Une transaction sérieuse passe par un acte et un notaire ; les sommes transitent dans un cadre sécurisé. Si on vous presse, ralentissez.",
          },
          {
            h3: "Piège n°7 — La procuration trop large",
            body: "Signal d'alerte : une procuration rédigée trop généralement, qui autorise à acheter, vendre ou signer en votre nom sans contrôle. La parade : une procuration précise, limitée à des actes définis, établie dans un cadre juridique propre. Préférez un mandat encadré à une délégation en blanc.",
          },
        ],
      },
      {
        h2: "Récapitulatif : reconnaître et désamorcer",
        kind: "table",
        table: {
          headers: ["Le piège", "Le signal d'alerte", "La parade en une phrase"],
          rows: [
            ["Démarcheur fantôme", "Intermédiaire non identifiable, qui presse pour un acompte", "Identité vérifiable + interlocuteur traçable"],
            ["Faux document", "Un titre « prouvé » par une simple photo", "Contrôle officiel + confirmation notaire"],
            ["Faux propriétaire / double vente", "Chaîne de propriété floue, terrain disputé", "Remonter la propriété, vérifier l'absence de litige"],
            ["Délibération = propriété", "Une attribution présentée comme un titre", "Identifier le statut exact et ce qui manque"],
            ["Tarif diaspora", "Prix qui grimpe parce que vous êtes à l'étranger", "Repères de prix indépendants du vendeur"],
            ["Acompte hors cadre", "Virement sur un compte perso, sans acte", "Aucun paiement hors cadre notarié"],
            ["Procuration trop large", "Mandat général donné sans limites", "Procuration précise et encadrée"],
          ],
        },
      },
      {
        h2: "Recevoir le guide diaspora",
        kind: "cta",
        cta: {
          kind: "guide",
          label: "Recevoir le guide →",
          text: "« Investir au Sénégal sans vous faire avoir » : les documents à exiger, le statut foncier expliqué et votre checklist avant de signer. Clair, sans jargon, désinscription en un clic.",
        },
      },
      {
        h2: "La méthode : vérifier, recouper, formaliser",
        paras: [
          "Tous ces pièges tombent devant la même discipline, appliquée dans l'ordre. Avant d'acheter, trois réflexes suffisent à écarter l'essentiel du risque.",
        ],
        bullets: [
          "Vérifier le statut avant le prix : on commence toujours par ce que vous achetez vraiment, le statut foncier.",
          "Recouper les faits sur place : un document, une identité, une limite de terrain ne se croient pas à distance — ils se confirment, par des sources indépendantes du vendeur, avec des preuves datées.",
          "Formaliser chaque étape : aucun versement sans cadre, on passe par un notaire, on garde une trace écrite, on ne cède jamais à la pression du « c'est maintenant ou jamais ».",
        ],
      },
      {
        h2: "Le bon réflexe face à l'urgence",
        kind: "note",
        tone: "warn",
        paras: [
          "La pression au temps (« il y a un autre acheteur », « il faut bloquer aujourd'hui ») est l'outil n°1 de l'arnaque. Un vendeur sérieux comprend qu'on vérifie avant de payer. Si l'on vous interdit de vérifier, vous avez déjà votre réponse.",
        ],
      },
      {
        h2: "Un bien ou un projet précis en tête ?",
        kind: "cta",
        cta: {
          kind: "diagnostic",
          label: "Faire le diagnostic gratuit →",
          text: "En 2 minutes, on vous dit où vous en êtes et ce qu'il faut sécuriser en priorité — réponse honnête, sans engagement.",
        },
      },
    ],
    faq: [
      {
        q: "Comment reconnaître un démarcheur non fiable ?",
        a: "Il reste flou sur son identité et son rôle, communique uniquement par messagerie, et met la pression pour obtenir un acompte rapidement. Un interlocuteur sérieux accepte d'être identifié, de répondre à vos questions et de vous laisser vérifier avant tout versement.",
      },
      {
        q: "Qu'est-ce que le « tarif diaspora » et comment l'éviter ?",
        a: "C'est un surcoût appliqué dès qu'on vous sait à l'étranger, en supposant que vous ne connaissez pas les prix réels. On l'évite en s'appuyant sur des repères de prix indépendants du vendeur et en faisant porter la négociation par quelqu'un qui connaît le marché local.",
      },
      {
        q: "Comment savoir si un titre foncier est authentique ?",
        a: "Le statut se vérifie via les documents officiels et un contrôle administratif auprès des services compétents, puis se fait confirmer par un notaire. Une photo de document ne constitue jamais une preuve suffisante.",
      },
      {
        q: "J'ai déjà versé un acompte et j'ai un doute : que faire ?",
        a: "Arrêtez tout nouveau versement, rassemblez l'ensemble des échanges et des documents, et faites le point avec un professionnel (notaire ou avocat) avant d'aller plus loin. Mieux vaut suspendre une opération que de financer un dossier qui ne tient pas.",
      },
    ],
    related: [
      "titre-foncier-senegal",
      "verifier-un-bien-immobilier-au-senegal",
      "acheter-terrain-dakar-depuis-france",
    ],
  },
  {
    slug: "titre-foncier-senegal",
    h1: "Titre foncier au Sénégal : tout comprendre avant d'acheter",
    metaTitle: "Titre foncier au Sénégal : TF, bail, délibération",
    metaDescription:
      "Titre foncier, bail, délibération, domaine national : comprenez chaque statut foncier sénégalais et ce qu'il faut vérifier avant d'acheter.",
    eyebrow: "Guide foncier",
    readingHint: "6 min de lecture",
    longform: true,
    updated: "Juin 2026",
    datePublished: "2026-06-28",
    dateModified: "2026-06-28",
    image: "/img/etude-zones-cadastre.webp",
    ogImage: "/img/og/titre-foncier.jpg",
    imageAlt: "Étude des quartiers et du cadastre de Dakar",
    intro: [
      "Au Sénégal, tout commence par le statut du terrain. Avant le prix, avant l'emplacement, c'est lui qui détermine ce que vous achetez vraiment — et ce que vous pourrez transmettre. Voici les quatre statuts à connaître, expliqués simplement.",
    ],
    sections: [
      {
        h2: "L'essentiel en 30 secondes",
        kind: "essentiel",
        bullets: [
          "Le titre foncier (TF) est le statut le plus protecteur : une propriété définitive, inscrite et difficile à remettre en cause.",
          "Le bail, la délibération et le domaine national n'offrent pas la même sécurité : ce sont des droits d'usage ou des étapes, pas une pleine propriété.",
          "La règle d'or : on identifie le statut exact avant de parler prix, et on le fait toujours confirmer par un notaire.",
        ],
      },
      {
        h2: "Pourquoi le statut prime sur le prix",
        paras: [
          "Quand on achète à distance, le réflexe naturel est de regarder d'abord le prix et les photos. C'est l'inverse qu'il faut faire. Deux terrains voisins, au même prix, peuvent avoir une valeur radicalement différente selon leur statut : l'un est une propriété pleine et entière, l'autre un simple droit d'occuper, révocable.",
          "Le statut conditionne trois choses essentielles : ce que vous pouvez faire du terrain (construire, louer, revendre), la solidité de vos droits face à un tiers qui les contesterait, et ce que vous pourrez transmettre à vos enfants. Se tromper de statut, c'est parfois découvrir, des années plus tard, qu'on n'a jamais vraiment été propriétaire.",
        ],
      },
      {
        h2: "Précision importante",
        kind: "note",
        tone: "info",
        paras: [
          "Ce guide est d'ordre général et fourni à titre indicatif. Le droit foncier sénégalais est technique et évolue ; seul un notaire (ou un avocat) peut confirmer le statut réel d'un bien et sécuriser une transaction.",
        ],
      },
      {
        h2: "Le titre foncier (TF) — la propriété définitive",
        paras: [
          "Le titre foncier est le statut le plus sûr. Il correspond à une immatriculation du terrain : le bien est identifié, borné et inscrit sur un registre officiel (le livre foncier) tenu par l'administration. Une fois établi, le titre foncier est considéré comme définitif et très difficile à contester.",
          "Pour un acheteur de la diaspora, c'est le statut que l'on cherche à confirmer en priorité. Attention toutefois : l'existence d'un TF ne suffit pas — encore faut-il vérifier qu'il correspond bien au terrain présenté, qu'il est au nom du vendeur, et qu'il n'est pas grevé d'une charge (hypothèque, litige).",
        ],
        bullets: [
          "Ce qu'il permet : propriété pleine, transmissible, opposable aux tiers.",
          "Le point de vigilance : vérifier que le TF correspond au terrain, est au nom du vendeur et libre de charges.",
        ],
      },
      {
        h2: "Le bail emphytéotique — un droit d'usage long",
        paras: [
          "Le bail emphytéotique confère des droits étendus sur le terrain — un droit réel, transmissible, qui permet de construire, d'aménager et de céder son bail pendant la durée convenue — sans pour autant constituer une pleine propriété. Il porte souvent sur un terrain issu du domaine de l'État, pour une durée déterminée et soumise à conditions.",
          "Le bail peut être une base solide, à condition d'en comprendre les termes : durée restante, conditions de renouvellement, obligations du preneur, et ce qu'il advient à l'échéance.",
        ],
        bullets: [
          "Ce qu'il permet : usage, construction et cession du bail pendant une longue durée (les durées varient, à vérifier sur l'acte).",
          "Le point de vigilance : durée restante, conditions, et ce qui se passe à l'échéance.",
        ],
      },
      {
        h2: "La délibération — une étape, pas une propriété",
        paras: [
          "La délibération est une attribution faite par une commune : le conseil municipal autorise une personne à occuper et à mettre en valeur une parcelle. C'est une étape administrative utile, mais c'est là que se joue l'un des malentendus les plus coûteux : une délibération n'est pas un titre de propriété. Elle est conditionnelle, parfois encadrée dans le temps, et reste fragile tant qu'elle n'a pas été sécurisée.",
          "Beaucoup de terrains se vendent « sur délibération ». La vraie question n'est pas « y a-t-il une délibération ? » mais « que manque-t-il, et à quelles conditions, pour aboutir à un titre ? ».",
        ],
      },
      {
        h2: "Le malentendu à éviter",
        kind: "note",
        tone: "warn",
        paras: [
          "Une délibération présentée comme « un titre » est l'un des pièges les plus fréquents. Tant que la situation n'est pas clarifiée et confirmée par un notaire, considérez que vous n'avez pas une pleine propriété.",
        ],
      },
      {
        h2: "Le domaine national — comprendre ce que vous pouvez en faire",
        paras: [
          "Une grande partie des terres au Sénégal relève du domaine national : des terres gérées par l'État et les communes, qui ne sont pas, par défaut, une propriété privée immatriculée. On n'« achète » pas une terre du domaine national comme un appartement : on se voit reconnaître un droit d'usage, selon des règles précises.",
          "Pour un projet d'investissement, l'enjeu est de comprendre le chemin : dans quelles conditions un droit peut être sécurisé, et éventuellement faire l'objet d'un bail ou d'une immatriculation. C'est un terrain où l'accompagnement et la vérification comptent particulièrement.",
        ],
      },
      {
        h2: "Comparatif des quatre statuts",
        kind: "table",
        table: {
          headers: ["Statut", "Nature", "Sécurité", "À vérifier en priorité"],
          rows: [
            ["Titre foncier (TF)", "Propriété définitive immatriculée", "La plus élevée", "Correspondance terrain, nom du vendeur, charges"],
            ["Bail emphytéotique", "Droit d'usage long (durée déterminée)", "Élevée, mais limitée dans le temps", "Durée restante, conditions, échéance"],
            ["Délibération", "Attribution communale (étape)", "Partielle / à sécuriser", "Ce qui manque pour aboutir à un titre"],
            ["Domaine national", "Droit d'usage encadré par l'État/commune", "Variable, conditionnelle", "Chemin de sécurisation possible"],
          ],
        },
      },
      {
        h2: "Échelle de sécurité",
        kind: "note",
        tone: "tip",
        paras: [
          "Du plus sûr au plus fragile : Titre foncier → Bail emphytéotique → Délibération → Droit sur le domaine national. Plus on descend, plus la vérification et l'accompagnement deviennent indispensables avant de s'engager.",
        ],
      },
      {
        h2: "Recevoir le guide diaspora",
        kind: "cta",
        cta: {
          kind: "guide",
          label: "Recevoir le guide →",
          text: "« Investir au Sénégal sans vous faire avoir » : les documents à exiger, le statut foncier expliqué et votre checklist avant de signer. Clair, sans jargon, désinscription en un clic.",
        },
      },
      {
        h2: "Comment vérifier le statut réel d'un terrain",
        paras: [
          "Connaître les quatre statuts, c'est la théorie. En pratique, voici comment savoir, pour un terrain donné, ce que vous achetez vraiment — avant le moindre versement.",
        ],
        bullets: [
          "Identifier le statut annoncé et le document associé : on ne se contente pas du mot, on demande le document.",
          "Contrôler le document auprès des services compétents (conservation foncière, cadastre) et le recouper avec la réalité du terrain. Une photo ne prouve rien.",
          "Vérifier la chaîne de propriété et l'absence de litige : le vendeur est-il bien le propriétaire en titre (ou dûment mandaté) ?",
          "Confirmer le tout avec un notaire, seul habilité à confirmer le statut et à sécuriser la transaction.",
        ],
      },
      {
        h2: "Le rôle de YOoN",
        kind: "note",
        tone: "tip",
        paras: [
          "Nous vérifions ces points sur place, avant toute décision : lecture des documents, contrôle de cohérence administrative, visite et reportage daté du terrain, et signalement de ce qui doit impérativement passer par un notaire. On ne remplace pas le notaire — on prépare et on recoupe pour que vous décidiez en connaissance de cause.",
        ],
      },
      {
        h2: "Un terrain précis en tête ?",
        kind: "cta",
        cta: {
          kind: "diagnostic",
          label: "Faire le diagnostic gratuit →",
          text: "Faites vérifier le statut de votre terrain avant de vous engager. On contrôle les documents, on recoupe sur place et on vous dit franchement ce qu'il en est.",
        },
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre un titre foncier et un bail ?",
        a: "Le titre foncier est une propriété définitive et inscrite : c'est le statut le plus sûr. Le bail emphytéotique est un droit d'usage de longue durée, étendu mais limité dans le temps et soumis à conditions. On est propriétaire avec un TF ; on est titulaire d'un droit avec un bail.",
      },
      {
        q: "Un terrain en délibération est-il sûr ?",
        a: "Pas encore : une délibération est une étape, une attribution communale conditionnelle, pas une pleine propriété. La bonne question est de savoir ce qui manque, et à quelles conditions, pour aboutir à un titre.",
      },
      {
        q: "Comment passer d'une délibération à un titre foncier ?",
        a: "Le chemin dépend de la situation du terrain et des règles applicables ; il peut impliquer un bail puis une immatriculation. C'est le genre de parcours qu'il faut faire cadrer par un notaire, car les conditions varient d'un cas à l'autre.",
      },
      {
        q: "Qui confirme officiellement le statut d'un terrain ?",
        a: "L'administration (conservation foncière, cadastre) pour les vérifications, et le notaire pour la confirmation et la sécurisation de la transaction. Ni un démarcheur, ni un vendeur, ni une simple photo ne peuvent en tenir lieu.",
      },
    ],
    related: [
      "eviter-arnaques-immobilieres-senegal",
      "verifier-un-bien-immobilier-au-senegal",
      "acheter-terrain-dakar-depuis-france",
    ],
  },
  {
    slug: "construire-maison-senegal-depuis-etranger",
    h1: "Faire construire sa maison au Sénégal depuis l'étranger",
    metaTitle: "Faire construire au Sénégal depuis l'étranger — guide",
    metaDescription:
      "Suivre un chantier au Sénégal quand on vit à l'étranger : étapes, contrôle des fonds, reporting et points de vigilance. Guide diaspora YOoN.",
    eyebrow: "Construction",
    readingHint: "8 min de lecture",
    intro: [
      "Faire construire à distance est l'un des projets les plus gratifiants… et les plus exposés. Le suivi régulier et le contrôle des fonds y font toute la différence.",
    ],
    sections: [
      {
        h2: "Préparer le projet",
        bullets: [
          "Sécuriser le terrain et son statut foncier en amont.",
          "Cadrer le programme, le budget et un calendrier réaliste.",
          "Choisir des intervenants identifiés et responsables.",
        ],
      },
      {
        h2: "Suivre le chantier à distance",
        bullets: [
          "Points d'avancement réguliers, photos et vidéos datées.",
          "Contrôle de l'usage des fonds, étape par étape.",
          "Vérification de la qualité d'exécution et des finitions.",
        ],
      },
      {
        h2: "Anticiper les coûts cachés",
        paras: [
          "Les travaux invisibles (réseaux, fondations, étanchéité) pèsent souvent plus que prévu. Les anticiper évite les arbitrages dans l'urgence.",
        ],
      },
    ],
    faq: [
      {
        q: "Comment éviter qu'un chantier dérape ?",
        a: "Avec un cadrage clair, un calendrier suivi, un contrôle des fonds par étape et un reporting régulier appuyé sur des preuves datées.",
      },
      {
        q: "Peut-on contrôler l'usage des fonds à distance ?",
        a: "Oui : en liant chaque versement à une étape vérifiée et documentée, plutôt qu'à une simple demande.",
      },
    ],
    related: ["acheter-terrain-dakar-depuis-france", "immobilier-dakar-diaspora"],
  },
  {
    slug: "immobilier-dakar-diaspora",
    h1: "Immobilier à Dakar pour la diaspora : par où commencer",
    metaTitle: "Immobilier à Dakar pour la diaspora — par où commencer",
    metaDescription:
      "Quartiers, types de projets et premières étapes pour investir dans l'immobilier à Dakar quand on fait partie de la diaspora. Guide YOoN.",
    eyebrow: "Premiers pas",
    readingHint: "6 min de lecture",
    intro: [
      "Dakar se transforme, et les opportunités existent — mais elles se choisissent. Voici comment poser les bonnes bases avant de vous engager.",
    ],
    sections: [
      {
        h2: "Choisir un quartier qui colle à votre projet",
        paras: [
          "Du calme résidentiel des Almadies au dynamisme d'Ouest Foire, chaque secteur a sa logique. Le bon quartier dépend de votre usage et de votre horizon.",
        ],
        bullets: ["Ouest Foire, Almadies, Ngor, Mermoz, Yoff, Sacré-Cœur, Plateau, périphérie."],
      },
      {
        h2: "Définir le bon type de projet",
        bullets: [
          "Résidence pour habiter ou préparer un retour.",
          "Locatif : distinguer chiffre d'affaires et revenu net réaliste.",
          "Projet familial : méthode et neutralité avant tout.",
        ],
      },
      {
        h2: "Les premières étapes",
        paras: [
          "Cadrer le projet, vérifier les informations, puis avancer étape par étape. Un diagnostic rapide permet de savoir où vous en êtes et quoi sécuriser en priorité.",
        ],
      },
    ],
    faq: [
      {
        q: "Quel budget prévoir pour investir à Dakar ?",
        a: "Cela dépend du quartier, du type de bien et de l'état. Nous raisonnons toujours en fourchettes indicatives, frais et imprévus inclus, avant d'affiner.",
      },
      {
        q: "Le locatif est-il rentable à Dakar ?",
        a: "La demande existe, mais le rendement réel se calcule net de charges, de vacance et de gestion. Nous présentons des estimations prudentes, à titre indicatif.",
      },
    ],
    related: ["investir-au-senegal-depuis-la-france", "construire-maison-senegal-depuis-etranger"],
  },
];

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
