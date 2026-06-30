import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Construit des métadonnées uniques et cohérentes par page :
 * title (+ template marque), description, canonical, Open Graph, Twitter card.
 * Évite les OG dupliqués et garantit une URL canonique propre.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/img/og.jpg",
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogTitle = `${title} · ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      locale: "fr_FR",
      title: ogTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
