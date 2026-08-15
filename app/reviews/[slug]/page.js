import { notFound } from "next/navigation";
import { getReviewContent, getReviewSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return getReviewSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getReviewContent(params.slug);
  if (!content) return {};
  const fm = content.frontmatter;
  const t = fm.seoTitle || fm.title;
  const d = fm.metaDescription || fm.description;
  const url = `${SITE.url}/reviews/${params.slug}`;
  const image = fm.ogImage || SITE.defaultOgImage;
  return {
    title: t,
    description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: t, description: d, images: [image] },
  };
}

export default function Page({ params }) {
  const content = getReviewContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="reviews" slug={params.slug} />;
}
