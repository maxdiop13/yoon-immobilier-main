import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ShieldAlert } from "lucide-react";
import { Section } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import {
  QUARTIER_SLUGS,
  getQuartier,
  type RadarScore,
} from "@/content/quartiers";

export function generateStaticParams() {
  return QUARTIER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuartier(slug);
  if (!q) return {};
  return buildMetadata({
    title: `${q.nom} — Analyse investissement Dakar`,
    description: `Radar YOoN, points de vigilance et profil investisseur pour ${q.nom} à Dakar. Analyse terrain sans données inventées.`,
    path: `/quartiers/${q.slug}`,
  });
}

const USAGE_LABELS: Record<string, string> = {
  habiter: "Habiter",
  louer: "Louer",
  construire: "Construire",
  "immeuble-de-rapport": "Immeuble de rapport",
  patrimoine: "Patrimoine",
};

const USAGE_COLORS: Record<string, string> = {
  habiter: "bg-forest/10 text-forest border-forest/20",
  louer: "bg-ocre/10 text-ocre border-ocre/20",
  construire: "bg-anthracite/10 text-anthracite border-anthracite/20",
  "immeuble-de-rapport": "bg-alerte/10 text-alerte border-alerte/20",
  patrimoine: "bg-dore/10 text-anthracite border-dore/20",
};

const RADAR_AXES: { key: keyof RadarScore; label: string }[] = [
  { key: "prixAccessibilite", label: "Prix accessible" },
  { key: "securiteFonciere", label: "Sécurité foncière" },
  { key: "rendementLocatif", label: "Rendement locatif" },
  { key: "qualiteVie", label: "Qualité de vie" },
  { key: "transports", label: "Transports" },
  { key: "projetsDeveloppement", label: "Projets de développement" },
];

function hexPoints(cx: number, cy: number, r: number, ratio: number, n = 6) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const x = cx + r * ratio * Math.cos(angle);
    const y = cy + r * ratio * Math.sin(angle);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function FullRadar({ radar }: { radar: RadarScore }) {
  const cx = 100, cy = 100, r = 76, N = 6;
  const keys = RADAR_AXES.map((a) => a.key);
  const dataPoints = keys
    .map((k, i) => {
      const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
      const ratio = radar[k] / 5;
      return `${(cx + r * ratio * Math.cos(angle)).toFixed(2)},${(cy + r * ratio * Math.sin(angle)).toFixed(2)}`;
    })
    .join(" ");
  const dotPoints = keys.map((k, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    const ratio = radar[k] / 5;
    return {
      x: (cx + r * ratio * Math.cos(angle)).toFixed(2),
      y: (cy + r * ratio * Math.sin(angle)).toFixed(2),
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className="mx-auto h-56 w-56 sm:h-64 sm:w-64"
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5].map((ring) => (
        <polygon
          key={ring}
          points={hexPoints(cx, cy, r, ring / 5, N)}
          fill={ring === 5 ? "#E5D9C3" : "none"}
          fillOpacity={ring === 5 ? 0.25 : 0}
          stroke="#C4B89A"
          strokeWidth={ring === 5 ? 1 : 0.75}
        />
      ))}
      {keys.map((_, i) => {
        const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={(cx + r * Math.cos(angle)).toFixed(2)}
            y2={(cy + r * Math.sin(angle)).toFixed(2)}
            stroke="#C4B89A"
            strokeWidth="0.75"
          />
        );
      })}
      <polygon
        points={dataPoints}
        fill="#1E5C45"
        fillOpacity="0.22"
        stroke="#1E5C45"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {dotPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#1E5C45" />
      ))}
    </svg>
  );
}

