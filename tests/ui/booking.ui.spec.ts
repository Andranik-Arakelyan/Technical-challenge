import { expect,  } from '@playwright/test';
import { ADMIN_CREDENTIALS, BOOKING_DATA } from '../../fixtures/test-data';
import { test } from '../../custom-test';

test.describe('Room Booking UI', () => {
  test('TC-BOOKING-UI-01: Successful Room booking', async ({ page, dashboardPage, bookingPage, loginPage, adminRoomsPage, adminMessagesPage }) => {
    await dashboardPage.goto();
    await dashboardPage.chooseRoom();
    await bookingPage.bookRoom(BOOKING_DATA);
    
    await expect(bookingPage.confirmationMessage).toBeVisible();

    await loginPage.goto();
    await loginPage.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
    await adminRoomsPage.clickMessagesLink();

    const bookingData = await adminMessagesPage.getBookingData(BOOKING_DATA.firstname);
    expect(bookingData).toEqual(BOOKING_DATA);
    await adminMessagesPage.deleteMessage(BOOKING_DATA.firstname);
  })
});
