import { LocationPill } from "@/components/primitives";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

/**
 * En-tête de page interne — sobre, cohérent, avec H1 unique par page.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  showLocation = false,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  showLocation?: boolean;
  primary?: { href: string; label: string; track?: string };
  secondary?: { href: string; label: string; track?: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ivoire">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
      <div className="shell py-14 sm:py-20">
        <div className="max-w-3xl">
          {showLocation && (
            <Reveal>
              <LocationPill tone="dark" />
            </Reveal>
          )}
          <Reveal delay={showLocation ? 80 : 0}>
            <p className="eyebrow mt-6 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.04] text-anthracite text-balance">
              {title}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={180}>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-anthracite/75">
                {intro}
              </p>
            </Reveal>
          )}
          {(primary || secondary) && (
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                {primary && (
                  <CTAButton href={primary.href} variant="primary" size="lg" track={primary.track}>
                    {primary.label}
                  </CTAButton>
                )}
                {secondary && (
                  <CTAButton
                    href={secondary.href}
                    variant="secondary"
                    size="lg"
                    track={secondary.track}
                  >
                    {secondary.label}
                  </CTAButton>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
