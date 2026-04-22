require('dotenv').config();

export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || '',
  password: process.env.ADMIN_PASSWORD || '',
};

export const INVALID_CREDENTIALS = {
  username: 'wronguser',
  password: 'wrongpassword',
};


