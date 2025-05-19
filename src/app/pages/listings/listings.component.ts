import { Component } from '@angular/core';
import { Accommodation } from '../../shared/models/accommodation.model';
import { Facility } from '../../shared/models/facility.model';
import { HufCurrencyPipe } from '../../shared/pipes/huf-currency.pipe';
import { AvailabilityPipe } from '../../shared/pipes/availablity.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listings',
  imports: [HufCurrencyPipe, CommonModule, AvailabilityPipe],
  standalone: true,
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent {
  selectedIndex: number = 0;

  accommodationObject: Accommodation[] = [
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
      name: 'Lakeview Cabin',
      location: 'Lake Tahoe, CA',
      price: 18000,
      isAvailable: true,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25xSflFmoEblNQLxvxIdtvfoYfg0d8Ydq0w&s',

      facilities: [
        { name: 'Free Wi-Fi', isAvailable: true },
        { name: 'Swimming Pool', isAvailable: false },
        { name: 'Gym', isAvailable: false },
        { name: 'Parking', isAvailable: true }
      ] as Facility[]
    },
    {
      name: 'City Center Apartment',
      location: 'New York, NY',
      price: 32000,
      isAvailable: true,
      image: 'https://www.danubiushotels.com/w/accomms/0_1000/0/any/DJI_0336_kulso-maxi3633.jpg',
      facilities: [
        { name: 'Free Wi-Fi', isAvailable: true },
        { name: 'Swimming Pool', isAvailable: true },
        { name: 'Gym', isAvailable: true },
        { name: 'Parking', isAvailable: false }
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
    {
      name: 'Seaside Bungalow',
      location: 'Santa Monica, CA',
      price: 27000,
      isAvailable: true,
      image: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/112841747.jpg?k=beb72c61efb6b9d0347fa9b0ed134a42e6c1b0c44c545d8e3350fc9dd914697f&o=',
      facilities: [
        { name: 'Free Wi-Fi', isAvailable: true },
        { name: 'Swimming Pool', isAvailable: true },
        { name: 'Gym', isAvailable: true },
        { name: 'Parking', isAvailable: true }
      ] as Facility[]
    },
    {
      name: 'Forest Retreat',
      location: 'Portland, OR',
      price: 15000,
      isAvailable: false,
      image: 'https://www.bonoutazas.hu/utak/images/1969_2.jpg',
      facilities: [
        { name: 'Free Wi-Fi', isAvailable: false },
        { name: 'Swimming Pool', isAvailable: false },
        { name: 'Gym', isAvailable: false },
        { name: 'Parking', isAvailable: true }
      ] as Facility[]
    },

  ];

  reload(index: number) {
    this.selectedIndex = index;
  }
}
