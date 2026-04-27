export const metadata = {
  title: "Product Reviews",
  description: "Science-based reviews of Ayurvedic products available in India. Label comparisons, specification analysis, and quality assessments.",
};

export default function ReviewsPage() {
  return (
    <div className="container" style={{ padding: "60px 40px" }}>
      <div className="label label-green" style={{ marginBottom: 12 }}>Product Reviews</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Brand & Product Reviews</h1>
      <p style={{ fontSize: 17, color: "var(--medium)", maxWidth: 600, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
        Factual, label-based comparisons of Ayurvedic products available in India. No opinions — just specifications, certifications, and published evidence.
      </p>

      <div style={{
        background: "var(--bg-warm)", border: "1px solid var(--border)",
        borderRadius: 8, padding: "48px 32px", textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔬</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Coming Soon</h2>
        <p style={{ fontSize: 15, color: "var(--medium)", maxWidth: 400, margin: "0 auto", fontWeight: 300 }}>
          Our first product comparison — Himalaya vs Patanjali Ashwagandha: A Label-by-Label Analysis — is in research.
        </p>
      </div>
    </div>
  );
}
