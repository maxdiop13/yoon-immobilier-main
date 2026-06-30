import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; path: string };

/**
 * Fil d'Ariane visuel + JSON-LD BreadcrumbList (mêmes éléments que l'affichage).
 * Le dernier élément est la page courante (non cliquable).
 */
export function Breadcrumb({
  items,
  tone = "dark",
  className,
}: {
  items: Crumb[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <>
      <nav
        aria-label="Fil d'Ariane"
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          tone === "light" ? "text-ivoire/70" : "text-pierre",
          className
        )}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <span key={c.path} className="inline-flex items-center gap-2">
              {last ? (
                <span className={tone === "light" ? "text-ivoire/90" : "text-anthracite/80"} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.path}
                  className={tone === "light" ? "hover:text-ivoire" : "hover:text-anthracite"}
                >
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-4 w-4 opacity-60" aria-hidden="true" />}
            </span>
          );
        })}
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
