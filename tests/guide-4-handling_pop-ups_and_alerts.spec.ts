import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  await page.goto(
    "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-4-files/index.html"
  );
});

test.describe("Pop-ups tests", () => {
  let alertMessage;
  test("Handling alerts", async ({ page }) => {
    await page.on(`dialog`, async (dialog) => {
      expect(dialog.type()).toBe(`alert`);
      alertMessage = await dialog.message();
      await dialog.accept();
    });
    await page.click(`button[id="show-alert"]`);
    await page.waitForTimeout(3000);
    expect(alertMessage).toBe("This is a simple alert.");
  });

  test("Confirm alert", async ({ page }) => {
    await page.on(`dialog`, async (dialog) => {
      alertMessage = await dialog.message();
      await page.waitForTimeout(3000);
      await dialog.dismiss();
    });
    await page.click(`button[id="show-confirm"]`);
    await page.waitForTimeout(3000);
    expect(alertMessage).toBe("You clicked Cancel.");
  });

  test("Handling Pop-ups", async ({ page }) => {
    const [popup] = await Promise.all([
      page.waitForEvent(`popup`),
      page.click(`button[id="open-popup"]`),
    ]);
    await page.waitForLoadState();

// if(popup.url() === "example url"){

// }

    await popup.close();
  });
});
