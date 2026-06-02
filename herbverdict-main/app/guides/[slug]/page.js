import { notFound } from "next/navigation";
import { getGuideContent, getGuideSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getGuideSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getGuideContent(params.slug);
  if (!content) return {};
  const t = content.frontmatter.title;
  const d = content.frontmatter.description;
  const url = `https://www.herbverdict.com/guides/${params.slug}`;
  return {
    title: t, description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url },
    twitter: { title: t, description: d },
  };
}

export default function Page({ params }) {
  const content = getGuideContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="guides" slug={params.slug} />;
}