export default async function QuartierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const q = getQuartier(slug);
  if (!q) notFound();

  const wa = whatsappHref(
    `Bonjour YOoN, je m'intéresse au quartier ${q.nom} à Dakar. Pouvez-vous m'en dire plus ?`
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ivoire">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
        <div className="shell py-14 sm:py-20">
          <div className="max-w-3xl">
            <Breadcrumb
              className="mb-6"
              items={[
                { name: "Accueil", path: "/" },
                { name: "Quartiers", path: "/quartiers" },
                { name: q.nom, path: `/quartiers/${q.slug}` },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-label ${USAGE_COLORS[q.usage]}`}
              >
                {USAGE_LABELS[q.usage]}
              </span>
              <span className="rounded-full border border-sable bg-sable-soft px-3 py-1 text-xs text-pierre">
                {q.profilAcheteur}
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.04] text-anthracite text-balance">
              {q.nom}
            </h1>
            <p className="mt-3 text-lg font-medium text-anthracite/65">
              {q.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <Section tone="ivoire">
        <div className="shell">
          <Reveal>
            <p className="max-w-prose text-pretty text-base leading-relaxed text-anthracite/80 sm:text-lg">
              {q.description}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Radar YOoN */}
      <Section tone="casse" cadastre>
        <div className="shell">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-anthracite">
              Radar YOoN — Analyse multi-critères
            </h2>
            <p className="mt-1.5 text-sm text-pierre">
              Évaluation terrain YOoN — à vérifier et à pondérer selon votre projet.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-14">
            <Reveal className="shrink-0">
              <FullRadar radar={q.radar} />
            </Reveal>
            <Reveal delay={80} className="w-full max-w-sm">
              <ul className="space-y-4">
                {RADAR_AXES.map(({ key, label }) => (
                  <li key={key} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-anthracite/75">{label}</span>
                    <div className="flex shrink-0 gap-1" aria-label={`${q.radar[key]} sur 5`}>
                      {[1, 2, 3, 4, 5].map((v) => (
                        <div
                          key={v}
                          className={`h-2 w-5 rounded-sm transition-colors ${
                            v <= q.radar[key] ? "bg-forest" : "bg-sable"
                          }`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Points de vigilance */}
      <Section tone="ivoire">
        <div className="shell">
          <Reveal>
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-semibold text-anthracite">
              <ShieldAlert className="h-6 w-6 text-ocre" aria-hidden="true" />
              Points de vigilance
            </h2>
          </Reveal>
          <ul className="mt-6 space-y-4">
            {q.pointsVigilance.map((point, i) => (
              <Reveal as="li" key={i} delay={i * 60}>
                <div className="flex gap-3 rounded-token border border-sable bg-sable-soft px-5 py-4">
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-ocre"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-anthracite/80">{point}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Opportunités */}
      {q.opportunites.length > 0 && (
        <Section tone="casse">
          <div className="shell">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-anthracite">
                Opportunités identifiées
              </h2>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {q.opportunites.map((opp, i) => (
                <Reveal as="li" key={i} delay={i * 60}>
                  <div className="flex flex-wrap items-start gap-3 rounded-token border border-ocre/20 bg-ocre/5 px-5 py-4">
                    <span className="shrink-0 rounded-full bg-ocre/15 px-3 py-0.5 text-xs font-bold uppercase tracking-label text-ocre">
                      En cours de qualification
                    </span>
                    <p className="text-sm leading-relaxed text-anthracite/80">{opp}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* CTA WhatsApp + retour */}
      <Section tone="forest">
        <div className="shell text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ivoire sm:text-3xl">
              Discuter de ce quartier avec YOoN
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ivoire/75">
              Une question sur {q.nom} ? Un bien à vérifier ? On vous répond
              honnêtement, sans engagement.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {wa && (
                <CTAButton
                  href={wa}
                  variant="whatsapp"
                  size="lg"
                  external
                  track={`quartier_whatsapp_${q.slug}`}
                >
                  Contacter YOoN sur WhatsApp
                </CTAButton>
              )}
              <CTAButton
                href="/diagnostic"
                variant="outline-light"
                size="lg"
                track={`quartier_diagnostic_${q.slug}`}
              >
                Diagnostic gratuit
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="shell py-8">
        <Link
          href="/quartiers"
          className="inline-flex items-center gap-2 text-sm font-medium text-pierre hover:text-anthracite"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour aux quartiers
        </Link>
      </div>
    </>
  );
}
