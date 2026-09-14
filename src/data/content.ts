export interface Value {
  /** SVG-path (d-attribut), ritas av `Icon.tsx` */
  icon: string;
  title: string;
  text: string;
}

export const values: Value[] = [
  {
    // Kompass
    icon: "M12 2.6a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8M16 8l-2.4 5.6L8 16l2.4-5.6z",
    title: "Tydlighet",
    text: "Raka besked om tid, pris och process. Inga överraskningar i slutfakturan.",
  },
  {
    // Hjärta
    icon: "M12 20.2S3.6 14.7 3.6 9.5A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 8.4 2.2c0 5.2-8.4 10.7-8.4 10.7z",
    title: "Omtanke",
    text: "Vi bygger för era kunder, inte för vårt eget portfolio. Er verksamhet styr besluten.",
  },
  {
    // Passare
    icon: "M12 3.2a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4M11 6.4 6 20.4M13 6.4l5 14M8.6 13.6h6.8",
    title: "Hantverk",
    text: "Genomtänkt design och ren kod som håller — snabbt, tillgängligt och lätt att underhålla.",
  },
];

export interface Service {
  /** SVG-path (d-attribut), ritas av `Icon.tsx` */
  icon: string;
  title: string;
  text: string;
}

export const services: Service[] = [
  {
    // Ritstift
    icon: "M4 20.2l1-4.6L16.2 4.4a1.9 1.9 0 0 1 2.7 0l.7.7a1.9 1.9 0 0 1 0 2.7L8.4 19.2zM15 5.8l3.2 3.2",
    title: "Webbdesign",
    text: "Skräddarsydd visuell identitet och gränssnitt som speglar ert varumärke — inte en mall bland tusen andra.",
  },
  {
    // Kodtecken
    icon: "M8.8 7.2 3.6 12l5.2 4.8M15.2 7.2 20.4 12l-5.2 4.8M13.4 4.2l-2.8 15.6",
    title: "Webbutveckling",
    text: "Snabba, moderna och skalbara hemsidor byggda med kod som är lätt att bygga vidare på.",
  },
  {
    // Kasse
    icon: "M4.6 7.8h14.8l-1.2 12.4H5.8zM9 7.8V6a3 3 0 0 1 6 0v1.8",
    title: "E-handel",
    text: "Onlinebutiker som är enkla att sköta själv och byggda för att faktiskt konvertera besökare till kunder.",
  },
  {
    // Förstoringsglas med staplar
    icon: "M10.6 3.8a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6M15.6 15.6 20.4 20.4M8.2 12.4v1.8M10.6 9.8v4.4M13 11.6v2.6",
    title: "SEO & prestanda",
    text: "Bättre synlighet i sökmotorer och blixtsnabba laddningstider — grunden för att bli hittad.",
  },
  {
    // Skiftnyckel
    icon: "M14.4 4.4a4.6 4.6 0 0 0-5.7 6L4 15.1v4.5h4.5l4.7-4.7a4.6 4.6 0 0 0 6-5.7l-3 3-3-3z",
    title: "Underhåll & support",
    text: "Vi försvinner inte efter lansering. Löpande uppdateringar, säkerhet och support när ni behöver oss.",
  },
  {
    // Karta
    icon: "M3.2 6.2 9 4.2l6 2 5.8-2v13.6l-5.8 2-6-2-5.8 2zM9 4.2v13.6M15 6.2v13.6",
    title: "Digital strategi",
    text: "Osäker på vad ni faktiskt behöver? Vi hjälper er reda ut det innan ett enda pixel ritas.",
  },
];

export interface ProcessStep {
  num: string;
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "I",
    title: "Upptäck",
    text: "Vi lär känna er verksamhet, mål och målgrupp. Ingen bygger något förrän vi förstår varför.",
  },
  {
    num: "II",
    title: "Designa",
    text: "Ni får se och tycka till om utkast tidigt — designen växer fram tillsammans med er.",
  },
  {
    num: "III",
    title: "Bygg",
    text: "Vi kodar, testar och finslipar. Snabbt, tillgängligt och redo för mobil, surfplatta och dator.",
  },
  {
    num: "IV",
    title: "Lansera & väx",
    text: "Sajten går live. Därefter finns vi kvar för uppföljning, förbättringar och nya idéer.",
  },
];

export interface PriceTier {
  name: string;
  /** Visas som den stora siffran — t.ex. "5 000 kr" eller "Offert" */
  price: string;
  /** Liten rad under priset, t.ex. "Efter omfattning" */
  priceNote?: string;
  /** Litet ord före beloppet, t.ex. "Från" */
  pricePrefix?: string;
  text: string;
  items: string[];
  /** Lyfts fram visuellt i prisrutnätet */
  featured?: boolean;
  /** Texten på kortets knapp */
  cta: string;
}

