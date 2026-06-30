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
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="nav-wordmark">MyResearch</Link>
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`nav-link${pathname === href ? " active" : ""}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
