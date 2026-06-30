"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Capte les clics sur tout élément `data-cta` et émet un événement nommé.
 * Mappage : whatsapp → whatsapp_clicked, appel/booking/phone → phone_clicked,
 * partenaire/partner → partner_clicked, sinon cta_click (avec la valeur data-cta).
 */
export function Analytics() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-cta]");
      const cta = el?.getAttribute("data-cta");
      if (!cta) return;
      if (/whatsapp/i.test(cta)) track("whatsapp_clicked", { cta });
      else if (/appel|booking|phone|rappel/i.test(cta)) track("phone_clicked", { cta });
      else if (/partenaire|partner/i.test(cta)) track("partner_clicked", { cta });
      else track("cta_click", { cta });
    };
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
