// Renders public/og.png (1200x630) from an inline SVG using sharp
// (already present via Astro). Run: node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fbfaf8"/>
  <rect x="0" y="0" width="1200" height="10" fill="#1f4e5f"/>
  <text x="90" y="180" font-family="Georgia, serif" font-size="34" fill="#7b838b">Andreas Jackson</text>
  <text x="90" y="290" font-family="Georgia, serif" font-size="64" font-weight="600" fill="#1c2024">I build and run things</text>
  <text x="90" y="370" font-family="Georgia, serif" font-size="64" font-weight="600" fill="#1c2024">with numbers behind them.</text>
  <text x="90" y="480" font-family="Arial, sans-serif" font-size="28" fill="#4a5158">EY  ·  Gates Foundation  ·  IKEA  ·  UC Berkeley Haas  ·  Founder, NotTomorrow.app</text>
  <text x="90" y="560" font-family="Arial, sans-serif" font-size="26" fill="#1f4e5f">andreasjackson.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('wrote public/og.png');
