# Leika Studio

Webbplatsen för Leika Studio, byggd med React, TypeScript och Vite.

## Kom igång

```bash
npm install
npm run dev      # startar dev-servern
npm run build    # typkontroll + produktionsbygge till dist/
npm run preview  # förhandsgranska produktionsbygget lokalt
```

## Struktur

- `src/App.tsx` — sätter ihop sidan av sektionskomponenterna
- `src/components/` — Header, Hero, About, Services, Pricing, Process, CtaBand, Contact, Footer, samt `Logo`, `Icon` och `Reveal` för scroll-in-animationer
- `src/data/content.ts` — allt textinnehåll (tjänster, processteg, värdeord m.m.) samlat på ett ställe
- `src/index.css` — all styling

## Att fylla i innan lansering

- Kontaktuppgifter i `contact`-objektet i `src/data/content.ts` — e-post och telefonnummer är platshållare
- `contact.orgNr` — organisationsnumret är en platshållare av nollor och visas i sidfoten
- `contact.privacyHref` — adress till integritetspolicyn. Så länge den är tom renderas ingen länk i sidfoten, så inget trasigt kan gå live
- Koppla kontaktformuläret (`src/components/Contact.tsx`) till en riktig e-posttjänst eller backend, t.ex. Formspree eller ett eget API
