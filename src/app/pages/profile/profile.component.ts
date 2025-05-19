// src/app/pages/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { HufCurrencyPipe } from '../../shared/pipes/huf-currency.pipe';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  collectionData,
  docData
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { Accommodation } from '../../shared/models/accommodation.model';
import { Booking } from '../../shared/models/booking.model';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Extend Accommodation with id for local usage
interface AccommodationWithId extends Accommodation {
  id: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDividerModule, HufCurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedTheme: 'light' | 'orange' | 'blue' = 'light';
  fontSize = 14;

  user$!: Observable<UserProfile | null>;
  bookings$!: Observable<Booking[]>;
  accommodationsList: AccommodationWithId[] = [];

  // Model for new booking form
  newBookingForm = {
    accommodationId: '',
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    price: 0
  };

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // 1) Load user profile
    this.user$ = authState(this.auth).pipe(
      switchMap(u => {
        if (!u?.uid) return of(null);
        const uref = doc(this.firestore, `Users/${u.uid}`);
        return docData(uref, { idField: 'id' }) as Observable<UserProfile>;
      })
    );

    // 2) Load accommodations list (with idField)
    collectionData(collection(this.firestore, 'Accommodations'), { idField: 'id' })
      .subscribe((list: any[]) => {
        // any[] because we didn't pass a converter
        this.accommodationsList = list as AccommodationWithId[];
      });

    // 3) Load current user's bookings
    this.bookings$ = authState(this.auth).pipe(
      switchMap(u => {
        if (!u?.uid) return of([]);
        const q = query(
          collection(this.firestore, 'Bookings'),
          where('userId', '==', u.uid)
        );
        return collectionData(q, { idField: 'bookingId' }) as Observable<Booking[]>;
      })
    );
  }

  /** Create a new Booking document */
  async createBooking(user: UserProfile, form: NgForm) {
    if (form.invalid) return;

    // find the accommodation by id
    const acc = this.accommodationsList.find(a => a.id === this.newBookingForm.accommodationId);
    if (!acc) return;

    // compute dates & price
    const checkInDate = new Date(this.newBookingForm.checkIn);
    const checkOutDate = new Date(this.newBookingForm.checkOut);
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / msPerDay);
    const pricePerNight = this.newBookingForm.price || acc.price;
    const totalPrice = nights * pricePerNight;

    // build booking payload
    const bookingData: Omit<Booking, 'bookingId'> = {
      userId: user.id,
      accommodation: {
        name: acc.name,
        location: acc.location,
        price: pricePerNight,
        isAvailable: acc.isAvailable,
        image: acc.image,
        facilities: acc.facilities
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    };

    try {
      await addDoc(collection(this.firestore, 'Bookings'), bookingData);
      form.resetForm({ accommodationId: '', name: '', email: '', checkIn: '', checkOut: '', guests: 1, price: 0 });
    } catch (e) {
      console.error('Hiba új foglalás létrehozásakor', e);
      alert('Hiba történt a foglalás létrehozásakor');
    }
  }

  /** Delete a Booking document */
  async deleteBooking(bookingId: string) {
    try {
      await deleteDoc(doc(this.firestore, `Bookings/${bookingId}`));
    } catch (e) {
      console.error('Hiba foglalás törlésekor', e);
      alert('Hiba történt a foglalás törlésekor');
    }
  }
}
