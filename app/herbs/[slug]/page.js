import { notFound } from "next/navigation";
import { herbs, getHerbBySlug, getVerdictClass } from "@/lib/herbs";
import { getHerbContent, getHerbSlugs } from "@/lib/content";
import ArticlePage from "@/components/ArticlePage";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export function generateStaticParams() {
  const dataSlugs = herbs.map(h => ({ slug: h.slug }));
  const fileSlugs = getHerbSlugs().map(s => ({ slug: s }));
  return [...new Map([...dataSlugs, ...fileSlugs].map(s => [s.slug, s])).values()];
}

export function generateMetadata({ params }) {
  const content = getHerbContent(params.slug);
  if (content) {
    const t = content.frontmatter.title;
    const d = content.frontmatter.description;
    const url = `https://www.herbverdict.com/herbs/${params.slug}`;
    return {
      title: t, description: d,
      alternates: { canonical: url },
      openGraph: { title: t, description: d, url },
      twitter: { title: t, description: d },
    };
  }
  const herb = getHerbBySlug(params.slug);
  if (!herb) return {};
  const t = `${herb.name} Evidence Scorecard`;
  const d = herb.summary;
  const url = `https://www.herbverdict.com/herbs/${params.slug}`;
  return {
    title: t, description: d,
    alternates: { canonical: url },
    openGraph: { title: t, description: d, url },
    twitter: { title: t, description: d },
  };
}

export default function HerbPage({ params }) {
  const content = getHerbContent(params.slug);
  if (content) return <ArticlePage content={content} section="herbs" slug={params.slug} />;

  const herb = getHerbBySlug(params.slug);
  if (!herb) notFound();

  return (
    <>
      <article className="container" style={{ padding: "48px 40px 0" }}>
        <div className="label" style={{ marginBottom: 12 }}>Evidence Scorecard</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px" }}>{herb.name}</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--light-text)" }}>{herb.botanical}</p>
        <div style={{ marginTop: 16 }}>
          <span className={`verdict-badge ${getVerdictClass(herb.verdict)}`}>{herb.verdict}</span>
        </div>
        <DisclaimerBanner />
        <div className="article-body">
          <p>{herb.summary}</p>
          <p style={{ color: "var(--light-text)", fontStyle: "italic" }}>Full article coming soon.</p>
        </div>
      </article>
    </>
  );
}
