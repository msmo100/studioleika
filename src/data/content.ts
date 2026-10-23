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
    text: "Ni vet från början vad det kostar och när det blir klart. Fakturan ska inte innehålla några överraskningar.",
  },
  {
    // Hjärta
    icon: "M12 20.2S3.6 14.7 3.6 9.5A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 8.4 2.2c0 5.2-8.4 10.7-8.4 10.7z",
    title: "Omtanke",
    text: "Vi bygger sidan för era kunder, och det är er verksamhet som styr besluten.",
  },
  {
    // Passare
    icon: "M12 3.2a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4M11 6.4 6 20.4M13 6.4l5 14M8.6 13.6h6.8",
    title: "Hantverk",
    text: "Genomtänkt design och ren kod. Sidan ska gå snabbt, fungera för alla och vara lätt att underhålla.",
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
    text: "Design som tas fram för ert varumärke och era kunder. Vi utgår aldrig från en färdig mall.",
  },
  {
    // Pennspets
    icon: "M12 3.2 6.4 9.6l2.4 8.6h6.4l2.4-8.6zM12 3.2v7.4M12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8M8.8 18.2v2.6h6.4v-2.6",
    title: "Digital design",
    text: "Logotyp, grafisk profil och bilder till sociala medier, så att ni känns igen överallt där ni syns.",
  },
  {
    // Kodtecken
    icon: "M8.8 7.2 3.6 12l5.2 4.8M15.2 7.2 20.4 12l-5.2 4.8M13.4 4.2l-2.8 15.6",
    title: "Webbutveckling",
    text: "Snabba och moderna hemsidor, byggda med kod som går lätt att bygga vidare på.",
  },
  {
    // Databas
    icon: "M5 6c0-1.4 3.1-2.6 7-2.6s7 1.2 7 2.6-3.1 2.6-7 2.6S5 7.4 5 6M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6",
    title: "Systemutveckling",
    text: "Egna system och verktyg, och kopplingar mellan programmen ni redan använder. Då slipper ni göra samma sak för hand flera gånger.",
  },
  {
    // Kasse
    icon: "M4.6 7.8h14.8l-1.2 12.4H5.8zM9 7.8V6a3 3 0 0 1 6 0v1.8",
    title: "E-handel",
    text: "Webbutiker som är enkla att sköta själv och som gör det lätt för besökarna att handla.",
  },
  {
    // Förstoringsglas med staplar
    icon: "M10.6 3.8a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6M15.6 15.6 20.4 20.4M8.2 12.4v1.8M10.6 9.8v4.4M13 11.6v2.6",
    title: "SEO & prestanda",
    text: "Vi ser till att ni syns på Google och att sidan laddar snabbt. Det är grunden för att nya kunder ska hitta er.",
  },
  {
    // Skiftnyckel
    icon: "M14.4 4.4a4.6 4.6 0 0 0-5.7 6L4 15.1v4.5h4.5l4.7-4.7a4.6 4.6 0 0 0 6-5.7l-3 3-3-3z",
    title: "Underhåll & support",
    text: "Vi finns kvar efter lanseringen och sköter uppdateringar, säkerhet och support när ni behöver det.",
  },
  {
    // Karta
    icon: "M3.2 6.2 9 4.2l6 2 5.8-2v13.6l-5.8 2-6-2-5.8 2zM9 4.2v13.6M15 6.2v13.6",
    title: "Digital strategi",
    text: "Vet ni inte riktigt vad ni behöver? Då börjar vi där och reder ut det tillsammans innan vi ritar något.",
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
    text: "Vi börjar med att lära känna er verksamhet, vad ni vill uppnå och vilka era kunder är.",
  },
  {
    num: "II",
    title: "Designa",
    text: "Ni får se utkast tidigt och tycka till, så att designen tar form tillsammans med er.",
  },
  {
    num: "III",
    title: "Bygg",
    text: "Vi bygger sidan och testar den på mobil, surfplatta och dator innan något publiceras.",
  },
  {
    num: "IV",
    title: "Lansera & väx",
    text: "Hemsidan går live. Sedan följer vi upp hur den fungerar och hjälper till när ni vill ändra eller lägga till något.",
  },
];

