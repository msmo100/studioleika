import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, formEndpoint, isPlaceholder } from "../data/content";
import Reveal from "./Reveal";

type Status = { text: string; tone: "ok" | "error" } | null;
type Errors = Partial<Record<"namn" | "epost" | "meddelande", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  // Hur länge formuläret varit synligt. Robotar postar direkt mot endpointen;
  // en människa behöver några sekunder. Sätts i en effekt och inte under
  // rendering, så det förrenderade och det hydrerade värdet aldrig krockar.
  const visasSedan = useRef(0);
  useEffect(() => {
    visasSedan.current = Date.now();
  }, []);

  function validate(data: FormData): Errors {
    const found: Errors = {};
    const namn = String(data.get("namn") ?? "").trim();
    const epost = String(data.get("epost") ?? "").trim();
    const meddelande = String(data.get("meddelande") ?? "").trim();

    if (!namn) found.namn = "Fyll i ditt namn.";
    if (!epost) found.epost = "Fyll i din e-postadress.";
    else if (!EMAIL.test(epost)) found.epost = "Det ser inte ut som en giltig e-postadress.";
    if (!meddelande) found.meddelande = "Berätta kort vad ni behöver hjälp med.";

    return found;
  }

  /**
   * Utan kopplad backend öppnas ett förifyllt mejl i stället. Sämre än ett
   * riktigt formulär, men oändligt mycket bättre än en knapp som säger
   * "tack" utan att skicka något. Sätt `formEndpoint` i content.ts.
   */
  function sendByMail(data: FormData) {
    const rader = [
      `Namn: ${data.get("namn")}`,
      `E-post: ${data.get("epost")}`,
      `Företag: ${data.get("foretag") || "-"}`,
      "",
      String(data.get("meddelande") ?? ""),
    ].join("\n");

    const href =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(`Projektförfrågan från ${data.get("namn")}`)}` +
      `&body=${encodeURIComponent(rader)}`;

    window.location.href = href;
    setStatus({
      text: `Vi öppnar ditt e-postprogram med meddelandet ifyllt. Fungerar det inte kan du mejla oss direkt på ${contact.email}.`,
      tone: "ok",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: fylls bara i av robotar. Låtsas lyckas och skicka ingenting.
    if (String(data.get("webbplats") ?? "")) {
      setStatus({ text: "Tack! Vi hör av oss inom ett par dagar.", tone: "ok" });
      form.reset();
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ text: "Något saknas. Se de markerade fälten.", tone: "error" });
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    if (!formEndpoint) {
      sendByMail(data);
      return;
    }

    setSending(true);
    setStatus(null);
    data.set("elapsed", String(visasSedan.current ? Date.now() - visasSedan.current : 0));
    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));

      setStatus({ text: "Tack! Vi hör av oss inom ett par dagar.", tone: "ok" });
      form.reset();
    } catch {
      setStatus({
        text: `Meddelandet gick inte fram just nu. Försök igen, eller mejla oss på ${contact.email}.`,
        tone: "error",
      });
    } finally {
      setSending(false);
    }
  }

  /** Gemensamma attribut för ett fält som kan visa fel. */
  function fieldProps(name: keyof Errors) {
    return {
      "aria-invalid": errors[name] ? ("true" as const) : undefined,
      "aria-describedby": errors[name] ? `${name}-fel` : undefined,
      onInput: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
    };
  }

  return (
    <section className="section" id="kontakt">
      <div className="wrap kontakt-grid">
        <Reveal className="kontakt-info">
          <p className="eyebrow">Kontakt</p>
          <h2>Nyfiken? Hör av dig</h2>
          <p className="section-lead">
            Berätta kort om projektet så återkommer vi inom ett par dagar. Det kostar ingenting
            och ni binder er inte till något.
          </p>

          <ul className="kontakt-list">
            <li>
              <span className="kontakt-label">E-post</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            {/* Ett nummer av nollor är sämre än inget nummer alls */}
            {!isPlaceholder(contact.phone.display) && (
              <li>
                <span className="kontakt-label">Telefon</span>
                <a href={contact.phone.href}>{contact.phone.display}</a>
              </li>
            )}
            <li>
              <span className="kontakt-label">Plats</span>
              <span>{contact.location}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal as="form" className="kontakt-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="namn">Namn</label>
            <input type="text" id="namn" name="namn" autoComplete="name" {...fieldProps("namn")} />
            {errors.namn && (
              <p className="field-error" id="namn-fel">
                {errors.namn}
              </p>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="epost">E-post</label>
            <input
              type="email"
              id="epost"
              name="epost"
              autoComplete="email"
              {...fieldProps("epost")}
            />
            {errors.epost && (
              <p className="field-error" id="epost-fel">
                {errors.epost}
              </p>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="foretag">
              Företag <span className="optional">(valfritt)</span>
            </label>
            <input type="text" id="foretag" name="foretag" autoComplete="organization" />
          </div>

          <div className="form-row">
            <label htmlFor="meddelande">Berätta om ert projekt</label>
            <textarea id="meddelande" name="meddelande" rows={5} {...fieldProps("meddelande")} />
            {errors.meddelande && (
              <p className="field-error" id="meddelande-fel">
                {errors.meddelande}
              </p>
            )}
          </div>

          {/* Honeypot — dold för människor, oemotståndlig för robotar */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="webbplats">Lämna det här fältet tomt</label>
            <input type="text" id="webbplats" name="webbplats" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
            {sending ? "Skickar…" : "Skicka meddelande"}
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
