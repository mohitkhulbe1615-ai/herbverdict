import Link from "next/link";
import { getReviewSlugs, getReviewContent } from "@/lib/content";

export const metadata = {
  title: "Product Reviews",
  description: "Label-by-label comparisons of Ayurvedic products in India. Factual specifications, no opinions — just the data you need to decide.",
};

export default function ReviewsIndex() {
  const slugs = getReviewSlugs();
  const reviews = slugs.map(slug => {
    const c = getReviewContent(slug);
    return { slug, ...c.frontmatter };
  });

  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Product Reviews</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Brand & Product Reviews</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        Factual, label-based comparisons of Ayurvedic products available in India. No opinions — just specifications, certifications, and published evidence.
      </p>
      <div className="card-list">
        {reviews.map(r => (
          <Link key={r.slug} href={`/reviews/${r.slug}`} className="card-list-item" style={{ display: "block", padding: "18px 24px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}>{r.title}</div>
            <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 4, fontWeight: 300 }}>{r.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
