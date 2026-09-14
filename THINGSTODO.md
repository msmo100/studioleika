# Att göra — Leika Studio

Listan över det som är kvar, sorterat efter vad som hindrar lansering.
Allt som gick att göra utan ditt material är redan gjort — se
[Vad som redan är på plats](#vad-som-redan-är-på-plats) längst ner.

---

## 1. Blockerare — måste vara klart innan sajten går live

- [ ] **Koppla kontaktformuläret.**
      Sätt `formEndpoint` i `src/data/content.ts` till din endpoint —
      Formspree, Resend, Netlify Forms eller en egen API-route fungerar alla.
      Tills dess faller formuläret tillbaka på ett förifyllt mejl, så knappen
      gör åtminstone något, men det är ingen långsiktig lösning.

- [ ] **Telefonnummer.** `contact.phone` i `src/data/content.ts`.
      Raden är dold så länge numret består av nollor — fyll i det riktiga så
      dyker den upp i kontaktsektionen av sig själv.

- [ ] **Organisationsnummer.** `contact.orgNr` i samma fil. Samma sak: dold
      tills det finns ett riktigt, eftersom `000000-0000` i sidfoten
      signalerar "inte ett riktigt företag" till precis den besökare du vill
      övertyga.

- [ ] **Bekräfta domänen.** `site.url` i `src/data/site.ts` står på
      `https://leikastudio.se` — gissat utifrån e-postadressen. Den adressen
      byggs in i canonical, og:url, sitemap.xml och robots.txt, så den måste
      stämma. Ändra på ett ställe, resten följer med.

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

- [ ] **Sätt upp e-post på `hej@leikastudio.se`** om den inte redan finns.
      Den ligger publikt i sidfoten, kontaktsektionen och strukturerade datan.

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

- [ ] **Hosting.** Sajten byggs till statiska filer och varje sida blir en
      egen HTML-fil (`dist/integritetspolicy/index.html`), så den fungerar på
      vilket statiskt webbhotell som helst — Netlify, Vercel, Cloudflare Pages
      eller vanlig filuppladdning. Ingen SPA-fallback behövs.

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
