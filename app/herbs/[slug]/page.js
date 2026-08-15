import { notFound } from "next/navigation";
import { getHerbContent, getHerbSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return getHerbSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getHerbContent(params.slug);
  if (!content) return {};
  const fm = content.frontmatter;
  const t = fm.seoTitle || fm.title;
  const d = fm.metaDescription || fm.description;
  const url = `${SITE.url}/herbs/${params.slug}`;
  const image = fm.ogImage || SITE.defaultOgImage;
  return {
    title: t,
    description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: t, description: d, images: [image] },
  };
}

export default function HerbPage({ params }) {
  const content = getHerbContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="herbs" slug={params.slug} />;
}
