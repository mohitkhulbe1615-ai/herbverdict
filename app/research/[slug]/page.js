import { notFound } from "next/navigation";
import { getResearchContent, getResearchSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getResearchSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getResearchContent(params.slug);
  if (!content) return {};
  return { title: content.frontmatter.title, description: content.frontmatter.description };
}

export default function ResearchPage({ params }) {
  const content = getResearchContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="research" slug={params.slug} />;
}
