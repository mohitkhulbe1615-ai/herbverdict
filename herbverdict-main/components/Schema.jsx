import { SITE } from "@/lib/constants";

export function ArticleSchema({ title, description, datePublished, dateModified, slug, type = "Article" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type === "herb" ? "MedicalWebPage" : "NewsArticle",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE.url}/${slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    author: {
      "@type": "Person",
      name: SITE.author,
      url: `${SITE.url}/about`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
