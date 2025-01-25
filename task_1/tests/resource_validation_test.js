import { test } from '@playwright/test';
import { validateResources } from '../utils/resource_utils.js';

test('Resource Validation', async () => {
  const url = 'https://www.cbssports.com/betting';
  const brokenResources = await validateResources(url);

  console.log('Broken Resources:', brokenResources);

});
