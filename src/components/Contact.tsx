import { useState, type FormEvent } from "react";
import { contact } from "../data/content";
import Reveal from "./Reveal";

type FormStatus = { text: string; tone: "ok" | "error" } | null;

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setStatus({ text: "Fyll i namn, e-post och meddelande innan du skickar.", tone: "error" });
      return;
    }

    // TODO: koppla till riktig e-posttjänst / backend (t.ex. Formspree, egen API-endpoint).
    setStatus({
      text: "Tack! Ditt meddelande är redo att skickas — koppla formuläret till en e-posttjänst för att slutföra.",
      tone: "ok",
    });
    form.reset();
  }

  return (
    <section className="section" id="kontakt">
      <div className="wrap kontakt-grid">
        <Reveal className="kontakt-info">
          <p className="eyebrow">Kontakt</p>
          <h2>Nyfiken? Hör av dig</h2>
          <p className="section-lead">
            Berätta kort om projektet så återkommer vi inom ett par dagar. Inget krav, inget
            krångel.
          </p>

          <ul className="kontakt-list">
            <li>
              <span className="kontakt-label">E-post</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <span className="kontakt-label">Telefon</span>
              <a href={contact.phone.href}>{contact.phone.display}</a>
            </li>
            <li>
              <span className="kontakt-label">Plats</span>
              <span>{contact.location}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal as="form" className="kontakt-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="namn">Namn</label>
            <input type="text" id="namn" name="namn" autoComplete="name" required />
          </div>
          <div className="form-row">
            <label htmlFor="epost">E-post</label>
            <input type="email" id="epost" name="epost" autoComplete="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="foretag">
              Företag <span className="optional">(valfritt)</span>
            </label>
            <input type="text" id="foretag" name="foretag" autoComplete="organization" />
          </div>
          <div className="form-row">
            <label htmlFor="meddelande">Berätta om ert projekt</label>
            <textarea id="meddelande" name="meddelande" rows={4} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Skicka meddelande
          </button>
          <p
            className={`form-status${status ? ` is-${status.tone}` : ""}`}
            role="status"
            aria-live="polite"
          >
            {status?.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
