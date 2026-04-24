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
  roomName: 'Test101',
  type: 'Single',
  accessible: false,
  roomPrice: 99,
  features: ['WiFi', 'TV'],
  description: 'A cozy test room',
  image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
};

