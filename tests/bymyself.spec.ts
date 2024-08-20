// import test from "node:test";
import test from "playwright/test";

// const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  // await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test.describe("New Todo", () => { 
  test.skip("test run", async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder("What needs to be done?");
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");
  });
});

test.describe("GitLab page tests", () => {
  test("Basic Navigation", async ({ page }) => {
    await page.goto("https://gitlab.com/");
    await page.waitForTimeout(3000);
    await page.reload();
  });

  test("Interacting with Web Element on Gitlab", async ({ page }) => {
    await page.goto("https://gitlab.com/");

    await page.click(`button[id="onetrust-accept-btn-handler"]`);
    await page.waitForTimeout(3000);
    await page.click(`a[name="Get free trial"]`);

    // or
    // await page
    //   .locator(`div[id="be-navigation-desktop"]`)
    //   .getByRole(`link`, { name: " Get free trial " });
    await page.waitForTimeout(3000);

    // await page
    //   .locator(`input[data-testid="new-user-first-name-field"]`)
    //   .fill("Test0001");
    // await page
    //   .locator(`input[data-testid="new-user-last-name-field"]`)
    //   .fill("OOO1Testing");
    // or

    await page.getByTestId(`new-user-first-name-field`).fill("Test0001");
    await page.getByTestId(`new-user-last-name-field`).fill("OOO1Testing");
  });

  test("Using Various Locator Methods", async ({ page }) => {
    await page.setViewportSize({
      width: 640,
      height: 480,
    });
    await page.goto("https://gitlab.com/");
    await page.click(`button[id="onetrust-accept-btn-handler"]`);
    await page.getByRole(`button`, {name: "Main menu"}).click();
    await page.getByRole(`link`, {name: "Sign in"}).click();
  });

  test("Sign in from the main page", async ({ page }) => {
    await page.goto("https://gitlab.com/");
    await page.click(`button[id="onetrust-accept-btn-handler"]`);
    await page.click(`:has-text("Sign in")`);
    await page.waitForTimeout(3000);
  });

});

