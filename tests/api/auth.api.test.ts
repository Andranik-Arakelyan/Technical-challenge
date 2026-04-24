import { describe, it, expect } from '@jest/globals';
import { ADMIN_CREDENTIALS, INVALID_CREDENTIALS } from '../../fixtures/test-data';
import { AuthClient } from '../../api/AuthClient';

describe('Authentication API', () => {
  let api: AuthClient;
  beforeEach(() => {
    api = new AuthClient();
  })

  it('TC-AUTH-API-01: POST /api/auth/login returns 200 and token cookie with valid credentials', async () => {    
    const res = await api.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
    
    expect(res.status).toBe(200);
    expect(res.data.token).toBeTruthy();
  });

  it('TC-AUTH-API-02: POST /api/auth/login returns 401 and error message with invalid credentials', async () => {
    const res = await api.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });

  it('TC-AUTH-API-03: POST /api/auth/login returns 401 when password is empty', async () => {
    const res = await api.login(ADMIN_CREDENTIALS.username, '');

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });

  it('TC-AUTH-API-04: POST /api/auth/login returns 401 when username is empty', async () => {
    const res = await api.login('', ADMIN_CREDENTIALS.password);

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });
});
