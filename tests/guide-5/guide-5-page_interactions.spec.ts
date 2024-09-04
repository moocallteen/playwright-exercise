import { test, expect } from "@playwright/test";
let cookies, sessionCookie, baseUrl;

baseUrl =
  "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-5/index.html";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });

  await page.goto(baseUrl);
});

test.describe("Return to previous page", () => {
  test("Open new window and navigate back", async ({ context, page }) => {
    let pagePromise, newPage;
    pagePromise = context.waitForEvent("page");
    await page.click(`button[id="openNewWindow"]`);
    newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log(await newPage.title());
    await expect(
      newPage.getByRole("heading", { name: "Welcome to the New Page" })
    ).toBeVisible();
    await expect(newPage.locator(`img[class="cat-image"]`)).toBeVisible();
    await expect(
      newPage.getByRole("button", { name: "Back to Main Page" })
    ).toBeVisible();
  });
});

test.describe("Cookies actions", () => {
  test("Set cookies", async ({ page }) => {
    await page.click(`button[id="setCookie"]`);
    cookies = await page.context().cookies(baseUrl);
    sessionCookie = cookies.find((cookies) => cookies.name === "session");
    console.log("Session cookie", sessionCookie);
    // await expect(sessionCookie).toBeDefined();
  });

  test("Clean cookies", async ({ page }) => {
    await page.click(`button[id="setCookie"]`);
    cookies = await page.context().cookies(baseUrl);
    sessionCookie = cookies.find((cookies) => cookies.name === "session");
    console.log("Session cookie", sessionCookie);
    await page.click(`button[id="deleteCookie"]`, {force: true});
    await page.waitForTimeout(1000)
    console.log("Session cookie", sessionCookie);
    await expect(sessionCookie).toBeUndefined();
  });
});
