import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/primitives";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/CTAButton";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Diagnostic gratuit de votre projet immobilier au Sénégal",
  description:
    "En 2 minutes, faites le point sur votre projet immobilier au Sénégal. Diagnostic gratuit, première lecture honnête, réponse sous 48 h ouvrées. Sans engagement.",
  path: "/diagnostic",
});

const REASSURANCE = [
  "Réponse sous 48 h ouvrées",
  "Première lecture honnête de votre projet",
  "Aucune donnée revendue",
  "Sans engagement",
];

export default function DiagnosticPage() {
  const wa = whatsappHref("Bonjour YOoN, je souhaite parler de mon projet immobilier au Sénégal.");

  return (
    <Section tone="sable" cadastre className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 glow-forest" />
      <div className="shell">
        <Breadcrumb items={[{ name: "Accueil", path: "/" }, { name: "Diagnostic gratuit", path: "/diagnostic" }]} />

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow">Diagnostic projet</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.06] text-anthracite text-balance">
              Faites le diagnostic de votre projet immobilier au Sénégal
            </h1>
            <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-anthracite/75">
              Quelques questions simples pour comprendre votre situation et vous répondre
              précisément. Objectif : clarifier votre projet et réduire les angles morts, avant
              d&apos;engager quoi que ce soit.
            </p>
            <ul className="mt-7 space-y-3">
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-center gap-3 text-anthracite/80">
                  <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-valide/15 text-valide">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            {wa && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-anthracite/65">Vous préférez parler ?</p>
                <CTAButton href={wa} variant="whatsapp" track="diagnostic_page_whatsapp">
                  Parler de mon projet
                </CTAButton>
              </div>
            )}
          </div>

          <Reveal>
            <div className="rounded-xl3 border border-sable bg-casse p-6 shadow-float sm:p-8">
              <DiagnosticForm />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
