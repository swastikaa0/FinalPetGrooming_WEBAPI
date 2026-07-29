import { test, expect } from "@playwright/test";

test.describe("Appointment Page", () => {

  test("user can view bookings page", async ({ page }) => {

    await page.goto("/bookings");

    await expect(
      page.getByRole("heading", {
        name: "My Bookings",
      })
    ).toBeVisible();

    await expect(
      page.getByText("View your upcoming and previous appointments.")
    ).toBeVisible();

  });

  test("user can see appointment sections", async ({ page }) => {

    await page.goto("/bookings");

    await expect(
      page.getByRole("heading", {
        name: "Upcoming Appointments",
      })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Previous Appointments",
      })
    ).toBeVisible();

  });



  

  test("user can open booking details", async ({ page }) => {

    await page.goto("/bookings");

    const viewButton = page.getByRole("button", {
      name: "View",
    });

    if (await viewButton.count() > 0) {

      await viewButton.first().click();

      await expect(page).toHaveURL(/\/bookings\/view\//);

    }

  });

  test("user can open reschedule page", async ({ page }) => {

    await page.goto("/bookings");

    const rescheduleButton = page.getByRole("button", {
      name: "Reschedule",
    });

    if (await rescheduleButton.count() > 0) {

      await rescheduleButton.first().click();

      await expect(page).toHaveURL(/\/bookings\/edit\//);

    }

  });

  test("user can cancel booking", async ({ page }) => {

    await page.goto("/bookings");

    const cancelButton = page.getByRole("button", {
      name: "Cancel",
    });

    if (await cancelButton.count() > 0) {

      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          "Are you sure you want to cancel"
        );
        await dialog.accept();
      });

      await cancelButton.first().click();

    }

  });

});