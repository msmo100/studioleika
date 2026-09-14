import Reveal from "./Reveal";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-vignette" aria-hidden="true"></div>

      <div className="wrap hero-inner">
        <Reveal className="hero-copy">
          <h1 className="hero-title">
            <Logo />
            <span className="hero-title-sub">Leika Studio</span>
            <span className="sr-only"> — uttalas ungefär LEJ-ka</span>
          </h1>

          <span className="ornament" aria-hidden="true">
            ✦
          </span>

          <p className="hero-sub">
            Vi bygger hemsidor och webblösningar för företag som vill synas, kännas rätt och
            faktiskt fungera. Tydligt hantverk, personlig kontakt — inga krångliga byråord.
          </p>

          <div className="hero-cta">
            <a href="#kontakt" className="btn btn-primary">
              Boka ett kostnadsfritt samtal
            </a>
            <a href="#tjanster" className="btn btn-ghost">
              Se vad vi gör
            </a>
          </div>

          <p className="hero-note">Nystartad studio i Sverige — vi tar just nu emot nya projekt.</p>
        </Reveal>
      </div>
    </section>
  );
}
