import { notFound } from "next/navigation";
import { getMythContent, getMythSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getMythSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getMythContent(params.slug);
  if (!content) return {};
  const t = content.frontmatter.seoTitle || content.frontmatter.title;
  const d = content.frontmatter.metaDescription || content.frontmatter.description;
  const url = `https://www.herbverdict.com/myths/${params.slug}`;
  return {
    title: t, description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url },
    twitter: { title: t, description: d },
  };
}

export default function Page({ params }) {
  const content = getMythContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="myths" slug={params.slug} />;
}
