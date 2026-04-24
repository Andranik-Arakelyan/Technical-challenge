import { describe, it, expect, beforeAll } from '@jest/globals';
import { NEW_ROOM } from '../../fixtures/test-data';
import { RoomClient } from '../../api/RoomClient';
import { ApiClientFactory } from '../../api/ApiClientFactory';

describe('Room Management API', () => {
  let rooms: RoomClient;
  let createdRoomId: number;

  beforeAll(async () => {
    const clients = await ApiClientFactory.createAuthenticated();
    rooms = clients.rooms;
  });

  it('TC-ROOM-API-01: POST /api/room/ returns 200 and creates a room when authenticated', async () => {
    const res = await rooms.create(
      {
        roomName: NEW_ROOM.roomName,
        type: NEW_ROOM.type,
        accessible: NEW_ROOM.accessible,
        roomPrice: NEW_ROOM.roomPrice,
        image: NEW_ROOM.image,
        description: NEW_ROOM.description,
        features: NEW_ROOM.features,
      },
    );

    expect(res.status).toBe(200);  
    expect(res.data).toEqual({"success": true});
  });

  it('TC-ROOM-API-02: GET /api/room/ lists the newly created room', async () => {
    const res = await rooms.getAll();

    expect(res.status).toBe(200);
    const foundRoom = res.data.rooms.find((r) => r.roomName === NEW_ROOM.roomName);
    expect(foundRoom).toBeDefined();
    createdRoomId = foundRoom?.roomid as number;
  });

  it('TC-ROOM-API-03: POST /api/room/ returns 401 when unauthenticated', async () => {
    const unauthRooms = new RoomClient();

    const res = await unauthRooms.create({ roomName: 'Unauthorized101', type: 'Single', accessible: false, roomPrice: 50 });
    expect(res.status).toBe(401);
    expect(res.data).toEqual({ errors: [ 'Authentication required' ] });
  });

  it('TC-ROOM-API-04: DELETE /api/room/{id} returns 202 and removes the room', async () => {
    const res = await rooms.delete(createdRoomId);
    expect(res.status).toBe(202);

    const listRes = await rooms.getAll();
    const found = listRes.data.rooms.find((r) => r.roomid === createdRoomId);
    expect(found).toBeUndefined();
  });

  it('TC-ROOM-API-05: DELETE /api/room/{id} returns 403 when unauthenticated', async () => {
   await rooms.create({ roomName: 'TempRoom999', type: 'Double', accessible: false, roomPrice: 120 });
   const res = await rooms.getAll();
   const tempId = res.data.rooms.find((r) => r.roomName === 'TempRoom999')?.roomid as number;   

   const unauthRooms = new RoomClient();
   const deleteRes = await unauthRooms.delete(tempId);
   expect(deleteRes.status).toBe(403);
  //  expect(deleteRes.data).toEqual({ errors: [ 'Authentication required' ] });

  // Clean up
   await rooms.delete(tempId);
  });
});
