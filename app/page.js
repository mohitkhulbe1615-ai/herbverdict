import Link from "next/link";
import { herbs, getVerdictClass } from "@/lib/herbs";
import Newsletter from "@/components/Newsletter";

export default function Home() {
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

      {/* ═══ EVIDENCE SCORECARDS ═══ */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px" }}>
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
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--dark)" }}>
                  {herb.name}
                </div>
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

      {/* ═══ HOW WE WORK ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-warm)" }}>
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
