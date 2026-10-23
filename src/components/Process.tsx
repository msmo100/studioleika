import Reveal from "./Reveal";
import { processSteps } from "../data/content";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Så jobbar vi</p>
          <h2>Så går ett projekt till</h2>
        </Reveal>

        <ol className="process-list">
          {processSteps.map((step) => (
            <Reveal as="li" className="process-step" key={step.title}>
              <span className="process-mark" aria-hidden="true"></span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
