import type { Metadata } from "next";
import { Archivo, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";
import { PlausibleScript } from "@/components/PlausibleScript";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "YOoN Immobilier — Ton œil sur place à Dakar | Investir au Sénégal sereinement",
    template: "%s · YOoN Immobilier",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "YOoN Immobilier — Ton œil sur place à Dakar",
    description: siteConfig.description,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "YOoN Immobilier — Dakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOoN Immobilier — Ton œil sur place à Dakar",
    description: siteConfig.description,
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-token focus:bg-forest focus:px-4 focus:py-2 focus:font-semibold focus:text-ivoire"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Analytics />
        <PlausibleScript />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
