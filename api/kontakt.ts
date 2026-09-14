/**
 * Tar emot kontaktformuläret och skickar det vidare som mejl.
 *
 * Körs som en Vercel-funktion — ingen server att drifta, och besökarens
 * uppgifter passerar aldrig någon formulärtjänst. Enda mottagaren utöver
 * oss är mejlleverantören, vilket integritetspolicyn redan täcker.
 *
 * Miljövariabler (sätts i Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   nyckeln från resend.com
 *   CONTACT_TO       dit förfrågningarna skickas, t.ex. hej@studioleika.se
 *   CONTACT_FROM     avsändare på en domän verifierad hos Resend,
 *                    t.ex. "Studio Leika <formular@studioleika.se>"
 */

/** Under så här kort tid hinner ingen människa fylla i formuläret. */
const MIN_IFYLLNADSTID_MS = 3000;

/** Tak per fält, så ingen kan trycka in en roman i mejlkön. */
const MAX = { namn: 120, epost: 200, foretag: 160, meddelande: 5000 } as const;

const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** Tyst avvisning: boten ska inte få veta vad som avslöjade den. */
function låtsasLyckas(): Response {
  return json({ ok: true }, 200);
}

export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Kunde inte läsa formuläret." }, 400);
  }

  const text = (key: string) => String(form.get(key) ?? "").trim();

  // Honeypot — fältet är dolt för människor men oemotståndligt för robotar.
  if (text("webbplats")) return låtsasLyckas();

  // Robotar postar direkt mot endpointen utan att ha öppnat sidan.
  const elapsed = Number(form.get("elapsed"));
  if (!Number.isFinite(elapsed) || elapsed < MIN_IFYLLNADSTID_MS) {
    return låtsasLyckas();
  }

  const namn = text("namn");
  const epost = text("epost");
  const foretag = text("foretag");
  const meddelande = text("meddelande");

  const fel: Record<string, string> = {};
  if (!namn) fel.namn = "Namn saknas.";
  if (!epost) fel.epost = "E-postadress saknas.";
  else if (!EPOST.test(epost)) fel.epost = "Ogiltig e-postadress.";
  if (!meddelande) fel.meddelande = "Meddelande saknas.";

  for (const [fält, tak] of Object.entries(MAX)) {
    if (text(fält).length > tak) fel[fält] = `Får vara högst ${tak} tecken.`;
  }

  if (Object.keys(fel).length > 0) return json({ fel }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    // Hellre ett tydligt fel i loggen än ett formulär som tyst tappar
    // förfrågningar. Besökaren får mejladressen i klartext av klienten.
    console.error("Saknar RESEND_API_KEY, CONTACT_TO eller CONTACT_FROM.");
    return json({ error: "Formuläret är inte färdigkonfigurerat." }, 500);
  }

  const brödtext = [
    `Namn:     ${namn}`,
    `E-post:   ${epost}`,
    `Företag:  ${foretag || "—"}`,
    "",
    meddelande,
  ].join("\n");

  const svar = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Svara-knappen i mejlklienten ska gå till den som hörde av sig.
      reply_to: epost,
      subject: `Projektförfrågan från ${namn}${foretag ? ` (${foretag})` : ""}`,
      text: brödtext,
    }),
  });

  if (!svar.ok) {
    console.error("Resend svarade", svar.status, await svar.text());
    return json({ error: "Meddelandet kunde inte skickas." }, 502);
  }

  return json({ ok: true }, 200);
}
