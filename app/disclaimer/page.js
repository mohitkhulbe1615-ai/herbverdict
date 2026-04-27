import { DISCLAIMER_FULL } from "@/lib/constants";

export const metadata = {
  title: "Medical Disclaimer",
  description: "HerbVerdict medical and legal disclaimer. This website does not provide medical advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label" style={{ marginBottom: 12, color: "var(--orange)" }}>Important</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 32px" }}>Medical Disclaimer</h1>

      <div className="article-body" style={{ maxWidth: 680 }}>
        {DISCLAIMER_FULL.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <h2>About Our Content</h2>
        <p>
          HerbVerdict publishes evidence scorecards and product comparisons based on peer-reviewed
          clinical research. Our content summarizes findings from published studies — it does not
          constitute medical advice, diagnosis, or treatment recommendations.
        </p>
        <p>
          Our verdict system (Proven, Promising, Limited) reflects our editorial assessment of
          published evidence quality and quantity. These verdicts are not medical endorsements.
          A "Proven" verdict means that multiple clinical trials support a specific finding —
          it does not mean we recommend using that herb for any condition.
        </p>

        <h2>Affiliate Disclosure</h2>
        <p>
          Some articles on this site may contain affiliate links to products on Amazon, brand
          websites, or other retailers. If you purchase through these links, we may earn a small
          commission at no additional cost to you. Affiliate relationships never influence our
          editorial verdicts or product assessments. All affiliate links are clearly disclosed
          in the article where they appear.
        </p>

        <h2>Not a Substitute for Professional Advice</h2>
        <p>
          If you are considering starting, stopping, or changing any supplement or health regimen,
          consult with a qualified healthcare provider first. This is especially important if you
          are pregnant, nursing, taking medication, or have any medical condition.
        </p>
        <p>
          If you are experiencing a medical emergency, call your local emergency services immediately.
          Do not rely on any information on this website in an emergency situation.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about this disclaimer or our editorial practices, contact us at{" "}
          <strong>ash@herbverdict.com</strong>.
        </p>
      </div>
    </div>
  );
}
