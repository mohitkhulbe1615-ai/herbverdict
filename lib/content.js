import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { HERB_META, DEFAULT_HERB_ICON, VERDICT_ORDER } from "@/lib/herbs";

const contentDir = path.join(process.cwd(), "content");

function getSection(section) {
  const dir = path.join(contentDir, section);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".mdx"))
    .map(f => f.replace(/\.mdx$/, ""));
}

// ── Minimal markdown renderer ──
// The MDX in /content is mostly raw HTML. These helpers cover the markdown
// syntax we actually author with: headings, bullet/ordered lists, blockquotes,
// links, bold, italic and inline code. Anything else should be written as HTML.

function renderInline(text) {
  let t = text;
  // inline code first so its contents are not further formatted
  const codeStore = [];
  t = t.replace(/`([^`]+)`/g, (_, c) => {
    codeStore.push(c);
    return `\u0000CODE${codeStore.length - 1}\u0000`;
  });
  // markdown links [label](href)
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(?<![*])\*([^*]+)\*(?![*])/g, "<em>$1</em>");
  t = t.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => "<code>" + codeStore[Number(i)] + "</code>");
  return t;
}

function renderBlock(block) {
  const raw = block.replace(/\s+$/, "");
  const t = raw.trim();
  if (!t) return "";
  // already HTML (including headings we converted above)
  if (t.startsWith("<")) return t;

  const lines = t.split("\n").map(l => l.trim()).filter(Boolean);

  // unordered list
  if (lines.every(l => /^[-*]\s+/.test(l))) {
    const items = lines.map(l => "<li>" + renderInline(l.replace(/^[-*]\s+/, "")) + "</li>").join("");
    return "<ul>" + items + "</ul>";
  }

  // ordered list
  if (lines.every(l => /^\d+[.)]\s+/.test(l))) {
    const items = lines.map(l => "<li>" + renderInline(l.replace(/^\d+[.)]\s+/, "")) + "</li>").join("");
    return "<ol>" + items + "</ol>";
  }

  // blockquote
  if (lines.every(l => /^>\s?/.test(l))) {
    const body = lines.map(l => l.replace(/^>\s?/, "")).join(" ");
    return "<blockquote>" + renderInline(body) + "</blockquote>";
  }

  // mixed block: a lead-in line followed by list items
  const firstListIdx = lines.findIndex(l => /^[-*]\s+/.test(l) || /^\d+[.)]\s+/.test(l));
  if (firstListIdx > 0) {
    const lead = lines.slice(0, firstListIdx).join(" ");
    const rest = lines.slice(firstListIdx).join("\n");
    return "<p>" + renderInline(lead) + "</p>\n" + renderBlock(rest);
  }

  return "<p>" + renderInline(lines.join(" ")) + "</p>";
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

  cleaned = cleaned.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  cleaned = cleaned.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  cleaned = cleaned.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  cleaned = cleaned.split("\n\n").map(block => renderBlock(block)).join("\n");

  // The visible H1 is the canonical headline. Schema and breadcrumbs read it
  // from here so structured data can never drift from what the page displays.
  let h1 = null;
  const h1Match = cleaned.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    h1 = h1Match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }

  return { frontmatter: data, html: cleaned, css: styleBlock, jsonLd, h1 };
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

// ── Herb index (single source of truth) ──
// Verdict and study counts come from each article's frontmatter, never from a
// second hardcoded list. Presentation-only fields (icon, tagline) come from
// HERB_META in lib/herbs.js.
export function getHerbsIndex() {
  const slugs = getSection("herbs");
  const items = slugs.map(slug => {
    const fp = path.join(contentDir, "herbs", `${slug}.mdx`);
    const { data } = matter(fs.readFileSync(fp, "utf-8"));
    const meta = HERB_META[slug] || {};
    return {
      slug,
      name: data.herbCommonName || data.title || slug,
      botanical: data.herbBotanicalName || "",
      verdict: (data.verdict || "LIMITED").toUpperCase(),
      studies: data.totalStudiesReviewed ?? 0,
      icon: meta.icon || DEFAULT_HERB_ICON,
      tagline: meta.tagline || data.description || "",
      summary: data.description || "",
    };
  });
  return items.sort((a, b) => {
    const v = VERDICT_ORDER.indexOf(a.verdict) - VERDICT_ORDER.indexOf(b.verdict);
    if (v !== 0) return v;
    return (b.studies || 0) - (a.studies || 0);
  });
}

export function getHerbIndexEntry(slug) {
  return getHerbsIndex().find(h => h.slug === slug) || null;
}
