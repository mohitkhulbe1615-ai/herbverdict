import { notFound } from "next/navigation";
import { getReviewContent, getReviewSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";

export function generateStaticParams() {
  return getReviewSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const content = getReviewContent(params.slug);
  if (!content) return {};
  return { title: content.frontmatter.title, description: content.frontmatter.description, alternates: { canonical: `https://www.herbverdict.com/reviews/${params.slug}` } };
}

export default function ReviewPage({ params }) {
  const content = getReviewContent(params.slug);
  if (!content) notFound();
  return <ArticlePage content={content} section="reviews" slug={params.slug} />;
}
