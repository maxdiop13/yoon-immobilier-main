import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  BookOpen,
  Check,
  X,
  RefreshCw,
  Info,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { JsonLd, articleSchema, faqSchema } from "@/components/JsonLd";
import { GuideEncart } from "@/components/LeadCTAs";
import { GUIDES, getGuide, GUIDE_SLUGS, sectionId } from "@/content/guides";
import { whatsappHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
    image: guide.ogImage,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const wa = whatsappHref("Bonjour YOoN, je vous contacte au sujet d'un projet au Sénégal.");

  const related = guide.related
    .map((s) => GUIDES.find((g) => g.slug === s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      {/* Hero du guide */}
      <section className="relative isolate overflow-hidden bg-ivoire">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
        <div className="shell py-14 sm:py-20">
          <div className="max-w-3xl">
            <Breadcrumb
              className="mb-5"
              items={[
                { name: "Accueil", path: "/" },
                { name: "Guides", path: "/guides" },
                { name: guide.h1, path: `/guides/${guide.slug}` },
              ]}
            />
            <p className="eyebrow flex flex-wrap items-center gap-2">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> {guide.eyebrow} · {guide.readingHint}
              {guide.updated && (
                <span className="inline-flex items-center gap-1 text-pierre">
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Mis à jour {guide.updated}
                </span>
              )}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] text-anthracite text-balance">
              {guide.h1}
            </h1>
            <div className="mt-5 space-y-3 text-lg leading-relaxed text-anthracite/75">
              {guide.intro.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Image hero (LCP — priority) */}
          {guide.image && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-block border border-sable shadow-card">
              <Image
                src={guide.image}
                alt={guide.imageAlt || guide.h1}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Corps : contenu + sidebar lead */}
      <Section tone="casse">
        <div className="shell grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <article className="min-w-0 max-w-prose">
            {/* Sommaire (guides longs) — sections de contenu uniquement */}
            {guide.longform && (
              <nav
                aria-label="Sommaire"
                className="mb-10 rounded-xl2 border border-sable bg-ivoire p-5 shadow-soft"
              >
                <p className="eyebrow">Sommaire</p>
                <ol className="mt-3 space-y-1.5">
                  {guide.sections
                    .filter((s) => !s.kind || s.kind === "table")
                    .map((s) => (
                      <li key={s.h2}>
                        <a
                          href={`#${sectionId(s)}`}
                          className="inline-flex items-start gap-2 text-anthracite/75 transition-colors hover:text-forest"
                        >
                          <ChevronRight className="mt-1 h-3.5 w-3.5 flex-none text-ocre" aria-hidden="true" />
                          {s.h2}
                        </a>
                      </li>
                    ))}
                </ol>
              </nav>
            )}

            {guide.sections.map((s, i) => {
              const ctaHref =
                s.cta?.kind === "guide"
                  ? "/guide-gratuit"
                  : s.cta?.kind === "whatsapp"
                    ? wa || "/contact"
                    : "/diagnostic";
              const noteStyle =
                s.tone === "warn"
                  ? { box: "border-ocre/30 bg-ocre/8", icon: AlertTriangle, color: "text-ocre-deep" }
                  : s.tone === "tip"
                    ? { box: "border-dore/40 bg-dore/10", icon: Lightbulb, color: "text-ocre-deep" }
                    : { box: "border-forest/20 bg-forest/5", icon: Info, color: "text-forest" };
              const NoteIcon = noteStyle.icon;

              return (
                <Reveal as="section" key={i} id={sectionId(s)} className="mb-9 scroll-mt-24">
                  {/* Encadré « L'essentiel en 30 secondes » */}
                  {s.kind === "essentiel" ? (
                    <div className="rounded-xl2 border border-forest/20 bg-forest/5 p-6">
                      <p className="flex items-center gap-2 font-display text-base font-semibold text-forest">
                        <Sparkles className="h-5 w-5" aria-hidden="true" /> {s.h2}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {s.bullets?.map((b) => (
                          <li key={b} className="flex gap-2.5 text-anthracite/85">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-forest" strokeWidth={3} aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : s.kind === "note" ? (
                    <div className={`flex gap-3 rounded-xl2 border p-5 ${noteStyle.box}`}>
                      <NoteIcon className={`mt-0.5 h-5 w-5 flex-none ${noteStyle.color}`} aria-hidden="true" />
                      <div>
                        <p className={`font-display text-base font-semibold ${noteStyle.color}`}>{s.h2}</p>
                        {s.paras?.map((p, j) => (
                          <p key={j} className="mt-1.5 text-pretty text-sm leading-relaxed text-anthracite/80">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : s.kind === "cta" && s.cta ? (
                    <div className="rounded-xl3 border border-forest-deep/30 bg-forest p-6 text-ivoire shadow-card sm:p-7">
                      <p className="font-display text-xl font-semibold">{s.h2}</p>
                      <p className="mt-2 text-pretty text-ivoire/80">{s.cta.text}</p>
                      <div className="mt-5">
                        <CTAButton
                          href={ctaHref}
                          variant={s.cta.kind === "whatsapp" ? "whatsapp" : "primary"}
                          track={`guide_${guide.slug}_${s.cta.kind}`}
                        >
                          {s.cta.label}
                        </CTAButton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-semibold text-anthracite">{s.h2}</h2>
                      {s.image && (
                        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-card border border-sable shadow-soft">
                          <Image
                            src={s.image}
                            alt={s.imageAlt || s.h2}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 700px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      {s.paras?.map((p, j) => (
                        <p key={j} className="mt-3 text-pretty leading-relaxed text-anthracite/80">
                          {p}
                        </p>
                      ))}

                      {/* Sous-sections H3 */}
                      {s.sub?.map((ss) => (
                        <div key={ss.h3} className="mt-5">
                          <h3 className="font-display text-lg font-semibold text-anthracite">{ss.h3}</h3>
                          <p className="mt-1.5 text-pretty leading-relaxed text-anthracite/80">{ss.body}</p>
                        </div>
                      ))}

                      {/* Tableau responsive */}
                      {s.table && (
                        <div className="mt-5 overflow-x-auto rounded-xl2 border border-sable">
                          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-sable/40">
                                {s.table.headers.map((h) => (
                                  <th key={h} className="p-3 font-display font-semibold text-anthracite">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {s.table.rows.map((row, r) => (
                                <tr key={r} className="border-t border-sable align-top">
                                  {row.map((cell, c) => (
                                    <td
                                      key={c}
                                      className={`p-3 text-anthracite/80 ${c === 0 ? "font-medium text-anthracite" : ""}`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Listes : checklist / erreurs / puces simples */}
                      {s.bullets && s.kind === "checklist" && (
                        <ul className="mt-5 grid gap-2.5 rounded-xl2 border border-valide/30 bg-valide/8 p-5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 text-anthracite/85">
                              <Check className="mt-0.5 h-4 w-4 flex-none text-valide" strokeWidth={3} aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.bullets && s.kind === "mistakes" && (
                        <ul className="mt-5 grid gap-2.5 rounded-xl2 border border-alerte/25 bg-alerte/[0.06] p-5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 text-anthracite/85">
                              <X className="mt-0.5 h-4 w-4 flex-none text-alerte" strokeWidth={3} aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.bullets && !s.kind && (
                        <ul className="mt-4 space-y-2.5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 text-anthracite/80">
                              <ChevronRight className="mt-1 h-4 w-4 flex-none text-ocre" aria-hidden="true" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </Reveal>
              );
            })}

            {/* Encart prudence */}
            <p className="mt-8 rounded-xl2 border-l-2 border-l-ocre bg-casse p-4 text-sm italic text-anthracite/70">
              Ce guide fournit une information générale, à titre indicatif. Il ne remplace pas
              l&apos;avis d&apos;un notaire, d&apos;un avocat ou des administrations compétentes.
            </p>

            {/* CTA diagnostic + guide + WhatsApp en fin de corps */}
            <div className="mt-8 rounded-xl3 border border-sable bg-ivoire p-6 shadow-soft sm:p-7">
              <p className="font-display text-xl font-semibold text-anthracite">
                Un projet précis en tête ?
              </p>
              <p className="mt-2 text-anthracite/72">
                En 2 minutes, on vous dit où vous en êtes et ce qu&apos;il faut sécuriser en priorité.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CTAButton href="/diagnostic" variant="primary" track={`guide_${guide.slug}_diagnostic`}>
                  Faire le diagnostic gratuit
                </CTAButton>
                <CTAButton href="/guide-gratuit" variant="secondary" track={`guide_${guide.slug}_guide`}>
                  Recevoir le guide
                </CTAButton>
                {wa && (
                  <CTAButton href={wa} variant="whatsapp" track={`guide_${guide.slug}_whatsapp`}>
                    WhatsApp
                  </CTAButton>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GuideEncart />
          </aside>
        </div>
      </Section>

      {/* FAQ SEO */}
      <Section tone="ivoire">
        <div className="shell max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-anthracite sm:text-3xl">
            Questions fréquentes
          </h2>
          <dl className="mt-8 divide-y divide-sable">
            {guide.faq.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold text-anthracite">{f.q}</dt>
                <dd className="mt-2 text-pretty leading-relaxed text-anthracite/75">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Guides liés */}
      {related.length > 0 && (
        <Section tone="casse">
          <div className="shell">
            <h2 className="font-display text-xl font-semibold text-anthracite">À lire ensuite</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  data-cta={`guide_related_${g.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl2 border border-sable bg-ivoire p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span>
                    <span className="text-xs font-bold uppercase tracking-label text-ocre">
                      {g.eyebrow}
                    </span>
                    <span className="mt-1 block font-display font-semibold text-anthracite">
                      {g.h1}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-5 w-5 flex-none text-forest transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      <JsonLd
        data={[
          articleSchema({
            headline: guide.h1,
            description: guide.metaDescription,
            path: `/guides/${guide.slug}`,
            image: guide.ogImage,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          }),
          faqSchema(guide.faq),
        ]}
      />
    </>
  );
}
