import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading, Card, Stamp } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/sections";
import { OUEST_FOIRE_NIVEAUX } from "@/content";

export const metadata: Metadata = buildMetadata({
  title: "Projet pilote Ouest Foire — la rénovation qui prouve la méthode",
  description:
    "Notre immeuble de Ouest Foire à Dakar : agence, suites, studios à rendement, appartement familial et toiture-terrasse. La preuve vivante de la méthode YOoN — du bâti « avant » à la rénovation.",
  path: "/ouest-foire",
});

const GALERIE = [
  { src: "/img/agence-reception.webp", alt: "Accueil de l'agence YOoN Immobilier — Maison Diaspora", legende: "L'agence, au RDC" },
  { src: "/img/interieur-sejour.webp", alt: "Séjour et cuisine ouverte d'un appartement rénové", legende: "Séjour de l'appartement familial" },
  { src: "/img/studio-meuble.webp", alt: "Studio meublé avec coin nuit et kitchenette", legende: "Un studio à rendement optimisé" },
  { src: "/img/patio.webp", alt: "Patio végétalisé en cœur d'immeuble avec palmier", legende: "Le patio en cœur d'îlot" },
  { src: "/img/rooftop-terrasse.webp", alt: "Toiture-terrasse au coucher du soleil avec vue sur Dakar", legende: "La toiture-terrasse, à la lumière du soir" },
];

export default function OuestFoirePage() {
  return (
    <>
      <PageHeader
        eyebrow="Projet pilote — Ouest Foire"
        title="La meilleure preuve, c'est notre propre immeuble"
        intro="Plutôt que de promettre, on montre. À Ouest Foire, on applique notre méthode sur notre propre bâtiment : on l'a acheté, vérifié, et on le rénove étape par étape, sous tes yeux."
        showLocation
        primary={{ href: "/contact", label: "Rejoindre la liste d'attente studios", track: "ouestfoire_header_waitlist" }}
        secondary={{ href: "/notre-methode", label: "Notre méthode", track: "ouestfoire_header_methode" }}
      />

      {/* Coupe + programme */}
      <Section tone="ivoire" cadastre>
        <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-block border border-sable shadow-lift">
              <Image
                src="/img/coupe-axo.webp"
                alt="Coupe axonométrique de l'immeuble rénové : RDC agence, suites, studios, appartement familial, toiture-terrasse"
                width={1448}
                height={1086}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Le programme"
              title="Un immeuble, cinq usages pensés"
              intro="Chaque niveau a sa fonction, du commerce au logement familial. Une lecture claire de ce qu'on construit — et de pourquoi."
            />
            <ul className="mt-7 space-y-3">
              {OUEST_FOIRE_NIVEAUX.map((n, i) => (
                <Reveal as="li" key={n.niveau} delay={i * 60}>
                  <div className="flex gap-4 border-b border-sable pb-3">
                    <span className="w-16 flex-none font-serif text-sm font-semibold uppercase tracking-wide text-ocre">
                      {n.niveau}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-anthracite">{n.titre}</p>
                      <p className="text-sm text-anthracite/70">{n.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Avant / projeté */}
      <Section tone="casse">
        <div className="shell">
          <SectionHeading
            eyebrow="Avant / projeté"
            title="On ne cache pas l'« avant »"
            intro="L'état d'origine du bâtiment fait partie de l'histoire. On le montre tel quel — sans le rendre « sale », juste factuel — à côté de l'intention de résultat."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="overflow-hidden rounded-block border border-sable bg-ivoire">
                <div className="flex aspect-[4/3] items-center justify-center bg-sable/40">
                  <div className="text-center">
                    <p className="font-serif text-sm font-semibold uppercase tracking-label text-pierre">
                      Aujourd&apos;hui
                    </p>
                    <p className="mt-2 px-8 text-sm text-pierre">
                      Photos du chantier « avant » rénovation
                      <br />
                      <span className="text-pierre/70">Bientôt disponibles</span>
                    </p>
                  </div>
                </div>
                <p className="p-4 text-sm text-anthracite/70">
                  État réel du bâti à l&apos;acquisition — reportage terrain.
                </p>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <article className="overflow-hidden rounded-block border border-sable bg-ivoire">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/img/interieur-sejour.webp"
                    alt="Rendu projeté du séjour rénové, lumineux et meublé"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-anthracite/80 px-3 py-1 text-xs font-semibold uppercase tracking-label text-ivoire">
                    Projeté
                  </span>
                </div>
                <p className="p-4 text-sm text-anthracite/70">
                  Intention de résultat après rénovation — rendu d&apos;architecture.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Galerie */}
      <Section tone="ivoire">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="La galerie"
              title="Le « après », pièce par pièce"
              className="max-w-xl"
            />
            <Stamp />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALERIE.map((g, i) => (
              <Reveal as="figure" key={g.src} delay={(i % 3) * 80} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-sable shadow-soft">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-2.5 text-sm font-medium text-anthracite/70">
                  {g.legende}
                </figcaption>
              </Reveal>
            ))}
            <Reveal as="figure" delay={160}>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card border border-sable bg-casse">
                <Image
                  src="/img/plans-architecte.webp"
                  alt="Planche de plans d'aménagement de l'architecte pour l'immeuble de Ouest Foire"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-2.5 text-sm font-medium text-anthracite/70">
                Les plans de l&apos;architecte (AVP)
              </figcaption>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Cas pratique / différenciateur */}
      <Section tone="forest" cadastre>
        <div className="shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Card className="border-none bg-ivoire/5 text-ivoire">
                <p className="font-serif text-2xl font-medium leading-snug text-ivoire text-balance">
                  « Agence ou studio au rez-de-chaussée ? On a tranché pour l&apos;agence : la
                  confiance d&apos;abord, le rendement ensuite. »
                </p>
                <p className="mt-5 text-pretty text-ivoire/75">
                  Chaque décision du chantier est expliquée : le problème, les options, et le
                  choix retenu. C&apos;est ça, suivre un projet en transparence.
                </p>
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand
        attached
        title="Les studios partiront vite."
        text="Rejoins la liste d'attente : tu seras prévenu·e en priorité, sans engagement. Disponibilités et conditions communiquées à titre indicatif, sous réserve de vérification."
        primaryLabel="Rejoindre la liste d'attente"
        primaryHref="/contact"
        secondaryLabel="Poser une question"
        secondaryHref="/contact"
        track="ouestfoire_band"
      />
    </>
  );
}