/**
 * Vad vi erbjuder, som lista i offertsektionen. Ingen prislista — varje
 * projekt får en egen offert efter ett första samtal.
 */
export const offerings: string[] = [
  "Responsiv design för mobil, surfplatta och dator",
  "Logotyper, grafisk profil och digital design",
  "Hemsidor med en eller flera sidor, anpassade efter er verksamhet",
  "Onlinebutik med produktkatalog, kassa, betalning och frakt",
  "Egna system, verktyg och integrationer",
  "Kontaktformulär och enkla sätt för kunder att nå er",
  "Sökmotoroptimering och snabba laddningstider",
  "Hjälp med struktur och texter",
  "Publicering, domän och driftsättning",
  "Genomgång så ni kan uppdatera innehållet själva",
  "Löpande underhåll, säkerhet och support",
];

export const offerSteps: string[] = [
  "Ni berättar kort vad ni behöver, via formuläret eller mejl.",
  "Vi tar ett första samtal och reder ut mål, omfattning och tidsplan.",
  "Ni får en offert med fast pris och bestämmer er i lugn och ro.",
];

/**
 * Kontaktuppgifter — används av både Contact och Footer.
 * Nollställda värden är medvetna platshållare, se README.
 */
export const contact = {
  email: "hej@studioleika.se",
  /**
   * Tomt = döljs på sidan. För att visa numret igen:
   * { display: "+46 730 93 19 65", href: "tel:+46730931965" }
   */
  phone: { display: "", href: "" },
  location: "Sverige. Vi jobbar digitalt med kunder i hela landet.",
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
  { href: "#offert", label: "Offert" },
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
 * Svaren speglar det som redan står i offert- och processavsnitten —
 * ändras villkoren där måste de ändras här också.
 */
export const faq: FaqItem[] = [
  {
    question: "Vad kostar en hemsida?",
    answer:
      "Det beror på vad ni behöver, därför har vi ingen prislista. Efter ett första samtal, som är kostnadsfritt, får ni en offert med fast pris. Vill ni lägga till något under arbetets gång får ni veta vad det kostar innan vi gör det.",
  },
  {
    question: "Hur lång tid tar ett projekt?",
    answer:
      "Det beror på hur stort projektet är och hur snabbt vi får material och svar från er. Efter det första samtalet får ni en tidsplan, så att ni vet vad som gäller innan ni bestämmer er.",
  },
  {
    question: "Äger vi sajten efteråt?",
    answer:
      "Ja. När projektet är betalt äger ni design, innehåll och kod. Vill ni byta leverantör senare tar ni med er allt.",
  },
  {
    question: "Kan vi uppdatera innehållet själva?",
    answer:
      "Ja. Vi kan lägga in en genomgång där vi visar hur ni ändrar texter och bilder på egen hand. Vill ni hellre att vi sköter det löpande går det också bra.",
  },
  {
    question: "Hjälper ni till med texter och bilder?",
    answer:
      "Ja. Vi hjälper gärna till att strukturera och putsa era texter, och vi säger till om en sida skulle bli bättre med egna bilder i stället för köpta. Har ni varken text eller bilder klara tar vi upp det i planeringen innan vi börjar bygga.",
  },
  {
    question: "Måste vi finnas i närheten för att jobba med er?",
    answer:
      "Nej. Vi jobbar med kunder i hela Sverige. Vi ses över video och delar allt material online, så det spelar ingen roll var ni sitter.",
  },
  {
    question: "Vad händer efter lansering?",
    answer:
      "Vi finns kvar och sköter uppdateringar, säkerhet och support så länge ni vill. En tid efter lanseringen hör vi av oss för att höra hur sidan fungerar för er.",
  },
];
