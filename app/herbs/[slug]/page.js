import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { herbs, getHerbBySlug, getVerdictClass } from "@/lib/herbs";
import { getHerbContent, getHerbSlugs } from "@/lib/content";
import { ArticleSchema } from "@/components/Schema";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Newsletter from "@/components/Newsletter";

const mdxComponents = {
  DisclaimerBanner,
};

export function generateStaticParams() {
  const dataSlugs = herbs.map(h => ({ slug: h.slug }));
  const fileSlugs = getHerbSlugs().map(s => ({ slug: s }));
  const allSlugs = [...new Map([...dataSlugs, ...fileSlugs].map(s => [s.slug, s])).values()];
  return allSlugs;
}

export function generateMetadata({ params }) {
  const fileContent = getHerbContent(params.slug);
  if (fileContent) {
    const fm = fileContent.frontmatter;
    return { title: fm.title, description: fm.description };
  }
  const herb = getHerbBySlug(params.slug);
  if (!herb) return {};
  return {
    title: `${herb.name} Evidence Scorecard`,
    description: herb.summary,
  };
}

export default function HerbPage({ params }) {
  const fileContent = getHerbContent(params.slug);

  if (fileContent) {
    const fm = fileContent.frontmatter;
    return (
      <>
        <ArticleSchema
          title={fm.title}
          description={fm.description}
          datePublished={fm.publishDate}
          dateModified={fm.lastUpdated}
          slug={`herbs/${params.slug}`}
          type="herb"
        />
        <article className="container" style={{ padding: "24px 40px 0", maxWidth: 820, margin: "0 auto" }}>
          <div className="article-body">
            <MDXRemote source={fileContent.content} components={mdxComponents} />
          </div>
        </article>
        <Newsletter variant="light" />
      </>
    );
  }

  const herb = getHerbBySlug(params.slug);
  if (!herb) notFound();

  return (
    <>
      <ArticleSchema
        title={`${herb.name} Evidence Scorecard`}
        description={herb.summary}
        datePublished="2026-04-27"
        slug={`herbs/${herb.slug}`}
        type="herb"
      />
      <article className="container" style={{ padding: "48px 40px 0" }}>
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
        <div style={{
          display: "flex", gap: 24, fontFamily: "var(--font-sans)", fontSize: 12,
          color: "var(--light-text)", borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)", padding: "12px 0", marginBottom: 36,
        }}>
          <span>By <strong style={{ color: "var(--dark)" }}>HerbVerdict Editorial</strong></span>
          <span>Last updated: April 2026</span>
        </div>
        <DisclaimerBanner />
        <div className="article-body">
          <h2>What is {herb.name}?</h2>
          <p>{herb.summary}</p>
          <p style={{ color: "var(--light-text)", fontStyle: "italic" }}>
            Full article coming soon. This herb is queued for research.
          </p>
        </div>
        <DisclaimerBanner />
      </article>
      <Newsletter variant="light" />
    </>
  );
}
