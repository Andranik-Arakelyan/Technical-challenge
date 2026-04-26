import { BasePage } from "./base-page";

export class DashboardPage  extends BasePage {
    protected readonly url = '/';

    public readonly welcomeMessage = this.page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' });
}
