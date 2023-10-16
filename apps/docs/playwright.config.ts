import {defineConfig, devices} from '@playwright/test';

const port = process.env.PORT ?? 3000;
const baseUrl = `http://localhost:${port}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome-desktop',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'safari-desktop',
      use: {...devices['Desktop Safari']},
    },
    {
      name: 'firefox-desktop',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'chrome-mobile',
      use: {...devices['Pixel 5']},
    },
    {
      name: 'safari-mobile',
      use: {...devices['iPhone 12']},
    },
  ],
});
