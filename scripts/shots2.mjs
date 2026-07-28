// Second pass: Deadlock with a lineup selected (the empty state is a poor
// cover), plus a generated typographic cover for the ABA ops project, which
// has no live artifact to photograph.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'public/images/covers';
fs.mkdirSync(OUT, { recursive: true });

// ---- Deadlock, with heroes picked so the recommendations panel populates ----
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto('https://andreas-ja.github.io/deadlock-counter-buy/', {
  waitUntil: 'load',
  timeout: 60000,
});
await page.waitForTimeout(3000);

let picked = 0;
for (const hero of ['Haze', 'Infernus', 'Bebop', 'Lady Geist']) {
  try {
    await page.getByText(hero, { exact: true }).first().click({ timeout: 4000 });
    picked++;
    await page.waitForTimeout(400);
  } catch {
    console.log(`  could not click ${hero}`);
  }
}
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/deadlock.png` });
console.log(`ok  deadlock (picked ${picked} heroes)`);
await browser.close();

// ---- ABA: generated cover ----
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
  <rect width="1600" height="900" fill="#1f4e5f"/>
  <text x="100" y="200" font-family="Georgia, serif" font-size="40" fill="#9fc4ce">ABA Consulting</text>
  <text x="100" y="300" font-family="Georgia, serif" font-size="76" font-weight="600" fill="#ffffff">Analyst to Senior Advisor</text>
  <line x1="100" y1="380" x2="1500" y2="380" stroke="#3d6b7a" stroke-width="2"/>
  <text x="100" y="500" font-family="Georgia, serif" font-size="86" font-weight="600" fill="#ffffff">3</text>
  <text x="100" y="550" font-family="Arial, sans-serif" font-size="28" fill="#9fc4ce">years, four roles</text>
  <text x="500" y="500" font-family="Georgia, serif" font-size="86" font-weight="600" fill="#ffffff">4</text>
  <text x="500" y="550" font-family="Arial, sans-serif" font-size="28" fill="#9fc4ce">client engagements</text>
  <text x="950" y="500" font-family="Georgia, serif" font-size="86" font-weight="600" fill="#ffffff">80+</text>
  <text x="950" y="550" font-family="Arial, sans-serif" font-size="28" fill="#9fc4ce">candidates recruited</text>
  <text x="100" y="700" font-family="Arial, sans-serif" font-size="30" fill="#cfe0e5">T-Mobile  ·  IKEA  ·  The Assistance Fund  ·  Gates Foundation</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(`${OUT}/aba.png`);
console.log('ok  aba (generated)');
