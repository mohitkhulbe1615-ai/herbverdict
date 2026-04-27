import Link from "next/link";
import { herbs, getVerdictClass } from "@/lib/herbs";

export const metadata = {
  title: "Herb Evidence Library",
  description: "Evidence scorecards for every major Ayurvedic herb. Each rated Proven, Promising, or Limited based on published clinical trials.",
};

export default function HerbsIndex() {
  const proven = herbs.filter(h => h.verdict === "PROVEN");
  const promising = herbs.filter(h => h.verdict === "PROMISING");
  const limited = herbs.filter(h => h.verdict === "LIMITED");

  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Evidence Library</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Herb Scorecards</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        Every major Ayurvedic herb reviewed against published clinical trials. We read the research so you can make informed decisions.
      </p>

      {[
        { title: "Proven", desc: "Multiple quality RCTs confirm these effects.", items: proven },
        { title: "Promising", desc: "Some clinical evidence exists but more research is needed.", items: promising },
        { title: "Limited", desc: "Insufficient human clinical data available.", items: limited },
      ].filter(g => g.items.length > 0).map(group => (
        <section key={group.title} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{group.title}</h2>
          <p style={{ fontSize: 14, color: "var(--light-text)", marginBottom: 20, fontWeight: 300 }}>{group.desc}</p>
          <div className="card-list">
            {group.items.map(herb => (
              <Link key={herb.slug} href={`/herbs/${herb.slug}`} className="card-list-item herb-row" style={{
                display: "grid", gridTemplateColumns: "44px 1fr auto auto",
                alignItems: "center", gap: 16,
              }}>
                <span style={{ fontSize: 24, textAlign: "center" }}>{herb.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600 }}>{herb.name}</div>
                  <div style={{ fontSize: 13, color: "var(--light-text)", marginTop: 2, fontWeight: 300 }}>{herb.tagline}</div>
                </div>
                <div className="study-count" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--light-text)" }}>
                  {herb.studies} studies
                </div>
                <span className={`verdict-badge ${getVerdictClass(herb.verdict)}`}>{herb.verdict}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
