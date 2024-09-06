import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });

  await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test.describe("Interacting With Forms", () => {
  test("Create new ToDos", async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");

    await newTodo.fill(TODO_ITEMS[0]);

    await newTodo.press("Enter");

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await page.waitForTimeout(3000);
  });

  test("Check created ToDos", async ({ page }) => {
    const newTodo = page.getByPlaceholder("What needs to be done?");
    await newTodo.clear();
    await newTodo.fill(TODO_ITEMS[0]);

    await newTodo.press("Enter");

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");
    await page.waitForTimeout(3000);

    const firstTodo = page.getByTestId(`todo-item`).nth(0);
    await firstTodo.getByRole(`checkbox`).check();
    await expect(firstTodo).toHaveClass(`completed`);
    const secondTodo = page.getByTestId(`todo-item`).nth(1);
    await expect(secondTodo).not.toHaveClass(`completed`);
  });

  test("Handling Form", async ({ page }) => {
    const placeholder = `[placeholder="What needs to be done?"]`;

    await page.fill(placeholder, TODO_ITEMS[2]);
    await page.locator(placeholder).press("Enter");

    const checkbox = page.locator(`input[class="toggle"]`);
    await checkbox.check();
    await page.waitForTimeout(3000);
  });
});
