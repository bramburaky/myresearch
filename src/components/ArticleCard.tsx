import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article>
      <p className="article-date">
        {article.date}
        {article.author ? ` — ${article.author}` : ""}
      </p>
      <Link href={`/articles/${article.slug}`} className="article-title-link">
        {article.title}
      </Link>
      {article.excerpt && (
        <p className="article-excerpt">{article.excerpt}</p>
      )}
      {article.tags && article.tags.length > 0 && (
        <div className="article-tags">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}
