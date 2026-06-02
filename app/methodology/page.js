export const metadata = {
  alternates: { canonical: "/methodology" },
  openGraph: { title: "Our Methodology", description: "How HerbVerdict evaluates Ayurvedic evidence. Our traffic-light verdict system, source criteria, and", url: "https://www.herbverdict.com/methodology" },
  twitter: { title: "Our Methodology", description: "How HerbVerdict evaluates Ayurvedic evidence. Our traffic-light verdict system, source criteria, and" },
  title: "Our Methodology",
  description: "How HerbVerdict evaluates Ayurvedic evidence. Our traffic-light verdict system, source criteria, and editorial standards explained.",
};

export default function MethodologyPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Methodology</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 32px" }}>How We Evaluate Evidence</h1>

      <div className="article-body" style={{ maxWidth: 680 }}>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--medium)", fontWeight: 300 }}>
          Our methodology is designed to be transparent and reproducible. Every verdict we give can be
          verified by reading the same sources we cite. Nothing on this site requires you to trust us —
          we show our work.
        </p>

        <h2>The Verdict System</h2>
        <p>Every herb and practice we review receives one of three verdicts:</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "24px 0 32px" }}>
          {[
            {
              verdict: "PROVEN", cls: "verdict-proven",
              criteria: "At least 3 randomized controlled trials (RCTs) with a combined sample size of 200+ participants, published in indexed peer-reviewed journals, showing consistent positive results for a specific outcome. Systematic reviews or meta-analyses that confirm the finding strengthen this rating."
            },
            {
              verdict: "PROMISING", cls: "verdict-promising",
              criteria: "1-2 RCTs with positive results, or multiple trials with small sample sizes (<100 each), or promising results that haven't been independently replicated. The evidence suggests a real effect but more research is needed before we can confidently call it proven."
            },
            {
              verdict: "LIMITED", cls: "verdict-limited",
              criteria: "No published RCTs on humans, or only in-vitro / animal studies, or human studies with serious methodological flaws (no placebo control, no blinding, very small samples). Traditional use alone — no matter how ancient — does not qualify as evidence for our purposes."
            },
          ].map(item => (
            <div key={item.verdict} style={{
              background: "var(--bg-warm)", borderRadius: 8,
              padding: "20px 24px", border: "1px solid var(--border)",
            }}>
              <span className={`verdict-badge ${item.cls}`} style={{ marginBottom: 8, display: "inline-block" }}>
                {item.verdict}
              </span>
              <p style={{ fontSize: 14, color: "var(--medium)", lineHeight: 1.7, margin: "8px 0 0" }}>
                {item.criteria}
              </p>
            </div>
          ))}
        </div>

        <h2>What Sources We Accept</h2>
        <p>We only cite studies from the following source categories:</p>
        <p>
          <strong>Primary sources:</strong> Randomized controlled trials (RCTs), systematic reviews,
          and meta-analyses published in PubMed-indexed, peer-reviewed journals.
        </p>
        <p>
          <strong>Institutional sources:</strong> CCRAS (Central Council for Research in Ayurvedic Sciences)
          published trial results, WHO Traditional Medicine reports, and AYUSH Ministry research publications.
        </p>
        <p>
          <strong>We do NOT cite:</strong> Blog posts, brand websites, promotional materials, traditional
          texts (as evidence — we reference them for historical context only), social media claims,
          unpublished studies, or conference abstracts without full paper publication.
        </p>

        <h2>How We Assess Study Quality</h2>
        <p>Not all studies are equal. When we review a clinical trial, we evaluate:</p>
        <p>
          <strong>Study design:</strong> RCTs with placebo control and blinding are weighted most heavily.
          Observational studies and case reports are mentioned but given less weight in our verdicts.
        </p>
        <p>
          <strong>Sample size:</strong> Studies with fewer than 30 participants are flagged as having
          limited statistical power. We always report exact sample sizes.
        </p>
        <p>
          <strong>Duration:</strong> Short studies (under 4 weeks) may not capture real-world effects.
          We always report study duration.
        </p>
        <p>
          <strong>Conflicts of interest:</strong> If a study was funded by a supplement manufacturer,
          we disclose this. Industry-funded studies aren't automatically invalid, but readers should know.
        </p>
        <p>
          <strong>Replication:</strong> A single positive study is interesting. Multiple independent studies
          showing the same result are convincing. Our verdict system reflects this distinction.
        </p>

        <h2>What We Don't Do</h2>
        <p>
          <strong>We don't recommend products.</strong> Our product comparisons report label specifications
          and published evidence. We never say "buy this brand" — we give you the information to decide.
        </p>
        <p>
          <strong>We don't provide medical advice.</strong> We report what research has found. We never
          tell you to take or stop taking any supplement. That's a conversation between you and your doctor.
        </p>
        <p>
          <strong>We don't claim to be comprehensive.</strong> New research is published constantly. Our
          scorecards reflect the evidence available at the time of writing and are updated when significant
          new studies are published.
        </p>

        <h2>Corrections Policy</h2>
        <p>
          If we get something wrong, we fix it. If you believe any claim on this site misrepresents a
          study's findings, please contact us at <strong>ash@herbverdict.com</strong> with the
          specific article and study in question. We will review the claim and issue a correction within
          48 hours if warranted. All corrections are noted at the top of the affected article with the
          date and nature of the change.
        </p>
      </div>
    </div>
  );
}
