import { test, expect } from '@playwright/test';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('TC12: Login with non-numeric account number', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('ABC1234567');
    await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'Your account ID should contain numbers only.'
    );
  });

  test('TC13: Login with account number less than 10 digits', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('123456789');
    await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'Your account ID must be exactly 10 digits long.'
    );
  });

  test('TC14: Login with account number more than 10 digits', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('12345678901');
    await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'Your account ID must be exactly 10 digits long.'
    );
  });

  test('TC15: Login with non-existent account', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('9876543210');
    await page.getByRole('textbox', { name: 'Password:' }).fill('1234');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'User not found. Please check your account ID.'
    );
  });

  test('TC16: Login with non-numeric password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password:' }).fill('ABCD');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText('Your password should contain numbers only.');
  });

  test('TC17: Login with password less than 4 digits', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password:' }).fill('123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'Your password must be exactly 4 digits long.'
    );
  });

  test('TC18: Login with password more than 4 digits', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password:' }).fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText(
      'Your password must be exactly 4 digits long.'
    );
  });

  test('TC19: Login with wrong password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Account Number:' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Password:' }).fill('5678');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('form')).toContainText('Incorrect password. Please try again.');
  });
});
