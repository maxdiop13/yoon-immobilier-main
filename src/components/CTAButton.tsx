import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "outline-light";
type Size = "md" | "lg";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Hook d'événement analytics (posé en data-cta). */
  track?: string;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-token font-sans font-semibold " +
  "min-h-[44px] transition-all duration-200 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none text-balance";

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

const variants: Record<Variant, string> = {
  // Vert profond — couleur de marque (CTA primaire)
  primary:
    "bg-forest text-ivoire shadow-soft hover:bg-forest-deep hover:shadow-card hover:-translate-y-0.5",
  // Contour anthracite sobre (CTA secondaire)
  secondary:
    "border border-anthracite/20 bg-casse/60 text-anthracite hover:border-anthracite/40 hover:bg-casse",
  // Lien-bouton discret
  ghost: "text-forest hover:bg-forest/8",
  // Contour clair, sur média/fond sombre
  "outline-light":
    "border border-ivoire/40 bg-ivoire/10 text-ivoire backdrop-blur-sm hover:bg-ivoire/20",
  // WhatsApp — vert de validation, jamais criard
  whatsapp:
    "bg-valide text-white shadow-soft hover:brightness-95 hover:-translate-y-0.5 hover:shadow-card",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  track,
  external,
  className,
  ariaLabel,
}: CTAButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        data-cta={track}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cta={track} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
