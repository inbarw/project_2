export default {
  testDir: '.',
  testMatch: ['tests/**/*.js'],
  timeout: 150000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
};