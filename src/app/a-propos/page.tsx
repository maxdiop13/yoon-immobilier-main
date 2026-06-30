import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading, Card } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/sections";
import { X, Check } from "lucide-react";
import { VALEURS } from "@/content";

export const metadata: Metadata = buildMetadata({
  title: "À propos — Mohamed, ton œil sur place à Dakar",
  description:
    "YOoN, c'est Mohamed : un relais de confiance sur place à Dakar pour la diaspora. Notre intention, nos valeurs — confiance, terrain, modernité africaine — et nos lignes rouges.",
  path: "/a-propos",
});

const LIGNES_ROUGES = [
  "On ne vend pas du rêve, ni « l'affaire en or »",
  "On ne promet jamais un rendement garanti",
  "On ne dit pas « fais-moi confiance » : on prouve",
  "On ne cache pas un défaut pour conclure",
  "On ne donne pas de chiffre précis non vérifié",
];

const ENGAGEMENTS = [
  "On te dit la vérité, même quand elle ne t'arrange pas",
  "On appuie chaque constat sur des preuves datées",
  "On recommande un notaire pour ce qui doit l'être",
  "On présente les opportunités à titre indicatif",
  "On reste joignables, simplement, sur WhatsApp",
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une intention simple : être tes yeux ici"
        intro="YOoN est né d'un constat : trop de membres de la diaspora se font avoir à distance. Pas par manque d'argent, mais par manque d'information fiable. On a décidé d'être ce relais de confiance, sur place, à Dakar."
        primary={{ href: "/contact", label: "Faire connaissance", track: "apropos_header_cta" }}
      />

      {/* Mohamed */}
      <Section tone="casse">
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-xs items-center justify-center overflow-hidden rounded-block border border-sable bg-sable/40">
              <div className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ocre/50 font-serif text-2xl font-semibold text-ocre">
                  M
                </span>
                <p className="mt-4 px-6 text-sm text-pierre">
                  Mohamed
                  <br />
                  <span className="text-pierre/70">sur le terrain, à Dakar</span>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Mohamed"
              title="« Mon métier, c'est d'être tes yeux ici. »"
              intro="Mohamed vit et travaille à Dakar. Il connaît les quartiers, les vendeurs, les artisans et les rouages administratifs. Là où d'autres envoient une brochure, lui se déplace, regarde, touche, vérifie — et te rapporte la réalité, comme un grand frère de confiance."
            />
            <p className="mt-5 text-pretty text-anthracite/75">
              Ce n&apos;est pas un agent de catalogue ni un influenceur lifestyle. C&apos;est un
              relais de terrain, dont le seul capital est la confiance qu&apos;il inspire dans la
              durée.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Valeurs */}
      <Section tone="ivoire" cadastre>
        <div className="shell">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Confiance · Terrain · Modernité africaine"
            intro="Trois mots-piliers qui guident chaque décision, du choix d'un mot à celui d'une recommandation."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALEURS.map((v, i) => (
              <Reveal as="article" key={v.titre} delay={i * 80}>
                <Card className="h-full">
                  <span className="font-serif text-3xl font-semibold text-ocre tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-anthracite">
                    {v.titre}
                  </h3>
                  <p className="mt-2 text-pretty text-anthracite/75">{v.texte}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Lignes rouges / engagements */}
      <Section tone="anthracite" cadastre>
        <div className="shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-block border border-alerte/30 bg-alerte/8 p-7 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ivoire">Nos lignes rouges</h2>
              <p className="mt-2 text-sm text-ivoire/65">Ce qu&apos;on ne fera jamais.</p>
              <ul className="mt-6 space-y-3">
                {LIGNES_ROUGES.map((l) => (
                  <li key={l} className="flex gap-3 text-ivoire/85">
                    <X className="mt-0.5 h-5 w-5 flex-none text-alerte" aria-hidden="true" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-block border border-valide/30 bg-valide/8 p-7 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ivoire">Nos engagements</h2>
              <p className="mt-2 text-sm text-ivoire/65">Ce sur quoi tu peux compter.</p>
              <ul className="mt-6 space-y-3">
                {ENGAGEMENTS.map((l) => (
                  <li key={l} className="flex gap-3 text-ivoire/85">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-valide" aria-hidden="true" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Connaissance du terrain — quartiers & cadastre */}
      <Section tone="casse">
        <div className="shell">
          <Reveal>
            <div className="overflow-hidden rounded-block border border-sable shadow-card">
              <Image
                src="/img/etude-zones-cadastre.webp"
                alt="Étude des quartiers et du cadastre de Dakar"
                width={1920}
                height={1072}
                loading="lazy"
                sizes="100vw"
                className="h-full max-h-[440px] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="On se parle ?"
        text="Le premier échange est gratuit et sans engagement. Juste une conversation, d'humain à humain."
        primaryLabel="Réserver un appel découverte"
        primaryHref="/contact"
        track="apropos_band"
      />
    </>
  );
}
