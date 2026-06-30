import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/primitives";
import {
  ReassuranceStrip,
  MethodControls,
  EvidenceChain,
  CTABand,
} from "@/components/sections";

export const metadata: Metadata = buildMetadata({
  title: "Notre méthode — ce que je vérifie avant de te dire oui",
  description:
    "Papiers, structure, environnement : les 3 contrôles de YOoN et la chaîne de preuves (photo, vidéo datée, document source, vérification, rapport) avant tout achat à Dakar.",
  path: "/notre-methode",
});

export default function MethodePage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre méthode"
        title="Ce que je vérifie avant de te dire oui"
        intro="Pas de magie, pas de discours. Une méthode simple et tenace : on regarde, on contrôle, on documente — et on ne valide rien tant qu'un doute sérieux n'est pas levé."
        primary={{ href: "/contact", label: "Faire vérifier mon bien", track: "methode_header_cta" }}
        secondary={{ href: "/services", label: "Voir les services", track: "methode_header_services" }}
      />

      <Section tone="ivoire" className="!pt-0">
        <div className="shell">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-block border border-sable shadow-card sm:aspect-[2.6/1]">
            <Image
              src="/img/methode-4-etapes.webp"
              alt="Les 4 étapes de la méthode YOoN : lecture du dossier, vérification terrain, rapport, décision"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <ReassuranceStrip />

      <MethodControls withHeading showLink={false} />

      <Section tone="casse">
        <div className="shell">
          <div className="mx-auto grid max-w-4xl items-center gap-8 sm:grid-cols-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-block border border-sable shadow-card">
              <Image
                src="/img/verification-documents.webp"
                alt="Examen à la loupe des documents d'un bien"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">Vérification documentaire</p>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-anthracite/75">
                Un document ne se croit pas, il se contrôle : statut foncier, cohérence avec le
                cadastre, charges éventuelles. On lit, on recoupe, et on signale ce qui doit passer
                par un notaire.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <EvidenceChain />

      <CTABand
        attached
        title="Un doute sur un bien ? On lève le doute."
        text="Envoie-nous le bien que tu vises. On te dit ce qu'on en pense, preuves à l'appui."
        primaryLabel="Faire vérifier mon bien"
        primaryHref="/contact"
        secondaryLabel="Réserver un appel découverte"
        secondaryHref="/contact"
        track="methode_band"
      />
    </>
  );
}
