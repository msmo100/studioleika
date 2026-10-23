import { contact, isPlaceholder } from "../data/content";
import { site } from "../data/site";
import Logo from "./../components/Logo";

/**
 * Integritetspolicy. Krävs eftersom kontaktformuläret samlar in
 * personuppgifter — informationsplikten följer av GDPR artikel 13.
 *
 * Texten beskriver sajten som den faktiskt fungerar idag: inga cookies,
 * ingen statistik, inga tredjepartsanrop. Lägger ni till analysverktyg
 * eller en formulärtjänst måste avsnitten om mottagare och cookies
 * uppdateras — se THINGSTODO.md.
 */
const UPDATED = "14 september 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <header className="site-header scrolled">
        <div className="wrap header-inner">
          <a href="/" className="brand" aria-label={`${site.name}, startsida`}>
            <Logo className="logo-sm" />
          </a>
          <a href="/" className="btn btn-ghost btn-sm">
            Till startsidan
          </a>
        </div>
      </header>

      <main id="main" className="section legal">
        <div className="wrap legal-wrap">
          <p className="eyebrow">Juridik</p>
          <h1>Integritetspolicy</h1>
          <p className="legal-updated">Senast uppdaterad {UPDATED}</p>

          <p className="legal-lead">
            Den här sidan beskriver vilka personuppgifter {site.name} samlar in, varför vi gör det
            och vad ni kan kräva av oss. Vi samlar inte in mer än vi behöver för att kunna svara
            på er förfrågan.
          </p>

          <h2>Personuppgiftsansvarig</h2>
          <p>
            {site.name}
            {!isPlaceholder(contact.orgNr) && <>, org.nr {contact.orgNr}</>} är
            personuppgiftsansvarig för behandlingen som beskrivs här. Har ni frågor når ni oss på{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>

          <h2>Vilka uppgifter vi behandlar</h2>
          <p>
            Skickar ni kontaktformuläret behandlar vi namn, e-postadress, eventuellt företagsnamn
            och det ni skriver i meddelandet. Kontaktar ni oss direkt via e-post behandlar vi de
            uppgifter som finns i mejlet.
          </p>
          <p>
            Vi begär aldrig känsliga personuppgifter, och ni behöver inte lämna mer än namn,
            e-postadress och en beskrivning av ert ärende.
          </p>

          <h2>Varför, och med vilket stöd</h2>
          <p>
            Uppgifterna används uteslutande för att besvara er förfrågan och för eventuell
            fortsatt dialog om ett uppdrag. Den rättsliga grunden är vårt berättigade intresse av
            att kunna svara den som kontaktar oss, och inför ett uppdrag att kunna vidta åtgärder
            på er begäran innan avtal ingås.
          </p>
          <p>
            Vi använder inte era uppgifter för marknadsföring och säljer dem inte vidare.
          </p>

          <h2>Hur länge vi sparar dem</h2>
          <p>
            Leder kontakten inte till något uppdrag raderar vi förfrågan inom tolv månader. Blir
            det ett uppdrag sparas uppgifterna så länge samarbetet pågår, och därefter så länge vi
            måste enligt bokföringslagen.
          </p>

          <h2>Vilka som kan få tillgång</h2>
          <p>
            Uppgifterna hanteras av oss. Våra leverantörer av e-post och webbhotell kan tekniskt
            komma åt dem i egenskap av personuppgiftsbiträden, och behandlar dem bara enligt våra
            instruktioner. Vi lämnar inte ut uppgifter till någon annan, annat än om vi är skyldiga
            enligt lag.
          </p>

          <h2>Cookies och statistik</h2>
          <p>
            Den här webbplatsen sätter inga cookies och använder inga analys- eller
            spårningsverktyg. Typsnitt och övriga resurser laddas från vår egen server, så inga
            uppgifter om ert besök skickas till tredje part.
          </p>

          <h2>Era rättigheter</h2>
          <p>
            Ni har rätt att få veta vilka uppgifter vi har om er, att få felaktiga uppgifter
            rättade, att få uppgifter raderade, att begära att behandlingen begränsas, att invända
            mot behandlingen och att få ut era uppgifter i ett maskinläsbart format. Hör av er till{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> så löser vi det.
          </p>
          <p>
            Tycker ni att vi behandlar era uppgifter felaktigt får ni gärna säga till oss först,
            men ni har alltid rätt att klaga till{" "}
            <a href="https://www.imy.se" rel="noopener noreferrer">
              Integritetsskyddsmyndigheten (IMY)
            </a>
            .
          </p>

          <p className="legal-back">
            <a href="/">← Tillbaka till startsidan</a>
          </p>
        </div>
      </main>
    </>
  );
}
