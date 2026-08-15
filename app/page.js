import HomeClient from "@/components/HomeClient";
import { getHerbsIndex, getAllContent } from "@/lib/content";

export const metadata = {
  alternates: { canonical: "/" },
};

// Presentation styling per section for the article cards.
const SECTION_STYLE = {
  reviews: { label: "Product Review", color: "#1565C0", bg: "#E3F2FD" },
  guides: { label: "Consumer Guide", color: "#E65100", bg: "#FFF3E0" },
  research: { label: "Research News", color: "#6A1B9A", bg: "#F3E5F5" },
  myths: { label: "Myth Busting", color: "#C62828", bg: "#FFEBEE" },
};

const SECTION_ORDER = ["reviews", "guides", "research", "myths"];

// Hand-picked homepage features. Slugs are validated against real content
// below, so a renamed or deleted article can never leave a dead link here.
const FEATURED_SLUGS = [
  { section: "herbs", slug: "ashwagandha", tag: "Most Read" },
  { section: "reviews", slug: "top-ashwagandha-brands-india", tag: "Investigation" },
  { section: "research", slug: "fssai-ashwagandha-leaves-ban", tag: "Regulatory" },
];

export default function Home() {
  const herbs = getHerbsIndex();
  const all = getAllContent();

  const bySection = (section) => all.filter(a => a.section === section);

  const articles = SECTION_ORDER.flatMap(section =>
    bySection(section)
      .sort((a, b) => String(b.publishDate || "").localeCompare(String(a.publishDate || "")))
      .map(a => {
        const style = SECTION_STYLE[section];
        return {
          title: a.title,
          section,
          slug: a.slug,
          category: a.category || style.label,
          color: style.color,
          bg: style.bg,
          desc: a.description || "",
        };
      })
  );

  const featured = FEATURED_SLUGS
    .map(f => {
      const match = all.find(a => a.section === f.section && a.slug === f.slug);
      if (!match) return null;
      return {
        title: match.title,
        desc: match.description || "",
        link: `/${f.section}/${f.slug}`,
        tag: f.tag,
      };
    })
    .filter(Boolean);

  const totalStudies = herbs.reduce((sum, h) => sum + (Number(h.studies) || 0), 0);

  const stats = [
    { num: `${totalStudies}+`, label: "Clinical trials reviewed" },
    { num: `${all.length}`, label: "In-depth articles" },
    { num: "15+", label: "Indian brands compared" },
    { num: "0", label: "Brand affiliations" },
  ];

  const sectionCounts = {
    herbs: herbs.length,
    reviews: bySection("reviews").length,
    guides: bySection("guides").length,
    research: bySection("research").length,
    myths: bySection("myths").length,
  };

  return (
    <HomeClient
      HERBS={herbs}
      ALL_ARTICLES={articles}
      FEATURED={featured}
      STATS={stats}
      SECTION_COUNTS={sectionCounts}
    />
  );
}
