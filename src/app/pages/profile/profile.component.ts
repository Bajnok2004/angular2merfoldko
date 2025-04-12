import { Component } from '@angular/core';
import { Accommodation } from '../../shared/models/accommodation.model'; // Importáljuk az Accommodation interfészt
import { Facility } from '../../shared/models/facility.model'; // Importáljuk a Facility interfészt
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HufCurrencyPipe } from '../../shared/pipes/huf-currency.pipe';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, HufCurrencyPipe, MatTableModule, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  //ngModel
  filterText: string = "AndrásKING";

  //ngClass
  selectedTheme: 'light' | 'orange' | 'blue' = 'light';

  fontSize: number = 14;

  displayedColumns: string[] = ['name', 'status'];

  // Példa egy bejelentkezett felhasználóra, aki kedvenc szálláshelyekkel rendelkezik
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'valami',
    booked: this.getBookedAccommodations() // Kedvenc szállások lekérése
  };

  // Funkció, ami kedvenc szállásokat ad vissza
  getBookedAccommodations(): Accommodation[] {
    return [
      {
        name: 'Beach Resort',
        location: 'Miami, FL',
        price: 25000,
        isAvailable: true,
        image: 'https://media.istockphoto.com/id/536048545/photo/tropical-resort.jpg?s=612x612&w=0&k=20&c=TR9a_ToayikLVagrZlq8ebvZFRZx_WH25q9_9m884Jk=',
        facilities: [
          { name: 'Free Wi-Fi', isAvailable: true },
          { name: 'Swimming Pool', isAvailable: true },
          { name: 'Gym', isAvailable: false },
          { name: 'Parking', isAvailable: true }
        ] as Facility[]
      },
      {
        name: 'Mountain Lodge',
        location: 'Aspen, CO',
        price: 200000,
        isAvailable: false,
        image: 'https://images.stockcake.com/public/8/0/2/802fe2a5-5574-4cff-b675-abccc9b92edc_large/cozy-mountain-lodge-stockcake.jpg',
        facilities: [
          { name: 'Free Wi-Fi', isAvailable: true },
          { name: 'Swimming Pool', isAvailable: false },
          { name: 'Gym', isAvailable: true },
          { name: 'Parking', isAvailable: true }
        ] as Facility[]
      },
      {
        name: 'Desert Villa',
        location: 'Phoenix, AZ',
        price: 22000,
        isAvailable: false,
        image: 'https://c.otcdn.com/imglib/hotelfotos/8/4691/hotel-desert-rose-camp-bidiya-20240615141201657400.jpg',
        facilities: [
          { name: 'Free Wi-Fi', isAvailable: true },
          { name: 'Swimming Pool', isAvailable: true },
          { name: 'Gym', isAvailable: false },
          { name: 'Parking', isAvailable: true }
        ] as Facility[]
      },
    ];
  }
}
