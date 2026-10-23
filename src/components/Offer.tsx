import Reveal from "./Reveal";
import { offerings, offerSteps } from "../data/content";

export default function Offer() {
  return (
    <section className="section section-alt" id="offert">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Offert</p>
          <h2>Ett fast pris för ert projekt</h2>
          <p className="section-lead">
            Olika verksamheter behöver olika saker, därför har vi ingen prislista. Berätta vad
            ni behöver så får ni en offert med fast pris innan vi börjar. Vill ni lägga till något
            på vägen får ni veta vad det kostar innan vi gör det.
          </p>
        </Reveal>

        <div className="offer-grid">
          <Reveal className="offer-list">
            <h3>Det här kan vi hjälpa er med</h3>
            <ul className="offer-items">
              {offerings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="offer-card">
            <h3>Så får ni en offert</h3>
            <ol className="offer-steps">
              {offerSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a href="#kontakt" className="btn btn-primary btn-block">
              Begär offert
            </a>
            <p className="offer-note">Kostnadsfritt och utan förpliktelser.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
