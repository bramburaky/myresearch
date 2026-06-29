import { getAllBibliography } from "@/lib/bibliography";

export const metadata = { title: "Bibliografia — MyResearch" };

export default async function BibliographyPage() {
  const byAuthor = await getAllBibliography();
  const authors = Object.keys(byAuthor).sort((a, b) => a.localeCompare(b, "it"));

  return (
    <div>
      <header className="mb-12">
        <h1
          className="text-4xl font-semibold mb-4"
          style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "#1a1614" }}
        >
          Bibliografia
        </h1>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "#6b6560", fontSize: "1.1rem" }}>
          Tutte le fonti citate negli articoli, organizzate per autore.
        </p>
      </header>

      <hr className="divider" />

      {authors.length === 0 ? (
        <p style={{ color: "#6b6560" }}>Nessuna fonte ancora presente.</p>
      ) : (
        <div className="space-y-12">
          {authors.map((author) => (
            <section key={author}>
              <h2
                className="text-xl font-semibold mb-5"
                style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "#1a1614" }}
              >
                {author}
              </h2>
              <ul className="space-y-4">
                {byAuthor[author]
                  .sort((a, b) => (a.year || "").localeCompare(b.year || ""))
                  .map((ref, i) => (
                    <li key={i} className="border-l-2 pl-4" style={{ borderColor: "#ede4d3" }}>
                      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem", color: "#3d3530" }}>
                        <em>{ref.title}</em>
                        {ref.year ? <span style={{ color: "#9c9189" }}> · {ref.year}</span> : ""}
                        {ref.publisher ? <span style={{ color: "#9c9189" }}> · {ref.publisher}</span> : ""}
                      </p>
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#8b7355" }}
                        >
                          Fonte →
                        </a>
                      )}
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ref.appearsIn.map((slug) => (
                          <a
                            key={slug}
                            href={`/articles/${slug}`}
                            className="tag"
                            style={{ fontSize: "0.68rem" }}
                          >
                            {slug}
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
