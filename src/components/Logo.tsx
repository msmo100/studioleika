import { logoViewBox, logoAccentPath, logoInkPath } from "../brand/logoPaths";

interface LogoProps {
  /** Extra klass för storlek, t.ex. `logo-sm` i header och sidfot */
  className?: string;
}

/**
 * Logotypen: den fonetiska skrivningen av Leika, ritad som outlines.
 *
 * Som HTML-text gick det inte: ˈ (U+02C8) och ɪ (U+026A) saknas i Playfair
 * Display, så de två tecknen föll tillbaka på systemets serif och logotypen
 * renderades i två olika snitt. Paths ur `src/brand/` — genererade av
 * `npm run brand` — ger rätt form överallt, utan att vänta in någon font.
 *
 * Höjden är 1em, så all befintlig font-size-styrning fungerar som förut.
 * Dold för skärmläsare — omgivande element bär namnet i text.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      className={`logo-mark ${className}`.trim()}
      viewBox={logoViewBox}
      aria-hidden="true"
      focusable="false"
    >
      <path className="logo-mark-bracket" d={logoAccentPath} />
      <path className="logo-mark-ink" d={logoInkPath} />
    </svg>
  );
}
