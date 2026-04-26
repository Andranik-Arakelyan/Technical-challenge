require('dotenv').config();

export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || '',
  password: process.env.ADMIN_PASSWORD || '',
};

export const INVALID_CREDENTIALS = {
  username: 'wronguser',
  password: 'wrongpassword',
};


export const NEW_ROOM = {
  roomName: `BookingTestRoom_${Date.now()}`,
  type: 'Single',
  accessible: false,
  roomPrice: 99,
  features: ['WiFi', 'TV'],
  description: 'A cozy test room',
  image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
};


export const BOOKING_DATES = {
  checkin: getFutureDate(30),
  checkout: getFutureDate(32),
};

export const BOOKING_DATES_FROM_PAST = {
  checkin: getPastDate(4),
  checkout: getFutureDate(2), 
};

function getFutureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getPastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

export const BOOKING_PAYLOAD = (roomId: number) => ({
  roomid: roomId,
  firstname: 'John',
  lastname: 'Tester',
  depositpaid: false,
  email: 'john.tester@example.com',
  phone: '+37477898878',
  bookingdates: {
    checkin: BOOKING_DATES.checkin,
    checkout: BOOKING_DATES.checkout,
  },
});

