import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ServicesGrid, CTABand } from "@/components/sections";
import { Section, SectionHeading, Card } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { SERVICES } from "@/content";
import { siteConfig } from "@/lib/site";

const servicesLd = SERVICES.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.titre,
  description: s.description,
  serviceType: s.titre,
  areaServed: { "@type": "City", name: "Dakar" },
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
}));

export const metadata: Metadata = buildMetadata({
  title: "Services — analyse, vérification & suivi de chantier à Dakar",
  description:
    "Analyse de bien, vérification documentaire, visite & reportage terrain, suivi de chantier à distance, calcul de revenu net, conseil meublé/Airbnb. L'accompagnement YOoN pour la diaspora.",
  path: "/services",
});

const PROCESS = [
  { n: "01", t: "On échange", d: "Un appel découverte gratuit pour comprendre ton projet et tes contraintes." },
  { n: "02", t: "On va voir", d: "Mohamed se rend sur place : visite, photos, vidéos datées, premiers constats." },
  { n: "03", t: "On vérifie", d: "Papiers, structure, environnement. On recoupe et on documente chaque point." },
  { n: "04", t: "On te conseille", d: "Un rapport clair et une recommandation franche : on y va, on attend, ou on passe." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="L'accompagnement, à la carte"
        intro="Du simple avis sur une annonce à l'accompagnement complet d'un achat ou d'un chantier : tu choisis le niveau d'aide dont tu as besoin. Toujours concret, toujours documenté."
        primary={{ href: "/contact", label: "Faire vérifier mon bien", track: "services_header_cta" }}
        secondary={{ href: "/notre-methode", label: "Notre méthode", track: "services_header_methode" }}
      />

      <ServicesGrid withHeading={false} />

      {/* Suivi de chantier / visite terrain */}
      <Section tone="ivoire">
        <div className="shell">
          <div className="mx-auto grid max-w-4xl items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Suivi de chantier & visite terrain</p>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold text-anthracite text-balance">
                On garde un œil sur place, pour toi
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-anthracite/75">
                Visites, points d&apos;avancement, photos et vidéos datées : tu suis ton chantier ou
                ton bien comme si tu étais là, avec des preuves à l&apos;appui à chaque étape.
              </p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-block border border-sable shadow-card">
              <Image
                src="/img/suivi-chantier-villa.webp"
                alt="Vérification d'un chantier en cours à Dakar, photos à l'appui"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="ivoire" cadastre>
        <div className="shell">
          <SectionHeading
            eyebrow="Comment ça se passe"
            title="Quatre étapes, zéro mauvaise surprise"
            intro="Un parcours simple, du premier échange à la décision. À chaque étape, tu sais où on en est."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80}>
                <Card className="h-full">
                  <span className="font-serif text-3xl font-semibold text-ocre tnum">{s.n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-anthracite">{s.t}</h3>
                  <p className="mt-2 text-sm text-anthracite/75">{s.d}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Tarifs (placeholder — aucun tarif inventé) */}
      <Section tone="casse">
        <div className="shell">
          <div className="mx-auto max-w-2xl rounded-block border border-dashed border-sable bg-ivoire p-8 text-center">
            <p className="eyebrow justify-center">Tarifs</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-anthracite">
              Des tarifs clairs, annoncés à l&apos;appel
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-anthracite/75">
              Le prix dépend de la prestation (analyse, vérification, suivi de chantier). On te le
              donne sans détour lors de l&apos;appel découverte, sans engagement.
            </p>
            <p className="mt-5 text-sm font-medium text-pierre">
              Tarifs communiqués lors de l&apos;appel découverte
            </p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Prêt à avancer sereinement ?"
        text="Réserve un appel découverte gratuit. On répond à tes questions, sans pression."
        primaryLabel="Réserver un appel découverte"
        primaryHref="/contact"
        secondaryLabel="Recevoir la checklist"
        secondaryHref="/investir-a-dakar"
        track="services_band"
      />
      <JsonLd data={servicesLd} />
    </>
  );
}
