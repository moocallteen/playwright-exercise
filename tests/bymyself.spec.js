const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
  ];

  test.describe('New Todo', () => {
    test('test run', async ({ page }) => {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');
 await newTodo.fill(TODO_ITEMS[0])
 await newTodo.press('Enter')
 // comment

    });
  });