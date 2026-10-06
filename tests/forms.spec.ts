import { test, expect } from '@playwright/test';


test.describe('Forms page registration', () => {


    test('user can register with all valid data and sees the submitted JSON', async ({ page }) => {
        await page.goto('https://rafalszypulewski.github.io/TrainingWebsite/');
        await page.getByTestId('page-list').getByRole('link', { name: 'Forms' }).click();

        await page.locator('#fullName').fill('John Doe');
        await page.locator('#email').fill('john.doe@example.com');
        await page.locator('#password').fill('password123');
        await page.locator('#confirmPassword').fill('password123');
        await page.locator('#age').fill('30');
        await page.getByTestId('birthdate').fill('1989-03-01');
        await page.locator('#country').selectOption('Poland');
        await page.locator('#gender-group input[value=personal]').click();
        await page.locator('#terms').check();
        await page.locator('#signup-form button[type=submit]').click();

        await expect(page.getByTestId('success-message')).toBeVisible();
        await expect(page.locator('#result > .success')).toHaveText('Registration successful!');
        const json = JSON.parse(await page.locator('#result-json').innerText());
        expect(json.fullName).toBe('John Doe');
        expect(json.email).toBe('john.doe@example.com');
        expect(json.password).toBe('********');
        expect(json.password).not.toBe('password123');
        expect(json.age).toBe('30');
        expect(json.birthdate).toBe('1989-03-01');
        expect(json.language).toBe('');
        expect(json.country).toBe('pl');
        expect(json.gender).toBe('personal');
        expect(json.terms).toBe(true);

    });

});