import { notFound } from "next/navigation";
import { getGuideContent, getGuideSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getGuideSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getGuideContent(params.slug);
  if (!content) return {};
  return { title: content.frontmatter.title, description: content.frontmatter.description };
}

export default function GuidePage({ params }) {
  const content = getGuideContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="guides" slug={params.slug} />;
}
