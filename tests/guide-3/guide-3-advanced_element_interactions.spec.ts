import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });

  await page.goto(
    "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-3/index.html"
  );
});

test.describe("Click actions", () => {
  test("Hover the button", async ({ page }) => {
    await page.hover(`button[id="hover-me"]`);
    expect(await page.textContent(`button[id="hover-me"]`)).toContain(
      "Text Changed!"
    );
  });

  test("Right click the button", async ({ page }) => {
    await page.click(`button[id="context-menu"]`, { button: "right" });
    expect(
      await page.getByText("Context Menu Appears!").textContent()
    ).toContain("Context Menu Appears!");
  });

  test("Double click the button", async ({ page }) => {
    await page.dblclick(`button[id="double-click"]`);
    expect(await page.locator(`img`).count()).toBe(1);
  });
});

test.describe("Drag n Drop", () => {
  test("Basic drag n drop action", async ({ page }) => {
    await page.dragAndDrop(
      `div[class="drag-source"]`,
      `div[class="drop-target"]`
    );
    expect(await page.textContent(`div[class="drop-target"]`)).toContain(
      "Success"
    );
    await page.waitForTimeout(3000);
  });

  test("Workaround drag n drop action", async ({ page }) => {
    await page.locator(`div[class="drag-source"]`).hover();
    await page.mouse.down();
    await page.locator(`div[class="drop-target"]`).hover();
    await page.mouse.up();
    expect(await page.textContent(`div[class="drop-target"]`)).toContain(
      "Success"
    );
    await page.waitForTimeout(3000);
  });
});

test.describe("Handling iframe", () => {
  test("Conditionally fill iframe input", async ({ page }) => {
    const iframeElement = page.frame({ name: "iframeName" });
    const inputSelector = `input[id="iframe-input"]`;

    if (iframeElement) {
      await iframeElement.type(inputSelector, "Hello, Playwright!");
      expect(await iframeElement.locator(inputSelector).inputValue()).toContain(
        "Hello, Playwright!"
      );
    } else {
      console.error("iframe isn't available!");
    }
  });
});
