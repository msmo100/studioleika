import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Offer from "./components/Offer";
import Process from "./components/Process";
import About from "./components/About";
import Faq from "./components/Faq";
import CtaBand from "./components/CtaBand";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";

interface AppProps {
  /** Sökvägen som ska renderas. Servern skickar in den vid förrendering. */
  path?: string;
}

/** Tar bort avslutande slash så "/integritetspolicy/" och "…policy" är samma sida. */
function normalise(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export default function App({ path = "/" }: AppProps) {
  if (normalise(path) === "/integritetspolicy") {
    return (
      <>
        <a className="skip-link" href="#main">
          Hoppa till innehåll
        </a>
        <PrivacyPolicy />
        <Footer />
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Hoppa till innehåll
      </a>

      <Header />

      {/* Ordningen följer menyn: vad vi gör och hur man får en offert först,
          om oss och frågor när besökaren redan är intresserad. */}
      <main id="main">
        <Hero />
        <Services />
        <Offer />
        <Process />
        <About />
        <Faq />
        <CtaBand />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
