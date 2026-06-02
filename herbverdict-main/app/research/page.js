import { getResearchSlugs, getResearchContent } from "@/lib/content";
import SectionIndex from "@/components/SectionIndex";

export const metadata = {
  title: "Research News",
  description: "Ayurveda research news — CCRAS trials, AYUSH policy, WHO traditional medicine updates explained in plain English.",
};

export default function ResearchPage() {
  const slugs = getResearchSlugs();
  const articles = slugs.map(slug => {
    const c = getResearchContent(slug);
    return { slug, title: c.frontmatter.title, description: c.frontmatter.description, href: `/research/${slug}` };
  });

  return (
    <SectionIndex
      section="research"
      icon="📰"
      label="Research News"
      tagline="Ayurveda research translated into plain English"
      description="CCRAS clinical trials, AYUSH policy updates, and WHO traditional medicine news — covered for consumers, not practitioners."
      color="#6A1B9A"
      bg="#F3E5F5"
      countText="research articles published — translating academic findings for everyday readers"
      articles={articles}
    />
  );
}
