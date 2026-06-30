import { siteConfig } from "@/lib/site";

/**
 * Injecte des données structurées JSON-LD.
 * Usage : <JsonLd data={...} /> ou <JsonLd data={[a, b]} />.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

/* ---- Fabriques de schémas réutilisables ---- */

/**
 * YOoN n'a pas (encore) le statut RealEstateAgent : on reste sur ProfessionalService
 * (sous-type de LocalBusiness/Organization). Pas d'openingHours tant que non défini.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    legalName: siteConfig.company.legalName,
    foundingDate: siteConfig.company.foundingDate,
    identifier: { "@type": "PropertyValue", propertyID: "NINEA", value: siteConfig.company.ninea },
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/img/og.jpg`,
    description: siteConfig.description,
    areaServed: [
      { "@type": "City", name: "Dakar" },
      { "@type": "Country", name: "Sénégal" },
    ],
    availableLanguage: siteConfig.languages,
    knowsLanguage: ["fr", "en", "wo"],
    slogan: "On ne vend pas du rêve. On montre le terrain.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue YF-543",
      addressLocality: "Ouest Foire, Dakar",
      addressRegion: "Dakar",
      addressCountry: "SN",
    },
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.whatsappNumber ? { telephone: `+${siteConfig.whatsappNumber}` } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fr",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const author = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: `${siteConfig.url}${image || "/img/og.jpg"}`,
    mainEntityOfPage: `${siteConfig.url}${path}`,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
    },
  };
}
