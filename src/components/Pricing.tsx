import Reveal from "./Reveal";
import { priceTiers } from "../data/content";

export default function Pricing() {
  return (
    <section className="section" id="priser">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Priser</p>
          <h2>Vad det kostar</h2>
          <p className="section-lead">
            Raka priser från start, så ni vet vad ni ger er in i. Har ni önskemål utöver det som
            står här räknar vi på det innan vi börjar — aldrig efteråt.
          </p>
        </Reveal>

        <div className="price-grid">
          {priceTiers.map((tier) => (
            <Reveal
              className={`price-card${tier.featured ? " featured" : ""}`}
              key={tier.name}
            >
              {tier.featured && <span className="price-flag">Vanligast</span>}

              <h3 className="price-name">{tier.name}</h3>

              {/* Prefix- och notraden renderas alltid, så beloppen hamnar
                  på samma höjd i alla tre kort */}
              <p className="price-prefix">{tier.pricePrefix ?? " "}</p>
              <p className="price-amount">{tier.price}</p>
              {/* Alltid renderad, så beskrivningarna hamnar på samma höjd i alla tre kort */}
              <p className="price-note">{tier.priceNote ?? " "}</p>

              <p className="price-text">{tier.text}</p>

              <ul className="price-items">
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="price-foot">
          <p>
            Alla priser är exklusive moms. Osäker på vilken nivå som passar er?{" "}
            <a href="#kontakt">Hör av dig så reder vi ut det tillsammans.</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
