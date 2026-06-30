import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/primitives";

/** Gabarit sobre pour les pages légales (prose maîtrisée). */
export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        primary={{ href: "/contact", label: "Nous contacter", track: "legal_header_cta" }}
      />
      <Section tone="ivoire">
        <div className="shell">
          <div className="max-w-prose space-y-8 leading-relaxed text-anthracite/80 [&_a]:text-forest [&_a]:underline [&_h2]:mt-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-anthracite [&_p]:mt-3">
            {children}
          </div>
          {updated && (
            <p className="mt-12 text-sm text-pierre">Dernière mise à jour : {updated}</p>
          )}
        </div>
      </Section>
    </>
  );
}

export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-sable/60 px-1.5 py-0.5 text-sm italic text-pierre">
      {children} — en cours de finalisation
    </span>
  );
}
