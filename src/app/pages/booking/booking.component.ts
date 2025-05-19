import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Accommodation } from '../../shared/models/accommodation.model';

interface BookingFormModel {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, MatExpansionModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit, OnDestroy {
  private viewEnterTime!: number;

  accommodation: Accommodation = {
    name: 'Balatoni Apartman',
    location: 'Balatonfüred',
    price: 18000,
    isAvailable: true,
    image: 'https://www.balaton-apartman.hu/files/accommodations/medium/102422770_594620637840053_7479628039524138219_o.jpg',
    facilities: [
      { name: 'Wi-Fi', isAvailable: true },
      { name: 'Medence', isAvailable: false },
      { name: 'Parkoló', isAvailable: true },
    ]
  };

  bookingFormModel: BookingFormModel = {
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  };

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.viewEnterTime = Date.now();
    document.title = `Foglalás – ${this.accommodation.name}`;
    console.log(`BookingComponent initialized at ${new Date(this.viewEnterTime).toISOString()}`);
  }

  ngOnDestroy(): void {
    const duration = Date.now() - this.viewEnterTime;
    console.log(`BookingComponent destroyed after ${duration}ms on-screen`);
  }

  async submitBooking(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const checkInDate = new Date(this.bookingFormModel.checkIn);
    const checkOutDate = new Date(this.bookingFormModel.checkOut);
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / msPerDay);
    const totalPrice = nights * this.accommodation.price;

    const bookingData = {
      name: this.bookingFormModel.name,
      email: this.bookingFormModel.email,
      accommodation: {
        name: this.accommodation.name,
        location: this.accommodation.location,
        price: this.accommodation.price
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: this.bookingFormModel.guests,
      totalPrice,
      createdAt: new Date()
    };

    try {
      const docRef = await addDoc(collection(this.firestore, 'Bookings'), bookingData);
      console.log('Foglalás mentve, ID:', docRef.id);
      alert(`Foglalás sikeresen mentve!\nID: ${docRef.id}`);
      form.resetForm({ guests: 2 });
    } catch (err) {
      console.error('Hiba a foglalás mentésekor:', err);
      alert('Hiba történt a foglalás mentésekor. Ellenőrizd a konzolt.');
    }
  }
}
