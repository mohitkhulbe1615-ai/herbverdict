import { ArticleSchema } from "@/components/Schema";
import Newsletter from "@/components/Newsletter";

export default function ArticlePage({ content, section, slug }) {
  const fm = content.frontmatter;
  return (
    <>
      <ArticleSchema
        title={fm.title}
        description={fm.description}
        datePublished={fm.publishDate}
        dateModified={fm.lastUpdated}
        slug={`${section}/${slug}`}
        type={fm.schemaType === "MedicalWebPage" ? "herb" : "article"}
      />
      {content.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
        />
      )}
      {content.css && (
        <style dangerouslySetInnerHTML={{ __html: content.css }} />
      )}
      <article
        className="container article-body"
        style={{ padding: "24px 40px 0", maxWidth: 820, margin: "0 auto" }}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
      <Newsletter variant="light" />
    </>
  );
}
