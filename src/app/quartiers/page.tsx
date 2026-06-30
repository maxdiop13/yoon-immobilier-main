import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import {
  QUARTIERS,
  type QuartierActif,
  type RadarScore,
} from "@/content/quartiers";

export const metadata: Metadata = buildMetadata({
  title: "Quartiers de Dakar — Guide d'investissement",
  description:
    "Quel quartier de Dakar choisir pour investir ? Analyse YOoN : radar multi-critères, points de vigilance et profils d'acheteurs pour 6 quartiers prioritaires.",
  path: "/quartiers",
});

const USAGE_LABELS: Record<string, string> = {
  habiter: "Habiter",
  louer: "Louer",
  construire: "Construire",
  "immeuble-de-rapport": "Immeuble de rapport",
  patrimoine: "Patrimoine",
};

const USAGE_COLORS: Record<string, string> = {
  habiter: "bg-forest/10 text-forest",
  louer: "bg-ocre/10 text-ocre",
  construire: "bg-anthracite/10 text-anthracite",
  "immeuble-de-rapport": "bg-alerte/10 text-alerte",
  patrimoine: "bg-dore/10 text-anthracite",
};

function hexPoints(cx: number, cy: number, r: number, ratio: number, n = 6) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const x = cx + r * ratio * Math.cos(angle);
    const y = cy + r * ratio * Math.sin(angle);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function MiniRadar({ radar }: { radar: RadarScore }) {
  const cx = 50, cy = 50, r = 38, N = 6;
  const keys: (keyof RadarScore)[] = [
    "prixAccessibilite",
    "securiteFonciere",
    "rendementLocatif",
    "qualiteVie",
    "transports",
    "projetsDeveloppement",
  ];
  const dataPoints = keys
    .map((k, i) => {
      const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
      const ratio = radar[k] / 5;
      return `${(cx + r * ratio * Math.cos(angle)).toFixed(2)},${(cy + r * ratio * Math.sin(angle)).toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20 shrink-0"
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5].map((ring) => (
        <polygon
          key={ring}
          points={hexPoints(cx, cy, r, ring / 5, N)}
          fill="none"
          stroke="#E5D9C3"
          strokeWidth="1"
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
            stroke="#E5D9C3"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints}
        fill="#1E5C45"
        fillOpacity="0.3"
        stroke="#1E5C45"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuartiersPage() {
  const actifs = QUARTIERS.filter((q): q is QuartierActif => q.statut === "actif");
  const stubs = QUARTIERS.filter((q) => q.statut === "stub");

  return (
    <>
      <PageHeader
        eyebrow="Analyse de quartiers"
        title="Investir à Dakar : choisir le bon quartier"
        intro="Un outil d'aide à la décision, pas un portail d'annonces. YOoN analyse chaque quartier selon 6 critères terrain — pour vous aider à choisir en connaissance de cause."
      />

      <div className="shell pt-6 pb-0">
        <div className="rounded-token border border-sable bg-sable-soft px-5 py-4 text-sm text-anthracite/70">
          <strong className="text-anthracite">Aucune donnée inventée.</strong>{" "}
          Les placeholders restent affichés tels quels jusqu&apos;à vérification
          terrain. Les opportunités indiquées sont en cours de qualification.
        </div>
      </div>

      <Section tone="casse" cadastre>
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actifs.map((q, i) => (
              <Reveal as="article" key={q.slug} delay={(i % 3) * 60}>
                <Link
                  href={`/quartiers/${q.slug}`}
                  data-cta={`quartier_card_${q.slug}`}
                  className="group flex h-full flex-col rounded-card border border-sable bg-ivoire p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <MiniRadar radar={q.radar} />
                    <div className="min-w-0">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-label ${USAGE_COLORS[q.usage]}`}
                      >
                        {USAGE_LABELS[q.usage]}
                      </span>
                      <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-anthracite">
                        {q.nom}
                      </h2>
                      <p className="mt-1 text-sm leading-snug text-anthracite/65">
                        {q.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-anthracite/70">
                    {q.profilAcheteur}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    Analyser ce quartier
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ivoire">
        <div className="shell">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-anthracite">
              Analyses en cours de préparation
            </h2>
            <p className="mt-2 text-anthracite/65">
              Ces quartiers seront analysés prochainement selon la même
              méthode terrain.
            </p>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-3">
            {stubs.map((q, i) => (
              <Reveal as="li" key={q.slug} delay={i * 25}>
                <span className="inline-flex items-center gap-2 rounded-full border border-sable bg-sable-soft px-4 py-2 text-sm text-pierre">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {q.nom}
                  <span className="text-xs opacity-60">— à venir</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
