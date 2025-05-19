import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where } from '@angular/fire/firestore';
import { Observable, from, switchMap, map, of, take, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '..//models/user.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly BOOKINGS_COLLECTION = 'Bookings';
  private readonly USERS_COLLECTION = 'Users';

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  private formatDateToString(date: Date | string): string {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return new Date().toISOString().split('T')[0];
      }
      return date.includes('T') ? date.split('T')[0] : date;
    }
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  // CREATE
  async addBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const bookingsCollection = collection(this.firestore, this.BOOKINGS_COLLECTION);

      const bookingToSave = {
        ...booking,

      };

      const docRef = await addDoc(bookingsCollection, bookingToSave);
      const bookingId = docRef.id;

      await updateDoc(docRef, { id: bookingId });

      const newBooking = {
        ...bookingToSave,
        id: bookingId
      } as Booking;

      // Felhasználó booking tömbjének frissítése
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        const bookings = userData.booked || [];
        bookings.push(bookingId);
        await updateDoc(userDocRef, { bookings });
      }

      return newBooking;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // READ
   getAllBookings(): Observable<Booking[]> {
      return this.authService.currentUser.pipe(
        switchMap(async user => {
          if (!user) {
            return [];
          }

          const userRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            return [];
          }

          const bookingIds = (userSnap.data() as User).booked || [];
          if (bookingIds.length === 0) {
            return [];
          }

          const colRef = collection(this.firestore, this.BOOKINGS_COLLECTION);
          const result: Booking[] = [];
          const batchSize = 10;

          for (let i = 0; i < bookingIds.length; i += batchSize) {
            const batch = bookingIds.slice(i, i + batchSize);
            const q = query(colRef, where('__name__', 'in', batch));
            const snap = await getDocs(q);
            snap.forEach(d => {
              const data = d.data();

            });
          }

          return result;
        })
      );
    }

  getCompletedBookings(): Observable<Booking[]> {
    return this.getAllBookings().pipe(
      map(bookings => bookings.filter(booking => booking))
    );
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        return null;
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return null;
      }
      const userData = userDoc.data() as User;
      if (!userData.booked || !userData.booked.includes(bookingId)) {
        return null;
      }

      const bookingDocRef = doc(this.firestore, this.BOOKINGS_COLLECTION, bookingId);
      const bookingSnapshot = await getDoc(bookingDocRef);

      return null;
    } catch (error) {
      console.error('Error fetching booking:', error);
      return null;
    }
  }

  // UPDATE
  async updateBooking(bookingId: string, updatedData: Partial<Booking>): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.booked || !userData.booked.includes(bookingId)) {
        throw new Error('booking does not belong to the user');
      }

      const dataToUpdate: any = { ...updatedData };
      if (dataToUpdate.dueDate) {
        dataToUpdate.dueDate = this.formatDateToString(dataToUpdate.dueDate as any);
      }

      const bookingDocRef = doc(this.firestore, this.BOOKINGS_COLLECTION, bookingId);
      return updateDoc(bookingDocRef, dataToUpdate);
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  toggleBookingCompletion(bookingId: string, completed: boolean): Promise<void> {
    console.warn('toggleBookingCompletion: Booking model does not support "completed".');
    return Promise.resolve();
  }

  // DELETE
  async deleteBooking(bookingId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as User;
      if (!userData.booked || !userData.booked.includes(bookingId)) {
        throw new Error('booking does not belong to the user');
      }

      const bookingDocRef = doc(this.firestore, this.BOOKINGS_COLLECTION, bookingId);
      await deleteDoc(bookingDocRef);

      const updatedBookings = userData.booked.filter(id => id !== bookingId);
      return updateDoc(userDocRef, {bookings: updatedBookings });
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
  }

