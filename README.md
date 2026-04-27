# Restful Booker Platform — Test Framework

Automated UI and API test suite for [automationintesting.online](https://automationintesting.online), built with **Playwright** (UI) and **Jest** (API) in TypeScript.

---

## Requirements

- **Node.js** v18 or higher (native `fetch` is required for API clients)
- **npm** v9 or higher

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Andranik-Arakelyan/Technical-challenge.git
cd Technical-challenge

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

---

## Environment Variables

The framework reads configuration from a `.env` file in the project root. Create one before running tests, fill actual values in .env file

```bash
# .env
cp .env.example .env
```

`BASE_URL` is used by Playwright as the base for all `page.goto()` calls. The API clients also default to this URL.

---

## Project Structure

```
Technical-challenge/
├── api/                        # API client layer
│   ├── ApiClient.ts            # Base HTTP client with token storage
│   ├── AuthClient.ts           # Login / logout, token extraction
│   ├── RoomClient.ts           # /room endpoints
│   ├── BookingClient.ts        # /booking endpoints
│   └── ApiClientFactory.ts     # Wires all clients and shares token
├── fixtures/
│   └── test-data.ts            # Shared constants, payloads, date helpers
├── page-objects/               # Playwright Page Object Model
│   ├── login-page.ts
│   ├── admin-rooms-page.ts
│   ├── dashboard-page.ts
│   ├── booking-page.ts
│   └── admin-messages-page.ts
├── test-cases/                 # Test case documentation (Markdown)
├── tests/
│   ├── api/                    # Jest API tests (*.test.ts)
│   └── ui/                     # Playwright UI tests (*.spec.ts)
├── custom-test.ts              # Extended Playwright test with POM fixtures
├── jest.config.ts              # Jest configuration for API tests
├── playwright.config.ts        # Playwright configuration for UI tests
├── tsconfig.json
└── package.json
```

---

## Running Tests

### Run everything (API first, then UI)
```bash
npm run test:all
```

### API tests only
```bash
npm run test:api
```

### UI tests only
```bash
npm run test:ui
```

### UI tests with visible browser
```bash
npm run test:ui:headed
```

### View the Playwright HTML report
```bash
npm run test:ui:report
```

### Run by feature area
```bash
npm run test:auth       # Auth API + Auth UI
npm run test:rooms      # Rooms API + Rooms UI
npm run test:bookings   # Bookings API + Bookings UI
```

---

## API Client Layer (`api/`)

The framework provides a set of typed API clients that handle authentication automatically — you never pass a token manually to individual requests.

### How it works

`ApiClientFactory` creates all three clients and links them so that logging in via `AuthClient` propagates the token to `RoomClient` and `BookingClient` automatically.

```ts
import { ApiClientFactory } from './api/ApiClientFactory';

// One call — all clients are authenticated
const { auth, rooms, bookings } = await ApiClientFactory.createAuthenticated();

// Token is already stored — just call methods
const room  = await rooms.create({ roomName: 'Suite A', type: 'Suite', accessible: true, roomPrice: 200 });
const booking = await bookings.create({ roomid: room.data.roomid, ... });
await rooms.delete(room.data.roomid);
```

### Available clients

**`AuthClient`**
```ts
await auth.login(username, password);    // stores token internally
await auth.loginOrThrow();               // same, but throws on failure
auth.logout();                           // clears token
auth.isAuthenticated();                  // boolean
```

**`RoomClient`**
```ts
await rooms.getAll();           // GET /room/ — public
await rooms.create(payload);    // POST /room/ — requires token
await rooms.delete(id);         // DELETE /room/{id} — requires token
```

**`BookingClient`**
```ts
await bookings.create(payload);     // POST /booking/ — requires token
```

---

## Page Objects (`page-objects/`)

UI tests use the Page Object Model pattern. Each page class encapsulates selectors and interactions for a single part of the application.

| Class | Covers |
|---|---|
| `LoginPage` | Admin login form |
| `AdminRoomsPage` | Room creation form and room list |
| `DashboardPage` | Admin dashboard / overview / public room listing|
| `BookingPage` | Booking widget |
| `AdminMessagesPage` | Admin messages panel |

### Custom test fixture (`custom-test.ts`)

To avoid instantiating page objects manually in every test, the framework extends Playwright's `test` with all page objects pre-wired as fixtures:

```ts
import { test } from '../../custom-test';

test('user can book a room', async ({ bookingPage, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(username, password);
  // loginPage and bookingPage are ready to use — no new BookingPage(page) needed
});
```

Import `test` from `custom-test.ts` instead of `@playwright/test` to get access to all fixtures.

---

## Writing New Tests

### API test

Create a file matching `tests/api/**/*.test.ts`:

```ts
import { describe, it, expect, beforeAll } from '@jest/globals';
import { ApiClientFactory } from '../../api/ApiClientFactory';

describe('My feature API', () => {
  let rooms: Awaited<ReturnType<typeof ApiClientFactory.createAuthenticated>>['rooms'];

  beforeAll(async () => {
    ({ rooms } = await ApiClientFactory.createAuthenticated());
  });

  it('creates a room', async () => {
    const res = await rooms.create({ roomName: 'Test', type: 'Single', accessible: false, roomPrice: 50 });
    expect(res.status).toBe(201);
  });
});
```

### UI test

Create a file matching `tests/ui/**/*.spec.ts` and import from `custom-test.ts`:

```ts
import { test } from '../../custom-test';
import { expect } from '@playwright/test';

test('admin can see the room list', async ({ adminRoomsPage }) => {
  await adminRoomsPage.goto();
  await expect(adminRoomsPage.roomList.first()).toBeVisible();
});
```

---

## Test Data (`fixtures/test-data.ts`)

Shared constants and payload factories used across all tests:

```ts
import { ADMIN_CREDENTIALS, NEW_ROOM, BOOKING_PAYLOAD, BOOKING_DATES } from './fixtures/test-data';

ADMIN_CREDENTIALS      // username and password
NEW_ROOM               // default room shape for creation tests
BOOKING_PAYLOAD(id)    // function — returns a booking payload for the given roomId
BOOKING_DATES          // { checkin: string, checkout: string } — 30 days from now
```

---

## Configuration

### Playwright (`playwright.config.ts`)

| Setting | Value |
|---|---|
| Test directory | `./tests/ui/` |
| Browser | Chromium |
| Workers (local) | 1 |
| Workers (CI) | 4 |
| Retries (CI) | 1 |
| Base URL | `process.env.BASE_URL` |
| Trace | Retained on failure |
| Reporter | HTML |

### Jest (`jest.config.ts`)

| Setting | Value |
|---|---|
| Preset | `ts-jest` |
| Test match | `**/tests/api/**/*.test.ts` |
| Timeout | 30 000 ms |
| Environment | Node |

---

> The sandbox at [automationintesting.online](https://automationintesting.online) resets to its default state about every **10 minutes**. Any rooms or bookings created during a test run will eventually be cleaned up automatically.
