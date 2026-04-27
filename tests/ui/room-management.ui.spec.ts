import { expect, Locator } from '@playwright/test';
import { ADMIN_CREDENTIALS, NEW_ROOM } from '../../fixtures/test-data';
import { test } from '../../custom-test';

test.describe('Room Management UI', () => {
  test('TC-ROOM-UI-01, TC-ROOM-UI-02, TC-ROOM-UI-03: Room creation', async ({ page, loginPage, adminRoomsPage }) => {
    let createdRoom: Locator;

    await test.step('TC-ROOM-UI-01: Login with valid credentials', async () => {
        await loginPage.goto();
        await loginPage.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
        await expect(page).toHaveURL(/\/admin\/rooms$/);
    });

    await test.step('TC-ROOM-UI-02: Create a new room without name', async () => {
        await adminRoomsPage.addNewRoom({...NEW_ROOM, roomName: ''}); 
        await expect(adminRoomsPage.errorMessage).toBeVisible();
        await expect(adminRoomsPage.errorMessage).toHaveText('Room name must be set');
        await expect(adminRoomsPage.roomByName(NEW_ROOM.roomName)).toBeHidden();
    });

    await test.step('TC-ROOM-UI-03: Create a new room with valid data', async () => {
        await adminRoomsPage.addNewRoom(NEW_ROOM);
        createdRoom = adminRoomsPage.roomByName(NEW_ROOM.roomName);
        await expect(createdRoom).toBeVisible();
    });

    await test.step('TC-ROOM-UI-0: Delete created room', async () => {
        await createdRoom.locator('.roomDelete').click();
        await expect(createdRoom).toBeHidden();
    });
  })
});
