import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BibEntry, getArticleBySlug } from "./articles";

const articlesDir = path.join(process.cwd(), "content", "articles");

interface BibEntryWithSource extends BibEntry {
  appearsIn: string[];
}

export async function getAllBibliography(): Promise<Record<string, BibEntryWithSource[]>> {
  if (!fs.existsSync(articlesDir)) return {};

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
  const byAuthor: Record<string, BibEntryWithSource[]> = {};

  for (const filename of files) {
    const slug = filename.replace(/\.md$/, "");
    const article = await getArticleBySlug(slug);
    if (!article) continue;

    for (const ref of article.bibliography || []) {
      const author = ref.author || "Autore sconosciuto";
      if (!byAuthor[author]) byAuthor[author] = [];

      const existing = byAuthor[author].find(
        (r) => r.title === ref.title && r.year === ref.year
      );
      if (existing) {
        if (!existing.appearsIn.includes(slug)) existing.appearsIn.push(slug);
      } else {
        byAuthor[author].push({ ...ref, appearsIn: [slug] });
      }
    }
  }

  return byAuthor;
}
