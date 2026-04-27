import Link from "next/link";
import { herbs, getVerdictClass } from "@/lib/herbs";
import { getReviewSlugs, getReviewContent, getGuideSlugs, getGuideContent, getResearchSlugs, getResearchContent, getMythSlugs, getMythContent } from "@/lib/content";
import Newsletter from "@/components/Newsletter";

const SECTION_COLORS = {
  reviews: { color: "#1565C0", bg: "#E3F2FD", label: "Product Review" },
  guides: { color: "#E65100", bg: "#FFF3E0", label: "Consumer Guide" },
  research: { color: "#6A1B9A", bg: "#F3E5F5", label: "Research News" },
  myths: { color: "#C62828", bg: "#FFEBEE", label: "Myth Busting" },
};

function getArticles(section, getSlugs, getContent) {
  return getSlugs().map(slug => {
    const c = getContent(slug);
    return { slug, section, ...c.frontmatter };
  });
}

export default function Home() {
  const reviews = getArticles("reviews", getReviewSlugs, getReviewContent);
  const guides = getArticles("guides", getGuideSlugs, getGuideContent);
  const research = getArticles("research", getResearchSlugs, getResearchContent);
  const myths = getArticles("myths", getMythSlugs, getMythContent);
  const allOther = [...reviews, ...guides, ...research, ...myths];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <header style={{ padding: "80px 40px 60px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div className="label label-green" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ width: 20, height: 1, background: "var(--green-accent)", display: "inline-block" }} />
          Independent Research · No Brand Affiliations
          <span style={{ width: 20, height: 1, background: "var(--green-accent)", display: "inline-block" }} />
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
          What does science<br />
          <span style={{ color: "var(--green-accent)" }}>actually say</span> about<br />
          Ayurveda?
        </h1>
        <p style={{
          fontSize: 19, lineHeight: 1.7, color: "var(--medium)",
          maxWidth: 600, margin: "0 auto 36px", fontWeight: 300,
        }}>
          We read the clinical trials so you don't have to. Every herb rated
          on real evidence — <strong style={{ color: "var(--dark)", fontWeight: 600 }}>Proven</strong>,{" "}
          <strong style={{ color: "var(--orange)", fontWeight: 600 }}>Promising</strong>, or{" "}
          <strong style={{ color: "var(--gray-limited)", fontWeight: 600 }}>Limited</strong> — with
          every claim linked to its source.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/herbs" className="btn-primary">Browse Evidence Scorecards</Link>
          <Link href="/methodology" className="btn-outline">Our Methodology</Link>
        </div>
      </header>

      {/* ═══ TRUST BAR ═══ */}
      <div className="trust-bar" style={{
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "20px 40px", background: "var(--bg-warm)",
        display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
      }}>
        {[
          ["Every claim cited", "PubMed DOIs on every article"],
          ["No brand money", "Zero sponsored content"],
          ["Honest verdicts", "We say when evidence is weak"],
          ["Indian market focus", "Brands you actually buy"],
        ].map(([title, sub]) => (
          <div key={title} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--dark)" }}>{title}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--light-text)", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ═══ HERB SCORECARDS ═══ */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <div>
            <div className="label" style={{ marginBottom: 8 }}>Evidence Scorecards</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Herbs by verdict</h2>
          </div>
          <Link href="/herbs" style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--green-accent)" }}>
            View all →
          </Link>
        </div>
        <p style={{ fontSize: 15, color: "var(--light-text)", marginTop: 4, marginBottom: 32, fontWeight: 300 }}>
          Each scorecard summarizes every available clinical trial — sample sizes, findings, limitations, and an honest verdict.
        </p>
        <div className="card-list">
          {herbs.map(herb => (
            <Link key={herb.slug} href={`/herbs/${herb.slug}`} className="card-list-item herb-row" style={{
              display: "grid", gridTemplateColumns: "44px 1fr auto auto",
              alignItems: "center", gap: 16,
            }}>
              <span style={{ fontSize: 24, textAlign: "center" }}>{herb.icon}</span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--dark)" }}>{herb.name}</div>
                <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 2, fontWeight: 300 }}>{herb.tagline}</div>
              </div>
              <div className="study-count" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--light-text)", whiteSpace: "nowrap" }}>
                {herb.studies} studies
              </div>
              <span className={`verdict-badge ${getVerdictClass(herb.verdict)}`}>{herb.verdict}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ MORE FROM HERBVERDICT ═══ */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "20px 40px 60px" }}>
        <div className="label" style={{ marginBottom: 8 }}>Beyond Scorecards</div>
        <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px" }}>More from HerbVerdict</h2>
        <p style={{ fontSize: 15, color: "var(--light-text)", marginBottom: 32, fontWeight: 300 }}>
          Product comparisons, consumer guides, research news, and myth investigations.
        </p>

        <div className="card-list">
          {allOther.map(article => {
            const sc = SECTION_COLORS[article.section];
            return (
              <Link
                key={article.slug}
                href={`/${article.section}/${article.slug}`}
                className="card-list-item"
                style={{ display: "block", padding: "18px 24px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                    color: sc.color, background: sc.bg,
                    padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em",
                  }}>{sc.label}</span>
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--dark)" }}>
                  {article.title}
                </div>
                <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 4, fontWeight: 300, lineHeight: 1.5 }}>
                  {article.description}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══ SECTION LINKS ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 40px" }}>
          <div className="label" style={{ marginBottom: 8 }}>Explore</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 28px" }}>Browse by section</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
            {[
              { href: "/herbs", label: "Herb Scorecards", desc: "Evidence ratings for Ayurvedic herbs", count: "6 herbs" },
              { href: "/reviews", label: "Product Reviews", desc: "Label-by-label brand comparisons", count: `${reviews.length} reviews` },
              { href: "/guides", label: "Consumer Guides", desc: "How to read labels, check purity", count: `${guides.length} guides` },
              { href: "/research", label: "Research News", desc: "CCRAS, AYUSH, WHO updates", count: `${research.length} article${research.length !== 1 ? "s" : ""}` },
              { href: "/myths", label: "Myth Busting", desc: "Claims vs clinical evidence", count: `${myths.length} investigation${myths.length !== 1 ? "s" : ""}` },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{
                display: "block", padding: "18px 16px",
                background: "#fff", border: "1px solid var(--border)", borderRadius: 10,
                textDecoration: "none",
              }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--light-text)", lineHeight: 1.5, marginBottom: 8 }}>{s.desc}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green-accent)" }}>{s.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px" }}>
          <div className="label" style={{ marginBottom: 8 }}>How we work</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 36px" }}>Research you can verify</h2>
          <div className="methodology-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { step: "01", title: "We read the papers", desc: "Every RCT, systematic review, and clinical trial on PubMed. We note sample sizes, durations, journals, and limitations." },
              { step: "02", title: "We rate the evidence", desc: "PROVEN means multiple quality RCTs confirm it. PROMISING means some evidence but more trials needed. LIMITED means insufficient human data." },
              { step: "03", title: "We show our sources", desc: "Every claim links to its PubMed DOI. You can click through and read the original study yourself. No trust required." },
            ].map(item => (
              <div key={item.step} style={{ padding: "24px 0" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 500, color: "#d4d0c8", marginBottom: 12 }}>{item.step}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--dark)", marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "var(--medium)", lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <Newsletter variant="dark" />
    </>
  );
}
