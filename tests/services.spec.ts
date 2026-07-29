import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {


  test('user can view pet grooming services page', async ({ page }) => {

    await page.goto('/services');


    await expect(
      page.getByRole('heading', {
        name: 'Pet Grooming Services'
      })
    ).toBeVisible();


    await expect(
      page.getByText(/Professional grooming and healthcare services/)
    ).toBeVisible();

  });



  test('user can see AI grooming assistant section', async ({ page }) => {

    await page.goto('/services');


    await expect(
      page.getByRole('heading', {
        name: 'AI Grooming Assistant'
      })
    ).toBeVisible();


    await expect(
      page.getByRole('button', {
        name: 'Get AI Recommendation'
      })
    ).toBeVisible();

  });



  test('user can open AI recommendation modal', async ({ page }) => {

    await page.goto('/services');


    await page.getByRole('button', {
      name: 'Get AI Recommendation'
    }).click();


    await expect(
      page.getByRole('heading', {
        name: 'AI Grooming Assistant'
      }).last()
    ).toBeVisible();

  });



  test('user can view available grooming services', async ({ page }) => {

    await page.goto('/services');


    // Wait until services are loaded from server action
    await expect(
      page.getByRole('button', {
        name: 'Book Service'
      }).first()
    ).toBeVisible({
      timeout: 15000
    });


  });



//   test('user can click book service button', async ({ page }) => {

//   await page.goto('/services');

//   const bookButton = page.getByRole('button', {
//     name: 'Book Service'
//   }).first();

//   await expect(bookButton).toBeVisible({
//     timeout: 15000,
//   });

//   await bookButton.click();

//   // Wait for navigation
//   await page.waitForURL(/\/bookings\/new/, {
//     timeout: 15000,
//   });

//   await expect(page).toHaveURL(/\/bookings\/new/);

// });



  // test('user can open bookings page', async ({ page }) => {

  //   await page.goto('/services');


  //   await page.getByRole('button', {
  //     name: 'View Bookings'
  //   }).click();


  //   await expect(page)
  //     .toHaveURL('/bookings');

  // });


});