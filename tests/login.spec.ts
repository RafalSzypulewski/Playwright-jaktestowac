import { test, expect } from '@playwright/test';


test.describe('User login for TrainingWebsite', () => {


  test('successful login with correct credentials', async ({ page }) => {
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

  test('unsucessful login with incorrect credentials (incorrect username)', async ({ page }) => {
    await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
    await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
    await page.getByTestId('login-username').click();
    await page.getByTestId('login-username').fill('incorrectUsername');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('Password123!');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toContainText('Invalid username or password');
  });

  test('unsucessful login with incorrect credentials (incorrect password)', async ({ page }) => {
    await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
    await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
    await page.getByTestId('login-username').click();
    await page.getByTestId('login-username').fill('student');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('incorrectPassword');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toContainText('Invalid username or password');
  });

  test('unsucessful login with incorrect credentials (empty username and password)', async ({ page }) => {
    await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
    await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
    await page.getByTestId('login-username').click();
    await page.getByTestId('login-username').fill('');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('');
    await page.getByTestId('login-submit').click();

    await expect(page.locator('#username-error')).toContainText('Username is required');
    await expect(page.locator('#password-error')).toContainText('Password is required');
  });

  test('unsucessful login with incorrect credentials with blur(empty username and password)', async ({ page }) => {
    await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
    await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
    await page.getByTestId('login-username').click();
    await page.getByTestId('login-username').fill('');
    await page.getByTestId('login-username').blur();
    await expect(page.locator('#username-error')).toContainText('Username is required');
    await page.getByTestId('login-password').click();
    await page.getByTestId('login-password').fill('');
    await page.getByTestId('login-password').blur();
    await expect(page.locator('#password-error')).toContainText('Password is required');


    await page.getByTestId('login-username').fill('qwerty');
    await page.getByTestId('login-username').blur();
    await page.getByTestId('login-password').fill('password');
    await page.getByTestId('login-password').blur();
    await expect(page.locator('#username-error')).toBeHidden();
    await expect(page.locator('#password-error')).toBeHidden();
  });

});