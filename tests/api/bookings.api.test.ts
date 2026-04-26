import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { BOOKING_DATES, BOOKING_PAYLOAD, BOOKING_DATES_FROM_PAST } from '../../fixtures/test-data';
import { RoomClient } from '../../api/RoomClient';
import { BookingClient } from '../../api/BookingClient';
import { ApiClientFactory } from '../../api/ApiClientFactory';

describe('Room Reservation API', () => {
  let rooms: RoomClient;
  let bookings: BookingClient;
  let testRoomId: number;
  let createdBookingId: number;

  beforeAll(async () => {
    ({ rooms, bookings } = await ApiClientFactory.createAuthenticated());
    const roomName = `BookingTestRoom_${Date.now()}`; 

    const roomRes = await rooms.create({
      roomName,
      type: 'Double',
      accessible: true,
      roomPrice: 150,
      features: ['WiFi'],
    });
    if (roomRes.status !== 200) throw new Error('Setup: could not create test room');
    const allRooms = await rooms.getAll();
    const created = allRooms.data.rooms.find((r) => r.roomName === roomName);
    if (!created) throw new Error('Setup: created room not found in list');

    testRoomId = created.roomid;
  });

  afterAll(async () => {
    if (testRoomId) await rooms.delete(testRoomId);
  });

  it('TC-BOOKING-API-01: POST /api/booking/ returns 201 and creates a booking', async () => {
    const payload = BOOKING_PAYLOAD(testRoomId);
    const res = await bookings.create(payload);
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('bookingid');
    createdBookingId = res.data.bookingid;
    expect(createdBookingId).toBeGreaterThan(0);
  });

  it('TC-BOOKING-API-02: POST /api/booking/ returns 409 when dates overlap an existing booking', async () => {
    const res = await bookings.create(BOOKING_PAYLOAD(testRoomId));
    expect(res.status).toBe(409);
    expect(res.data).toEqual({"error": "Failed to create booking"});
  });

  it('TC-BOOKING-API-03: POST /api/booking/ returns 409 when checkout is before checkin', async () => {
    const res = await bookings.create({
      ...BOOKING_PAYLOAD(testRoomId),
      bookingdates: { checkin: BOOKING_DATES.checkout, checkout: BOOKING_DATES.checkin },
    });

    expect(res.status).toBe(409); 
    expect(res.data).toEqual({"error": "Failed to create booking"});
   });
    

  // This test fails because the API currently allows creating bookings in the past, which is a bug. The test will be kept here for when the bug is fixed
  it('TC-BOOKING-API-04: POST /api/booking/ returns 409 when reservation is done in past', async () => {
    const res = await bookings.create({
      ...BOOKING_PAYLOAD(testRoomId),
      bookingdates: { checkin: BOOKING_DATES_FROM_PAST.checkin, checkout: BOOKING_DATES_FROM_PAST.checkout },
    });

    expect(res.status).toBe(409); 
    expect(res.data).toEqual({"error": "Failed to create booking"});
  });
});
