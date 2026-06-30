import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { GuideEncart } from "@/components/LeadCTAs";
import { GUIDES } from "@/content/guides";

export const metadata: Metadata = buildMetadata({
  title: "Guides diaspora — investir dans l'immobilier au Sénégal",
  description:
    "Tous nos guides pour investir, acheter, vérifier ou faire construire au Sénégal depuis l'étranger. Conseils concrets, à titre indicatif, pour la diaspora.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guides diaspora"
        title="Comprendre avant d'investir au Sénégal"
        intro="Des guides clairs et concrets pour avancer sans angle mort : foncier, vérifications, construction, pièges à éviter. Écrits pour la diaspora, à titre indicatif."
        primary={{ href: "/diagnostic", label: "Faire le diagnostic gratuit", track: "guides_header_diagnostic" }}
        secondary={{ href: "/guide-gratuit", label: "Recevoir le guide", track: "guides_header_guide" }}
      />

      <Section tone="casse" cadastre>
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g, i) => (
              <Reveal as="article" key={g.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/guides/${g.slug}`}
                  data-cta={`guide_card_${g.slug}`}
                  className="group flex h-full flex-col rounded-xl3 border border-sable bg-ivoire p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    <BookOpen className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-label text-ocre">
                    {g.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-anthracite">
                    {g.h1}
                  </h2>
                  <p className="mt-2.5 flex-1 text-pretty text-sm leading-relaxed text-anthracite/72">
                    {g.intro[0]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    Lire le guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <GuideEncart />
          </div>
        </div>
      </Section>
    </>
  );
}
