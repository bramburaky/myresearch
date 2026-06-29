import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <div>
      <header style={{ marginBottom: "3rem" }}>
        <h1 className="page-title">MyResearch</h1>
        <p className="page-subtitle">
          Ricerche, saggi e riflessioni personali.
        </p>
      </header>

      <hr className="section-divider" />

      {articles.length === 0 ? (
        <p style={{ color: "#888", fontFamily: "EB Garamond, Palatino, serif" }}>
          Nessun articolo ancora pubblicato.
        </p>
      ) : (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
