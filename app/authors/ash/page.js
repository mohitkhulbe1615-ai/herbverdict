import { SITE } from "@/lib/constants";

export const metadata = {
  alternates: { canonical: "/authors/ash" },
  title: "Ash — Research Editor",
  description:
    "Ash is the founder and research editor of HerbVerdict. Not a clinician — a researcher who reads clinical trials and reports findings honestly.",
  openGraph: {
    title: "Ash — Research Editor at HerbVerdict",
    description:
      "Founder and research editor of HerbVerdict. Not a clinician — a researcher who reads clinical trials and reports findings honestly.",
    url: `${SITE.url}/authors/ash`,
    type: "profile",
  },
  twitter: {
    title: "Ash — Research Editor at HerbVerdict",
    description:
      "Founder and research editor of HerbVerdict. Not a clinician — a researcher who reads clinical trials and reports findings honestly.",
  },
};

function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ash",
    jobTitle: "Research Editor",
    url: `${SITE.url}/authors/ash`,
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    email: "ash@herbverdict.com",
    sameAs: ["https://prohealthit.com/about"],
    // TODO: add social profile URLs here once those accounts exist, e.g.
    // "https://twitter.com/herbverdict"
    description:
      "Founder and research editor of HerbVerdict. A graduate with a decade in entrepreneurship who has built several independent sites including ProHealthIt. Reads peer-reviewed clinical trials on Ayurvedic herbs and reports findings without prescribing.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function AuthorAshPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <PersonSchema />
      <div className="label label-green" style={{ marginBottom: 12 }}>Author</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 8px" }}>Ash</h1>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--light-text)", margin: "0 0 32px" }}>
        Founder &amp; Research Editor, HerbVerdict
      </p>

      <div className="article-body" style={{ maxWidth: 680 }}>
        <div style={{
          background: "#fff8f0", border: "1px solid #f0d28b", borderRadius: 10,
          padding: "14px 18px", margin: "0 0 28px", fontSize: 14, lineHeight: 1.6, color: "#5a4a2a",
        }}>
          <strong>Important:</strong> Ash is not a doctor, pharmacist, or licensed healthcare
          professional. HerbVerdict reports what published research says; it does not give medical
          advice. Always consult a qualified clinician before changing how you use any supplement.
        </div>

        <h2>Who I am</h2>
        <p>
          I&apos;m Ash, the founder and research editor of HerbVerdict. I&apos;m a graduate with around a
          decade in entrepreneurship, and I&apos;ve built and run several independent websites over that time
          — including <a href="https://prohealthit.com/about" rel="noopener" target="_blank">ProHealthIt</a>,
          an evidence-based health resource where every claim is traced back to primary sources like WHO,
          NIH, and peer-reviewed studies. HerbVerdict applies that same method to one specific, underserved
          area: Ayurvedic herbs and the products Indians actually buy.
        </p>
        <p>
          I started it because I kept hitting the same wall as an ordinary consumer in India. A search for
          any Ayurvedic herb returned one of two things: a brand trying to sell me something, or a wellness
          blog repeating tradition without a single citation. Nobody was simply reading the clinical trials
          and reporting what they found — including the inconvenient parts. So I started doing that.
        </p>

        <h2>What I am — and what I&apos;m not</h2>
        <p>
          My background is in technology and independent research, not medicine. I am not a doctor,
          pharmacist, or licensed healthcare professional, and I state that plainly on every page. What I
          bring is a disciplined approach to primary sources: every factual claim traces back to a named
          study or guideline, not to another website. I don&apos;t diagnose, I don&apos;t prescribe, and I don&apos;t
          tell anyone what to take.
        </p>
        <p>
          The credibility of this site doesn&apos;t come from letters after my name. It comes from the method:
          every claim links to its source, every study summary names its sample size, duration, journal, and
          at least one limitation, and every verdict can be checked against the same evidence I read. You
          never have to trust me — you can follow the citations yourself.
        </p>

        <h2>How I research an article</h2>
        <p>
          Each article starts with a search of indexed databases — primarily PubMed, PMC, and the Cochrane
          Library — for human clinical trials on the specific herb and outcome. I prioritise randomized
          controlled trials and systematic reviews over observational studies, and human studies over
          in-vitro or animal work. I read each study for its design, sample size, duration, funding source,
          and stated limitations. Where Indian regulatory or safety material is relevant (FSSAI, AYUSH,
          CCRAS, NIH LiverTox), I read the primary documents. Only then do I write the verdict, and the
          verdict follows the <a href="/methodology">published scoring criteria</a>, not my opinion.
        </p>
        <p>
          This is the same way I work on my other projects: read the original source, implement or report
          it exactly, show the limitations, and date everything so readers know when it was last checked.
        </p>

        <h2>Conflicts of interest</h2>
        <p>
          I have no financial relationship with any supplement brand, Ayurvedic manufacturer, or
          pharmaceutical company, and HerbVerdict sells no products. I also don&apos;t list fictitious medical
          reviewers or fabricate credentials — the content is written by me, the sources are on every page,
          and that&apos;s the honest model. If anything changes — for example, if the site introduces
          clearly-labelled affiliate links — it will be disclosed on the affected page and in the{" "}
          <a href="/editorial-policy">editorial policy</a>. Commercial relationships never influence a verdict.
        </p>

        <h2>Corrections and contact</h2>
        <p>
          If you believe something on this site is wrong or misrepresents a study, I want to know. Email{" "}
          <strong>ash@herbverdict.com</strong> with the specific article and the issue, and I&apos;ll review
          it against the source. See the <a href="/editorial-policy">corrections policy</a> for how this works.
        </p>
      </div>
    </div>
  );
}
