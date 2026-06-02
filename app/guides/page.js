import { getGuideSlugs, getGuideContent } from "@/lib/content";
import SectionIndex from "@/components/SectionIndex";

export const metadata = {
  alternates: { canonical: "/guides" },
  title: "Consumer Guides",
  description: "Practical guides for Indian consumers — how to read labels, check product purity, and make informed supplement decisions.",
};

export default function GuidesPage() {
  const slugs = getGuideSlugs();
  const articles = slugs.map(slug => {
    const c = getGuideContent(slug);
    return { slug, title: c.frontmatter.title, description: c.frontmatter.description, href: `/guides/${slug}` };
  });

  return (
    <SectionIndex
      section="guides"
      icon="📋"
      label="Consumer Guides"
      tagline="Practical knowledge for smarter product decisions"
      description="No health claims, no medical advice — just the consumer intelligence you need to evaluate what you're buying."
      color="#E65100"
      bg="#FFF3E0"
      countText="consumer guides published — practical knowledge with zero health claims"
      articles={articles}
    />
  );
}
