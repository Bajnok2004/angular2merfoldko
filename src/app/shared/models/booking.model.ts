import { Accommodation } from './accommodation.model';

export interface Booking {
  bookingId: string;
  userId: number;
  accommodation: Accommodation;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}
