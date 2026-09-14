/**
 * Kontroller för kontaktformulärets endpoint (`api/kontakt.ts`).
 * Körs med `npm run test:kontakt`.
 *
 * Anropar handlern direkt med syntetiska requests och stubbar Resend, så
 * testet varken kräver nycklar eller skickar mejl. Ett formulär som tyst
 * tappar förfrågningar är det dyraste felet sajten kan ha — därför finns
 * det här.
 */
import { pathToFileURL } from "node:url";
import path from "node:path";

const { POST } = await import(pathToFileURL(path.resolve("api/kontakt.ts")).href);

const post = (fields) => {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.set(key, String(value));
  return new Request("https://studioleika.se/api/kontakt", { method: "POST", body });
};

const giltigt = {
  namn: "Anna Berg",
  epost: "anna@exempel.se",
  foretag: "Berg & Co",
  meddelande: "Vi behöver en ny hemsida till hösten.",
  elapsed: 9000,
};

let misslyckade = 0;

async function kolla(namn, svarLöfte, väntadStatus, extra) {
  const svar = await svarLöfte;
  const kropp = await svar.json();
  const ok = svar.status === väntadStatus && (!extra || extra(kropp));
  if (!ok) misslyckade++;
  console.log(`  ${ok ? "ok  " : "FEL "} ${namn} → ${svar.status}`);
}

console.log("Avvisas tyst (boten ska inte få veta vad som avslöjade den):");
await kolla("honeypot ifylld", POST(post({ ...giltigt, webbplats: "spam.example" })), 200, (b) => b.ok);
await kolla("postat efter 0,4 s", POST(post({ ...giltigt, elapsed: 400 })), 200, (b) => b.ok);
await kolla("elapsed saknas helt", POST(post({ ...giltigt, elapsed: "" })), 200, (b) => b.ok);

console.log("Valideringsfel:");
await kolla("alla fält tomma", POST(post({ elapsed: 9000 })), 400, (b) => Object.keys(b.fel).length === 3);
await kolla("ogiltig e-post", POST(post({ ...giltigt, epost: "anna(at)exempel" })), 400, (b) => b.fel.epost);
await kolla("meddelande över taket", POST(post({ ...giltigt, meddelande: "x".repeat(6000) })), 400, (b) => b.fel.meddelande);

console.log("Konfiguration:");
await kolla("nycklar saknas", POST(post(giltigt)), 500);

process.env.RESEND_API_KEY = "re_test";
process.env.CONTACT_TO = "hej@studioleika.se";
process.env.CONTACT_FROM = "Studio Leika <formular@studioleika.se>";

let skickat = null;
const riktigFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  skickat = { url, body: JSON.parse(init.body) };
  return new Response(JSON.stringify({ id: "test" }), { status: 200 });
};

console.log("Lyckad sändning:");
await kolla("giltigt meddelande", POST(post(giltigt)), 200, (b) => b.ok);
await kolla(
  "mejlet ser rätt ut",
  Promise.resolve(new Response("{}", { status: 200 })),
  200,
  () =>
    skickat.url === "https://api.resend.com/emails" &&
    skickat.body.reply_to === giltigt.epost &&
    skickat.body.subject.includes(giltigt.namn) &&
    skickat.body.text.includes(giltigt.meddelande)
);

globalThis.fetch = async () => new Response("rate limited", { status: 429 });
await kolla("Resend svarar med fel", POST(post(giltigt)), 502);
globalThis.fetch = riktigFetch;

console.log(
  misslyckade === 0
    ? "\nAlla kontroller gick igenom."
    : `\n${misslyckade} kontroll(er) misslyckades.`
);
process.exit(misslyckade === 0 ? 0 : 1);
