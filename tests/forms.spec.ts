import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.getByTestId('page-list').getByRole('link', { name: 'Forms' }).click();
});

test.describe('Forms page registration', () => {

    test('user can register with all valid data and sees the submitted JSON', async ({ page }) => {
        // Arrange
        const fullName = 'John Doe';
        const email = 'john.doe@example.com';
        const password = 'password123';
        const age = '30';
        const birthdate = '1989-03-01';
        const country = 'Poland';
        const expectedMessage = 'Registration successful!';
        const expectedMaskedPassword = '********';
        const expectedLanguage = '';
        const expectedCountryCode = 'pl';
        const expectedGender = 'personal';

        // Act
        await page.locator('#fullName').fill(fullName);
        await page.locator('#email').fill(email);
        await page.locator('#password').fill(password);
        await page.locator('#confirmPassword').fill(password);
        await page.locator('#age').fill(age);
        await page.getByTestId('birthdate').fill(birthdate);
        await page.locator('#country').selectOption(country);
        await page.locator('#gender-group input[value=personal]').click();
        await page.locator('#terms').check();
        await page.locator('#signup-form button[type=submit]').click();

        // Assert
        await expect(page.getByTestId('success-message')).toBeVisible();
        await expect(page.locator('#result > .success')).toHaveText(expectedMessage);
        const json = JSON.parse(await page.locator('#result-json').innerText());
        expect(json.fullName).toBe(fullName);
        expect(json.email).toBe(email);
        expect(json.password).toBe(expectedMaskedPassword);
        expect(json.password).not.toBe(password);
        expect(json.age).toBe(age);
        expect(json.birthdate).toBe(birthdate);
        expect(json.language).toBe(expectedLanguage);
        expect(json.country).toBe(expectedCountryCode);
        expect(json.gender).toBe(expectedGender);
        expect(json.terms).toBe(true);
    });

});
