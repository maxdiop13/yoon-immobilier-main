import { CTAButton } from "@/components/CTAButton";
import { GuideForm } from "@/components/forms/GuideForm";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Rangée de CTA d'acquisition : diagnostic + WhatsApp. */
export function LeadCTARow({
  track = "lead",
  className,
}: {
  track?: string;
  className?: string;
}) {
  const wa = whatsappHref("Bonjour YOoN, je vous contacte au sujet d'un projet au Sénégal.");
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <CTAButton href="/diagnostic" variant="primary" track={`${track}_diagnostic`}>
        Faire le diagnostic gratuit
      </CTAButton>
      {wa && (
        <CTAButton href={wa} variant="whatsapp" track={`${track}_whatsapp`}>
          Parler sur WhatsApp
        </CTAButton>
      )}
    </div>
  );
}

/** Encart « Recevoir le guide diaspora » (lead magnet réutilisable). */
export function GuideEncart() {
  return (
    <aside
      id="guide"
      className="relative scroll-mt-24 overflow-hidden rounded-xl3 border border-forest-deep/40 bg-forest p-7 text-ivoire shadow-card sm:p-9"
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 glow-dore" />
      <span className="hairline-gold" />
      <h2 className="mt-4 font-display text-2xl font-semibold text-ivoire">
        Recevoir le guide diaspora
      </h2>
      <p className="mt-2 max-w-md text-pretty text-ivoire/80">
        « Investir au Sénégal sans se faire avoir » : l&apos;essentiel à connaître avant de signer,
        clair et sans jargon. Gratuit, désinscription en un clic.
      </p>
      <div className="mt-6 rounded-xl2 bg-ivoire p-5 shadow-float sm:p-6">
        <GuideForm />
      </div>
    </aside>
  );
}
