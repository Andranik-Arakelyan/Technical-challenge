import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  protected readonly url = '/admin';

  public readonly loginForm = this.page.locator('//div[@class="card"]');
  private readonly usernameInput = this.loginForm.getByPlaceholder('Enter username');
  private readonly passwordInput = this.loginForm.getByPlaceholder('Password');
  private readonly loginButton = this.loginForm.getByRole('button', { name: 'Login' });
  public readonly errorMessage = this.loginForm.locator('.alert-danger');


  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    this.page.on('dialog', dialog => dialog.accept());
  }
}
