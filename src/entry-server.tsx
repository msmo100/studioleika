import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { site, routes } from "./data/site";
import { faq, services, priceTiers, contact } from "./data/content";

export { routes };

/** Renderar en sida till HTML för injicering i index.html vid bygget. */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>
  );
}

const POLICY_DESCRIPTION =
  `Så behandlar ${site.name} personuppgifter från kontaktformuläret: vad vi samlar in, ` +
  "varför, hur länge vi sparar det och vilka rättigheter du har.";

/** Strukturerad data för startsidan — företaget, tjänsterna och frågorna. */
function homeJsonLd(): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${site.url}/#studio`,
      name: site.name,
      url: site.url,
      image: `${site.url}${site.ogImage}`,
      logo: `${site.url}/icon-512.png`,
      description: site.description,
      email: contact.email,
      priceRange: "4999 SEK–",
      areaServed: { "@type": "Country", name: "Sverige" },
      address: { "@type": "PostalAddress", addressCountry: "SE" },
      knowsLanguage: ["sv-SE"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tjänster",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.text,
          },
        })),
      },
      makesOffer: priceTiers
        // "Offert" är inget belopp — den nivån får ingen price-egenskap.
        .filter((tier) => /\d/.test(tier.price))
        .map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          description: tier.text,
          price: tier.price.replace(/[^\d]/g, ""),
          priceCurrency: "SEK",
          priceSpecification: {
            "@type": "PriceSpecification",
            valueAddedTaxIncluded: false,
          },
        })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];
}

function policyJsonLd(): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Integritetspolicy",
      url: `${site.url}/integritetspolicy`,
      description: POLICY_DESCRIPTION,
      isPartOf: { "@id": `${site.url}/#studio` },
    },
  ];
}

export interface Head {
  title: string;
  description: string;
  canonical: string;
  jsonLd: object[];
}

/** Sidspecifika head-uppgifter. Byggscriptet skriver in dem i index.html. */
export function head(path: string): Head {
  if (path === "/integritetspolicy") {
    return {
      title: `Integritetspolicy — ${site.name}`,
      description: POLICY_DESCRIPTION,
      canonical: `${site.url}/integritetspolicy`,
      jsonLd: policyJsonLd(),
    };
  }

  return {
    title: site.title,
    description: site.description,
    canonical: `${site.url}/`,
    jsonLd: homeJsonLd(),
  };
}
