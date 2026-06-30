"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Révélation discrète au scroll (IntersectionObserver).
 * Dégrade proprement : sans JS le contenu reste visible (CSS .reveal masque,
 * mais on force la visibilité si l'observer n'est pas dispo) et
 * prefers-reduced-motion neutralise l'animation (voir globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "article" | "section" | "figure";
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <As
      // @ts-expect-error — ref polymorphe accepté pour les balises de bloc
      ref={ref}
      id={id}
      className={cn("reveal", shown && "is-in", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </As>
  );
}
