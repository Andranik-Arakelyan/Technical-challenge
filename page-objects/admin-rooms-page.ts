import { RoomPayload } from "../api/RoomClient";
import { BasePage } from "./base-page";

export class AdminRoomsPage extends BasePage {
    protected readonly url = '/admin/rooms';

    private readonly logoutButton = this.page.getByRole('button', { name: 'Logout' });
    public readonly navbar = this.page.getByRole('navigation').filter({ hasText: 'Restful Booker Platform DemoRooms' });
    private readonly roomNameInput = this.page.locator('[data-testid="roomName"]');
    private readonly roomTypeSelect = this.page.locator('#type');
    private readonly accessibleSelect = this.page.locator('#accessible');
    private readonly roomPriceInput = this.page.locator('#roomPrice');
    private readonly createRoomButton = this.page.getByRole('button', { name: 'Create' });
    public readonly errorMessage = this.page.locator('.alert-danger');
    public readonly roomList = this.page.getByTestId('roomlisting');;
    public readonly roomByName = (name: string) => this.roomList.filter({ hasText: name});

    async logout() {
        await this.logoutButton.click();
    }

    async addNewRoom(roomData: RoomPayload) {
        await this.roomNameInput.fill(roomData.roomName);
        await this.roomTypeSelect.selectOption(roomData.type);
        await this.accessibleSelect.selectOption(roomData.accessible.toString());
        await this.roomPriceInput.fill(roomData.roomPrice.toString());
        for(const feature of roomData.features || []) {
            await this.page.getByRole('checkbox', { name: feature }).check();
        }
        await this.createRoomButton.click();
    }
}