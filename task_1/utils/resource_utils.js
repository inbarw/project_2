import fs from 'fs';
import { chromium } from 'playwright';

export async function validateResources(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const resources = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(script => script.src);
    const images = Array.from(document.querySelectorAll('img[src]')).map(img => img.src);

    return [...links, ...scripts, ...images];
  });

  const brokenResources = [];

  for (const resource of resources) {
    try {
      const response = await page.request.get(resource);
      if (!response.ok()) {
        brokenResources.push({
          url: resource,
          status: response.status(),
          statusText: response.statusText(),
        });
      }
    } catch (error) {
      brokenResources.push({
        url: resource,
        error: error.message,
      });
    }
  }

  fs.writeFileSync('broken-resources.json', JSON.stringify(brokenResources, null, 2));

  await browser.close();
  return brokenResources;
}
