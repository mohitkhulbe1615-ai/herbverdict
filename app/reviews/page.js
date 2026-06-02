import { getReviewSlugs, getReviewContent } from "@/lib/content";
import SectionIndex from "@/components/SectionIndex";

export const metadata = {
  alternates: { canonical: "/reviews" },
  title: "Product Reviews",
  description: "Label-by-label comparisons of Ayurvedic products in India. We buy the products, photograph the labels, and compare what's actually in them.",
};

export default function ReviewsPage() {
  const slugs = getReviewSlugs();
  const articles = slugs.map(slug => {
    const c = getReviewContent(slug);
    return { slug, title: c.frontmatter.title, description: c.frontmatter.description, href: `/reviews/${slug}` };
  });

  return (
    <SectionIndex
      section="reviews"
      icon="🔬"
      label="Product Reviews"
      tagline="Label-based brand comparisons you can trust"
      description="We buy the products, photograph the labels, and compare what's actually in them. No opinions — just specifications, certifications, and published evidence."
      color="#1565C0"
      bg="#E3F2FD"
      countText="product reviews published — all based on physical products we purchased and photographed"
      articles={articles}
    />
  );
}
