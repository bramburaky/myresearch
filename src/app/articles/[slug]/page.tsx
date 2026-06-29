import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: `${article.title} — MyResearch` };
}

interface BibEntry {
  author: string;
  title: string;
  year?: string;
  publisher?: string;
  url?: string;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article>
      <header className="article-header">
        {article.tags && article.tags.length > 0 && (
          <div className="article-header-tags">
            {article.tags.map((tag: string) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <h1 className="article-page-title">{article.title}</h1>
        {article.excerpt && (
          <p className="article-page-excerpt">{article.excerpt}</p>
        )}
        <p className="article-page-meta">
          {article.date}
          {article.author ? ` — ${article.author}` : ""}
        </p>
      </header>

      <hr className="section-divider" />

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {article.bibliography && article.bibliography.length > 0 && (
        <>
          <hr className="section-divider" />
          <section>
            <h2 style={{
              fontFamily: "EB Garamond, Palatino, serif",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#111",
              marginBottom: "1.5rem",
            }}>
              Riferimenti bibliografici
            </h2>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {article.bibliography.map((ref: BibEntry, i: number) => (
                <li key={i} style={{
                  fontFamily: "EB Garamond, Palatino, serif",
                  fontSize: "0.98rem",
                  lineHeight: 1.65,
                  color: "#333",
                  marginBottom: "0.8rem",
                }}>
                  {ref.author}.{" "}
                  <em>{ref.title}</em>
                  {ref.year ? `. ${ref.year}` : ""}
                  {ref.publisher ? `. ${ref.publisher}` : ""}
                  {ref.url && (
                    <>
                      {". "}
                      <a href={ref.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#555", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                        →
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
    </article>
  );
}
