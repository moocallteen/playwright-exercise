import { test, expect } from "@playwright/test";
import { PageObject } from "./page/Page";
import * as testData from "./testData.json";

let baseUrl =
  "file:///Users/dmitrykukarin/Documents/AQA-files/play-playwright/tests/guide-7/index.html";
let pageObject: PageObject;
let firstNameValue = "TestiTestinTesting";
let ageValue = "27";
let isStudentStatusValue = "Yes";
let notStudentStatusValue = "No";

test.beforeEach(async ({ browser }) => {
  const page = await browser.newPage();
  pageObject = new PageObject(page);

  await page.setViewportSize({
    width: 1440,
    height: 900,
  });
  await pageObject.open(baseUrl);
});

test.describe("Page object approach usage", () => {
  test("Fill all inputs", async () => {
    await pageObject.fillFirstName(firstNameValue);
    await pageObject.fillAge(ageValue);
    await pageObject.checkIsStudent();
    await pageObject.applyData();

    expect(await pageObject.text(pageObject.displayFirstName)).toBe(
      firstNameValue
    );
    expect(await pageObject.text(pageObject.displayAge)).toBe(ageValue);
    expect(await pageObject.text(pageObject.displayStudentStatus)).toBe(
      isStudentStatusValue
    );
  });
});

test.describe("Test data usage", () => {
  for (const data of Object.values(testData)) {
    if (
      data.testName === "Positive Test 1 - Fill input" ||
      data.testName === "Negative Test 1 - Fill input"
    ) {
      test(data.testName, async () => {
        await pageObject.fillFirstName(data.userName);
        await pageObject.fillAge(data.userAge);
        if (data.isStudent) {
          await pageObject.checkIsStudent();
        }
        await pageObject.applyData();
        expect(await pageObject.text(pageObject.displayFirstName)).toBe(
          data.expectedUserName
        );
        expect(await pageObject.text(pageObject.displayAge)).toBe(
          data.expectedUserAge
        );
        console.log(data.expectedStudentStatus);
        expect(await pageObject.text(pageObject.displayStudentStatus)).toBe(
          data.expectedStudentStatus
        );
      });
    }
  }
});
