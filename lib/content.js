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
  return { frontmatter: data, content };
}

export function getAllHerbFrontmatter() {
  const slugs = getHerbSlugs();
  return slugs.map(slug => {
    const { frontmatter } = getHerbContent(slug);
    return { slug, ...frontmatter };
  });
}
