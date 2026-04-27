import Link from "next/link";
import { getGuideSlugs, getGuideContent } from "@/lib/content";

export const metadata = {
  title: "Consumer Guides",
  description: "Practical guides for Indian consumers — how to read labels, check product purity, and make informed supplement decisions.",
};

export default function GuidesIndex() {
  const slugs = getGuideSlugs();
  const guides = slugs.map(slug => {
    const c = getGuideContent(slug);
    return { slug, ...c.frontmatter };
  });

  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Consumer Guides</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Guides</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        Practical consumer education — no health claims, just the knowledge you need to make informed decisions about Ayurvedic products.
      </p>
      <div className="card-list">
        {guides.map(g => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="card-list-item" style={{ display: "block", padding: "18px 24px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}>{g.title}</div>
            <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 4, fontWeight: 300 }}>{g.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
