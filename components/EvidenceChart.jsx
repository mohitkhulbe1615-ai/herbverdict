// Renders the trial base across herbs as a horizontal bar chart.
// Every number comes from `totalStudiesReviewed` in the article frontmatter —
// nothing here is estimated, rounded up, or hand-entered.

const VERDICT_FILL = {
  PROVEN: "var(--green-accent)",
  PROMISING: "var(--orange)",
  LIMITED: "var(--gray-limited)",
};

export default function EvidenceChart({ herbs, highlightSlug = null }) {
  if (!herbs || herbs.length === 0) return null;

  const rows = [...herbs].sort((a, b) => (b.studies || 0) - (a.studies || 0));
  const max = Math.max(...rows.map(h => h.studies || 0), 1);

  const rowH = 26;
  const gap = 8;
  const labelW = 128;
  const chartW = 420;
  const height = rows.length * (rowH + gap);

  return (
    <figure style={{ margin: "28px 0 8px" }}>
      <svg
        viewBox={`0 0 ${labelW + chartW + 46} ${height}`}
        width="100%"
        role="img"
        aria-label="Number of human clinical trials reviewed for each herb"
        style={{ maxWidth: 600, overflow: "visible" }}
      >
        {rows.map((h, i) => {
          const y = i * (rowH + gap);
          const w = Math.max(((h.studies || 0) / max) * chartW, 2);
          const isHighlight = highlightSlug && h.slug === highlightSlug;
          return (
            <g key={h.slug}>
              <text
                x={labelW - 10}
                y={y + rowH / 2 + 4}
                textAnchor="end"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: isHighlight ? 700 : 500,
                  fill: isHighlight ? "var(--dark)" : "var(--medium)",
                }}
              >
                {h.name}
              </text>
              <rect
                x={labelW}
                y={y + 3}
                width={chartW}
                height={rowH - 6}
                rx={3}
                fill="var(--bg-warm)"
              />
              <rect
                x={labelW}
                y={y + 3}
                width={w}
                height={rowH - 6}
                rx={3}
                fill={VERDICT_FILL[h.verdict] || "var(--gray-limited)"}
                opacity={isHighlight || !highlightSlug ? 1 : 0.45}
              />
              <text
                x={labelW + w + 8}
                y={y + rowH / 2 + 4}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fill: "var(--light-text)",
                }}
              >
                {h.studies}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          color: "var(--light-text)",
          lineHeight: 1.6,
          marginTop: 10,
        }}
      >
        Human clinical trials reviewed per herb. Bar colour shows our verdict —
        green Proven, orange Promising, grey Limited. A longer bar means more
        trials exist, not that the herb works better.
      </figcaption>
    </figure>
  );
}
