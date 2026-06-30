import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, FileText, AlertTriangle } from "lucide-react";
import { Section, SectionHeading, Stamp } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/CTAButton";
import { GuideForm } from "@/components/forms/GuideForm";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { whatsappHref } from "@/lib/site";
import {
  SITUATIONS,
  RISQUES,
  METHODE_ETAPES,
  PROOF_POINTS,
} from "@/content";
import { cn } from "@/lib/cn";

/* ============================================================
   2. BLOC SITUATIONS — portes d'entrée par besoin
   ============================================================ */
export function SituationsSection() {
  return (
    <Section tone="casse" className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 -z-10 h-80 w-80 glow-ocre" />
      <div className="shell">
        <SectionHeading
          eyebrow="Par où tu commences"
          number="01"
          title="Quel que soit ton point de départ, on avance avec toi"
          intro="Chaque projet est différent. Dis-nous le tien : on adapte la méthode, jamais l'inverse."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SITUATIONS.map((s, i) => (
            <Reveal
              as="article"
              key={s.titre}
              delay={(i % 2) * 90}
              className={cn(i % 2 === 1 && "sm:mt-10")}
            >
              <Link
                href="/diagnostic"
                data-cta={`situation_${i}`}
                className="group flex h-full flex-col rounded-xl3 border border-sable bg-ivoire p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-float sm:p-8"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest transition-colors group-hover:bg-forest group-hover:text-ivoire">
                  <Icon name={s.icon} className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-anthracite">
                  {s.titre}
                </h3>
                <p className="mt-2.5 flex-1 text-pretty text-anthracite/72">{s.texte}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-forest">
                  {s.cta}
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
  );
}

/* ============================================================
   3. BLOC PROBLÈME — éditorial, lucide
   ============================================================ */
export function ProblemSection() {
  return (
    <Section tone="anthracite" cadastre className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-96 w-96 glow-ocre opacity-70" />
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="eyebrow text-ocre">Le vrai risque</p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.1] text-ivoire text-balance">
            Au Sénégal, le bon projet peut vite devenir un{" "}
            <span className="text-ocre">mauvais dossier</span>.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-ivoire/75">
            Le problème n&apos;est presque jamais le bien. C&apos;est ce qu&apos;on ne te dit pas, ce
            que tu ne peux pas vérifier à distance. Notre rôle : transformer ces angles morts en
            informations claires.
          </p>
          <div className="mt-7">
            <Stamp label="On réduit le risque, on ne le cache pas" />
          </div>
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-block border border-ivoire/10 shadow-lift">
            <Image
              src="/img/reperage-immeuble-dakar.webp"
              alt="Repérage d'un immeuble neuf dans une rue de Dakar"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="space-y-2.5">
            {RISQUES.map((r) => (
              <li
                key={r.titre}
                className="flex gap-4 rounded-2xl border border-ivoire/12 bg-ivoire/5 p-4 backdrop-blur-sm transition-colors hover:bg-ivoire/8"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-ocre/15 text-ocre">
                  <AlertTriangle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-semibold text-ivoire">{r.titre}</p>
                  <p className="text-sm text-ivoire/65">{r.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   4. BLOC MÉTHODE — timeline alternée premium
   ============================================================ */
export function MethodTimelineSection() {
  return (
    <Section tone="ivoire" cadastre>
      <div className="shell">
        <SectionHeading
          eyebrow="La méthode YOoN"
          number="02"
          align="center"
          title="Une méthode claire, du premier appel au reporting"
          intro="Six étapes, toujours dans le même ordre. À chaque étape, tu sais ce qu'on fait — et pourquoi."
        />

        <Reveal className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-block border border-sable shadow-card">
          <Image
            src="/img/methode-4-etapes.webp"
            alt="Les 4 étapes de la méthode YOoN : lecture du dossier, vérification terrain, rapport, décision"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Ligne centrale (desktop) */}
          <span
            aria-hidden
            className="absolute left-[27px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-ocre/0 via-ocre/40 to-ocre/0 lg:left-1/2 lg:block lg:-translate-x-1/2"
          />
          <ol className="space-y-6 lg:space-y-10">
            {METHODE_ETAPES.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  as="li"
                  key={e.titre}
                  delay={(i % 2) * 80}
                  className="relative flex gap-5 lg:grid lg:grid-cols-[1fr_56px_1fr] lg:items-center lg:gap-8"
                >
                  {/* Pastille numéro */}
                  <div className="flex-none lg:col-start-2 lg:flex lg:justify-center">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-ocre/30 bg-ivoire font-serif text-xl font-semibold text-ocre shadow-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Carte étape */}
                  <div
                    className={cn(
                      "flex-1",
                      left ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
                    )}
                  >
                    <div className="rounded-xl2 border border-sable bg-casse p-5 shadow-soft transition-shadow hover:shadow-card sm:p-6">
                      <div
                        className={cn(
                          "flex items-center gap-3",
                          left && "lg:flex-row-reverse"
                        )}
                      >
                        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-forest/10 text-forest">
                          <Icon name={e.icon} className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <h3 className="font-display text-lg font-semibold text-anthracite">
                          {e.titre}
                        </h3>
                      </div>
                      <p className="mt-2.5 text-pretty text-sm leading-relaxed text-anthracite/72">
                        {e.texte}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   5. BLOC LEAD MAGNET — guide gratuit
   ============================================================ */
export function GuideMagnetSection() {
  return (
    <Section tone="forest" cadastre id="guide" className="scroll-mt-20 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 glow-dore" />
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Couverture du guide (décorative) */}
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
                Investir au Sénégal sans te faire avoir
              </p>
              <p className="mt-2 text-sm text-pierre">Le guide diaspora — l&apos;essentiel avant de signer.</p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Les documents à exiger avant tout",
                  "Comprendre le statut foncier",
                  "Les 7 pièges les plus fréquents",
                  "Ta checklist « avant d'acheter »",
                ].map((l) => (
                  <li key={l} className="flex items-center gap-2.5 text-sm text-anthracite/80">
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-valide/15 text-valide">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Formulaire */}
        <Reveal delay={100} className="order-1 lg:order-2">
          <span className="hairline-gold" />
          <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold text-ivoire text-balance">
            Reçois le guide gratuit
          </h2>
          <p className="mt-3 max-w-md text-pretty text-ivoire/80">
            Tout ce qu&apos;il faut savoir avant d&apos;acheter, de construire ou d&apos;investir au
            Sénégal depuis l&apos;étranger. Clair, concret, sans jargon.
          </p>
          <div className="mt-6 rounded-xl3 border border-ivoire/15 bg-ivoire p-6 shadow-float sm:p-7">
            <GuideForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   6. BLOC DIAGNOSTIC — mini-qualification multi-étapes
   ============================================================ */
export function DiagnosticSection() {
  const wa = whatsappHref("Bonjour YOoN, je préfère échanger directement sur mon projet.");
  return (
    <Section tone="sable" cadastre id="diagnostic" className="scroll-mt-20 overflow-hidden">
      <div className="shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24">
          <SectionHeading
            eyebrow="Diagnostic projet"
            number="03"
            title="En 2 minutes, dis-nous où tu en es"
            intro="Quelques questions simples pour comprendre ton projet et te répondre précisément. Gratuit, sans engagement."
          />
          <ul className="mt-7 space-y-3">
            {["Réponse sous 48 h ouvrées", "Première lecture honnête de ton projet", "Aucune donnée revendue"].map(
              (l) => (
                <li key={l} className="flex items-center gap-3 text-anthracite/80">
                  <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-valide/15 text-valide">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {l}
                </li>
              )
            )}
          </ul>
          {wa && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-anthracite/65">Tu préfères parler ?</p>
              <CTAButton href={wa} variant="whatsapp" track="diagnostic_whatsapp">
                Parler à un conseiller
              </CTAButton>
            </div>
          )}
        </div>

        <Reveal delay={80}>
          <div className="rounded-xl3 border border-sable bg-casse p-6 shadow-float sm:p-8">
            <DiagnosticForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================
   7. BLOC PREUVE / CONFIANCE (+ projet pilote + Mohamed)
   ============================================================ */
export function ProofSection() {
  return (
    <Section tone="ivoire" className="overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow="Pourquoi nous faire confiance"
          number="04"
          align="center"
          title="Une conciergerie, pas un démarcheur"
          intro="Pas de promesses en l'air : une méthode, des preuves et un interlocuteur qui répond."
        />

        <Reveal className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-block border border-sable shadow-card sm:aspect-[2.4/1]">
          <Image
            src="/img/accompagnement-couple.webp"
            alt="Accompagnement d'un couple de la diaspora dans son projet à Dakar"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </Reveal>

        {/* Points de réassurance */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROOF_POINTS.map((p, i) => (
            <Reveal as="article" key={p.titre} delay={(i % 5) * 60}>
              <div className="flex h-full flex-col rounded-xl2 border border-sable bg-casse p-5 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocre/12 text-ocre">
                  <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-anthracite">
                  {p.titre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-anthracite/70">{p.texte}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Projet accompagné (Ouest Foire) + Mohamed */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Link
              href="/ouest-foire"
              data-cta="proof_ouestfoire"
              className="group relative block overflow-hidden rounded-xl3 border border-sable shadow-card"
            >
              <Image
                src="/img/facade.webp"
                alt="Projet pilote YOoN à Ouest Foire, Dakar — immeuble rénové"
                width={1122}
                height={1402}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-80"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-anthracite/85 via-anthracite/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-label text-dore">
                    Projet accompagné · réel
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-semibold text-ivoire">
                    Ouest Foire — Dakar
                  </p>
                  <p className="mt-1 max-w-md text-sm text-ivoire/80">
                    Notre projet pilote : un immeuble acheté, vérifié et rénové selon la méthode.
                  </p>
                </div>
                <span className="hidden flex-none items-center gap-1.5 rounded-full bg-ivoire/15 px-4 py-2 text-sm font-semibold text-ivoire backdrop-blur transition-colors group-hover:bg-ivoire/25 sm:inline-flex">
                  Voir <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-xl3 border border-sable bg-forest p-7 text-ivoire shadow-card sm:p-8">
              <div>
                <div className="flex items-center gap-4">
                  {/* Portrait Mohamed manquant — placeholder propre */}
                  <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-dore/50 font-serif text-xl font-semibold text-dore">
                    M
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">Mohamed</p>
                    <p className="text-sm text-ivoire/70">Ton interlocuteur sur place · Dakar</p>
                  </div>
                </div>
                <p className="mt-5 font-serif text-xl italic leading-snug text-ivoire">
                  « Mon métier, c&apos;est d&apos;être tes yeux ici. »
                </p>
                <p className="mt-3 text-sm text-ivoire/75">
                  Un seul interlocuteur, qui connaît ton dossier de A à Z et te dit la vérité.
                </p>
              </div>
              <Link
                href="/a-propos"
                data-cta="proof_mohamed"
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-dore transition-colors hover:text-ivoire"
              >
                Faire connaissance <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-center text-sm text-pierre">
          Les témoignages clients seront publiés ici, avec leur accord — aucun avis n&apos;est inventé.
        </p>
      </div>
    </Section>
  );
}

/* ============================================================
   8. CTA FINAL
   ============================================================ */
export function FinalCTASection() {
  const wa = whatsappHref("Bonjour YOoN, j'ai un projet au Sénégal et j'aimerais en parler.");
  return (
    <Section tone="anthracite" cadastre className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 glow-forest" />
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <FileText className="mx-auto h-9 w-9 text-dore" strokeWidth={1.6} aria-hidden="true" />
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.06] text-ivoire text-balance">
            Tu as un projet au Sénégal ?
            <br />
            <span className="text-dore">Ne commence pas seul.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ivoire/80">
            Un échange suffit pour y voir clair. On t&apos;aide à cadrer, vérifier et avancer
            sereinement — sans pression et sans engagement.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CTAButton href="/diagnostic" variant="whatsapp" size="lg" track="final_evaluer">
              Faire évaluer mon projet
            </CTAButton>
            {wa && (
              <CTAButton href={wa} variant="outline-light" size="lg" track="final_conseiller">
                Parler à un conseiller
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
