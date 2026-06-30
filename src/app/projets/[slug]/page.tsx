import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FileCheck2, HardHat, Trees, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { ProjetLeadForm } from "@/components/forms/ProjetLeadForm";
import { PROJET_SLUGS, getProjet, STATUT_LABEL, type ProjetStatut } from "@/content/projets";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return PROJET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) return {};
  const cover = projet.imagesApres[0] ?? projet.imagesAvant[0];
  return buildMetadata({
    title: `${projet.titre} — projet YOoN`,
    description: projet.pitch,
    path: `/projets/${projet.slug}`,
    type: "article",
    image: cover?.src,
  });
}

const BADGE: Record<ProjetStatut, string> = {
  en_cours: "bg-ocre/12 text-ocre-deep",
  livre: "bg-valide/15 text-valide",
  bientot: "bg-forest/10 text-forest",
};

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projet = getProjet(slug);
  if (!projet) notFound();

  const cover = projet.imagesApres[0] ?? projet.imagesAvant[0];
  const controles = [
    { icon: FileCheck2, titre: "Les papiers", texte: projet.pointsVerifies.papiers },
    { icon: HardHat, titre: "La structure", texte: projet.pointsVerifies.structure },
    { icon: Trees, titre: "L'environnement", texte: projet.pointsVerifies.environnement },
  ];

  return (
    <>
      {/* Hero projet */}
      <section className="relative isolate overflow-hidden bg-ivoire">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
        <div className="shell py-14 sm:py-20">
          <div className="max-w-3xl">
            <Breadcrumb
              className="mb-5"
              items={[
                { name: "Accueil", path: "/" },
                { name: "Nos projets", path: "/projets" },
                { name: projet.titre, path: `/projets/${projet.slug}` },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", BADGE[projet.statut])}>
                {STATUT_LABEL[projet.statut]}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-pierre">
                <MapPin className="h-4 w-4 text-ocre" aria-hidden="true" /> {projet.zone}
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] text-anthracite text-balance">
              {projet.titre}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-anthracite/75">
              {projet.pitch}
            </p>
          </div>

          {cover && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-block border border-sable shadow-card">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Récit + encart vérifié */}
      <Section tone="casse">
        <div className="shell grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <article className="min-w-0 max-w-prose">
            <h2 className="font-display text-2xl font-semibold text-anthracite">L&apos;histoire du projet</h2>
            {projet.histoire.map((p, i) => (
              <p key={i} className="mt-3 text-pretty leading-relaxed text-anthracite/80">
                {p}
              </p>
            ))}
          </article>

          {/* Encart « Ce qu'on a vérifié » — signature YOoN */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl3 border border-forest/20 bg-forest/5 p-6 sm:p-7">
              <p className="eyebrow text-forest">Ce qu&apos;on a vérifié</p>
              <ul className="mt-5 space-y-5">
                {controles.map((c) => (
                  <li key={c.titre} className="flex gap-3">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-forest/10 text-forest">
                      <c.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-anthracite">{c.titre}</p>
                      <p className="mt-1 text-sm leading-relaxed text-anthracite/75">{c.texte}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Galerie avant / après */}
      <Section tone="ivoire" cadastre>
        <div className="shell">
          <SectionHeading
            eyebrow="Avant / après"
            title="Le point de départ, et l'intention de résultat"
            intro="À gauche, l'état réel à la reprise (sans le maquiller). À droite, les rendus d'architecture — l'intention de résultat."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Avant */}
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-anthracite/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-label text-anthracite/70">
                Avant
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {projet.imagesAvant.map((img) => (
                  <Reveal as="figure" key={img.src}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-sable shadow-soft">
                      <Image src={img.src} alt={img.alt} fill loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            {/* Après */}
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-label text-forest">
                Après — rendus
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {projet.imagesApres.map((img) => (
                  <Reveal as="figure" key={img.src}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-sable shadow-soft">
                      <Image src={img.src} alt={img.alt} fill loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm italic text-pierre">
            Les rendus illustrent l&apos;intention de résultat. Toute information ou disponibilité est
            communiquée à titre indicatif et reste soumise à vérification.
          </p>
        </div>
      </Section>

      {/* Capture de lead */}
      <Section tone="sable" cadastre>
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeading
              eyebrow="Ce projet t'intéresse ?"
              title="Sois tenu·e au courant des prochaines étapes"
              intro="Laisse-nous tes coordonnées : on te partage l'avancement et les disponibilités éventuelles, à titre indicatif et sans engagement."
            />
          </div>
          <div className="rounded-xl3 border border-sable bg-casse p-6 shadow-float sm:p-8">
            <ProjetLeadForm projet={projet.titre} />
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Nos projets", path: "/projets" },
            { name: projet.titre, path: `/projets/${projet.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: projet.titre,
            description: projet.pitch,
            ...(cover ? { image: `${siteConfig.url}${cover.src}` } : {}),
            url: `${siteConfig.url}/projets/${projet.slug}`,
            creator: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            locationCreated: { "@type": "Place", name: projet.zone },
          },
        ]}
      />
    </>
  );
}
