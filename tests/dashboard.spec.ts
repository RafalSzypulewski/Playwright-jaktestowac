import { test, expect } from '@playwright/test';

test.describe('Dashboard access', () => {

    test('unauthenticated user sees login notice when opening dashboard', async ({ page }) => {
        // Arrange
        const expectedNotice = 'Please log in to view that page.';
        await page.goto('');

        // Act
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        // Assert
        await expect(page.locator('#login-notice')).toHaveText(expectedNotice);
    });

    test('admin sees admin panel after login', async ({ page }) => {
        // Arrange
        const username = 'admin';
        const password = 'Admin123!';
        const expectedWelcome = 'Welcome, admin!';
        const expectedPanelTitle = 'Admin panel';
        const expectedPanelText = 'Only visible to the admin role.';
        await page.goto('');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();

        // Act
        await page.getByTestId('login-username').fill(username);
        await page.getByTestId('login-password').fill(password);
        await page.getByTestId('login-submit').click();

        // Assert
        await expect(page.locator('#welcome')).toHaveText(expectedWelcome);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelTitle);
        await expect(page.locator('#admin-panel')).toContainText(expectedPanelText);
    });

    test('admin still sees admin panel when revisiting dashboard', async ({ page }) => {
        // Arrange - log in as admin and confirm the dashboard is shown
        const username = 'admin';
        const password = 'Admin123!';
        const expectedWelcome = 'Welcome, admin!';
        const expectedPanelTitle = 'Admin panel';
        const expectedPanelText = 'Only visible to the admin role.';
        await page.goto('');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill(username);
        await page.getByTestId('login-password').fill(password);
        await page.getByTestId('login-submit').click();
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
        const username = 'student';
        const password = 'Password123!';
        const expectedWelcome = 'Welcome, student!';
        await page.goto('');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill(username);
        await page.getByTestId('login-password').fill(password);
        await page.getByTestId('login-submit').click();
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
        const username = 'student';
        const password = 'Password123!';
        const expectedNotice = 'You have been logged out.';
        await page.goto('');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill(username);
        await page.getByTestId('login-password').fill(password);
        await page.getByTestId('login-submit').click();

        // Act
        await page.locator('#logout').click();

        // Assert
        await expect(page.locator('#login-notice')).toHaveText(expectedNotice);
    });
});
