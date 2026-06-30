import { getAllBibliography } from "@/lib/bibliography";

export const metadata = { title: "Bibliografia — MyResearch" };

export default async function BibliographyPage() {
  const byAuthor = await getAllBibliography();
  const authors = Object.keys(byAuthor).sort((a, b) => a.localeCompare(b, "it"));

  return (
    <div className="site-wrap" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
      <header style={{ paddingBottom: "2rem", borderBottom: "1px solid #e2e2e2", marginBottom: "2.5rem" }}>
        <span className="page-eyebrow">Archivio</span>
        <h1 className="page-title">Bibliografia</h1>
      </header>

      {authors.length === 0 ? (
        <p style={{ color: "#aaa", fontFamily: "EB Garamond, Georgia, serif" }}>Nessuna fonte ancora presente.</p>
      ) : (
        <div>
          {authors.map((author) => (
            <div key={author} className="bib-section">
              <p className="bib-author">{author}</p>
              {byAuthor[author]
                .sort((a, b) => (a.year || "").localeCompare(b.year || ""))
                .map((ref, i) => (
                  <div key={i} className="bib-entry">
                    <em>{ref.title}</em>
                    {ref.year && <span style={{ color: "#aaa" }}> · {ref.year}</span>}
                    {ref.publisher && <span style={{ color: "#aaa" }}> · {ref.publisher}</span>}
                    {ref.url && (
                      <> <a href={ref.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#999", textDecoration: "underline" }}>→</a></>
                    )}
                    <div className="bib-appears">
                      citato in:{" "}
                      {ref.appearsIn.map((slug, j) => (
                        <span key={slug}>
                          {j > 0 && ", "}
                          <a href={`/articles/${slug}`}>{slug.replace(/[-_]/g, " ")}</a>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
