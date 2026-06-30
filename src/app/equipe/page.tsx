import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { LeadCTARow } from "@/components/LeadCTAs";
import { CTABand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { TEAM, type Member } from "@/content/team";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

const peopleLd = TEAM.map((m) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  description: m.pitch,
  worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
}));

export const metadata: Metadata = buildMetadata({
  title: "Notre équipe — entre le Sénégal et la diaspora",
  description:
    "Découvrez l'équipe YOoN : Mohamed (présence terrain à Dakar), Sarah (relation diaspora) et Gora (vision & cadrage). Des interlocuteurs réels, joignables et responsables.",
  path: "/equipe",
});

const ACCENTS: Record<Member["accent"], { ring: string; badge: string; bar: string }> = {
  forest: { ring: "border-forest/40 text-forest", badge: "bg-forest/10 text-forest", bar: "bg-forest" },
  ocre: { ring: "border-ocre/40 text-ocre", badge: "bg-ocre/12 text-ocre", bar: "bg-ocre" },
  dore: { ring: "border-dore/50 text-ocre-deep", badge: "bg-dore/15 text-ocre-deep", bar: "bg-dore" },
};

export default function EquipePage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre équipe"
        title="Une équipe entre le Sénégal et la diaspora"
        intro="Derrière YOoN, des personnes réelles, joignables et responsables. Sur place à Dakar comme auprès de la diaspora, chacun porte une part du parcours — pour que vous avanciez avec méthode et sérénité."
        primary={{ href: "/diagnostic", label: "Diagnostic gratuit", track: "equipe_header_diagnostic" }}
        secondary={{ href: "/contact", label: "Nous contacter", track: "equipe_header_contact" }}
      />

      <Section tone="casse" cadastre>
        <div className="shell">
          <div className="grid gap-7 lg:grid-cols-3">
            {TEAM.map((m, i) => {
              const a = ACCENTS[m.accent];
              return (
                <Reveal as="article" key={m.name} delay={i * 90}>
                  <div className="flex h-full flex-col overflow-hidden rounded-xl3 border border-sable bg-ivoire shadow-soft transition-shadow hover:shadow-card">
                    <span aria-hidden className={cn("block h-1.5 w-full", a.bar)} />
                    <div className="p-7 sm:p-8">
                      <div className="flex items-center gap-4">
                        {/* Photo réelle à fournir — placeholder propre */}
                        <span
                          className={cn(
                            "flex h-16 w-16 flex-none items-center justify-center rounded-full border-2 bg-casse font-serif text-2xl font-semibold",
                            a.ring
                          )}
                        >
                          {m.initials}
                        </span>
                        <div>
                          <h2 className="font-display text-xl font-semibold text-anthracite">
                            {m.name}
                          </h2>
                          <p className="text-sm font-medium text-pierre">{m.role}</p>
                        </div>
                      </div>
                      <p className="mt-5 text-pretty leading-relaxed text-anthracite/75">
                        {m.pitch}
                      </p>
                      <ul className="mt-6 space-y-2.5 border-t border-sable pt-5">
                        {m.focus.map((f) => (
                          <li key={f.label} className="flex items-center gap-3 text-sm text-anthracite/80">
                            <span className={cn("inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg", a.badge)}>
                              <Icon name={f.icon} className="h-4 w-4" strokeWidth={1.9} />
                            </span>
                            {f.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="ivoire">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              align="center"
              eyebrow="Un seul interlocuteur, toute une équipe"
              title="Vous parlez à une personne, vous bénéficiez de tous"
              intro="Vous gardez un interlocuteur unique qui connaît votre dossier de A à Z. Derrière lui, l'équipe complète — terrain, relation, méthode — travaille votre projet."
            />
            <div className="mt-8 flex justify-center">
              <LeadCTARow track="equipe_mid" />
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Envie d'avancer avec une équipe de confiance ?"
        text="Faites le point en 2 minutes : on vous dit où vous en êtes et ce qu'il faut sécuriser en priorité."
        primaryLabel="Faire le diagnostic gratuit"
        primaryHref="/diagnostic"
        secondaryLabel="Voir notre méthode"
        secondaryHref="/notre-methode"
        track="equipe_band"
      />
      <JsonLd data={peopleLd} />
    </>
  );
}
