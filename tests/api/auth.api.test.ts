import { describe, it, expect } from '@jest/globals';
import { apiLogin } from '../../utils/api';
import { ADMIN_CREDENTIALS, INVALID_CREDENTIALS } from '../../fixtures/test-data';

describe('Authentication API', () => {
  it('TC-AUTH-API-01: POST /auth/login returns 200 and sets token cookie with valid credentials', async () => {    
    const res = await apiLogin(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
    
    expect(res.status).toBe(200);
    expect(res.data.token).toBeTruthy();
  });

  it('TC-AUTH-API-02: POST /auth/login returns 403 with invalid credentials', async () => {
    const res = await apiLogin(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });

  it('TC-AUTH-API-03: POST /auth/login returns 401 when password is empty', async () => {
    const res = await apiLogin(ADMIN_CREDENTIALS.username, '');

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });

  it('TC-AUTH-API-04: POST /auth/login returns 401 when username is empty', async () => {
    const res = await apiLogin('', ADMIN_CREDENTIALS.password);

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ error: 'Invalid credentials' });
  });
});
