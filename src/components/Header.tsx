import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobilpanelen och scroll-padding för ankarlänkar utgår båda från
  // headerns verkliga höjd — den var hårdkodad till 70px och stämde inte.
  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const apply = () =>
      document.documentElement.style.setProperty("--header-h", `${Math.round(node.offsetHeight)}px`);

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Menyn ska gå att stänga på alla de sätt man förväntar sig: Escape,
  // klick utanför, och när fönstret blir brett nog att menyn ändå syns.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);

    // Låser bakgrunden så sidan inte glider under den öppna panelen.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label="Leika Studio — startsida">
          <Logo className="logo-sm" />
        </a>

        <nav id="site-nav" className={`nav${menuOpen ? " open" : ""}`} aria-label="Huvudmeny">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}

          {/* Samma uppmaning som i headern — utan den här saknar mobilen
              helt en CTA, eftersom headerknappen är dold under 720px. */}
          <a
            href="#kontakt"
            className="btn btn-primary btn-block nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Boka möte
          </a>
        </nav>

        <div className="header-actions">
          <a href="#kontakt" className="btn btn-primary btn-sm">
            Boka möte
          </a>
          <button
            ref={toggleRef}
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
