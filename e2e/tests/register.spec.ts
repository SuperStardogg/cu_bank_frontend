import { test, expect } from '@playwright/test';

test.describe('register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/register');
  });

  test('TC1: register success', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).click();
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password:' }).click();
    await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
    await page.getByRole('textbox', { name: 'First Name:' }).click();
    await page.getByRole('textbox', { name: 'First Name:' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name:' }).click();
    await page.getByRole('textbox', { name: 'Last Name:' }).fill('Doe');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Register' }).click();
  });
});
