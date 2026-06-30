import Link from "next/link";
import { MessageCircle, Mail, MapPin, Languages } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  FOOTER_LINKS,
  siteConfig,
  whatsappHref,
  whatsappDisplay,
  emailHref,
} from "@/lib/site";

export function Footer() {
  const wa = whatsappHref();
  const mail = emailHref();

  return (
    <footer className="relative isolate overflow-hidden bg-anthracite text-ivoire">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cadastre-light" />
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque + promesse */}
          <div>
            <Logo tone="light" className="text-[1.3rem]" />
            <p className="mt-5 max-w-sm text-pretty text-ivoire/70">
              Ton relais de confiance sur place à Dakar. On visite, on vérifie, on
              documente — et on te dit la vérité, même quand elle ne t&apos;arrange pas.
            </p>
            <p className="mt-5 font-serif text-lg italic text-dore">
              « Avant de te dire oui, je vérifie. »
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Plan du site">
            <h2 className="eyebrow text-ivoire/60">Le site</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivoire/80 transition-colors hover:text-ivoire"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-ivoire/60">Contact</h2>
            <ul className="mt-4 space-y-3.5">
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-ivoire/80 transition-colors hover:text-ivoire"
                    data-cta="footer_whatsapp"
                  >
                    <MessageCircle className="h-5 w-5 text-valide" aria-hidden="true" />
                    WhatsApp · {whatsappDisplay()}
                  </a>
                </li>
              )}
              {mail && (
                <li>
                  <a
                    href={mail}
                    className="inline-flex items-center gap-2.5 text-ivoire/80 transition-colors hover:text-ivoire"
                    data-cta="footer_email"
                  >
                    <Mail className="h-5 w-5 text-ocre" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </li>
              )}
              <li className="inline-flex items-start gap-2.5 text-ivoire/70">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-ocre" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="inline-flex items-start gap-2.5 text-ivoire/70">
                <Languages className="mt-0.5 h-5 w-5 flex-none text-ocre" aria-hidden="true" />
                <span>{siteConfig.languages.join(" · ")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + bas de page */}
        <div className="mt-14 border-t border-ivoire/12 pt-7">
          <p className="text-pretty text-sm leading-relaxed text-ivoire/55">
            Les informations diffusées sur ce site sont d&apos;ordre général et fournies à
            titre indicatif. Elles ne constituent pas un conseil juridique, fiscal ou
            notarial et ne remplacent pas l&apos;avis d&apos;un notaire ou d&apos;un avocat.
            Toute opportunité présentée l&apos;est sous réserve de vérification.
          </p>
          <p className="mt-4 text-sm text-ivoire/45">
            {siteConfig.name} est le nom commercial de {siteConfig.company.legalName}.
          </p>
          <div className="mt-6 flex flex-col gap-4 text-sm text-ivoire/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.company.legalName}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/mentions-legales" className="hover:text-ivoire">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="hover:text-ivoire">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
