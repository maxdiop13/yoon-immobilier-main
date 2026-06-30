import Script from "next/script";

/**
 * Charge Plausible UNIQUEMENT si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini.
 * Léger, sans cookie. Les événements custom sont envoyés via `track()` (lib/track).
 * Sans cette variable : aucun script tiers n'est chargé.
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
