import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import CtaBand from "./components/CtaBand";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Hoppa till innehåll
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Process />
        <CtaBand />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
