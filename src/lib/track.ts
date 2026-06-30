/**
 * Tracking léger, sans dépendance : pousse l'événement dans `window.dataLayer`
 * (GTM/GA4-ready) et l'envoie à Plausible si présent (window.plausible).
 * Aucun script lourd : Plausible n'est chargé que si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

export type TrackEvent =
  | "lead_form_started"
  | "lead_form_submitted"
  | "guide_requested"
  | "diagnostic_completed"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "partner_clicked"
  | "cta_click";

export function track(event: TrackEvent | string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...(props ?? {}) });
  if (typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}
