import { ArticleSchema, BreadcrumbSchema } from "@/components/Schema";

function fmtDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

function ReviewBar({ fm, section }) {
  const published = fmtDate(fm.publishDate);
  const updated = fmtDate(fm.lastUpdated);
  const author = fm.author || "Ash";
  return (
    <div style={{
      maxWidth: 820, margin: "0 auto", padding: "0 40px",
    }}>
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 18px",
        fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--light-text)",
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "12px 0", margin: "8px 0 0",
      }}>
        <span>
          By <a href="/authors/ash" style={{ color: "var(--green-accent)", fontWeight: 600 }}>{author}</a>
          {fm.authorRole ? `, ${fm.authorRole}` : ", Research Editor"}
        </span>
        {published && <span>Published {published}</span>}
        {updated && updated !== published && <span>Updated {updated}</span>}
        <span style={{ color: "var(--lighter-text)" }}>
          Reviewed against cited sources ·{" "}
          <a href="/editorial-policy" style={{ color: "var(--green-accent)" }}>How we work</a>
        </span>
      </div>
      {section === "herbs" && (
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.6,
          color: "var(--light-text)", background: "var(--green-light)",
          border: "1px solid var(--border)", borderRadius: 8,
          padding: "10px 14px", margin: "14px 0 0",
        }}>
          <strong style={{ color: "var(--medium)" }}>How we scored this:</strong> our Proven / Promising /
          Limited verdict follows fixed criteria based on the number, size, and quality of human clinical
          trials — not opinion or tradition.{" "}
          <a href="/methodology" style={{ color: "var(--green-accent)" }}>See the full scoring method →</a>
        </div>
      )}
    </div>
  );
}

export default function ArticlePage({ content, section, slug }) {
  const fm = content.frontmatter;
  // Prefer the visible H1 so structured data always matches the page.
  const headline = content.h1 || fm.title;
  return (
    <>
      <ArticleSchema
        title={headline}
        description={fm.description}
        datePublished={fm.publishDate}
        dateModified={fm.lastUpdated}
        slug={`${section}/${slug}`}
        section={section}
        author={fm.author}
        authorRole={fm.authorRole}
        image={fm.ogImage}
        type={fm.schemaType}
      />
      <BreadcrumbSchema section={section} slug={slug} title={headline} />
      {content.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
        />
      )}
      {content.css && (
        <style dangerouslySetInnerHTML={{ __html: content.css }} />
      )}
      <ReviewBar fm={fm} section={section} />
      <article
        className="container article-body"
        style={{ padding: "24px 40px 0", maxWidth: 820, margin: "0 auto" }}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </>
  );
}
