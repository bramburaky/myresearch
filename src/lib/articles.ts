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
}

export interface BibEntry {
  author: string;
  title: string;
  year?: string;
  publisher?: string;
  url?: string;
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(articlesDir, filename);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));

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

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt || "",
    author: data.author || (Array.isArray(data.authors) ? data.authors.join(", ") : data.authors) || "",
    tags: data.tags || [],
    bibliography: data.bibliography || [],
    contentHtml: processed.toString(),
  };
}
