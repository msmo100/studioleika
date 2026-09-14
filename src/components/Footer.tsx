import { contact } from "../data/content";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo className="logo-sm" />
          <span className="brand-name">Leika Studio</span>
        </div>
        <ul className="footer-meta">
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>Org.nr {contact.orgNr}</li>
          {/* Renderas först när policyn har en riktig adress — se README */}
          {contact.privacyHref && (
            <li>
              <a className="footer-policy" href={contact.privacyHref}>
                Integritetspolicy
              </a>
            </li>
          )}
        </ul>
        <p className="footer-copy">© {year} Leika Studio. Alla rättigheter förbehållna.</p>
      </div>
    </footer>
  );
}
