import { test, expect } from "@playwright/test";

let baseUrl;
let firstname: string = "Test";
let age: number = 30;
let isStudent: boolean = false;

baseUrl =
  "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-7/index.html";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });

  await page.goto(baseUrl);
});

const selectors = {
  firstNameInput: `input[id="firstName"]`,
  ageInput: `input[id="age"]`,
  studentInput: `input[id="isStudent"]`,
  applyDataBtn: `button[id="applyData"]`,
};

test.describe("Variables declaration and Types", () => {
  test("Declarations and Types", async ({ page }) => {
    await page.fill(selectors.firstNameInput, firstname);
    await page.fill(selectors.ageInput, age.toString());
    await page.check(selectors.studentInput);
    await page.click(selectors.applyDataBtn);
    expect(await page.isChecked(selectors.studentInput)).toBe(true);
    expect(await page.textContent(`p[id="displayFirstName"]`)).toBe(firstname);
    expect(await page.textContent(`p[id="displayAge"]`)).toContain(
      age.toString()
    );
    expect(await page.textContent(`p[id="displayIsStudent"]`)).toBe("Yes");
  });
});

test.describe("Type Definitions and Declarations", () => {
  type User = {
    firstName: string;
    age: number;
    isStudent: boolean;
  };
  let user: User = {
    firstName: "Tester",
    age: 22,
    isStudent: true,
  };
  test("Type Def and Interfaces", async ({ page }) => {
    await page.fill(selectors.firstNameInput, user.firstName);
    await page.fill(selectors.ageInput, user.age.toString());
    await page.click(selectors.applyDataBtn);
    expect(await page.isChecked(selectors.studentInput)).toBe(false);
    expect(await page.textContent(`p[id="displayFirstName"]`)).toBe(user.firstName);
    expect(await page.textContent(`p[id="displayAge"]`)).toContain(
      user.age.toString()
    );
    expect(await page.textContent(`p[id="displayIsStudent"]`)).toBe("No");
  });
});
