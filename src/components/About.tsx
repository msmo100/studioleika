import Reveal from "./Reveal";
import Icon from "./Icon";
import { values } from "../data/content";

export default function About() {
  return (
    <section className="section section-alt" id="om-oss">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Om oss</p>
          <h2>Vi förklarar på vanlig svenska</h2>
          <p className="section-lead">
            Studio Leika är en liten webbstudio, och ni pratar direkt med oss som bygger er sida.
            Vi lägger ner mycket arbete på det som inte syns, så att det blir enkelt för er. Ni
            ska alltid veta var projektet står, och ni behöver inte kunna något om kod.
          </p>
        </Reveal>

        <div className="value-cards">
          {values.map((value) => (
            <Reveal className="value-card" key={value.title}>
              <span className="value-icon">
                <Icon path={value.icon} />
              </span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
