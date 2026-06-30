"use client";
import { useEffect, useState } from "react";
import { Heading } from "@/lib/articles";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // Group by top-level sections (h1)
  return (
    <nav aria-label="Indice" style={{
      position: "sticky",
      top: "2rem",
      maxHeight: "calc(100vh - 4rem)",
      overflowY: "auto",
      paddingLeft: "2rem",
    }}>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#bbb",
        marginBottom: "1rem",
        marginTop: 0,
      }}>
        Indice
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {headings.map(({ level, text, id }) => (
          <li key={id} style={{
            paddingLeft: level === 1 ? 0 : level === 2 ? "0.8rem" : "1.5rem",
            marginBottom: "0.4rem",
          }}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: level === 1 ? "0.72rem" : "0.68rem",
                fontWeight: level === 1 ? 500 : 400,
                color: activeId === id ? "#111" : "#bbb",
                textDecoration: "none",
                lineHeight: 1.45,
                display: "block",
                borderLeft: level === 1 && activeId === id ? "2px solid #c0392b" : "2px solid transparent",
                paddingLeft: "0.5rem",
                transition: "color 0.15s",
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
