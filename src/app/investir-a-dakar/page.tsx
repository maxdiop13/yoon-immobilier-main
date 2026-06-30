import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading, Card } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { LeadMagnetForm } from "@/components/forms/LeadMagnetForm";
import { CTABand } from "@/components/sections";
import { CTAButton } from "@/components/CTAButton";
import { Icon } from "@/components/Icon";
import { Building2 } from "lucide-react";
import { FONCIER, ZONES } from "@/content";
import { whatsappHref } from "@/lib/site";

const OPPORTUNITES = [
  { type: "Immeuble", zone: "Ouest Foire" },
  { type: "Immeuble", zone: "Guédiawaye" },
  { type: "Immeuble", zone: "Face Mbao" },
];

export const metadata: Metadata = buildMetadata({
  title: "Investir à Dakar depuis la diaspora — guide foncier & quartiers",
  description:
    "Pourquoi et comment investir dans l'immobilier à Dakar quand on vit à l'étranger : statuts fonciers (titre foncier, bail, délibération) expliqués, quartiers, et la checklist avant d'acheter au Sénégal.",
  path: "/investir-a-dakar",
});

const POURQUOI = [
  {
    icon: "building" as const,
    t: "Une ville qui se transforme",
    d: "Dakar se densifie et se modernise. De nouveaux quartiers émergent, d'autres se valorisent.",
  },
  {
    icon: "key" as const,
    t: "Une demande locative réelle",
    d: "Étudiants, cadres, diaspora de passage : le besoin de logements de qualité est constant.",
  },
  {
    icon: "shield" as const,
    t: "Un attachement durable",
    d: "Investir au pays, c'est aussi préparer un retour, accueillir la famille, transmettre.",
  },
];

export default function InvestirPage() {
  const wa = whatsappHref("Bonjour YOoN, je souhaite une première lecture des opportunités en cours.");
  return (
    <>
      <PageHeader
        eyebrow="Investir à Dakar"
        title="Investir au Sénégal, depuis l'étranger, en toute lucidité"
        intro="Acheter un bien au Sénégal quand on vit en France, en Belgique, au Canada, aux USA ou au Royaume-Uni, c'est possible — à condition de comprendre le marché et le foncier. On t'explique l'essentiel, sans jargon."
        primary={{ href: "/contact", label: "Parler de mon projet", track: "investir_header_cta" }}
        secondary={{ href: "/notre-methode", label: "Notre méthode", track: "investir_header_methode" }}
      />

      {/* Pourquoi */}
      <Section tone="casse">
        <div className="shell">
          <SectionHeading
            eyebrow="Pourquoi maintenant"
            title="Les bonnes raisons existent. Les pièges aussi."
            intro="Le potentiel est réel, mais il se choisit. Notre rôle : t'aider à distinguer l'opportunité sérieuse du mirage."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {POURQUOI.map((p, i) => (
              <Reveal as="article" key={p.t} delay={i * 80}>
                <Card className="h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-token bg-forest/10 text-forest">
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-anthracite">{p.t}</h3>
                  <p className="mt-2 text-sm text-anthracite/75">{p.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Foncier expliqué */}
      <Section tone="ivoire" cadastre>
        <div className="shell">
          <SectionHeading
            eyebrow="Le foncier, simplement"
            title="Comprendre le statut d'un terrain avant tout"
            intro="Au Sénégal, tout commence par le statut foncier. Le connaître, c'est savoir ce que tu achètes vraiment — et ce que tu pourras transmettre."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FONCIER.map((f, i) => (
              <Reveal as="article" key={f.terme} delay={i * 70}>
                <Card className="h-full border-l-2 border-l-dore">
                  <h3 className="font-display text-lg font-semibold text-anthracite">{f.terme}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-anthracite/75">
                    {f.definition}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-pierre">
            Information générale, à titre indicatif. Le statut exact d&apos;un bien doit toujours
            être vérifié et confirmé avec un notaire.
          </p>

          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-block border border-sable shadow-card sm:aspect-[2.6/1]">
            <Image
              src="/img/verification-terrain.webp"
              alt="Vérification d'un terrain et de ses limites à Dakar"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Quartiers */}
      <Section tone="anthracite" cadastre>
        <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-block border border-ivoire/10 shadow-lift">
              <Image
                src="/img/carte-ouest-foire.webp"
                alt="Carte des quartiers de Dakar, repère sur Ouest Foire"
                width={1448}
                height={1086}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Quartier par quartier"
              tone="light"
              title="Chaque secteur a sa logique"
              intro="Du calme résidentiel des Almadies au dynamisme d'Ouest Foire : on t'aide à choisir le quartier qui colle vraiment à ton projet."
            />
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {ZONES.map((z) => (
                <li
                  key={z}
                  className="rounded-full border border-ivoire/20 bg-ivoire/5 px-4 py-2 text-sm font-medium text-ivoire"
                >
                  {z}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Lead magnet — checklist */}
      <Section tone="forest" cadastre>
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="hairline-gold mx-auto" />
            <h2 className="mt-6 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold text-ivoire text-balance">
              Reçois la checklist « Avant d&apos;acheter au Sénégal »
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-ivoire/80">
              Les points à vérifier et les documents à demander avant de signer. Plus, chaque
              semaine, un conseil utile et une opportunité vérifiée. Désinscription en un clic.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl rounded-block border border-ivoire/15 bg-ivoire/5 p-6 sm:p-8">
            <LeadMagnetForm tone="light" />
          </div>
        </div>
      </Section>

      {/* Opportunités en cours de qualification */}
      <Section tone="casse">
        <div className="shell">
          <SectionHeading
            eyebrow="Opportunités"
            title="Opportunités en cours de qualification"
            intro="Certaines opportunités sont actuellement en cours d'analyse à Dakar et dans sa périphérie. Avant toute présentation détaillée, YOoN vérifie les informations disponibles, le contexte du bien et les éléments nécessaires à une première lecture sérieuse."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {OPPORTUNITES.map((o, i) => (
              <Reveal as="article" key={o.zone} delay={i * 80}>
                <div className="flex h-full flex-col rounded-xl3 border border-sable bg-ivoire p-7 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-forest">
                      <Building2 className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-ocre/12 px-3 py-1 text-xs font-semibold text-ocre-deep">
                      En cours de qualification
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-anthracite">
                    {o.type} — {o.zone}
                  </h3>
                  <dl className="mt-3 space-y-1 text-sm text-anthracite/70">
                    <div className="flex gap-2">
                      <dt className="font-medium text-anthracite/55">Statut :</dt>
                      <dd>en cours de qualification</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-medium text-anthracite/55">Prix :</dt>
                      <dd>à préciser</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton href="/diagnostic" variant="primary" track="opportunites_lecture">
              Demander une première lecture
            </CTAButton>
            {wa && (
              <CTAButton href={wa} variant="whatsapp" track="opportunites_whatsapp">
                Parler de ces opportunités
              </CTAButton>
            )}
          </div>

          <p className="mt-6 text-sm italic text-pierre">
            Les informations relatives aux biens sont communiquées à titre indicatif et restent
            soumises à vérification.
          </p>
        </div>
      </Section>

      <CTABand
        title="Un projet précis en tête ?"
        text="Parle-nous de ton bien ou de ton budget. On t'oriente, concrètement."
        primaryLabel="Parler de mon projet"
        primaryHref="/contact"
        track="investir_band"
      />
    </>
  );
}
