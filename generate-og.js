import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto(`file://${join(__dirname, 'generate-og.html')}`, { waitUntil: 'networkidle0' });
await page.screenshot({
  path: join(__dirname, 'public', 'logos', 'vmp-og.png'),
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});
await browser.close();
console.log('OG image saved to public/logos/vmp-og.png');
