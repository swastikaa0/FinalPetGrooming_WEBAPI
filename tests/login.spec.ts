import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test('user can login successfully', async ({ page }) => {

    await page.goto('/login');

    // Fill email field
    await page.fill(
      'input[type="email"]',
      'test@gmail.com'
    );

    // Fill password field
    await page.fill(
      'input[type="password"]',
      'password123'
    );

    // Click login button
    await page.click(
      'button[type="submit"]'
    );

    // Check redirect
    await expect(page)
      .toHaveURL('/dashboard');

  });


  test('user sees error message for invalid credentials', async ({ page }) => {

    await page.goto('/login');


    await page.fill(
      'input[type="email"]',
      'wrong@gmail.com'
    );


    await page.fill(
      'input[type="password"]',
      'wrongpassword'
    );


    await page.click(
      'button[type="submit"]'
    );


    // Your form displays error using:
    // <div className="text-red-500 ...">
    await expect(
      page.locator('.text-red-500')
    ).toBeVisible();

  });


  test('user sees validation errors for empty fields', async ({ page }) => {

    await page.goto('/login');


    await page.click(
      'button[type="submit"]'
    );


    // Zod validation messages
    await expect(
      page.locator('p.text-red-500')
    ).toHaveCount(2);

  });

});