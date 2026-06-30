import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { GUIDE_SLUGS } from "@/content/guides";
import { PROJET_SLUGS } from "@/content/projets";
import { QUARTIER_SLUGS } from "@/content/quartiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/notre-methode", priority: 0.9, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/investir-a-dakar", priority: 0.8, freq: "monthly" },
    { path: "/ouest-foire", priority: 0.8, freq: "weekly" },
    { path: "/guides", priority: 0.9, freq: "weekly" },
    ...GUIDE_SLUGS.map((slug) => ({
      path: `/guides/${slug}`,
      priority: 0.8,
      freq: "monthly" as const,
    })),
    { path: "/projets", priority: 0.8, freq: "monthly" },
    ...PROJET_SLUGS.map((slug) => ({
      path: `/projets/${slug}`,
      priority: 0.7,
      freq: "monthly" as const,
    })),
    { path: "/quartiers", priority: 0.85, freq: "weekly" },
    ...QUARTIER_SLUGS.map((slug) => ({
      path: `/quartiers/${slug}`,
      priority: 0.8,
      freq: "monthly" as const,
    })),
    { path: "/diagnostic", priority: 0.9, freq: "monthly" },
    { path: "/guide-gratuit", priority: 0.9, freq: "monthly" },
    { path: "/equipe", priority: 0.7, freq: "monthly" },
    { path: "/partenaires", priority: 0.6, freq: "monthly" },
    { path: "/a-propos", priority: 0.6, freq: "yearly" },
    { path: "/contact", priority: 0.9, freq: "monthly" },
    { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/politique-de-confidentialite", priority: 0.2, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
