import { test, expect } from "@playwright/test";

let baseUrl, firstNameText, lastNameText, addressText, numberValue, errorMessage, userDataSection;

baseUrl =
  "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-6/index.html";

const testData = {
  firstName: "Test",
  lastName: "Tester",
  address: "Daisy Street",
  number: "1413121110",
};

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });

  await page.goto(baseUrl);
});

test.describe("User registration tests", () => {
  test("Register with valid data", async ({ page }) => {
    await page.fill(`input[id="firstName"]`, testData.firstName);
    await page.fill(`input[id="lastName"]`, testData.lastName);
    await page.fill(`input[id="address"]`, testData.address);
    await page.fill(`input[id="number"]`, testData.number);
    await page.click(`button[id="register"]`);

    firstNameText = await page
      .locator(`span[id="displayFirstName"]`)
      .textContent();
    lastNameText = await page
      .locator(`span[id="displayLastName"]`)
      .textContent();
    addressText = await page.locator(`span[id="displayAddress"]`).textContent();
    numberValue = await page.locator(`span[id="displayNumber"]`).textContent();

    await expect(firstNameText).toEqual(testData.firstName);
    await expect(lastNameText).toEqual(testData.lastName);
    await expect(addressText).toEqual(testData.address);
    await expect(numberValue).toEqual(testData.number);
  });

  test("Register some empty fields", async ({ page }) => {
    await page.fill(`input[id="firstName"]`, testData.firstName);
    await page.fill(`input[id="lastName"]`, testData.lastName);
    await page.click(`button[id="register"]`);
    errorMessage = await page.locator(`div[id="error"] p`).textContent();
    expect(errorMessage).toBe("Please fill in all fields.");
  });

  test("Register all empty fields", async ({ page }) => {
    await page.click(`button[id="register"]`);
    errorMessage = await page.locator(`div[id="error"] p`).textContent();
    expect(errorMessage).toBe("Please fill in all fields.");
    userDataSection = await page.locator(`div[id="userData"]`);
    expect(userDataSection).not.toContain("Registered Data");
  });
});
