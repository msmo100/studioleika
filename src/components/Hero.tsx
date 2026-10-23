import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-vignette" aria-hidden="true"></div>

      <div className="wrap hero-inner">
        {/* Medvetet utan Reveal: hero är sidans LCP-element och ska målas
            direkt, inte tonas in när en observer hunnit trigga. */}
        <div className="hero-copy">
          <Logo className="hero-logo" />

          <p className="hero-brand">
            Studio Leika
            <span className="sr-only">, uttalas ungefär LEJ-ka</span>
          </p>

          <span className="ornament" aria-hidden="true">
            ✦
          </span>

          <h1 className="hero-title">
            Hemsidor och webblösningar för företag som vill synas
          </h1>

          <p className="hero-sub">
            Vi bygger hemsidor som är lätta att använda och som hjälper er att få fler kunder.
            Ni har en personlig kontakt hela vägen och får raka besked på vanlig svenska.
          </p>

          <div className="hero-cta">
            <a href="#kontakt" className="btn btn-primary">
              Boka ett kostnadsfritt samtal
            </a>
            <a href="#tjanster" className="btn btn-ghost">
              Se vad vi gör
            </a>
          </div>

          <p className="hero-note">Nystartad studio i Sverige. Vi tar just nu emot nya projekt.</p>
        </div>
      </div>
    </section>
  );
}
