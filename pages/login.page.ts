import { Page } from '@playwright/test';

export class LoginPage {
    readonly username;
    readonly password;
    readonly submit;
    readonly error;
    readonly usernameError;
    readonly passwordError;

    constructor(private page: Page) {
        this.username = this.page.getByTestId('login-username');
        this.password = this.page.getByTestId('login-password');
        this.submit = this.page.getByTestId('login-submit');
        this.error = this.page.getByTestId('login-error');
        this.usernameError = this.page.locator('#username-error');
        this.passwordError = this.page.locator('#password-error');

    }

    async open() {
        await this.page.goto('');
        await this.page.getByTestId('page-list').getByRole('link', { name: 'Login' }).click();
    }
    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.submit.click();
    }
    async fillUsernameAndBlur(user: string) {
        await this.username.fill(user);
        await this.username.blur();
    }
    async fillPasswordAndBlur(pass: string) {
        await this.password.fill(pass);
        await this.password.blur();
    }

}
