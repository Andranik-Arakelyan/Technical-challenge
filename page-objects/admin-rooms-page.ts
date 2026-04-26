import { BasePage } from "./base-page";

export class AdminRoomsPage extends BasePage {
    protected readonly url = '/admin/rooms';
    private readonly logoutButton = this.page.getByRole('button', { name: 'Logout' });

    public readonly navbar = this.page.getByRole('navigation').filter({ hasText: 'Restful Booker Platform Demo' });

    async logout() {
        await this.logoutButton.click();
    }
}