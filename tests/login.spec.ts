import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login for TrainingWebsite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
  });



  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const username = loginData.validStudentCredentials.username;
    const password = loginData.validStudentCredentials.password;

    // Act
    await page.getByTestId('login-username').fill(username);
    await page.getByTestId('login-password').fill(password);
    await page.getByTestId('login-submit').click();

    // Assert
    await expect(page.getByTestId('nav-user')).toContainText(username);
  });

  test('unsucessful login with incorrect credentials (incorrect username)', async ({ page }) => {
    // Arrange
    const incorrectUsername = loginData.invalidCredentials.incorrectUsername;
    const incorrectPassword = loginData.invalidCredentials.incorrectPassword;
    const expectedError = 'Invalid username or password';

    // Act
    await page.getByTestId('login-username').fill(incorrectUsername);
    await page.getByTestId('login-password').fill(incorrectPassword);
    await page.getByTestId('login-submit').click();

    // Assert
    await expect(page.getByTestId('login-error')).toContainText(expectedError);
  });

  test('unsucessful login with incorrect credentials (incorrect password)', async ({ page }) => {
    // Arrange
    const username = loginData.validStudentCredentials.username;
    const incorrectPassword = loginData.invalidCredentials.incorrectPassword;
    const expectedError = 'Invalid username or password';

    // Act
    await page.getByTestId('login-username').fill(username);
    await page.getByTestId('login-password').fill(incorrectPassword);
    await page.getByTestId('login-submit').click();

    // Assert
    await expect(page.getByTestId('login-error')).toContainText(expectedError);
  });

  test('unsucessful login with incorrect credentials (empty username and password)', async ({ page }) => {
    // Arrange
    const emptyUsername = '';
    const emptyPassword = '';
    const expectedUsernameError = 'Username is required';
    const expectedPasswordError = 'Password is required';

    // Act
    await page.getByTestId('login-username').fill(emptyUsername);
    await page.getByTestId('login-password').fill(emptyPassword);
    await page.getByTestId('login-submit').click();

    // Assert
    await expect(page.locator('#username-error')).toContainText(expectedUsernameError);
    await expect(page.locator('#password-error')).toContainText(expectedPasswordError);
  });

  test('unsucessful login with incorrect credentials with blur(empty username and password)', async ({ page }) => {
    // Arrange
    const emptyUsername = '';
    const emptyPassword = '';
    const validUsername = loginData.validStudentCredentials.username;
    const validPassword = loginData.validStudentCredentials.password;
    const expectedUsernameError = 'Username is required';
    const expectedPasswordError = 'Password is required';

    // Act - blur empty username
    await page.getByTestId('login-username').fill(emptyUsername);
    await page.getByTestId('login-username').blur();

    // Assert
    await expect(page.locator('#username-error')).toBeVisible();
    await expect(page.locator('#username-error')).toContainText(expectedUsernameError);

    // Act - blur empty password
    await page.getByTestId('login-password').fill(emptyPassword);
    await page.getByTestId('login-password').blur();

    // Assert
    await expect(page.locator('#password-error')).toBeVisible();
    await expect(page.locator('#password-error')).toContainText(expectedPasswordError);

    // Act - fill both fields with valid values and blur them
    await page.getByTestId('login-username').fill(validUsername);
    await page.getByTestId('login-username').blur();
    await page.getByTestId('login-password').fill(validPassword);
    await page.getByTestId('login-password').blur();

    // Assert
    await expect(page.locator('#username-error')).toBeHidden();
    await expect(page.locator('#password-error')).toBeHidden();
  });

});
