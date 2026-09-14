/**
 * Sajtövergripande uppgifter som används av SEO-taggar, strukturerad data
 * och sitemap. Ändras domänen måste `url` ändras här — den byggs in i
 * canonical, og:url och sitemap.xml vid bygget.
 */
export const site = {
  url: "https://studioleika.se",
  name: "Studio Leika",
  title: "Studio Leika — Hemsidor, e-handel & SEO för företag",
  description:
    "Studio Leika bygger skräddarsydda hemsidor, e-handel och webblösningar för företag i hela Sverige. Fast pris från 4 999 kr, tydlig process och support efter lansering.",
  locale: "sv_SE",
  ogImage: "/og.png",
  ogImageAlt: "Studio Leika — hemsidor, e-handel och webblösningar för företag",
} as const;

/** Sidor som förrenderas till egna HTML-filer och listas i sitemap.xml. */
export const routes = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/integritetspolicy", changefreq: "yearly", priority: "0.3" },
] as const;
