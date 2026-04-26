import { test as base } from '@playwright/test';
import { LoginPage } from './page-objects/login-page';
import { AdminRoomsPage } from './page-objects/admin-rooms-page';
import { DashboardPage } from './page-objects/dashboard-page';

const test = base.extend<{ loginPage: LoginPage, adminRoomsPage: AdminRoomsPage, dashboardPage: DashboardPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  adminRoomsPage: async ({ page }, use) => {
    const adminRoomsPage = new AdminRoomsPage(page);
    await use(adminRoomsPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  }
});

export { test };