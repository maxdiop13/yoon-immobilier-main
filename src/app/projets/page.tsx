import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { PROJETS, STATUT_LABEL, type ProjetStatut } from "@/content/projets";
import { cn } from "@/lib/cn";

export const metadata: Metadata = buildMetadata({
  title: "Nos projets — réalisations suivies par YOoN à Dakar",
  description:
    "Les projets immobiliers que YOoN porte et suit directement à Dakar : preuve de méthode, avant/après et points vérifiés. Pas un catalogue de biens.",
  path: "/projets",
});

const BADGE: Record<ProjetStatut, string> = {
  en_cours: "bg-ocre/12 text-ocre-deep",
  livre: "bg-valide/15 text-valide",
  bientot: "bg-forest/10 text-forest",
};

function StatutBadge({ statut }: { statut: ProjetStatut }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", BADGE[statut])}>
      {STATUT_LABEL[statut]}
    </span>
  );
}

export default function ProjetsPage() {
  const featured = PROJETS.filter((p) => p.featured);
  const others = PROJETS.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Nos projets"
        title="Des réalisations, pas des promesses"
        intro="On ne publie pas un catalogue de biens : on montre les projets qu'on porte et qu'on suit nous-mêmes, du diagnostic au reporting. La preuve de la méthode, en images."
        primary={{ href: "/diagnostic", label: "Évaluer mon projet", track: "projets_header_diagnostic" }}
        secondary={{ href: "/notre-methode", label: "Notre méthode", track: "projets_header_methode" }}
      />

      <Section tone="casse" cadastre>
        <div className="shell">
          {PROJETS.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-block border border-dashed border-sable bg-ivoire p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-anthracite">
                Nos premiers projets arrivent
              </h2>
              <p className="mt-3 text-pretty text-anthracite/72">
                On documente actuellement nos chantiers et opportunités accompagnées. En attendant,
                parle-nous de ton projet : on te dit franchement où tu en es.
              </p>
              <Link href="/diagnostic" data-cta="projets_empty_diagnostic" className="link-underline mt-6 inline-flex">
                Faire le diagnostic gratuit <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Projet(s) mis en avant */}
              {featured.map((p) => {
                const cover = p.imagesApres[0] ?? p.imagesAvant[0];
                return (
                  <Reveal as="article" key={p.slug}>
                    <Link
                      href={`/projets/${p.slug}`}
                      data-cta={`projet_featured_${p.slug}`}
                      className="group grid overflow-hidden rounded-xl3 border border-sable bg-ivoire shadow-soft transition-all hover:-translate-y-1 hover:shadow-float lg:grid-cols-[1.3fr_1fr]"
                    >
                      <div className="relative aspect-[16/10] lg:aspect-auto">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-7 sm:p-9">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-label text-ocre">
                            Projet pilote
                          </span>
                          <StatutBadge statut={p.statut} />
                        </div>
                        <h2 className="mt-3 font-display text-2xl font-semibold text-anthracite">
                          {p.titre}
                        </h2>
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-pierre">
                          <MapPin className="h-4 w-4 text-ocre" aria-hidden="true" /> {p.zone}
                        </p>
                        <p className="mt-4 text-pretty leading-relaxed text-anthracite/75">{p.pitch}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-forest">
                          Découvrir le projet
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}

              {/* Autres projets */}
              {others.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((p) => {
                    const cover = p.imagesApres[0] ?? p.imagesAvant[0];
                    return (
                      <Reveal as="article" key={p.slug}>
                        <Link
                          href={`/projets/${p.slug}`}
                          data-cta={`projet_card_${p.slug}`}
                          className="group flex h-full flex-col overflow-hidden rounded-xl3 border border-sable bg-ivoire shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                        >
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={cover.src}
                              alt={cover.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex items-center justify-between gap-3">
                              <p className="inline-flex items-center gap-1.5 text-sm text-pierre">
                                <MapPin className="h-4 w-4 text-ocre" aria-hidden="true" /> {p.zone}
                              </p>
                              <StatutBadge statut={p.statut} />
                            </div>
                            <h3 className="mt-3 font-display text-lg font-semibold text-anthracite">
                              {p.titre}
                            </h3>
                            <p className="mt-2 flex-1 text-pretty text-sm text-anthracite/72">{p.pitch}</p>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
