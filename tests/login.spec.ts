import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login for TrainingWebsite', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });



  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const username = loginData.validStudentCredentials.username;
    const password = loginData.validStudentCredentials.password;

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    // Assert
    await expect(page.getByTestId('nav-user')).toBeVisible();
    await expect(page.getByTestId('nav-user')).toContainText(username);
  });

  test('unsucessful login with incorrect credentials (incorrect username)', async ({ page }) => {
    // Arrange
    const incorrectUsername = loginData.invalidCredentials.incorrectUsername;
    const incorrectPassword = loginData.invalidCredentials.incorrectPassword;
    const expectedError = 'Invalid username or password';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.login(incorrectUsername, incorrectPassword);

    // Assert
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page.getByTestId('login-error')).toContainText(expectedError);
  });

  test('unsucessful login with incorrect credentials (incorrect password)', async ({ page }) => {
    // Arrange
    const username = loginData.validStudentCredentials.username;
    const incorrectPassword = loginData.invalidCredentials.incorrectPassword;
    const expectedError = 'Invalid username or password';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.login(username, incorrectPassword);

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
    const loginPage = new LoginPage(page);
    await loginPage.login(emptyUsername, emptyPassword);

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
    const loginPage = new LoginPage(page);
    await loginPage.fillUsernameAndBlur(emptyUsername);

    // Assert
    await expect(page.locator('#username-error')).toBeVisible();
    await expect(page.locator('#username-error')).toContainText(expectedUsernameError);

    // Act - blur empty password
    await loginPage.fillPasswordAndBlur(emptyPassword);

    // Assert
    await expect(page.locator('#password-error')).toBeVisible();
    await expect(page.locator('#password-error')).toContainText(expectedPasswordError);

    // Act - fill both fields with valid values and blur them
    await loginPage.fillUsernameAndBlur(validUsername);
    await loginPage.fillPasswordAndBlur(validPassword);

    // Assert
    await expect(page.locator('#username-error')).toBeHidden();
    await expect(page.locator('#password-error')).toBeHidden();
  });

});
