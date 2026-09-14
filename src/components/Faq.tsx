import { useId, useState } from "react";
import Reveal from "./Reveal";
import { faq } from "../data/content";

export default function Faq() {
  // Öppnar första frågan direkt, så avsnittet inte ser tomt ut.
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="section" id="fragor">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Vanliga frågor</p>
          <h2>Det ni brukar undra över</h2>
          <p className="section-lead">
            Hittar ni inte svaret här är det bara att fråga — vi svarar hellre en gång för mycket.
          </p>
        </Reveal>

        <div className="faq-list">
          {faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal className={`faq-item${isOpen ? " open" : ""}`} key={item.question}>
                <h3 className="faq-question">
                  <button
                    type="button"
                    id={`${id}-b${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-p${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-sign" aria-hidden="true"></span>
                  </button>
                </h3>
                <div
                  id={`${id}-p${index}`}
                  role="region"
                  aria-labelledby={`${id}-b${index}`}
                  className="faq-answer"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
