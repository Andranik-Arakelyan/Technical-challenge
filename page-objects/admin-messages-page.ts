import { BasePage } from "./base-page";

export class AdminMessagesPage extends BasePage {
    protected readonly url = '/admin/messages';

    private readonly messageByBooker = (bookerName: string) => this.page.locator('.row').filter({ hasText: bookerName });
    private readonly messageFrom = this.page.locator('p').filter({ hasText: 'From:' });
    private readonly phone = this.page.locator('p').filter({ hasText: 'Phone:' });
    private readonly email = this.page.locator('p').filter({ hasText: 'Email:' });
    private readonly closeMessageButton = this.page.getByRole('button', { name: 'Close' });
    

    public async getBookingData(bookerName: string): Promise<{firstname: string; lastname: string; email: string; phone: string;  }> {
        await this.messageByBooker(bookerName).click();
        const messageFrom = await this.messageFrom.textContent() || '';
        const phoneText = await this.phone.textContent() || '';
        const emailText = await this.email.textContent() || '';
        const [_,firstname, lastname] = messageFrom.split(' ');
        const [__, phone] = phoneText?.split(' ');
        const [___, email] = emailText?.split(' ');
        await this.closeMessageButton.click();
        return {
            firstname,
            lastname,   
            email,
            phone,
        }
    }

    public async deleteMessage(bookerName: string) {
        await this.messageByBooker(bookerName).locator('[data-testid*="DeleteMessage"]').click();
    }
}