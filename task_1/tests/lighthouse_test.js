import { test } from '@playwright/test';
import { performLighthouseAnalysis } from '../utils/lighthouse_utils.js';

test('Lighthouse Analysis', async () => {
  const url = 'https://www.cbssports.com/betting';
  const lighthouseReport = await performLighthouseAnalysis(url);

  console.log('Lighthouse Report:', lighthouseReport);
});
