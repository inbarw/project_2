export default {
  testDir: '.',
  testMatch: ['website_analysis.js'],
  workers: 4,
  timeout: 100000,
  use: {
    browserName: 'chromium',
    headless: true
  }
};