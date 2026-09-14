/**
 * Förrenderar sidorna till riktig HTML efter vite-bygget.
 *
 * Utan det här steget levererar sajten <div id="root"></div> och inget mer:
 * sämre LCP, och tomma förhandsvisningar i LinkedIn, Slack och allt annat
 * som inte kör JavaScript. Innehållet är statiskt, så det finns ingen
 * anledning att betala det priset.
 *
 * Varje rutt blir en egen fil (/integritetspolicy/index.html), så sajten
 * fungerar på vilket statiskt webbhotell som helst utan SPA-fallback.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { site } from "../src/data/site.ts";

const DIST = "dist";
const SSR = "dist-ssr/entry-server.js";

const { render, head, routes } = await import(pathToFileURL(path.resolve(SSR)).href);
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Bygger <head>-blocket för en sida. */
function seoBlock(meta, ogImage) {
  const shortDescription = meta.description.split(". ")[0] + ".";
  return `<title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${esc(meta.canonical)}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:locale" content="sv_SE" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${esc(meta.canonical)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(shortDescription)}" />
    <meta name="twitter:image" content="${esc(ogImage)}" />`;
}

/** Byter ut allt mellan <!-- namn:start ... --> och <!-- namn:end -->. */
function replaceBlock(html, name, contents) {
  const openTag = `<!-- ${name}:start`;
  const closeTag = `<!-- ${name}:end -->`;
  const from = html.indexOf(openTag);
  const to = html.indexOf(closeTag);
  if (from < 0 || to < 0) throw new Error(`index.html saknar markören ${name}`);
  return (
    html.slice(0, from) +
    `<!-- ${name}:start -->
    ${contents}
    ` +
    html.slice(to)
  );
}

// Origin härleds ur startsidans canonical, så domänen bara står på ett ställe.
const origin = new URL(head("/").canonical).origin;
const ogImage = `${origin}/og.png`;

for (const route of routes) {
  const meta = head(route.path);
  const body = render(route.path);

  let html = template;
  html = replaceBlock(html, "seo", seoBlock(meta, ogImage));
  html = replaceBlock(
    html,
    "jsonld",
    meta.jsonLd
      .map(
        (entry) =>
          `<script type="application/ld+json">${JSON.stringify(entry).replace(/</g, "\u003c")}</script>`
      )
      .join("\n    ")
  );
  html = html.replace("<!--app-->", body);

  const out =
    route.path === "/" ? path.join(DIST, "index.html") : path.join(DIST, route.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`${out}  (${(html.length / 1024).toFixed(1)} kB)`);
}

// sitemap.xml genereras här så den aldrig hamnar ur synk med rutterna.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>\n    <loc>${origin}${route.path === "/" ? "/" : route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
console.log(`${path.join(DIST, "sitemap.xml")}`);

fs.rmSync("dist-ssr", { recursive: true, force: true });
