"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/CTAButton";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Verrouille le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-ivoire/90 backdrop-blur-md transition-shadow duration-300",
        scrolled || open ? "border-b border-sable/80 shadow-soft" : "border-b border-sable/40"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="flex items-center rounded-sm py-2"
          aria-label="YOoN Immobilier — accueil"
        >
          <Logo className="text-[1.15rem] sm:text-[1.25rem]" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-token px-3 py-2 text-[0.95rem] font-medium transition-colors",
                      active
                        ? "text-forest"
                        : "text-anthracite/75 hover:text-anthracite"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <CTAButton href="/diagnostic" variant="primary" size="md" track="header_diagnostic">
            Diagnostic gratuit
          </CTAButton>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-token text-anthracite xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="xl:hidden"
        >
          <nav
            aria-label="Navigation mobile"
            className="shell flex flex-col gap-1 border-t border-sable/70 pb-8 pt-4"
          >
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-token px-3 py-3 text-lg font-medium",
                    active ? "bg-forest/8 text-forest" : "text-anthracite"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <CTAButton
              href="/diagnostic"
              variant="primary"
              size="lg"
              className="mt-3 w-full"
              track="header_mobile_diagnostic"
            >
              Diagnostic gratuit
            </CTAButton>
          </nav>
        </div>
      )}
    </header>
  );
}
