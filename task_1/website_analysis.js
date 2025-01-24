import { test } from '@playwright/test';
import { chromium } from 'playwright';
import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';


async function performLighthouseAnalysis(url) {
  const chrome = await chromium.launch();
  const page = await chrome.newPage();
  await page.goto(url);

  const chromeInstance = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const { lhr } = await lighthouse(url, {
    logLevel: 'info',
    output: 'json',
    port: chromeInstance.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    settings: {
      onlyAudits: ['speed-index', 'seo'], // Limit audits to essential ones
      disableStorageReset: true,
      throttlingMethod: 'devtools', // Use a different throttling method
    },
  });

  // Generate report
  const reportJson = {
    performance: lhr.categories.performance.score * 100,
    accessibility: lhr.categories.accessibility.score * 100,
    bestPractices: lhr.categories['best-practices'].score * 100,
    seo: lhr.categories.seo.score * 100
  };

  // Save report
  fs.writeFileSync('lighthouse-report.json', JSON.stringify(reportJson, null, 2));

  await chrome.close();
  await chromeInstance.kill();
  return reportJson;
}

async function validateResources(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Collect resource URLs (CSS, JS, images)
  const resources = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href);
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(script => script.src);
    const images = Array.from(document.querySelectorAll('img[src]')).map(img => img.src);

    return [...links, ...scripts, ...images];
  });

  const brokenResources = [];

  for (const resource of resources) {
    try {
      // Fetch the resource directly
      const response = await page.request.get(resource);
      if (!response.ok()) {
        brokenResources.push({
          url: resource,
          status: response.status(),
          statusText: response.statusText()
        });
      }
    } catch (error) {
      brokenResources.push({
        url: resource,
        error: error.message
      });
    }
  }

  // Save broken resources to file
  fs.writeFileSync('broken-resources.json', JSON.stringify(brokenResources, null, 2));

  await browser.close();
  return brokenResources;
}

test('Website Analysis' ,async () => {
  const url = 'https://www.cbssports.com/betting';

  // Perform Lighthouse analysis
  const lighthouseReport = await performLighthouseAnalysis(url);
  console.log('Lighthouse Analysis:', lighthouseReport);

  // Validate resources
  const brokenResources = await validateResources(url);
  console.log('Broken Resources:', brokenResources);
});