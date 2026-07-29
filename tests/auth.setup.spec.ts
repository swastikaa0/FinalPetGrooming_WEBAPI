import { test as setup, expect } from '@playwright/test';

setup('login user', async ({ page }) => {

  await page.goto('/login');


  await page.fill(
    'input[type="email"]',
    'test@gmail.com'
  );


  await page.fill(
    'input[type="password"]',
    'password123'
  );


  await page.click(
    'button[type="submit"]'
  );


  await expect(page)
    .toHaveURL('/dashboard');


  await page.context().storageState({
    path: 'auth.json',
  });

});