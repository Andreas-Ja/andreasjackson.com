// Build the ABA ops cover: headline, stat row, and a client-logo strip.
// The supplied logos are lockups with their own backgrounds (T-Mobile is a
// magenta square, IKEA a blue box), so they cannot be silhouetted. Each sits
// on a uniform white chip instead: brand colours stay correct, and the chips
// give the row one consistent rhythm against the teal.
// Run: node scripts/aba-cover.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const L = 'public/images/logos';
const OUT = 'public/images/covers/aba.png';

const W = 1600;
const H = 900;

const CHIP_H = 84;
const PAD_X = 26;
const LOGO_H = 44;
const LOGO_MAX_W = 170;
const RADIUS = 10;
const GAP = 26;

// Render one logo centred on a white rounded chip.
async function chip(file, { logoH = LOGO_H } = {}) {
  const src = sharp(`${L}/${file}`, { density: 600 });
  const meta = await src.metadata();

  let h = logoH;
  let w = Math.round(meta.width * (h / meta.height));
  if (w > LOGO_MAX_W) {
    w = LOGO_MAX_W;
    h = Math.round(meta.height * (w / meta.width));
  }

  const logo = await src
    .resize(w, h, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const chipW = w + PAD_X * 2;
  const plate = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${chipW}" height="${CHIP_H}">
       <rect width="${chipW}" height="${CHIP_H}" rx="${RADIUS}" fill="#ffffff"/>
     </svg>`
  );

  const buf = await sharp(plate)
    .composite([{ input: logo, left: PAD_X, top: Math.round((CHIP_H - h) / 2) }])
    .png()
    .toBuffer();

  return { buf, w: chipW, h: CHIP_H };
}

const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#1f4e5f"/>
  <text x="100" y="185" font-family="Georgia, serif" font-size="38" fill="#9fc4ce">ABA Consulting</text>
  <text x="100" y="280" font-family="Georgia, serif" font-size="74" font-weight="600" fill="#ffffff">Analyst to Senior Advisor</text>
  <line x1="100" y1="355" x2="1500" y2="355" stroke="#3d6b7a" stroke-width="2"/>
  <text x="100" y="470" font-family="Georgia, serif" font-size="82" font-weight="600" fill="#ffffff">3</text>
  <text x="100" y="518" font-family="Arial, sans-serif" font-size="26" fill="#9fc4ce">years, four roles</text>
  <text x="480" y="470" font-family="Georgia, serif" font-size="82" font-weight="600" fill="#ffffff">4</text>
  <text x="480" y="518" font-family="Arial, sans-serif" font-size="26" fill="#9fc4ce">client engagements</text>
  <text x="900" y="470" font-family="Georgia, serif" font-size="82" font-weight="600" fill="#ffffff">80+</text>
  <text x="900" y="518" font-family="Arial, sans-serif" font-size="26" fill="#9fc4ce">candidates recruited</text>
  <text x="100" y="655" font-family="Arial, sans-serif" font-size="21" letter-spacing="2.5" fill="#7fa8b4">CLIENTS AT ABA CONSULTING</text>
</svg>`);

// Square marks need less height than wordmarks to look optically equal.
const CLIENTS = [
  { file: 'tmo-logo-v4.svg', logoH: 48 },
  { file: 'ikea.svg', logoH: 40 },
  { file: 'GF PRIMARY WEATHERED SLATE LOGO_4BY1 RATIO-FIXED.svg', logoH: 34 },
  { file: 'TAF_Horizontal_Logo_TM.png', logoH: 40 },
];

const chips = [];
for (const c of CLIENTS) chips.push(await chip(c.file, c));

const ROW_TOP = 700;
let x = 100;
const composites = chips.map((c) => {
  const item = { input: c.buf, left: Math.round(x), top: ROW_TOP };
  x += c.w + GAP;
  return item;
});

// The ABA mark is white on transparency, so it goes straight onto the teal.
// On a white chip it would be invisible.
const abaSrc = sharp(`${L}/aba-logo.png`, { density: 600 });
const abaMeta = await abaSrc.metadata();
const abaH = 130;
const abaW = Math.round(abaMeta.width * (abaH / abaMeta.height));
const abaBuf = await abaSrc.resize(abaW, abaH, { fit: 'contain' }).png().toBuffer();
composites.push({ input: abaBuf, left: W - 110 - abaW, top: 110 });

await sharp(bg).composite(composites).png().toFile(OUT);
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`wrote ${OUT} (${kb} KB); strip ends x=${Math.round(x - GAP)} of ${W}`);
