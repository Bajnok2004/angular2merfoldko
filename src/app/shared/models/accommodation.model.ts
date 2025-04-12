import { Facility } from './facility.model';

export interface Accommodation {
  name: string;
  location: string;
  price: number;
  isAvailable: boolean;
  image: string;
  facilities: Facility[];
}
