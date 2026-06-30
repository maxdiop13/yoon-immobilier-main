import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/primitives";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { GuideForm } from "@/components/forms/GuideForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Recevoir le guide pour investir au Sénégal avec méthode",
  description:
    "Téléchargez gratuitement le guide diaspora : investir au Sénégal sans avancer à l'aveugle. Documents à vérifier, statut foncier, pièges à éviter. À titre indicatif.",
  path: "/guide-gratuit",
});

const BENEFITS = [
  "Les documents à demander avant de vous engager",
  "Comprendre le statut foncier (titre, bail, délibération)",
  "Les pièges les plus fréquents et comment les éviter",
  "Votre checklist « avant d'acheter »",
];

export default function GuideGratuitPage() {
  return (
    <Section tone="forest" cadastre className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 glow-dore" />
      <div className="shell">
        <Breadcrumb
          tone="light"
          items={[{ name: "Accueil", path: "/" }, { name: "Guide gratuit", path: "/guide-gratuit" }]}
        />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Mockup du guide */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-xl3 glow-dore" aria-hidden />
              <div className="rotate-[-2deg] rounded-xl2 border border-dore/30 bg-casse p-7 shadow-float">
                <div className="flex items-center justify-between">
                  <Logo className="text-[1.1rem]" />
                  <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-label text-forest">
                    PDF · gratuit
                  </span>
                </div>
                <p className="mt-6 font-serif text-2xl font-semibold leading-snug text-anthracite">
                  Investir au Sénégal sans avancer à l&apos;aveugle
                </p>
                <p className="mt-2 text-sm text-pierre">Le guide diaspora — l&apos;essentiel avant de signer.</p>
                <ul className="mt-5 space-y-2.5">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-anthracite/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-valide/15 text-valide">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={100} className="order-1 lg:order-2">
            <h1 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.06] text-ivoire text-balance">
              Recevoir le guide pour investir au Sénégal avec méthode
            </h1>
            <p className="mt-4 max-w-md text-pretty text-ivoire/80">
              Tout ce qu&apos;il faut savoir avant d&apos;acheter, de construire ou d&apos;investir au
              Sénégal depuis l&apos;étranger. Clair, concret, sans jargon.
            </p>
            <div className="mt-6 rounded-xl3 border border-ivoire/15 bg-ivoire p-6 shadow-float sm:p-7">
              <GuideForm />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivoire/60">
              À titre indicatif. Ce guide ne remplace pas les vérifications d&apos;un notaire ou
              d&apos;un professionnel compétent.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
