import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/projects`, lastModified: now },
    { url: `${baseUrl}/learning`, lastModified: now },
    { url: `${baseUrl}/certifications`, lastModified: now }
  ];
}
