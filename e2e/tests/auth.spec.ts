import { test, expect } from '@playwright/test';

test('login > setup login token', async ({ page, context }) => {
  await page.goto(process.env.API_URL!);
  await page.getByRole('textbox', { name: 'Account Number:' }).fill(process.env.E2E_ACCOUNT!);
  await page.getByRole('textbox', { name: 'Password:' }).fill(process.env.E2E_PIN!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/account/);
  await context.storageState({ path: './e2e/storage/auth.json' });
});
