import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '..//models/user.model';
import { Booking } from '../models/booking.model';
import { Timestamp } from '@angular/fire/firestore';
import { Accommodation } from '../models/accommodation.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    booked: Booking[],

  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            booked: [],
          });
        }

        return from(this.fetchUserWithBookings(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null,
    booked: Booking[],
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          booked: [],
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      if (!user.booked || user.booked.length === 0) {
        return {
          user,
          booked: [],

        };
      }

      //Foglalások
      const bookingsCollection = collection(this.firestore, 'Bookings');
      const q = query(bookingsCollection, where('id', 'in', user.booked));
      const bookingsSnapshot = await getDocs(q);


const booked: Booking[] = [];
 bookingsSnapshot.forEach(doc => {
        booked.push({ ...doc.data(), id: doc.id } as Booking);
      });


      return {
        user,
        booked,
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        booked: [],
      };
    }
  }
}
