### TC-ROOM-UI-01 · Create a room (UI)
| | |
|---|---|
| **Preconditions** | Admin is logged in |
| **Steps** | 1. Fill in Room Name, Type, Accessible, Price, optional features <br> 2. Click **Create** |
| **Expected** | New room row appears in the room listing with correct name |
| **Automated** | `tests/ui/rooms.ui.spec.ts` |

### TC-ROOM-UI-02 · Room creation fails with empty name (UI)
| | |
|---|---|
| **Preconditions** | Admin is logged in |
| **Steps** | 1. Leave Room Name blank <br> 2. Fill remaining fields <br> 3. Click **Create** |
| **Expected** | Validation error shown; no new room added to list |
| **Automated** | `tests/ui/rooms.ui.spec.ts` |

### TC-ROOM-UI-03 · Delete a room (UI)
| | |
|---|---|
| **Preconditions** | Admin is logged in; a room exists |
| **Steps** | 1. Locate the target room row <br> 2. Click **Delete** |
| **Expected** | Room row disappears from the listing |
| **Automated** | `tests/ui/rooms.ui.spec.ts` |

### TC-ROOM-UI-04 · Room details display correctly after creation (UI)
| | |
|---|---|
| **Preconditions** | Admin is logged in |
| **Steps** | 1. Create a room with type `Suite`, price `299`, accessible `true` |
| **Expected** | Room row shows `Suite`, `299`, and accessibility indicator |
| **Automated** | `tests/ui/rooms.ui.spec.ts` |

---

### TC-ROOM-API-01 · Create room returns 200 (API)
| | |
|---|---|
| **Endpoint** | `POST /api/room/` (with valid token cookie) |
| **Request body** | `{ roomName, type, accessible, roomPrice, features, image, description }` |
| **Expected** | Status `200`; response body is {"success": true} |
| **Automated** | `tests/api/rooms.api.test.ts` |

### TC-ROOM-API-02 · Created room appears in GET /room/ list (API)
| | |
|---|---|
| **Endpoint** | `GET /api/room/` |
| **Expected** | Status `200`; room array includes the room created in TC-ROOM-API-01 |
| **Automated** | `tests/api/rooms.api.test.ts` |

### TC-ROOM-API-03 · Unauthenticated create room returns 401 and fails
| | |
|---|---|
| **Endpoint** | `POST /api/room/` (no cookie) |
| **Expected** | Status `401`; response body is { errors: [ 'Authentication required' ] }  |
| **Automated** | `tests/api/rooms.api.test.ts` |

### TC-ROOM-API-04 · Delete room returns 202 and removes it (API)
| | |
|---|---|
| **Endpoint** | `DELETE /api/room/{id}` (with valid token cookie) |
| **Expected** | Status `202`; subsequent `GET /api/room/` does not contain the deleted room |
| **Automated** | `tests/api/rooms.api.test.ts` |

### TC-ROOM-API-05 · Unauthenticated delete room returns 403 and fails
| | |
|---|---|
| **Endpoint** | `DELETE /room/{id}` (no cookie) |
| **Expected** | Status `403` |
| **Automated** | `tests/api/rooms.api.test.ts` |
