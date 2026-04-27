import Link from "next/link";
import { getMythSlugs, getMythContent } from "@/lib/content";

export const metadata = {
  title: "Myth Busting",
  description: "Popular Ayurveda claims investigated against published clinical evidence. What's proven, what's not, and what nobody tells you.",
};

export default function MythsIndex() {
  const slugs = getMythSlugs();
  const articles = slugs.map(slug => {
    const c = getMythContent(slug);
    return { slug, ...c.frontmatter };
  });

  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Ancient Claim vs Modern Lab</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Myth Busting</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        We take popular Ayurveda claims and investigate them against published clinical evidence. No advocacy, no dismissal — just the research.
      </p>
      <div className="card-list">
        {articles.map(a => (
          <Link key={a.slug} href={`/myths/${a.slug}`} className="card-list-item" style={{ display: "block", padding: "18px 24px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}>{a.title}</div>
            <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 4, fontWeight: 300 }}>{a.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
