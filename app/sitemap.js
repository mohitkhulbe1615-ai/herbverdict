import { getAllContent } from "@/lib/content";

const BASE_URL = "https://www.herbverdict.com";

// Real edit dates for static pages. Google devalues lastmod when every page
// claims to change on every deploy, so these are updated by hand, not by clock.
const STATIC_PAGES = [
  { path: "", lastModified: "2026-06-15", changeFrequency: "weekly", priority: 1.0 },
  { path: "/herbs", lastModified: "2026-06-15", changeFrequency: "weekly", priority: 0.9 },
  { path: "/reviews", lastModified: "2026-06-15", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides", lastModified: "2026-06-15", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research", lastModified: "2026-06-15", changeFrequency: "weekly", priority: 0.8 },
  { path: "/myths", lastModified: "2026-06-15", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/authors/ash", lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/methodology", lastModified: "2026-05-20", changeFrequency: "monthly", priority: 0.7 },
  { path: "/editorial-policy", lastModified: "2026-05-20", changeFrequency: "yearly", priority: 0.5 },
  { path: "/disclaimer", lastModified: "2026-05-20", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const staticPages = STATIC_PAGES.map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: p.lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Every article URL comes from a real MDX file. There are no placeholder
  // herb pages, so nothing thin or empty is ever submitted to Google.
  const articlePages = getAllContent().map(article => ({
    url: `${BASE_URL}/${article.section}/${article.slug}`,
    lastModified: article.lastUpdated || article.publishDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages];
}
