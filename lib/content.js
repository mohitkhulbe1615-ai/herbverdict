import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function getSection(section) {
  const dir = path.join(contentDir, section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".mdx"))
    .map(f => f.replace(/\.mdx$/, ""));
}

function parseContent(raw) {
  const { data, content } = matter(raw);

  let cleaned = content.replace(/^import\s+.*$/gm, "");

  let styleBlock = "";
  const styleMatch = cleaned.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    styleBlock = styleMatch[1];
    cleaned = cleaned.replace(/<style>[\s\S]*?<\/style>/, "");
  }

  let jsonLd = null;
  const scriptMatch = cleaned.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    try { jsonLd = JSON.parse(scriptMatch[1]); } catch (e) {}
    cleaned = cleaned.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/, "");
  }

  const disclaimerHtml = '<div style="background:#f6fbf6;border:1px solid #cfe1d4;border-radius:10px;padding:14px 18px;margin:24px 0;font-size:12px;color:#666;line-height:1.6"><strong style="color:#555">Medical Disclaimer:</strong> This website does not provide medical advice. Content is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting any supplement. <a href="/disclaimer" style="color:#2E7D32">Read full disclaimer &rarr;</a></div>';
  cleaned = cleaned.replace(/<DisclaimerBanner\s*\/>/g, disclaimerHtml);

  cleaned = cleaned.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  cleaned = cleaned.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  cleaned = cleaned.replace(/(?<![*])\*([^*]+)\*(?![*])/g, "<em>$1</em>");

  cleaned = cleaned.split("\n\n").map(block => {
    const t = block.trim();
    if (!t) return "";
    if (t.startsWith("<")) return t;
    return "<p>" + t + "</p>";
  }).join("\n");

  return { frontmatter: data, html: cleaned, css: styleBlock, jsonLd };
}

// ── Herbs ──
export function getHerbSlugs() { return getSection("herbs"); }
export function getHerbContent(slug) {
  const fp = path.join(contentDir, "herbs", `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return parseContent(fs.readFileSync(fp, "utf-8"));
}

// ── Reviews ──
export function getReviewSlugs() { return getSection("reviews"); }
export function getReviewContent(slug) {
  const fp = path.join(contentDir, "reviews", `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return parseContent(fs.readFileSync(fp, "utf-8"));
}

// ── Guides ──
export function getGuideSlugs() { return getSection("guides"); }
export function getGuideContent(slug) {
  const fp = path.join(contentDir, "guides", `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return parseContent(fs.readFileSync(fp, "utf-8"));
}

// ── Research ──
export function getResearchSlugs() { return getSection("research"); }
export function getResearchContent(slug) {
  const fp = path.join(contentDir, "research", `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return parseContent(fs.readFileSync(fp, "utf-8"));
}

// ── Myths ──
export function getMythSlugs() { return getSection("myths"); }
export function getMythContent(slug) {
  const fp = path.join(contentDir, "myths", `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return parseContent(fs.readFileSync(fp, "utf-8"));
}

// ── All content (for homepage, sitemap, etc.) ──
export function getAllContent() {
  const sections = ["herbs", "reviews", "guides", "research", "myths"];
  const all = [];
  for (const section of sections) {
    const slugs = getSection(section);
    for (const slug of slugs) {
      const fp = path.join(contentDir, section, `${slug}.mdx`);
      const { data } = matter(fs.readFileSync(fp, "utf-8"));
      all.push({ slug, section, ...data });
    }
  }
  return all;
}
