import Reveal from "./Reveal";
import Icon from "./Icon";
import { values } from "../data/content";

export default function About() {
  return (
    <section className="section section-alt" id="om-oss">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Om oss</p>
          <h2>En studio som pratar människa, inte techsnack</h2>
          <p className="section-lead">
            Leika Studio är en liten, personlig webbstudio. Namnet kommer från fornnordiskans{" "}
            <em>leika</em> — att röra sig fritt och obehindrat. Det är så ett webbprojekt borde
            kännas: strukturerat och genomarbetat under ytan, smidigt och friktionsfritt för er.
            Ni ska förstå vad som händer i varje steg, utan att behöva kunna koda en enda rad.
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
