import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { MessageCircle, CalendarClock, PhoneCall, Mail, MapPin, Clock, Languages } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading, Card } from "@/components/primitives";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { FaqSection } from "@/components/sections";
import { RappelForm } from "@/components/forms/RappelForm";
import { ProjetForm } from "@/components/forms/ProjetForm";
import { VerifBienForm } from "@/components/forms/VerifBienForm";
import {
  whatsappHref,
  whatsappDisplay,
  bookingHref,
  emailHref,
  siteConfig,
  PLACEHOLDERS,
} from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — fais vérifier ton bien ou réserve un appel",
  description:
    "Contacte YOoN Immobilier à Dakar : WhatsApp, appel découverte gratuit, ou formulaire. On t'accompagne pour acheter, investir, construire ou louer au Sénégal depuis la diaspora.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappHref("Bonjour YOoN, je souhaite échanger sur mon projet à Dakar.");
  const booking = bookingHref();
  const mail = emailHref("Demande de contact — site YOoN");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="On t'écoute. Choisis ce qui t'arrange."
        intro="WhatsApp pour aller vite, un appel découverte pour prendre le temps, ou un formulaire pour qu'on prépare déjà ton dossier. À toi de voir — on répond à tout."
        primary={{ href: "#projet", label: "Démarrer ma demande", track: "contact_header_cta" }}
        secondary={{ href: "#etre-rappele", label: "Être rappelé·e", track: "contact_header_rappel" }}
      />

      {/* Trois chemins de conversion */}
      <Section tone="casse" className="!py-14">
        <div className="shell grid gap-6 md:grid-cols-3">
          <Reveal>
            <Card className="flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-token bg-valide/12 text-valide">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-anthracite">
                WhatsApp direct
              </h2>
              <p className="mt-2 flex-1 text-sm text-anthracite/75">
                Le plus rapide. Écris-nous, on te répond comme à un proche.
              </p>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="contact_whatsapp"
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token bg-valide px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Écrire sur WhatsApp
                </a>
              ) : (
                <p className="mt-5 text-sm font-medium text-pierre">
                  {PLACEHOLDERS.coords}
                </p>
              )}
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card className="flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-token bg-forest/12 text-forest">
                <CalendarClock className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-anthracite">
                Appel découverte
              </h2>
              <p className="mt-2 flex-1 text-sm text-anthracite/75">
                20 minutes, gratuit, sans engagement. On répond à tes premières questions.
              </p>
              {booking ? (
                <a
                  href={booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="contact_booking"
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token bg-forest px-5 py-3 font-semibold text-ivoire transition-transform hover:-translate-y-0.5"
                >
                  Réserver un créneau
                </a>
              ) : (
                <a
                  href="#etre-rappele"
                  data-cta="contact_appel_rappel"
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token bg-forest px-5 py-3 font-semibold text-ivoire transition-transform hover:-translate-y-0.5"
                >
                  Demander à être rappelé·e
                </a>
              )}
            </Card>
          </Reveal>

          <Reveal delay={160}>
            <Card className="flex h-full flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-token bg-ocre/12 text-ocre">
                <PhoneCall className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-anthracite">
                Être rappelé·e
              </h2>
              <p className="mt-2 flex-1 text-sm text-anthracite/75">
                Laisse ton numéro et un créneau : on t&apos;appelle quand ça t&apos;arrange.
              </p>
              <a
                href="#etre-rappele"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token border border-anthracite/20 bg-ivoire px-5 py-3 font-semibold text-anthracite transition-colors hover:border-anthracite/40"
              >
                Demander un rappel
              </a>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Formulaire qualifiant principal */}
      <Section tone="ivoire" cadastre id="projet" className="scroll-mt-20">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Parle-nous de ton projet"
              title="Le formulaire qui nous fait gagner du temps — et à toi aussi"
              intro="Plus tu nous en dis, plus notre première réponse sera précise. Aucune info n'est obligatoire au-delà de l'essentiel."
            />
            <div className="mt-7 space-y-3.5 text-sm text-anthracite/75">
              {wa && (
                <p className="flex items-center gap-2.5">
                  <MessageCircle className="h-5 w-5 text-valide" aria-hidden="true" />
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="underline" data-cta="contact_info_whatsapp">
                    WhatsApp · {whatsappDisplay()}
                  </a>
                </p>
              )}
              {mail && (
                <p className="flex items-center gap-2.5">
                  <Mail className="h-5 w-5 text-ocre" aria-hidden="true" />
                  <a href={mail} className="underline" data-cta="contact_email">
                    {siteConfig.email}
                  </a>
                </p>
              )}
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-ocre" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-ocre" aria-hidden="true" />
                <span>{siteConfig.hours}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Languages className="h-5 w-5 text-ocre" aria-hidden="true" />
                <span>{siteConfig.languages.join(" · ")}</span>
              </p>
            </div>
          </div>
          <div className="rounded-block border border-sable bg-casse p-6 shadow-card sm:p-8">
            <ProjetForm />
          </div>
        </div>
      </Section>

      {/* Être rappelé + vérifier un bien */}
      <Section tone="casse">
        <div className="shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div id="etre-rappele" className="scroll-mt-28 rounded-block border border-sable bg-ivoire p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-anthracite">Être rappelé·e</h2>
              <p className="mt-2 text-anthracite/75">Le plus court. Trois champs, c&apos;est tout.</p>
              <div className="mt-6">
                <RappelForm />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div id="verifier" className="scroll-mt-28 rounded-block border border-sable bg-ivoire p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-anthracite">
                Faire vérifier un bien
              </h2>
              <p className="mt-2 text-anthracite/75">
                Tu as repéré une annonce ? Envoie-la, on la regarde.
              </p>
              <div className="mt-6">
                <VerifBienForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqSection />

      {/* Bannière large CTA — plans & clés (fond clair + voile ivoire côté texte) */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/img/plans-cles-banniere.webp"
          alt="Plans et clés — projet immobilier à Dakar"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ivoire/90 via-ivoire/55 to-ivoire/20"
        />
        <div className="shell relative py-16 sm:py-24">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-anthracite text-balance">
              Un projet immobilier au Sénégal ? Ne commencez pas seul.
            </h2>
            <p className="mt-4 text-pretty text-lg text-anthracite/75">
              Faites le point en 2 minutes : on vous dit où vous en êtes et ce qu&apos;il faut
              sécuriser en priorité.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/diagnostic" variant="primary" size="lg" track="contact_banner_diagnostic">
                Faire le diagnostic gratuit
              </CTAButton>
              {wa && (
                <CTAButton href={wa} variant="whatsapp" size="lg" track="contact_banner_whatsapp">
                  Parler de mon projet
                </CTAButton>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
