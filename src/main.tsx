import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

// Självhostade typsnitt. Laddades tidigare från Googles CDN, vilket dels
// blockerade renderingen mot en tredjepart, dels skickade besökarnas
// IP-adresser till Google — en märklig sak för en sajt som säljer
// genomtänkt hantverk och har en integritetspolicy som säger motsatsen.
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/instrument-sans/latin-400.css";
import "@fontsource/instrument-sans/latin-500.css";
import "@fontsource/instrument-sans/latin-600.css";

import "./index.css";
import App from "./App.tsx";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Sidorna förrenderas vid bygget, så det finns markup att hydrera.
// Räknar element, inte noder: i dev innehåller roten platshållarkommentaren
// <!--app-->, och den skulle få hasChildNodes() att ljuga.
if (container.childElementCount > 0) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
