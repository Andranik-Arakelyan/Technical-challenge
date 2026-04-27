import { BasePage } from "./base-page";

export class DashboardPage extends BasePage {
    protected readonly url = '/';

    public readonly welcomeMessage = this.page.getByRole('heading', { name: 'Welcome to Shady Meadows B&B' });
    private readonly firstRoomCard = this.page.locator('.room-card').first();
    readonly firstRoomLink = this.firstRoomCard.getByRole('link', { name: 'Book now' });

    async chooseRoom() {
        await this.firstRoomLink.click();
    }
}
