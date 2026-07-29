import { test, expect } from '@playwright/test';


test.describe('Booking Summary Page', () => {


  const summaryURL =
    '/bookings/summary?' +
    'serviceId=6a67a6d5ba6cfb133eee9781' +
    '&serviceName=Bathing' +
    '&servicePrice=500' +
    '&serviceDuration=60' +
    '&ownerName=John%20Doe' +
    '&petName=Buddy' +
    '&phone=9812345678' +
    '&appointmentDate=2026-08-01' +
    '&appointmentTime=10:30' +
    '&notes=Friendly%20pet';



  test('user can view booking summary details', async ({ page }) => {


    await page.goto(summaryURL);



    await expect(
      page.getByRole('heading', {
        name: 'Booking Summary'
      })
    ).toBeVisible();



    await expect(
      page.getByText('John Doe')
    ).toBeVisible();



    await expect(
      page.getByText('Buddy')
    ).toBeVisible();



    await expect(
      page.getByText('Bathing')
    ).toBeVisible();



    await expect(
      page.getByText('Rs. 500', {
        exact: true
      })
    ).toBeVisible();


  });





  test('user can select cash payment', async ({ page }) => {


    await page.goto(summaryURL);



    const cashPayment =
      page.getByLabel('Cash Payment');



    await cashPayment.check();



    await expect(cashPayment)
      .toBeChecked();


  });





  test('user cannot continue without selecting payment method', async ({ page }) => {


    await page.goto(summaryURL);



    page.once('dialog', async dialog => {

      expect(dialog.message())
        .toBe('Please select a payment method.');

      await dialog.accept();

    });



    await page.getByRole('button', {
      name: 'Continue'
    }).click();



  });





  test('user can confirm cash payment booking', async ({ page }) => {


    await page.goto(summaryURL);



    await page.getByLabel('Cash Payment')
      .check();



    page.once('dialog', async dialog => {

      expect(dialog.message())
        .toContain('Booking confirmed');

      await dialog.accept();

    });



    await page.getByRole('button', {
      name: 'Continue'
    }).click();



    await page.waitForURL(/\/bookings$/, {
      timeout: 15000
    });



    expect(page.url())
      .toContain('/bookings');


  });





  test('user can select online payment option', async ({ page }) => {


  await page.goto(summaryURL);


  const onlinePayment =
    page.getByLabel('Online Payment');


  await onlinePayment.check();


  await expect(onlinePayment)
    .toBeChecked();


});


});