import Reveal from "./Reveal";
import { processSteps } from "../data/content";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <Reveal className="section-head section-head-left">
          <p className="eyebrow">Så jobbar vi</p>
          <h2>Fyra steg, ingen mystik</h2>
        </Reveal>

        <ol className="process-list">
          {processSteps.map((step) => (
            <Reveal as="li" className="process-step" key={step.num}>
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
