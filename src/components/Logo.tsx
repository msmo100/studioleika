interface LogoProps {
  /** Extra klass för storlek, t.ex. `logo-sm` i header och sidfot */
  className?: string;
}

/**
 * Logotypen: den fonetiska skrivningen av Leika.
 * Dold för skärmläsare — omgivande element bär namnet i text.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`logo-ipa ${className}`.trim()} aria-hidden="true">
      <span className="logo-bracket">[</span>ˈleɪka<span className="logo-bracket">]</span>
    </span>
  );
}
