import Link from "next/link";

export default function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner">
      <strong>Medical Disclaimer:</strong> This website does not provide medical advice.
      Content is for informational and educational purposes only. It is not a substitute for
      professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare
      provider before starting any supplement.{" "}
      <Link href="/disclaimer" style={{ color: "var(--green-accent)" }}>Read full disclaimer →</Link>
    </div>
  );
}
