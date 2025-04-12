import { Component } from '@angular/core';
import { Booking } from '../../shared/models/booking.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-booking',
  imports: [MatExpansionModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {

  // A szállás és a foglalás adatok közvetlenül a komponensben
  accommodation = {
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

  // A foglalás az alábbi módon van definiálva
  booking: Booking = {
    bookingId: 'abc123',
    userId: 42,
    accommodation: this.accommodation,  // Az előző szállás adatokat hozzárendeljük
    checkIn: new Date('2025-04-10'),
    checkOut: new Date('2025-04-12'),
    totalPrice: 36000 // 2 éjszaka * 18000 Ft
  };

  // A foglalás elküldése
  submitBooking(): void {
    console.log('Foglalás elküldve:', this.booking);
    alert(`Foglalás sikeres!\nÖsszeg: ${this.booking.totalPrice} Ft`);
  }
}
