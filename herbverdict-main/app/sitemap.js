import { getAllContent } from "@/lib/content";
import { herbs } from "@/lib/herbs";

const BASE_URL = "https://www.herbverdict.com";

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/herbs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/myths`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // All content articles from MDX files
  const allContent = getAllContent();
  const articlePages = allContent.map(article => ({
    url: `${BASE_URL}/${article.section}/${article.slug}`,
    lastModified: article.lastUpdated || article.publishDate || now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Herb placeholder pages (from lib/herbs.js data that don't have MDX files yet)
  const contentHerbSlugs = allContent.filter(a => a.section === "herbs").map(a => a.slug);
  const placeholderHerbs = herbs
    .filter(h => !contentHerbSlugs.includes(h.slug))
    .map(h => ({
      url: `${BASE_URL}/herbs/${h.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...articlePages, ...placeholderHerbs];
}
