require('dotenv').config();

export interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  headers: Record<string, string>;
}

/**
 * Base API client.
 *
 * Stores the session token after login.
 * All extended classes share the same token
 * every authenticated request uses token automatically.
 */
export class ApiClient {
  protected readonly baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = process.env.BASE_URL || '') {
    this.baseUrl = baseUrl;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Core request method

  protected async request<T = unknown>(
    method: string,
    path: string,
    options: {
      body?: unknown;
      token?: string;
      authenticated?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (options.authenticated && this.token) {
      headers['Cookie'] = `token=${this.token}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const resHeaders: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      resHeaders[key] = value;
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

  // Convenience wrappers for common HTTP methods

  protected get<T = unknown>(path: string) {
    return this.request<T>('GET', path);
  }

  protected authGet<T = unknown>(path: string) {
    return this.request<T>('GET', path, { authenticated: true });
  }

  protected post<T = unknown>(path: string, body: unknown) {
    return this.request<T>('POST', path, { body });
  }

  protected authPost<T = unknown>(path: string, body: unknown) {
    return this.request<T>('POST', path, { body, authenticated: true });
  }

  protected authDelete<T = unknown>(path: string) {
    return this.request<T>('DELETE', path, { authenticated: true });
  }
}
