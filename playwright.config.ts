import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3002',
    trace: 'on-first-retry',
  },

  projects: [
    // Setup project - runs once to create auth.json
    {
      name: 'setup',
      testMatch: /auth\.setup\.spec\.ts/,
    },

    // Login tests (NO authentication)
    {
      name: 'login',
      testMatch: /login\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Chromium authenticated tests
    {
      name: 'chromium',
      testIgnore:[ /login\.spec\.ts/,/auth\.setup\.spec\.ts/],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },

    // Firefox authenticated tests
    {
      name: 'firefox',
      testIgnore: [ /login\.spec\.ts/,/auth\.setup\.spec\.ts/],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },

    // WebKit authenticated tests
    {
      name: 'webkit',
      testIgnore: [ /login\.spec\.ts/,/auth\.setup\.spec\.ts/],
      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});