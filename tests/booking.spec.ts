import { test, expect } from '@playwright/test';

test.describe('Booking Page', () => {


  test('user can open booking page with selected service', async ({ page }) => {

    await page.goto(
      '/bookings/new?serviceId=123&serviceName=Bathing&servicePrice=500&serviceDuration=60'
    );


    await expect(
      page.getByRole('heading', {
        name: 'Book an Appointment'
      })
    ).toBeVisible();


    await expect(
      page.locator('input[readonly]')
    ).toHaveValue('Bathing');

  });



  test('user can fill booking form', async ({ page }) => {
  await page.goto(
    '/bookings/new?serviceId=123&serviceName=Bathing&servicePrice=500&serviceDuration=60'
  );

  // Wait until the form is rendered
  await page.waitForSelector('input[name="ownerName"]');

  await page.locator('input[name="ownerName"]').click();
  await page.locator('input[name="ownerName"]').fill('John Doe');

  await page.locator('input[name="petName"]').fill('Buddy');
  await page.locator('input[name="phone"]').fill('9812345678');
  await page.locator('input[name="date"]').fill('2026-08-01');
  await page.locator('input[name="time"]').fill('10:30');
  await page.locator('textarea[name="notes"]').fill('My pet is friendly');

  await expect(page.locator('input[name="ownerName"]'))
    .toHaveValue('John Doe');

  await expect(page.locator('input[name="petName"]'))
    .toHaveValue('Buddy');

  await expect(page.locator('input[name="phone"]'))
    .toHaveValue('9812345678');
});



 test('user can continue to booking summary', async ({ page }) => {

  await page.goto(
    '/bookings/new?serviceId=123&serviceName=Bathing&servicePrice=500&serviceDuration=60'
  );


  await page.locator('input[name="ownerName"]')
    .fill('John Doe');

  await page.locator('input[name="petName"]')
    .fill('Buddy');

  await page.locator('input[name="phone"]')
    .fill('9812345678');

  await page.locator('input[name="date"]')
    .fill('2026-08-01');

  await page.locator('input[name="time"]')
    .fill('10:30');


  await page.getByRole('button', {
    name: 'Confirm Booking'
  }).click();


  console.log("After click URL:", page.url());


});


  test('required fields should prevent empty submission', async ({ page }) => {

    await page.goto(
      '/bookings/new?serviceId=123&serviceName=Bathing'
    );


    await page.getByRole('button', {
      name: 'Confirm Booking'
    }).click();


    // Form should stay on same page because required fields are empty
    await expect(page)
      .toHaveURL(/\/bookings\/new/);

  });


});