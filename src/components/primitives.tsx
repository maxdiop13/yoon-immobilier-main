import { MapPin, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/* ----------------------------------------------------------------
   Section — bloc vertical rythmé, fond optionnel
----------------------------------------------------------------- */
type Tone = "ivoire" | "casse" | "sable" | "forest" | "anthracite";

const toneClasses: Record<Tone, string> = {
  ivoire: "bg-ivoire text-anthracite",
  casse: "bg-casse text-anthracite",
  sable: "bg-sable-soft text-anthracite",
  forest: "bg-forest text-ivoire",
  anthracite: "bg-anthracite text-ivoire",
};

export function Section({
  children,
  tone = "ivoire",
  cadastre = false,
  className,
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  tone?: Tone;
  cadastre?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  const dark = tone === "forest" || tone === "anthracite";
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative isolate py-16 sm:py-24", toneClasses[tone], className)}
    >
      {cadastre && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            dark ? "cadastre-light" : "cadastre-soft"
          )}
        />
      )}
      {children}
    </section>
  );
}

/* ----------------------------------------------------------------
   Eyebrow + SectionHeading
----------------------------------------------------------------- */
export function Eyebrow({
  children,
  number,
  className,
}: {
  children: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
      {number && <span className="tnum">{number}</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  number,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  number?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow number={number} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <As
        className={cn(
          "mt-4 font-display font-semibold leading-[1.05]",
          As === "h1"
            ? "text-[clamp(2.25rem,6vw,4rem)]"
            : "text-[clamp(1.7rem,3.6vw,2.7rem)]",
          tone === "light" ? "text-ivoire" : "text-anthracite"
        )}
      >
        {title}
      </As>
      {intro && (
        <p
          className={cn(
            "mt-5 text-pretty text-lg leading-relaxed",
            tone === "light" ? "text-ivoire/80" : "text-anthracite/75"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------
   Stamp « Vérifié sur place » — code signature
----------------------------------------------------------------- */
export function Stamp({
  label = "Vérifié sur place",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex -rotate-3 items-center gap-2 rounded-token border-2 border-valide/70 " +
          "bg-valide/8 px-3.5 py-2 font-sans text-[0.78rem] font-bold uppercase " +
          "tracking-[0.14em] text-valide",
        className
      )}
    >
      <BadgeCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
      {label}
    </span>
  );
}

/* ----------------------------------------------------------------
   Pastille de localisation — « Ouest Foire — Dakar »
----------------------------------------------------------------- */
export function LocationPill({
  children = "Dakar — Sénégal",
  tone = "light",
  className,
}: {
  children?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 " +
          "font-sans text-sm font-semibold backdrop-blur",
        tone === "light"
          ? "border-ivoire/35 bg-ivoire/12 text-ivoire"
          : "border-anthracite/15 bg-casse/70 text-anthracite",
        className
      )}
    >
      <MapPin className="h-4 w-4 text-ocre" strokeWidth={2.2} aria-hidden="true" />
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   Carte générique
----------------------------------------------------------------- */
export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <As
      className={cn(
        "rounded-card border border-sable bg-casse p-6 shadow-soft sm:p-7",
        className
      )}
    >
      {children}
    </As>
  );
}
