// Capture project cover screenshots headlessly.
// Run: node scripts/shots.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = 'public/images/covers';
fs.mkdirSync(OUT, { recursive: true });

// shinyapps.io free tier cold-starts, so those need a longer settle.
const TARGETS = [
  { name: 'nottomorrow', url: 'https://nottomorrow.app', wait: 4000 },
  {
    name: 'deadlock',
    url: 'https://andreas-ja.github.io/deadlock-counter-buy/',
    wait: 3500,
  },
  { name: 'dune-lakes', url: 'https://dunelakesltd.com', wait: 5000 },
  {
    name: 'sp500',
    url: 'https://andreasjackson.shinyapps.io/sp500/',
    wait: 18000,
  },
  {
    name: 'crashes',
    url: 'https://andreasjackson.shinyapps.io/California_Crashes/',
    wait: 20000,
  },
  {
    name: 'harry-potter',
    url: 'https://andreasjackson.shinyapps.io/Harry_Potter/',
    wait: 18000,
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 2, // retina-quality for cards
});

for (const t of TARGETS) {
  const page = await ctx.newPage();
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch {
    // networkidle can never settle on apps that poll; fall back to load
    try {
      await page.goto(t.url, { waitUntil: 'load', timeout: 60000 });
    } catch (e) {
      console.log(`FAILED ${t.name}: ${e.message.split('\n')[0]}`);
      await page.close();
      continue;
    }
  }
  await page.waitForTimeout(t.wait);
  const file = `${OUT}/${t.name}.png`;
  await page.screenshot({ path: file });
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`ok  ${t.name.padEnd(14)} ${kb} KB  ${await page.title()}`);
  await page.close();
}

await browser.close();
