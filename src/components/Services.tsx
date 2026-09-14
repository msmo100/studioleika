import Reveal from "./Reveal";
import Icon from "./Icon";
import { services } from "../data/content";

export default function Services() {
  return (
    <section className="section section-alt" id="tjanster">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Tjänster</p>
          <h2>Vad vi hjälper er med</h2>
          <p className="section-lead">
            Från första skiss till lanserad sajt — och gärna långsiktigt samarbete därefter.
          </p>
        </Reveal>

        <div className="service-grid">
          {services.map((service) => (
            <Reveal className="service-card" key={service.title}>
              <span className="service-icon">
                <Icon path={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
