**Endpoint:** `POST /api/booking/`

---

### TC-BOOKING-API-01 · Create a booking successfully
| | |
|---|---|
| **Request body** | Valid payload with future checkin/checkout dates |
| **Expected status** | `201` |
| **Expected response** | Body contains `bookingid` > 0 |
| **Automated** | `tests/api/booking.api.test.ts` |

---

### TC-BOOKING-API-02 · Overlapping booking dates are rejected
| | |
|---|---|
| **Request body** | Same room and dates as an existing booking |
| **Expected status** | `409` |
| **Expected response** | `{ "error": "Failed to create booking" }` |
| **Automated** | `tests/api/booking.api.test.ts` |

---

### TC-BOOKING-API-03 · Checkout date before checkin date is rejected
| | |
|---|---|
| **Request body** | Valid payload with checkout date earlier than checkin date |
| **Expected status** | `409` |
| **Expected response** | `{ "error": "Failed to create booking" }` |
| **Automated** | `tests/api/booking.api.test.ts` |

---

### TC-BOOKING-API-04 · Booking in the past is rejected ⚠️ Known Bug
| | |
|---|---|
| **Request body** | Valid payload with checkin/checkout dates in the past |
| **Expected status** | `409` |
| **Expected response** | `{ "error": "Failed to create booking" }` |
| **Automated** | `tests/api/booking.api.test.ts` |
| **Status** | ❌ **Failing** — API currently allows past-date bookings. Test is kept for when the bug is fixed. |

---

### TC-BOOKING-UI-01 · Make Booking (UI)
| | |
|---|---|
| **Preconditions** | User is on dashboard page |
| **Steps** | 1. Choose one room, go to booking page, choose date from future and book |
| **Expected** | Booking Confirmed message displayed, admin receives message about booking|
| **Automated** | `tests/ui/booking.ui.spec.ts` |

