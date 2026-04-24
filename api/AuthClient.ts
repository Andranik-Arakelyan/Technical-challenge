import { ApiClient } from "./ApiClient";

interface LoginResponse {
  token?: string;
}

export class AuthClient extends ApiClient {
  
  async login(username: string, password: string) {
    const res = await this.post<LoginResponse>('/api/auth/login', { username, password });

    if (res.status === 200) {
      const token = res.data.token;
      if (!token) {
        throw new Error('Login succeeded but no token cookie was returned.');
      }
      this.setToken(token); 
    }

    return res;
  }

  async loginOrThrow(username = 'admin', password = 'password'): Promise<void> {
    const res = await this.login(username, password);
    if (res.status !== 200 || !this.isAuthenticated()) {
      throw new Error(`Login failed with status ${res.status}`);
    }
  }

  logout(): void {
    this.clearToken();
  }
}
