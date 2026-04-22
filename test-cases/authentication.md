### TC-AUTH-UI-01 · Login with valid credentials (UI)
| | |
|---|---|
| **Preconditions** | User is on `/admin` |
| **Steps** | 1. Enter username `admin` and password `password` <br> 2. Click Login |
| **Expected** | Redirected to admin panel; room management controls visible |
| **Automated** | `tests/ui/auth.ui.spec.ts` |

### TC-AUTH-UI-02 · Login with invalid credentials (UI)
| | |
|---|---|
| **Preconditions** | User is on `/admin` |
| **Steps** | 1. Enter username `wronguser` and password `wrongpassword` <br> 2. Click Login |
| **Expected** | Login page remains; "Invalid credentials" error message is displayed; admin panel not visible |
| **Automated** | `tests/ui/auth.ui.spec.ts` |

### TC-AUTH-UI-03 · Login with empty fields (UI)
| | |
|---|---|
| **Preconditions** | User is on `/admin` |
| **Steps** | 1. Leave username and password blank <br> 2. Click Login |
| **Expected** | Form does not submit; "Invalid credentials" error message is displayed; admin panel not visible 
| **Automated** | `tests/ui/auth.ui.spec.ts` |

### TC-AUTH-UI-04 · Admin logout (UI)
| | |
|---|---|
| **Preconditions** | Admin is logged in and on the admin panel |
| **Steps** | 1. Click Logout |
| **Expected** | Admin panel is no longer accessible; login form reappears |
| **Automated** | `tests/ui/auth.ui.spec.ts` |

---

### TC-AUTH-API-01 · Valid login returns token cookie (API)
| | |
|---|---|
| **Endpoint** | `POST /auth/login` |
| **Request body** | `{ "username": "admin", "password": "password" }` |
| **Expected** | Status `200`; response sets `token` cookie with non-empty value |
| **Automated** | `tests/api/auth.api.test.ts` |

### TC-AUTH-API-02 · Invalid credentials return 403 (API)
| | |
|---|---|
| **Endpoint** | `POST /auth/login` |
| **Request body** | `{ "username": "wronguser", "password": "wrongpassword" }` |
| **Expected** | Status `403`; no valid token cookie set |
| **Automated** | `tests/api/auth.api.test.ts` |

### TC-AUTH-API-03 · Empty password returns 403 (API)
| | |
|---|---|
| **Endpoint** | `POST /auth/login` |
| **Request body** | `{ "username": "admin", "password": "" }` |
| **Expected** | Status `403` |
| **Automated** | `tests/api/auth.api.test.ts` |

### TC-AUTH-API-04 · Empty username returns 403 (API)
| | |
|---|---|
| **Endpoint** | `POST /auth/login` |
| **Request body** | `{ "username": "", "password": "password" }` |
| **Expected** | Status `403` |
| **Automated** | `tests/api/auth.api.test.ts` |
