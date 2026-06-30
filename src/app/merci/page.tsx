import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, BookOpen, Compass, ClipboardCheck } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Merci — votre demande est bien reçue",
  description: "Votre demande a bien été envoyée à l'équipe YOoN. On revient vers vous rapidement.",
  path: "/merci",
  noindex: true,
});

type Source = "guide" | "diagnostic" | "default";

const COPY: Record<Source, { title: string; text: string }> = {
  guide: {
    title: "Votre guide arrive — merci !",
    text: "Surveillez votre boîte mail (et vos spams). Pendant ce temps, faites le point sur votre projet : c'est le meilleur moyen d'avancer concrètement.",
  },
  diagnostic: {
    title: "Diagnostic reçu — merci de votre confiance.",
    text: "On étudie votre projet et on revient vers vous sous 48 h ouvrées avec une première lecture honnête. En attendant, le guide diaspora vous aidera à y voir plus clair.",
  },
  default: {
    title: "Bien reçu — merci de votre confiance.",
    text: "Votre demande est arrivée jusqu'à nous. On revient vers vous rapidement, avec des réponses claires.",
  },
};

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const { source: raw } = await searchParams;
  const source: Source = raw === "guide" || raw === "diagnostic" ? raw : "default";
  const copy = COPY[source];
  const wa = whatsappHref("Bonjour YOoN, je viens de vous envoyer une demande depuis le site.");

  // CTA croisé selon la source
  const cross =
    source === "guide"
      ? {
          icon: ClipboardCheck,
          title: "Faites le diagnostic de votre projet",
          text: "En 2 minutes, on vous dit où vous en êtes et quoi sécuriser en priorité.",
          href: "/diagnostic",
          cta: "Lancer le diagnostic",
          track: "merci_to_diagnostic",
        }
      : {
          icon: BookOpen,
          title: "Recevez le guide diaspora",
          text: "L'essentiel à connaître avant d'acheter ou de construire au Sénégal.",
          href: "/guide-gratuit",
          cta: "Recevoir le guide",
          track: "merci_to_guide",
        };

  const steps = [
    {
      icon: MessageCircle,
      title: "Continuer sur WhatsApp",
      text: "Le plus rapide pour avancer dès maintenant.",
      href: wa ?? "/contact",
      cta: "Ouvrir WhatsApp",
      track: "merci_whatsapp",
    },
    cross,
    {
      icon: Compass,
      title: "Découvrir la méthode",
      text: "Comment on cadre, vérifie et sécurise votre projet.",
      href: "/notre-methode",
      cta: "Notre méthode",
      track: "merci_methode",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ivoire">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 glow-forest" />
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-valide/12 text-valide">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] font-bold text-anthracite text-balance">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg text-anthracite/75">{copy.text}</p>

        <div className="mt-12 grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="flex flex-col rounded-xl3 border border-sable bg-casse p-6 text-left shadow-soft"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-forest">
                <s.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold text-anthracite">{s.title}</h2>
              <p className="mt-1.5 flex-1 text-sm text-anthracite/72">{s.text}</p>
              <Link
                href={s.href}
                data-cta={s.track}
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-forest hover:text-forest-deep"
              >
                {s.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href="/" variant="secondary" size="lg" track="merci_home">
            Retour à l&apos;accueil
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
