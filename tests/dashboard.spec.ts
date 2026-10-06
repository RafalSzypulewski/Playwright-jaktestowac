import { test, expect } from '@playwright/test';

test.describe('Dashboard access', () => {
    test('unauthenticated user sees login notice when opening dashboard', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();
        await expect(page.locator('#login-notice')).toHaveText('Please log in to view that page.');
    });

    test('admin sees admin panel after login', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill('admin');
        await page.getByTestId('login-password').fill('Admin123!');
        await page.getByTestId('login-submit').click();

        await expect(page.locator('#welcome')).toHaveText('Welcome, admin!');
        await expect(page.locator('#admin-panel')).toContainText('Admin panel');
        await expect(page.locator('#admin-panel')).toContainText('Only visible to the admin role.');
    });

    test('admin still sees admin panel when revisiting dashboard', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill('admin');
        await page.getByTestId('login-password').fill('Admin123!');
        await page.getByTestId('login-submit').click();

        await expect(page.locator('#welcome')).toHaveText('Welcome, admin!');
        await expect(page.locator('#admin-panel')).toContainText('Admin panel');
        await expect(page.locator('#admin-panel')).toContainText('Only visible to the admin role.');

        await page.locator('.brand').click();
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        await expect(page.locator('#welcome')).toHaveText('Welcome, admin!');
        await expect(page.locator('#admin-panel')).toContainText('Admin panel');
        await expect(page.locator('#admin-panel')).toContainText('Only visible to the admin role.');
    });

    test('student does not see admin panel', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill('student');
        await page.getByTestId('login-password').fill('Password123!');
        await page.getByTestId('login-submit').click();

        await expect(page.locator('#welcome')).toHaveText('Welcome, student!');
        await expect(page.locator('#admin-panel')).toBeHidden();

        await page.locator('.brand').click();
        await page.getByTestId('page-list').getByRole('link', { name: 'Dashboard' }).click();

        await expect(page.locator('#welcome')).toHaveText('Welcome, student!');
        await expect(page.locator('#admin-panel')).toBeHidden();
    });

    test('student can log out and sees logout notice', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
        await page.getByTestId('login-username').fill('student');
        await page.getByTestId('login-password').fill('Password123!');
        await page.getByTestId('login-submit').click();

        await page.locator('#logout').click();

        await expect(page.locator('#login-notice')).toHaveText('You have been logged out.');
    });
});
