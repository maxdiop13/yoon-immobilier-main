import { LocationPill } from "@/components/primitives";
import { CTAButton } from "@/components/CTAButton";
import { HeroMedia } from "@/components/HeroMedia";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import {
  SituationsSection,
  ProblemSection,
  MethodTimelineSection,
  GuideMagnetSection,
  DiagnosticSection,
  ProofSection,
  FinalCTASection,
} from "@/components/home";
import { HERO_TRUST } from "@/content";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO premium — video-ready (poster façade tant que HERO_VIDEO_SRC est vide) */}
      <section className="relative isolate flex min-h-[660px] items-end overflow-hidden md:min-h-[90vh]">
        <HeroMedia
          poster="/img/facade.webp"
          alt="Façade de l'immeuble YOoN Immobilier — Maison Diaspora à Ouest Foire, Dakar"
        />
        <div className="shell w-full pb-14 pt-32 sm:pb-20 md:pb-24">
          <div className="max-w-2xl">
            <Reveal>
              <LocationPill tone="light">Dakar — Sénégal</LocationPill>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[clamp(2.3rem,6vw,4.25rem)] font-bold leading-[1.04] text-ivoire text-balance">
                Investir au Sénégal,
                <br />
                <span className="text-ocre">sans te faire avoir.</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ivoire/85 sm:text-xl">
                YOoN accompagne la diaspora dans ses projets immobiliers au Sénégal : achat,
                construction, vérification, suivi et mise en relation locale.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/diagnostic" variant="primary" size="lg" track="hero_evaluer">
                  Évaluer mon projet
                </CTAButton>
                <CTAButton href="/guide-gratuit" variant="outline-light" size="lg" track="hero_guide">
                  Recevoir le guide gratuit
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                {HERO_TRUST.map((t) => (
                  <li key={t.label} className="inline-flex items-center gap-2 text-ivoire/90">
                    <Icon name={t.icon} className="h-4 w-4 text-dore" strokeWidth={2} />
                    <span className="text-sm font-medium">{t.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 → 8 */}
      <SituationsSection />
      <ProblemSection />
      <MethodTimelineSection />
      <GuideMagnetSection />
      <DiagnosticSection />
      <ProofSection />
      <FinalCTASection />
    </>
  );
}
