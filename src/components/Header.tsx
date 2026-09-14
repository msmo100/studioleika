import { useEffect, useState } from "react";
import { navLinks } from "../data/content";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label="Leika Studio — startsida">
          <Logo className="logo-sm" />
        </a>

        <nav id="site-nav" className={`nav${menuOpen ? " open" : ""}`} aria-label="Huvudmeny">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#kontakt" className="btn btn-primary btn-sm">
            Boka möte
          </a>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
