import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Section, SectionHeading, Card, Stamp } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTAButton } from "@/components/CTAButton";
import { ProjetForm } from "@/components/forms/ProjetForm";
import { FAQItem } from "@/components/FAQItem";
import { whatsappHref } from "@/lib/site";
import {
  VERBES,
  CONTROLES,
  EVIDENCES,
  SERVICES,
  FAQ,
} from "@/content";

/* ---------- Bandeau réassurance : 4 verbes ---------- */
export function ReassuranceStrip() {
  return (
    <Section tone="anthracite" cadastre className="py-12 sm:py-14">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {VERBES.map((v, i) => (
            <Reveal as="li" key={v.label} delay={i * 80} className="flex flex-col gap-3">
              <Icon name={v.icon} className="h-7 w-7 text-ocre" strokeWidth={1.6} />
              <p className="font-display text-lg font-semibold uppercase tracking-wide text-ivoire">
                {v.label}
              </p>
              <p className="text-sm leading-relaxed text-ivoire/65">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Les 3 contrôles ---------- */
export function MethodControls({
  withHeading = true,
  showLink = true,
}: {
  withHeading?: boolean;
  showLink?: boolean;
}) {
  return (
    <Section tone="ivoire" cadastre>
      <div className="shell">
        {withHeading && (
          <SectionHeading
            eyebrow="Notre méthode"
            number="01"
            title="Ce que je vérifie avant de te dire oui"
            intro="Trois contrôles, dans cet ordre. Tant qu'un doute sérieux n'est pas levé, on ne te dit pas oui."
          />
        )}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CONTROLES.map((c, i) => (
            <Reveal as="article" key={c.titre} delay={i * 90}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-token bg-forest/10 text-forest">
                    <Icon name={c.icon} className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-anthracite">
                    {c.titre}
                  </h3>
                </div>
                <p className="mt-4 text-pretty text-anthracite/75">{c.resume}</p>
                <ul className="mt-5 space-y-2.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-anthracite/80">
                      <ChevronRight
                        className="mt-0.5 h-4 w-4 flex-none text-ocre"
                        aria-hidden="true"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
        {showLink && (
          <div className="mt-10">
            <Link href="/notre-methode" className="link-underline text-base">
              Voir la méthode en détail <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------- Chaîne d'évidences ---------- */
export function EvidenceChain() {
  return (
    <Section tone="forest" cadastre>
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="La preuve, pas la promesse"
              tone="light"
              title="Chaque « oui » s'appuie sur une chaîne de preuves"
              intro="On ne te demande pas de nous croire. On te montre la trace, étape par étape."
            />
            <div className="mt-7">
              <Stamp />
            </div>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {EVIDENCES.map((e, i) => (
              <Reveal as="li" key={e.label} delay={i * 70}>
                <div className="flex items-center gap-3 rounded-token border border-ivoire/15 bg-ivoire/5 px-4 py-3.5">
                  <span className="font-serif text-lg font-semibold text-dore tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={e.icon} className="h-5 w-5 text-ivoire/70" strokeWidth={1.7} />
                  <span className="font-medium text-ivoire">{e.label}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Grille de services ---------- */
export function ServicesGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <Section tone="casse">
      <div className="shell">
        {withHeading && (
          <SectionHeading
            eyebrow="Services"
            number="03"
            title="Un accompagnement, pas un catalogue"
            intro="Tu choisis l'aide dont tu as besoin, du simple avis à l'accompagnement complet. Chaque prestation est concrète et livrable."
          />
        )}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="article" key={s.slug} delay={i * 70}>
              <Card className="flex h-full flex-col">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-token bg-ocre/12 text-ocre">
                  <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-anthracite">
                  {s.titre}
                </h3>
                <p className="mt-1.5 font-serif italic text-ocre-deep">{s.accroche}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-anthracite/75">
                  {s.description}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-sable pt-4">
                  {s.livrables.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-anthracite/80">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-valide" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
export function FaqSection() {
  return (
    <Section tone="ivoire">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Avant de te lancer"
          title="Les questions qu'on nous pose le plus"
          intro="On préfère lever les doutes tout de suite. Si la tienne n'est pas là, écris-nous."
        />
        <div>
          {FAQ.map((item, i) => (
            <FAQItem key={item.q} question={item.q} defaultOpen={i === 0}>
              {item.a}
            </FAQItem>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Section formulaire de demande (qualifiant) ---------- */
export function LeadFormSection() {
  const wa = whatsappHref(
    "Bonjour YOoN, je préfère échanger directement sur mon projet à Dakar."
  );
  return (
    <Section tone="sable" cadastre id="demande">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Parle-nous de ton projet"
            number="04"
            title="Dis-nous l'essentiel, on s'occupe du reste"
            intro="Quelques infos suffisent pour qu'on comprenne ton projet et qu'on revienne vers toi avec des réponses claires."
          />
          <p className="mt-6 font-serif text-xl italic text-forest">
            « Investir à distance ne veut pas dire investir à l&apos;aveugle. »
          </p>
          {wa && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-anthracite/70">
                Tu préfères discuter de vive voix ?
              </p>
              <CTAButton href={wa} variant="whatsapp" track="leadsection_whatsapp">
                Échanger sur WhatsApp
              </CTAButton>
            </div>
          )}
        </div>
        <div className="rounded-block border border-sable bg-casse p-6 shadow-card sm:p-8">
          <ProjetForm />
        </div>
      </div>
    </Section>
  );
}

/* ---------- Bande de conversion générique ---------- */
export function CTABand({
  title,
  text,
  primaryHref = "/contact",
  primaryLabel = "Faire vérifier mon bien",
  secondaryHref,
  secondaryLabel,
  track = "ctaband",
  attached = false,
}: {
  title: React.ReactNode;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  track?: string;
  /** Quand la bande suit directement une section de même couleur (vert) :
      supprime le padding haut pour éviter un double espace. */
  attached?: boolean;
}) {
  return (
    <Section tone="forest" cadastre className={attached ? "!pt-0" : "py-16"}>
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="hairline-gold mx-auto" />
          <h2 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold text-ivoire text-balance">
            {title}
          </h2>
          {text && <p className="mx-auto mt-5 max-w-xl text-pretty text-ivoire/80">{text}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href={primaryHref} variant="whatsapp" size="lg" track={`${track}_primary`}>
              {primaryLabel}
            </CTAButton>
            {secondaryHref && secondaryLabel && (
              <CTAButton
                href={secondaryHref}
                size="lg"
                variant="outline-light"
                track={`${track}_secondary`}
              >
                {secondaryLabel}
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
