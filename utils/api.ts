/**
 * API helper — uses native fetch (available in Node 18+).
 * Returns { status, data, headers } for easy assertions.
 */
require('dotenv').config();


export interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  headers: Record<string, string>;
}

async function request<T = unknown>(
  method: string,
  path: string,
  options: {
    body?: unknown;
    token?: string;
    cookie?: string;
  } = {}
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (options.cookie) {
    headers['Cookie'] = options.cookie;
  }

  const res = await fetch(`${process.env.BASE_URL}${path}`, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const resHeaders: Record<string, string> = {};
  res.headers.forEach((v, k) => {
    resHeaders[k] = v;
  });

  let data: T;
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = (await res.json()) as T;
  } else {
    data = (await res.text()) as T;
  }

  return { status: res.status, data, headers: resHeaders };
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function apiLogin(username: string, password: string) {
  return request<{ token?: string }>('POST', '/api/auth/login', {
    body: { username, password },
  });
}

export async function getAuthCookie(username = 'admin', password = 'password'): Promise<string> {
  const res = await apiLogin(username, password);
  if (res.status !== 200) throw new Error(`Login failed: ${res.status}`);
  const token = res.data.token;
  if (!token) throw new Error('No token in login response');
  return token;
}
