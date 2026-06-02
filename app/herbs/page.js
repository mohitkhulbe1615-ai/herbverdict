import Link from "next/link";
import { herbs, getVerdictClass } from "@/lib/herbs";

export const metadata = {
  alternates: { canonical: "/herbs" },
  title: "Herb Evidence Library",
  description: "Evidence scorecards for every major Ayurvedic herb. Each rated Proven, Promising, or Limited based on published clinical trials.",
};

export default function HerbsIndex() {
  const proven = herbs.filter(h => h.verdict === "PROVEN");
  const promising = herbs.filter(h => h.verdict === "PROMISING");
  const limited = herbs.filter(h => h.verdict === "LIMITED");

  const groups = [
    { title: "Proven", desc: "Multiple quality RCTs confirm these effects.", items: proven, color: "var(--green-accent)", bg: "var(--green-light)" },
    { title: "Promising", desc: "Some clinical evidence exists but more research is needed.", items: promising, color: "var(--orange)", bg: "#FFF3E0" },
    { title: "Limited", desc: "Insufficient human clinical data available.", items: limited, color: "var(--gray-limited)", bg: "#F5F5F5" },
  ].filter(g => g.items.length > 0);

  return (
    <div>
      {/* Header */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>🌿</span>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--green-accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Evidence Library</div>
            <h1 style={{ fontSize: 34, fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.02em" }}>Herb Scorecards</h1>
          </div>
        </div>
        <p style={{ fontSize: 16, color: "var(--light-text)", maxWidth: 640, lineHeight: 1.7, fontWeight: 300, marginTop: 8 }}>
          Every major Ayurvedic herb reviewed against published clinical trials. We read the research so you can make informed decisions.
        </p>
      </div>

      {/* Count bar */}
      <div className="container" style={{ paddingTop: 20, paddingBottom: 12 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "12px 18px",
          background: "var(--green-light)", borderRadius: 8, border: "1px solid #2E7D3220",
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--green-accent)" }}>{herbs.length}</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--medium)" }}>herbs reviewed with clinical trial evidence — rated Proven, Promising, or Limited</span>
        </div>
      </div>

      {/* Verdict groups */}
      <div className="container" style={{ paddingTop: 12, paddingBottom: 60 }}>
        {groups.map(group => (
          <section key={group.title} style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{group.title}</h2>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700,
                color: group.color, background: group.bg,
                padding: "3px 12px", borderRadius: 20,
              }}>{group.items.length}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--light-text)", marginBottom: 16, fontWeight: 300 }}>{group.desc}</p>
            <div className="card-list">
              {group.items.map(herb => (
                <Link key={herb.slug} href={`/herbs/${herb.slug}`} className="card-list-item herb-row" style={{
                  display: "grid", gridTemplateColumns: "44px 1fr auto auto",
                  alignItems: "center", gap: 16,
                }}>
                  <span className="herb-icon" style={{ fontSize: 24, textAlign: "center" }}>{herb.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--dark)" }}>{herb.name}</div>
                    <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 2, fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{herb.tagline}</div>
                  </div>
                  <div className="study-count" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--light-text)", whiteSpace: "nowrap" }}>
                    {herb.studies} studies
                  </div>
                  <span className={`verdict-badge ${getVerdictClass(herb.verdict)}`}>{herb.verdict}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Cross-section links */}
      <div style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--lighter-text)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>More from HerbVerdict</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 20px" }}>Explore other sections</h2>
          <div className="section-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {[
              { label: "Herb Scorecards", count: `${herbs.length} herbs`, href: "/herbs", icon: "🌿", active: true },
              { label: "Product Reviews", count: "5 reviews", href: "/reviews", icon: "🔬" },
              { label: "Consumer Guides", count: "6 guides", href: "/guides", icon: "📋" },
              { label: "Research News", count: "1 article", href: "/research", icon: "📰" },
              { label: "Myth Busting", count: "1 investigation", href: "/myths", icon: "🔍" },
            ].map(s => (
              <Link key={s.href} href={s.href} style={{
                display: "block", padding: "16px 12px", background: "#fff",
                border: s.active ? "2px solid var(--green-accent)" : "1px solid var(--border)",
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