export const priceTiers: PriceTier[] = [
  {
    name: "Enkel hemsida",
    price: "4 999 kr",
    pricePrefix: "Från",
    text: "En tydlig närvaro på nätet för er som främst behöver bli hittade och kontaktade.",
    items: [
      "Responsiv design för mobil och dator",
      "Kontaktuppgifter och formulär",
      "Grundläggande sökmotoroptimering",
      "Publicering och driftsättning",
    ],
    cta: "Boka ett samtal",
  },
  {
    name: "Företag",
    price: "9 999 kr",
    pricePrefix: "Från",
    text: "För er som vill visa upp verksamheten på djupet och växa med sajten över tid.",
    items: [
      "Allt i Enkel hemsida",
      "Flera sidor, anpassade efter er verksamhet",
      "Utökad SEO och prestandaoptimering",
      "Genomgång så ni kan uppdatera själva",
    ],
    featured: true,
    cta: "Boka ett samtal",
  },
  {
    name: "E-handel",
    price: "Offert",
    priceNote: "Efter omfattning",
    text: "Butiker skiljer sig för mycket åt för en prislapp — vi räknar på just er.",
    items: [
      "Produktkatalog och kassa",
      "Betal- och fraktlösning",
      "Enkel administration av sortimentet",
      "Prisförslag efter ett första samtal",
    ],
    cta: "Begär offert",
  },
];

/**
 * Kontaktuppgifter — används av både Contact och Footer.
 * Nollställda värden är medvetna platshållare, se README.
 */
export const contact = {
  email: "hej@studioleika.se",
  phone: { display: "+46 00 000 00 00", href: "tel:+46000000000" },
  location: "Sverige — jobbar digitalt med kunder i hela landet",
  /** Organisationsnummer. Platshållare av nollor tills det riktiga finns. */
  orgNr: "000000-0000",
  /** Integritetspolicyn ligger på en egen, förrenderad sida. */
  privacyHref: "/integritetspolicy",
};

/**
 * Sant för värden som fortfarande är platshållare av nollor.
 * Telefonnummer och org.nr döljs hellre än visas som "000000-0000" —
 * nollor i sidfoten signalerar "inte ett riktigt företag" till besökaren.
 */
export function isPlaceholder(value: string): boolean {
  return !value.trim() || !/[1-9]/.test(value);
}

/**
 * Dit kontaktformuläret postar — vår egen Vercel-funktion i `api/kontakt.ts`.
 * Töms strängen faller formuläret tillbaka på ett förifyllt mejl, så att
 * knappen aldrig står och låtsas.
 */
export const formEndpoint = "/api/kontakt";

export const navLinks = [
  { href: "#tjanster", label: "Tjänster" },
  { href: "#priser", label: "Priser" },
  { href: "#process", label: "Så jobbar vi" },
  { href: "#om-oss", label: "Om oss" },
  { href: "#fragor", label: "Frågor" },
  { href: "#kontakt", label: "Kontakt" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Vanliga frågor. Dubbel nytta: de fångar långsvansade sökningar
 * ("vad kostar en hemsida") och matas ut som FAQPage-schema i index.html.
 * Svaren speglar det som redan står i pris- och processavsnitten —
 * ändras villkoren där måste de ändras här också.
 */
export const faq: FaqItem[] = [
  {
    question: "Vad kostar en hemsida?",
    answer:
      "En enklare sajt börjar på 4 999 kr och en flersidig företagssajt på 9 999 kr, exklusive moms. E-handel prissätts efter omfattning. Ni får ett fast pris innan vi börjar — tillkommer önskemål under resans gång räknar vi på dem i förväg, aldrig i efterhand.",
  },
  {
    question: "Hur lång tid tar ett projekt?",
    answer:
      "Det beror på omfattning och hur snabbt vi får material och återkoppling från er. Ni får en tidsplan med hållpunkter redan efter det första samtalet, så ni vet vad som gäller innan ni bestämmer er.",
  },
  {
    question: "Äger vi sajten efteråt?",
    answer:
      "Ja. Ni äger design, innehåll och kod när projektet är betalt, och ni är aldrig inlåsta hos oss. Vill ni byta leverantör senare följer allt med.",
  },
  {
    question: "Kan vi uppdatera innehållet själva?",
    answer:
      "Ja. I Företagspaketet ingår en genomgång där vi visar hur ni ändrar texter och bilder på egen hand. Vill ni hellre att vi sköter det löpande går det också bra.",
  },
  {
    question: "Hjälper ni till med texter och bilder?",
    answer:
      "Vi hjälper gärna till att strukturera och putsa era texter, och säger till när en sida skulle tjäna på riktiga bilder i stället för lagerfoton. Har ni varken text eller bild klart tar vi det som en punkt i planeringen innan vi börjar bygga.",
  },
  {
    question: "Måste vi finnas i närheten för att jobba med er?",
    answer:
      "Nej. Vi jobbar digitalt med kunder i hela Sverige — möten sker över video och allt material delas online. Fungerar lika bra oavsett var ni sitter.",
  },
  {
    question: "Vad händer efter lansering?",
    answer:
      "Vi försvinner inte. Uppdateringar, säkerhet och support finns kvar som en löpande tjänst, och vi hör av oss efter lanseringen för att se hur sajten faktiskt fungerar för er.",
  },
];
