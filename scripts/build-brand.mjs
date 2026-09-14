/**
 * Genererar Leika Studios grafiska tillgångar ur de självhostade fonterna.
 * Körs med `npm run brand`. Utdata:
 *
 *   src/brand/logoPaths.ts    logotypen som SVG-paths
 *   public/og.png             delningsbild, 1200x630
 *   public/apple-touch-icon.png
 *   public/icon-192.png, public/icon-512.png
 *
 * Varför paths och inte text: tecknen ˈ (U+02C8) och ɪ (U+026A) saknas i
 * Playfair Display, så logotypen som HTML-text renderades till hälften i
 * systemets serif. Här ritas riktiga outlines, och de två saknade tecknen
 * konstrueras — ˈ som en smal stapel, ɪ som kapitäl-I ur Playfairs versala I.
 */
import fs from "node:fs";
import * as fontkit from "fontkit";
import sharp from "sharp";

const DISPLAY = fontkit.openSync(
  "node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff2"
);
const SANS = fontkit.openSync(
  "node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-500-normal.woff2"
);

const INK = "#101010";
const INK_SOFT = "#4A4A4A";
const ACCENT = "#B24A28";
const GREY = "#EDEDED";
const LINE = "rgba(16,16,16,0.22)";

/* ---------------------------------------------------------------- logotyp */

const CAP = DISPLAY.capHeight; // 708
const XH = DISPLAY.xHeight;    // 514
const TRACKING = 15;           // letter-spacing: .015em
const BRACKET_GAP = 60;        // .logo-bracket padding: 0 .06em

function buildLogo() {
  let pen = 0;
  const ink = [];
  const accent = [];

  const place = (path, advance, bucket, before = 0, after = 0) => {
    pen += before;
    bucket.push(path.transform(1, 0, 0, -1, pen, 0).toSVG());
    pen += advance + after;
  };

  const glyph = (ch) => {
    const g = DISPLAY.glyphsForString(ch)[0];
    return { path: g.path, advance: g.advanceWidth };
  };

  // [
  const bl = glyph("[");
  place(bl.path, bl.advance, accent, 0, BRACKET_GAP + TRACKING);

  // ˈ — betoningstecken, smal stapel som toppar i höjd med l och k
  const markW = 58;
  const markX = pen + 66;
  ink.push(`M${markX} -470H${markX + markW}V-784H${markX}Z`);
  pen += markW + 132 + TRACKING;

  for (const ch of "le") {
    const g = glyph(ch);
    place(g.path, g.advance, ink, 0, TRACKING);
  }

  // ɪ — kapitäl-I: versalt I skalat till x-höjd, optiskt breddat
  const capI = DISPLAY.glyphsForString("I")[0];
  const sx = 0.82;
  place(capI.path.scale(sx, XH / CAP), capI.advanceWidth * sx, ink, 0, TRACKING);

  for (const ch of "ka") {
    const g = glyph(ch);
    place(g.path, g.advance, ink, 0, TRACKING);
  }

  const br = glyph("]");
  place(br.path, br.advance, accent, BRACKET_GAP, 0);

  // 1000 enheter höjd = 1 em, så `height: 1em` i CSS ger samma optiska
  // storlek som texten hade vid samma font-size.
  return {
    viewBox: `0 -800 ${Math.round(pen)} 1000`,
    width: Math.round(pen),
    accent: accent.join(" "),
    ink: ink.join(" "),
  };
}

const logo = buildLogo();

fs.mkdirSync("src/brand", { recursive: true });
fs.writeFileSync(
  "src/brand/logoPaths.ts",
  `// GENERERAD FIL — ändra inte för hand. Kör \`npm run brand\`.
// Källa: scripts/build-brand.mjs, Playfair Display 500.

export const logoViewBox = ${JSON.stringify(logo.viewBox)};

/** Klamrarna — ritas i accentfärgen. */
export const logoAccentPath = ${JSON.stringify(logo.accent)};

/** ˈleɪka — ritas i textfärgen. */
export const logoInkPath = ${JSON.stringify(logo.ink)};
`
);

/* ------------------------------------------------------------ text→paths */

/** Sätter en textrad som SVG-path. Storlek i px, spacing i em. */
function textPath(font, text, { size, x, y, tracking = 0, anchor = "start" }) {
  const scale = size / font.unitsPerEm;
  const track = tracking * size;
  const glyphs = font.glyphsForString(text);

  let width = 0;
  for (const g of glyphs) width += g.advanceWidth * scale + track;
  width -= track;

  let pen = anchor === "middle" ? x - width / 2 : x;
  const parts = [];
  for (const g of glyphs) {
    if (g.path.commands.length) {
      parts.push(g.path.transform(scale, 0, 0, -scale, pen, y).toSVG());
    }
    pen += g.advanceWidth * scale + track;
  }
  return { d: parts.join(" "), width };
}

/* ------------------------------------------------------------- OG-bilden */

const OG_W = 1200;
const OG_H = 630;

function buildOg() {
  const logoW = 560;
  const logoH = (1000 / logo.width) * logoW;
  const logoX = (OG_W - logoW) / 2;
  const logoY = 136;

  // Logotypens interna koordinatsystem är 1000 enheter högt; skala in det.
  const s = logoW / logo.width;
  const tx = logoX;
  const ty = logoY + 800 * s; // baslinjen ligger på y=0 i logo-koordinater

  const name = textPath(SANS, "LEIKA STUDIO", {
    size: 23,
    x: OG_W / 2,
    y: logoY + logoH + 78,
    tracking: 0.52,
    anchor: "middle",
  });

  const tagline = textPath(SANS, "Hemsidor, e-handel och webblösningar för företag", {
    size: 30,
    x: OG_W / 2,
    y: logoY + logoH + 152,
    anchor: "middle",
  });

  const frameX = 150;
  const frameW = OG_W - frameX * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${GREY}"/>
  <radialGradient id="v" cx="50%" cy="10%" r="70%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
    <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#v)"/>
  <rect x="${frameX}" y="96" width="${frameW}" height="1" fill="${LINE}"/>
  <rect x="${frameX}" y="${OG_H - 96}" width="${frameW}" height="1" fill="${LINE}"/>
  <g transform="translate(${tx} ${ty}) scale(${s})">
    <path d="${logo.accent}" fill="${ACCENT}"/>
    <path d="${logo.ink}" fill="${INK}"/>
  </g>
  <rect x="${OG_W / 2 - 28}" y="${logoY + logoH + 34}" width="56" height="1" fill="${LINE}"/>
  <path d="${name.d}" fill="${INK_SOFT}"/>
  <path d="${tagline.d}" fill="${INK_SOFT}"/>
  <rect x="0" y="${OG_H - 8}" width="${OG_W}" height="8" fill="${ACCENT}"/>
</svg>`;
}

/* ------------------------------------------------------------------ kör */

const tasks = [
  ["public/og.png", buildOg(), null],
  ["public/apple-touch-icon.png", fs.readFileSync("public/favicon.svg"), 180],
  ["public/icon-192.png", fs.readFileSync("public/favicon.svg"), 192],
  ["public/icon-512.png", fs.readFileSync("public/favicon.svg"), 512],
];

for (const [out, svg, size] of tasks) {
  let img = sharp(Buffer.from(svg));
  if (size) img = img.resize(size, size);
  await img.png().toFile(out);
  console.log(out);
}
console.log("src/brand/logoPaths.ts");
