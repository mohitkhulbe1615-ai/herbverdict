import { notFound } from "next/navigation";
import { herbs, getHerbBySlug, getVerdictClass } from "@/lib/herbs";
import { ArticleSchema } from "@/components/Schema";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Newsletter from "@/components/Newsletter";

export function generateStaticParams() {
  return herbs.map(h => ({ slug: h.slug }));
}

export function generateMetadata({ params }) {
  const herb = getHerbBySlug(params.slug);
  if (!herb) return {};
  return {
    title: `${herb.name} Evidence Scorecard — What ${herb.studies}+ Studies Found`,
    description: herb.summary,
  };
}

export default function HerbPage({ params }) {
  const herb = getHerbBySlug(params.slug);
  if (!herb) notFound();

  return (
    <>
      <ArticleSchema
        title={`${herb.name} Evidence Scorecard`}
        description={herb.summary}
        datePublished="2026-04-28"
        slug={`herbs/${herb.slug}`}
        type="herb"
      />

      <article className="container" style={{ padding: "48px 40px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div className="label" style={{ marginBottom: 12 }}>Evidence Scorecard</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <span style={{ fontSize: 40 }}>{herb.icon}</span>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, lineHeight: 1.1 }}>{herb.name}</h1>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--light-text)", marginTop: 4 }}>
                {herb.botanical}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
            <span className={`verdict-badge ${getVerdictClass(herb.verdict)}`} style={{ fontSize: 13, padding: "7px 18px" }}>
              {herb.verdict}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--light-text)" }}>
              Based on {herb.studies}+ clinical studies
            </span>
          </div>
        </div>

        {/* Meta */}
        <div style={{
          display: "flex", gap: 24, fontFamily: "var(--font-sans)", fontSize: 12,
          color: "var(--light-text)", borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)", padding: "12px 0", marginBottom: 36,
        }}>
          <span>By <strong style={{ color: "var(--dark)" }}>HerbVerdict Editorial</strong></span>
          <span>Last updated: April 2026</span>
          <span>Reading time: ~8 min</span>
        </div>

        <DisclaimerBanner />

        {/* Article Body - Placeholder structure */}
        <div className="article-body">
          <h2>What is {herb.name}?</h2>
          <p>{herb.summary}</p>
          <p style={{ color: "var(--light-text)", fontStyle: "italic" }}>
            [Full article content will be added here. This is the template structure.]
          </p>

          <h2>What does the research say?</h2>
          <p>Below are the key clinical trials and systematic reviews for {herb.name}.</p>

          {/* Example study card */}
          <div className="study-card">
            <div className="study-meta">
              Journal of [Name] · 2024 · n=80 · RCT · 8 weeks
            </div>
            <div className="study-finding">
              [Study finding will go here — what the researchers found, reported in third-person journalistic language.]
            </div>
            <div className="study-limitation">
              Limitation: [Sample size, duration, single-center, funding source, etc.]
            </div>
          </div>

          <h2>Evidence Verdict: {herb.verdict}</h2>
          <p>[Justification for the verdict based on the totality of evidence reviewed above.]</p>

          <h2>Dosage Findings in Studies</h2>
          <p>[What dosages were used in the clinical trials. NOT a recommendation — just reporting what researchers used.]</p>

          <h2>Safety and Side Effects</h2>
          <p>[Documented adverse events from clinical trials and case reports.]</p>

          <h2>Product Quality Guide</h2>
          <p>[What to look for on labels: extract type, active compound percentage, certifications.]</p>

          <h2>The Bottom Line</h2>
          <p>[Balanced 2-3 sentence summary of the evidence.]</p>

          <h2>References</h2>
          <div className="reference-list">
            <p>1. [Author et al. Title. Journal. Year. DOI: <a href="#">link</a>]</p>
            <p>2. [Author et al. Title. Journal. Year. DOI: <a href="#">link</a>]</p>
          </div>
        </div>

        <DisclaimerBanner />
      </article>

      <Newsletter variant="light" />
    </>
  );
}
