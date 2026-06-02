import { notFound } from "next/navigation";
import { getResearchContent, getResearchSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getResearchSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getResearchContent(params.slug);
  if (!content) return {};
  const t = content.frontmatter.seoTitle || content.frontmatter.title;
  const d = content.frontmatter.metaDescription || content.frontmatter.description;
  const url = `https://www.herbverdict.com/research/${params.slug}`;
  return {
    title: t, description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url },
    twitter: { title: t, description: d },
  };
}

export default function Page({ params }) {
  const content = getResearchContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="research" slug={params.slug} />;
}
