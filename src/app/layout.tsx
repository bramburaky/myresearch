import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MyResearch",
  description: "Raccolta di ricerche, saggi e articoli personali",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ backgroundColor: "#fffff8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <div className="site-content">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
