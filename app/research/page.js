import Link from "next/link";
import { getResearchSlugs, getResearchContent } from "@/lib/content";

export const metadata = {
  title: "Research News",
  description: "Ayurveda research news — CCRAS trials, AYUSH policy, WHO traditional medicine updates explained in plain English.",
};

export default function ResearchIndex() {
  const slugs = getResearchSlugs();
  const articles = slugs.map(slug => {
    const c = getResearchContent(slug);
    return { slug, ...c.frontmatter };
  });

  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Research News</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Research</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        Ayurveda research translated into plain English — CCRAS trials, AYUSH policy, and WHO traditional medicine updates.
      </p>
      <div className="card-list">
        {articles.map(a => (
          <Link key={a.slug} href={`/research/${a.slug}`} className="card-list-item" style={{ display: "block", padding: "18px 24px" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}>{a.title}</div>
            <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 4, fontWeight: 300 }}>{a.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
