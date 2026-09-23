import type { MetadataRoute } from "next";
import { SITE, LANGS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LANGS.map((lang) => ({
    url: `${SITE.url}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: lang === "no" ? 1 : 0.8,
    alternates: { languages: { nb: `${SITE.url}/no`, en: `${SITE.url}/en` } },
  }));
}
