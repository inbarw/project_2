import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

export async function performLighthouseAnalysis(url) {
  const chromeInstance = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const { lhr } = await lighthouse(url, {
    logLevel: 'info',
    output: 'json',
    port: chromeInstance.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    settings: {
      onlyAudits: ['speed-index', 'seo'],
      disableStorageReset: true,
      throttlingMethod: 'devtools',
    },
  });

  const reportJson = {
    performance: lhr.categories.performance.score * 100,
    accessibility: lhr.categories.accessibility.score * 100,
    bestPractices: lhr.categories['best-practices'].score * 100,
    seo: lhr.categories.seo.score * 100,
  };

  fs.writeFileSync('lighthouse-report.json', JSON.stringify(reportJson, null, 2));

  await chromeInstance.kill();
  return reportJson;
}
