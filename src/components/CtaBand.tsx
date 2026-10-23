import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <Reveal className="wrap cta-band-inner">
        <h2>Redo att synas online?</h2>
        <p>
          Vi tar just nu emot ett fåtal nya projekt. Hör av dig så tar vi ett första samtal,
          helt utan förpliktelser.
        </p>
        <a href="#kontakt" className="btn btn-light">
          Kom igång
        </a>
      </Reveal>
    </section>
  );
}
