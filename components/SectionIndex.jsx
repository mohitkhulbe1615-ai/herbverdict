import Link from "next/link";

const SECTIONS = [
  { key: "herbs", label: "Herb Scorecards", count: "11 herbs", href: "/herbs", icon: "🌿" },
  { key: "reviews", label: "Product Reviews", count: "5 reviews", href: "/reviews", icon: "🔬" },
  { key: "guides", label: "Consumer Guides", count: "6 guides", href: "/guides", icon: "📋" },
  { key: "research", label: "Research News", count: "1 article", href: "/research", icon: "📰" },
  { key: "myths", label: "Myth Busting", count: "1 investigation", href: "/myths", icon: "🔍" },
];

export default function SectionIndex({ section, icon, label, tagline, description, color, bg, countText, articles }) {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div>
      {/* Header */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>{icon}</span>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</div>
            <h1 style={{ fontSize: 34, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.02em" }}>{tagline}</h1>
          </div>
        </div>
        <p style={{ fontSize: 16, color: "var(--light-text)", maxWidth: 640, lineHeight: 1.7, fontWeight: 300, marginTop: 8 }}>{description}</p>
      </div>

      {/* Count bar */}
      <div className="container" style={{ paddingTop: 20, paddingBottom: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "12px 18px",
          background: bg, borderRadius: 8, border: `1px solid ${color}20`,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color }}>{articles.length}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--medium)" }}>{countText}</span>
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div className="container" style={{ paddingTop: 12, paddingBottom: 24 }}>
          <Link href={featured.href} style={{
            display: "block", padding: "28px 24px",
            background: `linear-gradient(135deg, ${color}08, ${color}15)`,
            border: `1px solid ${color}25`,
            borderRadius: 14, textDecoration: "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
                color: "#fff", background: color,
                padding: "4px 12px", borderRadius: 20, letterSpacing: "0.06em", textTransform: "uppercase",
              }}>Featured</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--dark)", margin: "0 0 8px", lineHeight: 1.3 }}>{featured.title}</h2>
            <p style={{ fontSize: 14, color: "var(--medium)", lineHeight: 1.6, fontWeight: 300, margin: 0, maxWidth: 600 }}>{featured.description}</p>
          </Link>
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="container articles-grid" style={{ paddingTop: 0, paddingBottom: 48 }}>
          <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {rest.map((a, i) => (
              <Link key={i} href={a.href} style={{
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                padding: "20px 18px",
                background: "#fff", border: "1px solid var(--border)", borderRadius: 12,
                textDecoration: "none",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700,
                      color, background: bg,
                      padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em",
                    }}>{label}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--dark)", margin: "0 0 8px", lineHeight: 1.3, fontFamily: "var(--font-sans)" }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--light-text)", lineHeight: 1.5, fontWeight: 300, margin: 0 }}>{a.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cross-section links */}
      <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--lighter-text)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>More from HerbVerdict</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>Explore other sections</h2>
          <div className="section-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {SECTIONS.map(s => (
              <Link key={s.key} href={s.href} style={{
                display: "block", padding: "16px 12px", background: "#fff",
                border: s.key === section ? "2px solid var(--green-accent)" : "1px solid var(--border)",
                borderRadius: 10, textDecoration: "none", textAlign: "center",
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--dark)" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-accent)", marginTop: 4 }}>{s.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
