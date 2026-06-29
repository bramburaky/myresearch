"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Articoli" },
  { href: "/bibliography", label: "Bibliografia" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav style={{ backgroundColor: "#fffff8", borderBottom: "1px solid #e8e6df" }}>
      <div className="site-nav">
        <Link href="/" className="nav-wordmark">MyResearch</Link>
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link${pathname === href ? " active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
