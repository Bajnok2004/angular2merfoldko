import { Accommodation } from './accommodation.model';

export interface User {
  name: string;
  email: string;
  password: string;
  booked: Accommodation[];
}
