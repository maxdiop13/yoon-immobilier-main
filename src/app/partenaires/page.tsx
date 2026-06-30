import type { Metadata } from "next";
import { Building2, MapPin, ArrowUpRight, Handshake, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/CTAButton";
import { CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";
import { PUBLISHED_PARTNERS, NETWORK_ROLES } from "@/content/partners";

export const metadata: Metadata = buildMetadata({
  title: "Réseau de confiance entre Paris et Dakar",
  description:
    "YOoN s'appuie sur un réseau de partenaires sélectionnés — notaires, géomètres, artisans, agences — pour accompagner la diaspora dans ses projets immobiliers entre la France et le Sénégal.",
  path: "/partenaires",
});

export default function PartenairesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partenaires"
        title="Un réseau de confiance entre Paris et Dakar"
        intro="Accompagner la diaspora de bout en bout demande les bons interlocuteurs, des deux côtés. Nous construisons un réseau exigeant et sélectionné, au service de votre tranquillité."
        primary={{ href: "/contact", label: "Parler de mon projet", track: "partenaires_header_cta" }}
        secondary={{ href: "/notre-methode", label: "Notre méthode", track: "partenaires_header_methode" }}
      />

      {/* Un pont entre Paris et Dakar */}
      <Section tone="casse" cadastre>
        <div className="shell">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow">Un pont entre Paris et Dakar</p>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold text-anthracite text-balance">
                Les bons professionnels, choisis avec exigence
              </h2>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-anthracite/75">
                YOoN développe un réseau de partenaires sélectionnés pour accompagner les projets
                immobiliers entre la France et le Sénégal. Chaque partenaire est présenté
                publiquement uniquement après validation des informations et des autorisations
                nécessaires.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                Sélection exigeante, transparence avant tout
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid gap-4 sm:grid-cols-2">
                {NETWORK_ROLES.map((r) => (
                  <div key={r.title} className="rounded-xl2 border border-sable bg-ivoire p-5 shadow-soft">
                    <h3 className="font-display text-lg font-semibold text-anthracite">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-anthracite/72">{r.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Partenaires publiés (aucun pour l'instant → placeholder premium discret) */}
          {PUBLISHED_PARTNERS.length > 0 ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PUBLISHED_PARTNERS.map((p) => (
                <Reveal as="article" key={p.name}>
                  <div className="flex h-full flex-col rounded-xl3 border border-sable bg-ivoire p-7 shadow-soft sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-sable bg-casse">
                        {p.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.logo} alt={`Logo ${p.name}`} className="max-h-12 max-w-12" />
                        ) : (
                          <Building2 className="h-6 w-6 text-pierre" aria-hidden="true" />
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sable bg-casse px-3 py-1.5 text-sm font-medium text-anthracite/75">
                        <MapPin className="h-4 w-4 text-ocre" aria-hidden="true" />
                        {p.city}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-anthracite">{p.name}</h3>
                    <p className="text-sm font-medium text-pierre">{p.role}</p>
                    <p className="mt-3 flex-1 text-pretty leading-relaxed text-anthracite/75">
                      {p.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <CTAButton href="/contact" variant="primary" track="partenaire_cta">
                        Parler de mon projet
                      </CTAButton>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cta="partenaire_site"
                          className="inline-flex items-center gap-1.5 font-semibold text-forest hover:text-forest-deep"
                        >
                          Voir le site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 max-w-2xl text-pretty text-anthracite/65">
              Nos premiers partenaires seront présentés ici prochainement. En attendant, parlez-nous
              de votre projet : nous mobilisons les bons interlocuteurs, en France comme au Sénégal.
            </p>
          )}
        </div>
      </Section>

      {/* Devenir partenaire */}
      <Section tone="ivoire">
        <div className="shell">
          <div className="mx-auto max-w-2xl rounded-block border border-sable bg-casse p-8 text-center shadow-soft sm:p-10">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest">
              <Handshake className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <SectionHeading
              align="center"
              className="mt-5"
              eyebrow="Réseau"
              title="Vous êtes un professionnel ?"
              intro="Notaire, géomètre, architecte, artisan ou agence, en France ou au Sénégal : si vous partagez notre exigence de transparence, parlons-en."
            />
            <div className="mt-7 flex justify-center">
              <CTAButton href="/contact" variant="primary" size="lg" track="partenaire_devenir">
                Devenir partenaire
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Un projet entre la France et le Sénégal ?"
        text="On mobilise les bons interlocuteurs, des deux côtés, pour sécuriser chaque étape."
        primaryLabel="Parler de mon projet"
        primaryHref="/contact"
        secondaryLabel="Faire le diagnostic"
        secondaryHref="/diagnostic"
        track="partenaires_band"
      />
    </>
  );
}
