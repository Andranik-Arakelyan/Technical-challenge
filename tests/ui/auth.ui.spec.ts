import { expect } from '@playwright/test';
import { ADMIN_CREDENTIALS, INVALID_CREDENTIALS } from '../../fixtures/test-data';
import { test } from '../../custom-test';

// Also is possble to have one test with multiple steps for login/logout, but I prefer to have separate tests for better isolation and reporting.
test.describe('Authentication UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('TC-AUTH-UI-01: Login fails and shows error with invalid credentials', async ({ page, loginPage, adminRoomsPage }) => {
    await loginPage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);
    await expect(page).toHaveURL(/\/admin$/);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    await expect(loginPage.loginForm).toBeVisible();
    await expect(adminRoomsPage.navbar).toBeHidden();
  });

  test('TC-AUTH-UI-02: Login fails and shows error with empty fields', async ({ page, loginPage }) => {
    await loginPage.login('', '');
    await expect(page).toHaveURL(/\/admin$/);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    await expect(loginPage.loginForm).toBeVisible();
  });

  test('TC-AUTH-UI-03: Successfully logs in with valid credentials', async ({ page, loginPage, adminRoomsPage }) => {
    await loginPage.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
    await expect(page).toHaveURL(/\/admin\/rooms$/);
    await expect(loginPage.loginForm).toBeHidden();
    await expect(adminRoomsPage.navbar).toBeVisible();
  });

  test('TC-AUTH-UI-04: Successfully logs out', async ({ loginPage, adminRoomsPage, dashboardPage }) => {
    await loginPage.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
    await expect(adminRoomsPage.navbar).toBeVisible();
    await adminRoomsPage.logout();
    await expect(adminRoomsPage.navbar).toBeHidden();
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });
});
