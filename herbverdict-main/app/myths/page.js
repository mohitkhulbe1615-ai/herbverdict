import { getMythSlugs, getMythContent } from "@/lib/content";
import SectionIndex from "@/components/SectionIndex";

export const metadata = {
  title: "Myth Busting",
  description: "Popular Ayurveda claims investigated against published clinical evidence. What's proven, what's not, and what nobody tells you.",
};

export default function MythsPage() {
  const slugs = getMythSlugs();
  const articles = slugs.map(slug => {
    const c = getMythContent(slug);
    return { slug, title: c.frontmatter.title, description: c.frontmatter.description, href: `/myths/${slug}` };
  });

  return (
    <SectionIndex
      section="myths"
      icon="🔍"
      label="Myth Busting"
      tagline="Popular claims vs published evidence"
      description="We take viral Ayurveda claims and investigate them against clinical research. No advocacy, no dismissal — just the data."
      color="#C62828"
      bg="#FFEBEE"
      countText="investigations published — taking popular claims and checking them against published evidence"
      articles={articles}
    />
  );
}
