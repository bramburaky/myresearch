import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const primaryTag = article.tags?.[0];
  return (
    <article>
      {primaryTag && <span className="article-kicker">{primaryTag}</span>}
      <Link href={`/articles/${article.slug}`} className="article-title-link">
        {article.title}
      </Link>
      {article.excerpt && (
        <p className="article-excerpt">{article.excerpt}</p>
      )}
      <p className="article-meta">
        {article.date}
        {article.author ? ` — ${article.author}` : ""}
      </p>
    </article>
  );
}
