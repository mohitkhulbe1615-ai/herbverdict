export const metadata = {
  alternates: { canonical: "/about" },
  openGraph: { title: "About HerbVerdict", description: "Who we are, why we exist, and how we evaluate Ayurvedic evidence. Independent, science-first, no bra", url: "https://www.herbverdict.com/about" },
  twitter: { title: "About HerbVerdict", description: "Who we are, why we exist, and how we evaluate Ayurvedic evidence. Independent, science-first, no bra" },
  title: "About HerbVerdict",
  description: "Who we are, why we exist, and how we evaluate Ayurvedic evidence. Independent, science-first, no brand affiliations.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>About</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 32px" }}>About HerbVerdict</h1>

      <div className="article-body" style={{ maxWidth: 680 }}>
        <h2>What is HerbVerdict?</h2>
        <p>
          HerbVerdict is an independent research publication focused on Ayurvedic herbs and products.
          We read clinical trials published in peer-reviewed journals and translate their findings into
          clear, honest summaries for Indian consumers.
        </p>
        <p>
          We are not doctors. We are not a supplement brand. We are not affiliated with any Ayurvedic
          product manufacturer. We are research editors who believe that every Indian consumer deserves
          access to honest, evidence-based information about the products they use.
        </p>

        <h2>Why does this exist?</h2>
        <p>
          India's Ayurveda market is worth over $43 billion. Over 500 million Indians use some form of
          traditional medicine. Yet there is no independent, science-first publication that honestly
          evaluates what research has proven about Ayurvedic herbs — and what it hasn't.
        </p>
        <p>
          Most Ayurveda content online falls into two categories: brands selling products with exaggerated
          claims, or wellness blogs repeating traditional claims without citing a single study. HerbVerdict
          exists to fill the gap between these extremes.
        </p>

        <h2>Who runs this?</h2>
        <p>
          {/* REPLACE WITH YOUR REAL BIO */}
          HerbVerdict is founded and edited by Ash, a research editor based in India. Ash
          is not a medical professional — and that's stated clearly on every page. The publication's credibility
          comes from its methodology, not from credentials: every claim is linked to its source, every study
          summary includes limitations, and every verdict is justified with specific evidence.
        </p>

        <h2>Our editorial principles</h2>
        <p>
          <strong>We report, we don't prescribe.</strong> You will never see us write "take 600mg of Ashwagandha
          for stress." Instead, we write "a 2024 RCT with 80 participants found that 600mg/day of Ashwagandha
          root extract was associated with reduced cortisol levels over 8 weeks."
        </p>
        <p>
          <strong>We always state limitations.</strong> Every study we cite includes its sample size, duration,
          journal, and at least one limitation. Cherry-picking positive results is what brands do. We show the
          full picture.
        </p>
        <p>
          <strong>We have no brand affiliations.</strong> No supplement company pays us to write content. When
          we include affiliate links (clearly disclosed), our editorial conclusions are never influenced by
          commercial relationships.
        </p>
        <p>
          <strong>We admit what we don't know.</strong> When evidence for a herb is limited or contradictory,
          we say so. A "Limited" verdict is not a failure — it's honesty that builds trust.
        </p>

        <h2>Contact</h2>
        <p>
          For corrections, feedback, or press inquiries: <strong>ash@herbverdict.com</strong>
        </p>
        <p>
          We take factual accuracy seriously. If you believe any claim on this site is incorrect or
          misrepresents a study's findings, please contact us with the specific article and we will
          review and correct it promptly.
        </p>
      </div>
    </div>
  );
}
