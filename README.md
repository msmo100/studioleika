# Leika Studio

Webbplatsen för Leika Studio, byggd med React, TypeScript och Vite.
Sidorna förrenderas till statisk HTML vid bygget.

## Kom igång

```bash
npm install
npm run dev      # startar dev-servern
npm run build    # typkontroll, bygge och förrendering till dist/
npm run preview  # förhandsgranska produktionsbygget lokalt
npm run lint     # oxlint
npm run brand    # bygger om logotyp-paths, OG-bild och ikoner
```

## Struktur

- `src/App.tsx` — sätter ihop sidan, och väljer mellan startsida och
  integritetspolicy utifrån sökvägen
- `src/components/` — Header, Hero, Services, Offer, Process, About, Faq,
  CtaBand, Contact, Footer, samt `Logo`, `Icon` och `Reveal`
- `src/pages/PrivacyPolicy.tsx` — integritetspolicyn, egen URL
- `src/data/content.ts` — allt textinnehåll (tjänster, erbjudande, FAQ,
  kontaktuppgifter) samlat på ett ställe
- `src/data/site.ts` — domän, titel, beskrivning och listan över rutter
- `src/entry-server.tsx` — rendering och head-taggar för förrenderingen,
  inklusive strukturerad data
- `src/brand/logoPaths.ts` — **genererad**, ändra inte för hand
- `src/index.css` — all styling

## Bygget

`npm run build` kör fyra steg: typkontroll, klientbygge, ett SSR-bygge av
`entry-server.tsx`, och slutligen `scripts/prerender.mjs` som renderar varje
rutt i `src/data/site.ts` till en egen HTML-fil och skriver `sitemap.xml`.

Resultatet är rena statiska filer — `dist/index.html` och
`dist/integritetspolicy/index.html` — så sajten fungerar på vilket statiskt
webbhotell som helst utan SPA-fallback.

### Lägga till en sida

1. Skriv komponenten och koppla in den i `src/App.tsx`
2. Lägg till rutten i `routes` i `src/data/site.ts`
3. Lägg till titel, beskrivning och eventuell strukturerad data i `head()`
   i `src/entry-server.tsx`

Förrendering och sitemap sköter sig själva därifrån.

## Grafiska tillgångar

`npm run brand` genererar logotypen, delningsbilden och ikonerna ur de
självhostade typsnitten (`scripts/build-brand.mjs`).

Logotypen ritas som SVG-paths och inte som text: tecknen `ˈ` (U+02C8) och
`ɪ` (U+026A) saknas i Playfair Display, så som HTML-text renderades de två
tecknen i systemets serif medan resten var Playfair. Scriptet konstruerar
dem i stället — `ˈ` som en smal stapel och `ɪ` som kapitäl-I ur versalt I.

## Kvar att göra

Se [THINGSTODO.md](THINGSTODO.md).
