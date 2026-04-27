import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { AdminRoomsPage } from './page-objects/admin-rooms-page';
import { DashboardPage } from './page-objects/dashboard-page';
import { BookingPage } from './page-objects/booking-page';
import { AdminMessagesPage } from './page-objects/admin-messages-page';

type TestFixtures = {
  loginPage: LoginPage;
  adminRoomsPage: AdminRoomsPage;
  dashboardPage: DashboardPage;
  bookingPage: BookingPage;
  adminMessagesPage: AdminMessagesPage;
};

const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  adminRoomsPage: async ({ page }, use) => {
    const adminRoomsPage = new AdminRoomsPage(page);
    await use(adminRoomsPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    await use(bookingPage);
  },
  adminMessagesPage: async ({ page }, use) => {
    const adminMessagesPage = new AdminMessagesPage(page);
    await use(adminMessagesPage);
  },
});

export { test };