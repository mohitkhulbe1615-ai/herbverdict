import { SITE } from "@/lib/constants";

export const metadata = {
  alternates: { canonical: "/editorial-policy" },
  title: "Editorial Policy & Standards",
  description:
    "How HerbVerdict sources evidence, writes verdicts, reviews and updates articles, handles corrections, and discloses conflicts of interest.",
  openGraph: {
    title: "Editorial Policy & Standards | HerbVerdict",
    description:
      "How HerbVerdict sources evidence, writes verdicts, reviews articles, handles corrections, and discloses conflicts of interest.",
    url: `${SITE.url}/editorial-policy`,
  },
  twitter: {
    title: "Editorial Policy & Standards | HerbVerdict",
    description:
      "How HerbVerdict sources evidence, writes verdicts, reviews articles, handles corrections, and discloses conflicts of interest.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Editorial Standards</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 32px" }}>Editorial Policy</h1>

      <div className="article-body" style={{ maxWidth: 680 }}>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--medium)", fontWeight: 300 }}>
          HerbVerdict is an independent publication that reads clinical research on Ayurvedic herbs
          and products and reports the findings. This page sets out exactly how we work — how we
          choose sources, how we write verdicts, who writes and reviews, how we handle corrections,
          and where we stand on commercial relationships. It is meant to be held against the site:
          if we don&apos;t live up to it, tell us.
        </p>

        <h2>Who writes HerbVerdict</h2>
        <p>
          Articles are written and edited by <a href="/authors/ash">Ash, our research editor</a>. Ash
          is not a doctor, pharmacist, or licensed healthcare professional, and this is stated on every
          article. HerbVerdict does not currently employ a medical reviewer; if and when a credentialed
          reviewer joins, reviewed articles will carry a visible &ldquo;Reviewed by&rdquo; line and the
          reviewer&apos;s credentials, and nothing will be labelled as medically reviewed before that is true.
        </p>

        <h2>How we select sources</h2>
        <p>
          We prioritise, in roughly this order: systematic reviews and meta-analyses of human trials;
          randomized controlled trials in humans; other controlled human studies; and observational
          human studies. In-vitro (test-tube) and animal studies are reported only as background and are
          never the sole basis for a positive verdict. Traditional use, however longstanding, is
          described as traditional use — not as evidence of effect.
        </p>
        <p>
          We draw primarily on indexed databases and primary sources: PubMed, PMC, the Cochrane Library,
          peer-reviewed journals, and — for Indian regulatory and safety context — FSSAI, the Ministry of
          AYUSH, CCRAS, WHO, and the NIH LiverTox database. Every substantive claim links to its source.
        </p>

        <h2>How we write verdicts</h2>
        <p>
          Each herb or practice receives a Proven, Promising, or Limited verdict according to the
          published criteria on our <a href="/methodology">methodology page</a>. The verdict follows the
          criteria, not the writer&apos;s preference. Every study we cite is reported with its sample size,
          duration, journal, and at least one limitation. We do not cherry-pick positive findings, and we
          state plainly when evidence is weak, mixed, or absent.
        </p>

        <h2>Three rules we never break</h2>
        <p>
          <strong>We report, we never prescribe.</strong> We describe what studies found; we do not tell
          you what to take, at what dose, or for which condition.
        </p>
        <p>
          <strong>We always show limitations.</strong> A study&apos;s weaknesses are reported alongside its
          findings, every time.
        </p>
        <p>
          <strong>We never claim to treat disease.</strong> HerbVerdict does not present any herb as a
          treatment or cure for any disease, in line with applicable Indian law.
        </p>

        <h2>Review and updating</h2>
        <p>
          Health evidence changes. Each article carries a published date and a last-updated date, shown
          near the top of the page. We revisit articles when significant new trials, safety findings, or
          regulatory developments appear, and update the last-updated date when we make a substantive
          change. Developing stories (such as ongoing regulatory or legal matters) are marked as such and
          updated as events unfold.
        </p>

        <h2>Corrections policy</h2>
        <p>
          We take factual accuracy seriously. If you believe a claim on this site is wrong or
          misrepresents a study&apos;s findings, email <strong>ash@herbverdict.com</strong> with the specific
          article and the issue. We will review it against the cited source and, where a correction is
          warranted, fix it promptly and note the change. Substantive corrections are reflected in the
          article&apos;s last-updated date.
        </p>

        <h2>Conflicts of interest &amp; commercial disclosure</h2>
        <p>
          As of today, HerbVerdict has <strong>no affiliate relationships and no financial relationship
          with any supplement brand, Ayurvedic manufacturer, or pharmaceutical company</strong>, and sells
          no products of its own. We are not paid to write, rank, or recommend anything.
        </p>
        <p>
          If this ever changes — for example, if the site introduces affiliate links to help fund the
          work — those links will be clearly disclosed on every page where they appear, and our editorial
          conclusions will remain independent of any commercial relationship. A verdict will never be for
          sale.
        </p>

        <h2>Not medical advice</h2>
        <p>
          Everything on HerbVerdict is for informational and educational purposes only and is not a
          substitute for professional medical advice, diagnosis, or treatment. See our full{" "}
          <a href="/disclaimer">medical disclaimer</a>. Always consult a qualified healthcare provider
          before starting, stopping, or changing any supplement.
        </p>
      </div>
    </div>
  );
}
