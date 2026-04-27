import { notFound } from "next/navigation";
import { getMythContent, getMythSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getMythSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getMythContent(params.slug);
  if (!content) return {};
  return { title: content.frontmatter.title, description: content.frontmatter.description };
}

export default function MythPage({ params }) {
  const content = getMythContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="myths" slug={params.slug} />;
}
