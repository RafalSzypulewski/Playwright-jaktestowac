import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
  await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill('student');
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').fill('Password123!');
  await page.getByTestId('login-submit').click();
  await page.getByTestId('nav-user').click();

  await expect(page.getByTestId('nav-user')).toContainText('student');
});