# Att göra — Leika Studio

Listan över det som är kvar, sorterat efter vad som hindrar lansering.
Allt som gick att göra utan ditt material är redan gjort — se
[Vad som redan är på plats](#vad-som-redan-är-på-plats) längst ner.

---

## 1. Blockerare — måste vara klart innan sajten går live

- [ ] **Konfigurera kontaktformuläret.** Koden är klar — `api/kontakt.ts`
      tar emot formuläret och skickar det som mejl via Resend. Kvar är tre
      inställningar:

  1. Skapa konto på [resend.com](https://resend.com) och verifiera
     `studioleika.se` (kräver att domänen är registrerad, se punkten ovan).
  2. Skapa en API-nyckel.
  3. Lägg in tre miljövariabler i Vercel → Settings → Environment Variables:

     | Variabel | Värde |
     | --- | --- |
     | `RESEND_API_KEY` | nyckeln från steg 2 |
     | `CONTACT_TO` | `hej@studioleika.se` |
     | `CONTACT_FROM` | `Studio Leika <formular@studioleika.se>` |

      `CONTACT_FROM` måste ligga på den verifierade domänen — Resend vägrar
      annars. `CONTACT_TO` kan vara vad som helst, även en privat adress
      under tiden.

      Innan variablerna är satta svarar funktionen 500 och besökaren får
      mejladressen i klartext i stället. Inga förfrågningar tappas tyst.
      Kör `npm run test:kontakt` för att kontrollera logiken utan att skicka
      något.

- [ ] **Telefonnummer.** `contact.phone` i `src/data/content.ts`.
      Raden är dold så länge numret består av nollor — fyll i det riktiga så
      dyker den upp i kontaktsektionen av sig själv.

- [ ] **Organisationsnummer.** `contact.orgNr` i samma fil. Samma sak: dold
      tills det finns ett riktigt, eftersom `000000-0000` i sidfoten
      signalerar "inte ett riktigt företag" till precis den besökare du vill
      övertyga.

- [ ] **Registrera `studioleika.se`.** Koden står redan på den — canonical,
      og:url, sitemap.xml, robots.txt och strukturerad data pekar dit. Men
      domänen är inte köpt än, så inget av det fungerar förrän den är det.
      Överväg att ta `leikastudio.se` också och 301-peka den mot den riktiga,
      så fångar du den vanligaste felstavningen.

      Ändrar du dig om namnet: `site.url` i `src/data/site.ts` är enda
      stället, resten följer med vid nästa bygge.

- [ ] **Läs igenom integritetspolicyn.** `src/pages/PrivacyPolicy.tsx`.
      Jag har skrivit ett fullständigt utkast som beskriver sajten som den
      faktiskt fungerar idag. Två saker du måste verifiera:
  - Lagringstiden (jag skrev tolv månader för förfrågningar som inte leder
    någonstans) ska stämma med hur du faktiskt gör.
  - Avsnittet "Cookies och statistik" säger att sajten inte spårar något.
    **Det slutar vara sant i samma sekund du lägger till analysverktyg** —
    se punkt 3.

      Är det ett aktiebolag bör en jurist titta på den, men som utgångspunkt
      är den betydligt bättre än ingen policy alls.

- [ ] **Granska FAQ-svaren.** `faq` i `src/data/content.ts`.
      Svaren är formulerade utifrån det som redan stod på sajten, men tre av
      dem gör affärsmässiga utfästelser som jag inte kan veta om de stämmer:
      *"Äger vi sajten efteråt"*, *"Kan vi uppdatera innehållet själva"* och
      *"Hjälper ni till med texter och bilder"*. Läs dem som en kund skulle
      göra och justera så de matchar hur du faktiskt jobbar. De publiceras
      dessutom som FAQPage-schema, så Google kan visa dem direkt i
      sökresultatet — desto viktigare att de är sanna.

- [ ] **Visuell genomgång.** Kör `npm run dev` och gå igenom sidan i
      webbläsaren, både bred och på telefon. Jag har ingen webbläsare
      tillgänglig i den här miljön, så CSS-ändringarna är gjorda mot koden och
      inte kontrollerade mot en skärmbild. Titta särskilt på:
  - hero: logotypens storlek mot den nya rubriken
  - FAQ-dragspelet (öppna/stäng, plustecknet som blir minus)
  - knapparna i prisrutorna, att de hamnar i linje längst ner
  - mobilmenyn: Escape, klick utanför, och knappen "Boka möte" i panelen

---

## 2. Innehåll som bara du kan ta fram

Det här är den enskilt största konverteringsfrågan. En webbstudio utan
visade arbeten är svår att köpa av, hur bra sajten än är i övrigt.

- [ ] **Case / portfolio — högsta prioritet.** Två eller tre projekt räcker
      långt. Har du inga skarpa kunder än fungerar egna koncept eller
      ombyggnader av befintliga sajter, så länge du är tydlig med att det är
      det. Säg till när du har material så bygger jag sektionen — den
      behöver egna sidor och `CreativeWork`-schema.

- [ ] **Referenser.** Ett enda citat med namn och företag gör mer för
      förtroendet än ett stycke till om era värderingar. Även från ett
      mindre uppdrag.

- [ ] **Ansikte och namn.** Sajten säger konsekvent "vi", men små studior
      säljer på personer. Ett porträtt, ett namn och tre meningar om bakgrund
      i "Om oss" gör mer än ytterligare ett värdeord. Behövs också för
      `founder`-fältet i den strukturerade datan.

- [ ] **Bilder överlag.** Sajten har idag noll fotografier — hållningen är
      helt typografisk, vilket är snyggt men lämnar ingenting att visa.
      Minst: något från arbetet, arbetsplatsen eller processen.

---

## 3. Drift och mätning

- [ ] **Sätt upp `hej@studioleika.se`.** Adressen ligger publikt i sidfoten,
      kontaktsektionen, formulärets mejl-fallback och den strukturerade datan.
      Den måste faktiskt gå att nå innan lansering — utan den tappar du varje
      förfrågan som går via mejl-fallbacken.

- [ ] **Analysverktyg.** Utan mätning går det inte att se om någon hittar
      sajten. Välj **Plausible** eller **Umami** framför Google Analytics —
      de är cookiefria, vilket betyder att du slipper cookiebanner helt.
      Lägger du till något: uppdatera avsnittet "Cookies och statistik" i
      integritetspolicyn, annars ljuger den.

- [ ] **Google Search Console.** Verifiera domänen och skicka in
      `https://<domän>/sitemap.xml`. Utan det vet du inte vad du rankar på.

- [ ] **Bing Webmaster Tools.** Samma sak, tar fem minuter, och Bing driver
      numera även sökningen i flera AI-assistenter.

- [ ] **Google Företagsprofil.** Gratis, och det enskilt mest effektiva för
      lokala sökningar ("webbyrå" + ort). Kräver att du bestämmer dig för
      vilken ort du vill synas på — idag står det bara "Sverige".

- [ ] **Koppla repot till Vercel.** `vercel.json` är på plats med
      byggkommando, utdatakatalog, säkerhetsheaders och cachning. Vercel
      hittar resten själv. Sajten byggs till statiska filer och varje sida blir
      en egen HTML-fil, så ingen SPA-fallback behövs.

- [ ] **Frivilligt: hårdare spamskydd.** Honeypot och tidskontroll stoppar
      det mesta. Blir det ändå problem är Cloudflare Turnstile nästa steg —
      cookiefritt, så policyn påverkas inte.

- [ ] **Frivilligt: Content-Security-Policy.** Sajten laddar allt från sin
      egen domän, så en snäv CSP vore enkel att sätta i `vercel.json`. Jag
      har låtit bli eftersom jag inte kan testa den i en webbläsare härifrån,
      och en trasig CSP går sönder tyst.

---

## 4. Nästa steg för att faktiskt ranka

Sajten är idag **en** URL. Allt innehåll konkurrerar om samma sida, och det
räcker inte mot etablerade byråer.

- [ ] **Egna tjänstesidor.** De sex tjänstekorten förtjänar var sin sida:
      `/tjanster/webbdesign`, `/webbutveckling`, `/e-handel`, `/seo`,
      `/underhall`, `/digital-strategi`. Det är den överlägset största
      SEO-hävstången som återstår. Rutthanteringen finns redan på plats
      (`src/App.tsx` + `routes` i `src/data/site.ts`) — varje ny rutt
      förrenderas och hamnar i sitemap automatiskt.

- [ ] **Blogg eller kunskapsbank.** Fem artiklar om sådant kunder googlar
      ("vad kostar en hemsida", "webbyrå eller mall", "så väljer du
      e-handelsplattform") ger fler ingångar än hela startsidan gör.

- [ ] **Lokala landningssidor**, om du bestämmer dig för en ort.

---

## Vad som redan är på plats

Gjort i den här omgången, så vi vet var vi står.

**Konvertering**

- Kontaktformuläret skickar på riktigt (endpoint eller mejl-fallback), med
  fältvisa felmeddelanden, skickar-läge, `aria-invalid` och honeypot mot spam
- Knapp i varje prisruta — tidigare fanns ingen alls
- "Boka möte" finns nu i mobilmenyn; den var helt dold under 720 px
- FAQ-sektion med sju frågor
- Formulärets endpoint (`api/kontakt.ts`) som Vercel-funktion: validering,
  fältvisa fel, honeypot, avvisning av inlägg som postats för snabbt, tak per
  fält och `reply_to` satt till avsändaren. Täckt av `npm run test:kontakt`

**SEO**

- `<h1>` bär erbjudandet i stället för bara varumärkesnamnet
- Sidorna förrenderas till riktig HTML — startsidan gick från 0 till ~5 600
  tecken indexerbar text
- Open Graph och Twitter-taggar, med en genererad delningsbild (`public/og.png`)
- Strukturerad data: `ProfessionalService` med tjänstekatalog och priser,
  `FAQPage`, samt `WebPage` för policysidan
- `robots.txt`, `sitemap.xml`, canonical-länkar, `site.webmanifest`,
  apple-touch-icon och PNG-ikoner
- Sektionsordningen följer nu menyn — "Om oss" scrollade tidigare uppåt

**Design och teknik**

- Logotypen ritas som SVG-paths. Tecknen `ˈ` och `ɪ` finns inte i Playfair
  Display, så hero-logotypen renderades tidigare till hälften i systemets
  serif. Genereras med `npm run brand`
- Typsnitten är självhostade i stället för att hämtas från Googles CDN —
  snabbare, och inga besökar-IP:n till tredje part
- Ankarlänkar landar inte längre bakom den klistrade headern
  (`scroll-padding-top` mot headerns uppmätta höjd)
- Mobilmenyn stänger på Escape, klick utanför och vid omritning, och låser
  bakgrunden medan den är öppen
- Aktiv sektion markeras i menyn under scroll
- Hero renderas direkt i stället för att tonas in — det är sidans LCP-element
- CTA-bandets brödtext: 4,39:1 → 4,81:1, över WCAG AA
- Integritetspolicy som egen, förrenderad sida
- Versionshanteringen är igång (`git init` + utgångsläget incheckat)
- `vercel.json` med säkerhetsheaders, `cleanUrls` och cachning av de
  hashade filerna
- `robots.txt` genereras vid bygget ur `site.url`, som sitemapen — den kan
  inte längre peka på fel domän
- Namnbytet till "Studio Leika" är genomfört i hela kodbasen. Namnet
  definieras numera bara i `site.name` — sidhuvud, sidfot, hero, titlar,
  strukturerad data, manifest och OG-bilden hämtar det därifrån. Logotypen
  `[ˈleɪka]` är ordet *leika* och påverkades inte
