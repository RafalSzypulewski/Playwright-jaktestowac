import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});



test.describe('Dashboard denied access', () => {
    test('unauthenticated user sees login notice when opening dashboard', async ({ page }) => {
        // Arrange
        const expectedNotice = 'Please log in to view that page.';

        // Act
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        // Assert
        await expect(page.locator('#login-notice')).toHaveText(expectedNotice);
    });

});

test.describe('Dashboard access', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
    });


    test('admin sees admin panel after login', async ({ page }) => {
        // Arrange
        const username = loginData.validAdminCredentials.username;
        const password = loginData.validAdminCredentials.password;
        const expectedWelcome = 'Welcome, admin!';
        const expectedPanelTitle = 'Admin panel';
        const expectedPanelText = 'Only visible to the admin role.';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);

        // Assert
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelTitle);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelText);
    });

    test('admin still sees admin panel when revisiting dashboard', async ({ page }) => {
        // Arrange - log in as admin and confirm the dashboard is shown
        const username = loginData.validAdminCredentials.username;
        const password = loginData.validAdminCredentials.password;
        const expectedWelcome = 'Welcome, admin!';
        const expectedPanelTitle = 'Admin panel';
        const expectedPanelText = 'Only visible to the admin role.';
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelTitle);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelText);

        // Act
        await page.locator('.brand').click();
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        // Assert
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelTitle);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelText);
    });

    test('student does not see admin panel', async ({ page }) => {
        // Arrange - log in as student and confirm the dashboard is shown
        const username = loginData.validStudentCredentials.username;
        const password = loginData.validStudentCredentials.password;
        const expectedWelcome = 'Welcome, student!';
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toBeHidden();

        // Act
        await page.locator('.brand').click();
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        // Assert
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toBeHidden();
    });

    test('student can log out and sees logout notice', async ({ page }) => {
        // Arrange
        const username = loginData.validStudentCredentials.username;
        const password = loginData.validStudentCredentials.password;
        const expectedNotice = 'You have been logged out.';
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);

        // Act
        await page.locator('#logout').click();

        // Assert
        await expect(page.locator('#login-notice')).toHaveText(expectedNotice);
    });
});
