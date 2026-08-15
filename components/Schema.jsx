import { SITE } from "@/lib/constants";

// Section -> schema.org type.
// Only genuinely time-bound reporting uses NewsArticle; evergreen explainers
// and comparisons use Article. NewsArticle also requires an image to be
// eligible for rich results, which is why every article now ships an ogImage.
const SECTION_TYPE = {
  herbs: "MedicalWebPage",
  reviews: "Article",
  guides: "Article",
  myths: "Article",
  research: "NewsArticle",
};

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  slug,
  section,
  author,
  authorRole,
  image,
  type,
}) {
  const schemaType = type || SECTION_TYPE[section] || "Article";
  const authorName = author || "Ash";
  const imageUrl = image
    ? (image.startsWith("http") ? image : `${SITE.url}${image}`)
    : `${SITE.url}${SITE.defaultOgImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE.url}/${slug}`,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    inLanguage: "en",
    isAccessibleForFree: true,
    publisher: { "@id": `${SITE.url}/#organization` },
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole || "Research Editor",
      url: `${SITE.url}/authors/ash`,
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

const SECTION_LABELS = {
  herbs: "Herbs",
  reviews: "Reviews",
  guides: "Guides",
  research: "Research",
  myths: "Myths",
};

export function BreadcrumbSchema({ section, slug, title }) {
  const sectionLabel = SECTION_LABELS[section] || section;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: sectionLabel, item: `${SITE.url}/${section}` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE.url}/${section}/${slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/android-chrome-512x512.png`,
      width: 512,
      height: 512,
    },
    founder: {
      "@type": "Person",
      name: "Ash",
      url: `${SITE.url}/authors/ash`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "ash@herbverdict.com",
      contactType: "editorial",
    },
    // TODO: add profile URLs here once social/entity accounts exist, e.g.
    // sameAs: ["https://twitter.com/herbverdict", "https://www.instagram.com/herbverdict"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
