import type { MetadataRoute } from "next";
import { SITE_URL } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/`, es: `${SITE_URL}/es` };
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/es`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
