import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default async function Home() {
  const articles = await getAllArticles();

  return (
    <div className="site-wrap" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
      <ul className="article-list">
        {articles.length === 0 ? (
          <li style={{ padding: "3rem 0", color: "#aaa", fontFamily: "EB Garamond, Georgia, serif" }}>
            Nessun articolo ancora pubblicato.
          </li>
        ) : (
          articles.map((article) => (
            <li key={article.slug} className="article-list-item">
              <ArticleCard article={article} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
