import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-ivoire">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cadastre-soft" />
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <Logo className="text-[1.4rem]" />
        <p className="mt-10 font-serif text-7xl font-semibold text-forest tnum">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-anthracite text-balance">
          On a cherché. Cette page n&apos;existe pas (encore).
        </h1>
        <p className="mt-4 max-w-md text-pretty text-anthracite/75">
          Le lien est peut-être cassé ou la page a été déplacée. Reviens en terrain connu.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTAButton href="/" variant="primary" size="lg" track="404_home">
            Retour à l&apos;accueil
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg" track="404_contact">
            Nous contacter
          </CTAButton>
        </div>
        <nav aria-label="Pages principales" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-forest underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
