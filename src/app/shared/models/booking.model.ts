import { Accommodation } from './accommodation.model';

export interface Booking {
  bookingId: string;
  userId: string;
  accommodation: Accommodation;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}
