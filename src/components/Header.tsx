import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";
import Logo from "./Logo";

const sunPath =
  "M12 7.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 1 0 0-9M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77";
const moonPath = "M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z";

/** Temat som faktiskt syns: ett sparat val, annars systemets. */
function currentTheme(): "light" | "dark" {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeIcon({ path, className }: { path: string; className: string }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // null tills sidan hydrerats — servern kan inte veta besökarens tema.
  const [dark, setDark] = useState<boolean | null>(null);
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

  useEffect(() => {
    setDark(currentTheme() === "dark");
    // Följ systemet live, så länge besökaren inte valt själv.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(currentTheme() === "dark");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Privat läge o.d. — valet gäller då bara den här sidvisningen.
    }
    setDark(next === "dark");
  };

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
        <a href="#top" className="brand" aria-label="Studio Leika, startsida">
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
          <button
            type="button"
            className="theme-toggle"
            aria-label="Mörkt läge"
            aria-pressed={dark ?? undefined}
            onClick={toggleTheme}
          >
            <ThemeIcon path={moonPath} className="theme-icon-moon" />
            <ThemeIcon path={sunPath} className="theme-icon-sun" />
          </button>
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
