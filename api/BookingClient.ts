import { ApiClient } from './ApiClient';

export interface BookingDates {
  checkin: string;  
  checkout: string; 
}

export interface BookingPayload {
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email: string;
  phone: string;
  bookingdates: BookingDates;
}

export interface Booking {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email: string;
  phone: string;
  bookingdates: BookingDates;
}


interface CreateBookingResponse {
  bookingid: number;
  booking: Booking;
}

export class BookingClient extends ApiClient {
  async create(payload: BookingPayload) {
    return this.authPost<CreateBookingResponse>('/api/booking/', payload);
  }
}
