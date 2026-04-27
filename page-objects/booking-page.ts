import { BasePage } from "./base-page";

export class BookingPage extends BasePage {
    protected readonly url = '/reservation';
    private readonly nextMonthButton = this.page.getByRole('button', { name: 'Next' });
    private dayButton = (day: string) => this.page.getByRole('button', { name: day });
    private reserveNowButton = this.page.getByRole('button', { name: 'Reserve Now' });
    private firstNameInput = this.page.getByPlaceholder('Firstname');
    private lastNameInput = this.page.getByPlaceholder('Lastname');
    private emailInput = this.page.getByPlaceholder('Email');
    private phoneInput = this.page.getByPlaceholder('Phone');
    public readonly confirmationMessage = this.page.getByRole('heading', { name: 'Booking Confirmed' });

    // Here can be universal method to select any date, but for simplicity I will just select fixed days.
    private async selectDays() {
        await this.nextMonthButton.dblclick();
        await this.dayButton('11').dragTo(this.dayButton('14'), {steps: 10});
    }

    public async bookRoom(data: {firstname: string; lastname: string; email: string; phone: string}) {
        await this.selectDays();
        await this.reserveNowButton.click();
        await this.firstNameInput.fill(data.firstname);
        await this.lastNameInput.fill(data.lastname);
        await this.emailInput.fill(data.email);
        await this.phoneInput.fill(data.phone);
        await this.reserveNowButton.click();
    }
}