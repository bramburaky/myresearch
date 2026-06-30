import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const primaryTag = article.tags?.[0];

  return (
    <div className="article-layout">
      {/* Main content */}
      <article className="article-main">
        <header className="article-header">
          {primaryTag && <span className="article-kicker-large">{primaryTag}</span>}
          <h1 className="article-page-title">{article.title}</h1>
          {article.excerpt && (
            <p className="article-page-excerpt">{article.excerpt}</p>
          )}
          <p className="article-page-meta">
            {article.date}
            {article.author ? ` — ${article.author}` : ""}
          </p>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

        {article.bibliography && article.bibliography.length > 0 && (
          <>
            <hr className="divider" style={{ marginTop: "3rem" }} />
            <section>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#aaa",
                marginBottom: "1.5rem",
              }}>
                Riferimenti bibliografici
              </p>
              <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {article.bibliography.map((ref: BibEntry, i: number) => (
                  <li key={i} style={{
                    fontFamily: "EB Garamond, Georgia, serif",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "#444",
                    marginBottom: "0.7rem",
                  }}>
                    {ref.author}. <em>{ref.title}</em>
                    {ref.year ? `. ${ref.year}` : ""}
                    {ref.publisher ? `. ${ref.publisher}` : ""}
                    {ref.url && (
                      <> <a href={ref.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#999", textDecoration: "underline" }}>→</a></>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}
      </article>

      {/* TOC sidebar */}
      {article.headings.length > 0 && (
        <aside className="article-toc">
          <TableOfContents headings={article.headings} />
        </aside>
      )}
    </div>
  );
}
