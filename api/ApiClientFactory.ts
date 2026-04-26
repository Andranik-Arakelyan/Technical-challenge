require('dotenv').config();
import { AuthClient } from "./AuthClient";
import { BookingClient } from "./BookingClient";
import { RoomClient } from "./RoomClient";

export interface AuthenticatedClients {
  auth: AuthClient;
  rooms: RoomClient;
  bookings: BookingClient;
}

/**
 * To get a fully authenticated bundle in one line:
 * const { auth, rooms, bookings } = await ApiClientFactory.createAuthenticated();
 * 
 * To have non authenticated clients;
 * const { auth, rooms, bookings } = ApiClientFactory.create();
 */
export class ApiClientFactory {
  /**
   * Creates the three clients and links them so they all share one token store.
   * You still need to call `auth.login()` yourself — no credentials are used yet.
   */
  static create(): AuthenticatedClients {
    const auth = new AuthClient();
    const rooms = new RoomClient();
    const bookings = new BookingClient();

    // Intercept setToken on AuthClient so the token is forwarded to siblings
    const originalSetToken = auth.setToken.bind(auth);
    auth.setToken = (token: string) => {
      originalSetToken(token);
      rooms.setToken(token);
      bookings.setToken(token);
    };

    // Also forward clearToken (logout)
    const originalClearToken = auth.clearToken.bind(auth);
    auth.clearToken = () => {
      originalClearToken();
      rooms.clearToken();
      bookings.clearToken();
    };

    return { auth, rooms, bookings };
  }

  /**
   * Creates and immediately authenticates all clients.
   * Throws if login fails.
   * Uses credentials from environment variables by default, but you can also pass them in.
   */
  static async createAuthenticated(
    username = process.env.ADMIN_USERNAME || '',
    password = process.env.ADMIN_PASSWORD || ''
  ): Promise<AuthenticatedClients> {
    const clients = ApiClientFactory.create();
    await clients.auth.loginOrThrow(username, password);
    return clients;
  }
}
