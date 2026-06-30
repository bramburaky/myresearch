import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const articlesDir = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  bibliography?: BibEntry[];
}

export interface Article extends ArticleMeta {
  contentHtml: string;
  headings: Heading[];
}

export interface BibEntry {
  author: string;
  title: string;
  year?: string;
  publisher?: string;
  url?: string;
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâã]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  const counts: Record<string, number> = {};

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = slugify(text);
      counts[id] = (counts[id] || 0) + 1;
      if (counts[id] > 1) id = `${id}-${counts[id] - 1}`;
      headings.push({ level, text, id });
    }
  }
  return headings;
}

function parseMdBibliography(markdown: string): BibEntry[] {
  const bibMatch = markdown.match(/^##\s*Bibliografia\s*\n([\s\S]+?)(?=^#|\z)/m);
  if (!bibMatch) return [];

  const lines = bibMatch[1].split("\n").filter((l) => l.trim().startsWith("-"));
  const entries: BibEntry[] = [];

  for (const line of lines) {
    const content = line.replace(/^-\s*/, "").trim();
    // Format: "Author, Name. *Title* (orig. *Original*, year). Publisher."
    // or: "Author, Name. *Title* (year)."
    const authorMatch = content.match(/^([^.]+)\.\s*/);
    if (!authorMatch) continue;
    const author = authorMatch[1].trim();
    const rest = content.slice(authorMatch[0].length);

    const titleMatch = rest.match(/\*([^*]+)\*/);
    const title = titleMatch ? titleMatch[1] : rest.split(".")[0];

    const yearMatch = rest.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
    const year = yearMatch ? yearMatch[1] : undefined;

    entries.push({ author, title, year });
  }
  return entries;
}

async function addHeadingIds(html: string, headings: Heading[]): Promise<string> {
  let i = 0;
  return html.replace(/<(h[1-3])>([^<]+)<\/h[1-3]>/g, (_, tag, text) => {
    const heading = headings[i++];
    if (!heading) return `<${tag}>${text}</${tag}>`;
    return `<${tag} id="${heading.id}">${text}</${tag}>`;
  });
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(articlesDir, filename), "utf8"));

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      excerpt: data.excerpt || "",
      author: data.author || (Array.isArray(data.authors) ? data.authors.join(", ") : data.authors) || "",
      tags: data.tags || [],
      bibliography: data.bibliography || [],
    } as ArticleMeta;
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const headings = extractHeadings(content);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const rawHtml = processed.toString();
  const contentHtml = await addHeadingIds(rawHtml, headings);

  // Use frontmatter bibliography, or parse from markdown ## Bibliografia section
  const bibliography: BibEntry[] =
    data.bibliography?.length > 0
      ? data.bibliography
      : parseMdBibliography(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt || "",
    author: data.author || (Array.isArray(data.authors) ? data.authors.join(", ") : data.authors) || "",
    tags: data.tags || [],
    bibliography,
    contentHtml,
    headings,
  };
}
