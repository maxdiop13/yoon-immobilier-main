import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Évite l'inférence d'un parent lockfile comme racine de tracing.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/guides/acheter-au-senegal-sans-se-faire-avoir",
        destination: "/guides/eviter-arnaques-immobilieres-senegal",
        permanent: true,
      },
      {
        source: "/guides/construction-maison-senegal-diaspora",
        destination: "/guides/construire-maison-senegal-depuis-etranger",
        permanent: true,
      },
      {
        source: "/guides/acheter-terrain-dakar",
        destination: "/guides/acheter-terrain-dakar-depuis-france",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
