import fs from "fs";
import path from "path";
import matter from "gray-matter";

const herbsDir = path.join(process.cwd(), "content", "herbs");

export function getHerbSlugs() {
  if (!fs.existsSync(herbsDir)) return [];
  return fs.readdirSync(herbsDir)
    .filter(f => f.endsWith(".mdx"))
    .map(f => f.replace(/\.mdx$/, ""));
}

export function getHerbContent(slug) {
  const filePath = path.join(herbsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  let cleaned = content
    .replace(/^import\s+.*$/gm, "");

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

export function getAllHerbFrontmatter() {
  const slugs = getHerbSlugs();
  return slugs.map(slug => {
    const c = getHerbContent(slug);
    return { slug, ...c.frontmatter };
  });
}
