import { ApiClient } from './ApiClient';

export interface RoomPayload {
  roomName: string;
  type: string;
  accessible: boolean;
  roomPrice: number;
  image?: string;
  description?: string;
  features?: string[];
}

export interface Room {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  roomPrice: number;
  features?: string[];
  image?: string;
  description?: string;
}

interface RoomListResponse {
  rooms: Room[];
}

export class RoomClient extends ApiClient {
  async getAll() {
    return this.get<RoomListResponse>('/api/room/');
  }

  async create(payload: RoomPayload) {
    return this.authPost('/api/room/', payload);
  }

  async delete(roomId: number) {
    return this.authDelete(`/api/room/${roomId}`);
  }
}
