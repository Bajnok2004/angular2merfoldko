
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { Accommodation } from '../models/accommodation.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private colName = 'Accommodations';

  constructor(private firestore: Firestore) {}

  /**
   * Creates a new accommodation doc in 'Accommodations' collection.
   * Returns the DocumentReference so you can .then() or await it.
   */
  createAccommodation(accommodation: Accommodation): Promise<DocumentReference> {
    const col = collection(this.firestore, this.colName);
    return addDoc(col, {
      ...accommodation,
      createdAt: new Date()
    });
  }

  // (Optional) add other CRUD methods here:
  // getAll(), updateAccommodation(id, data), deleteAccommodation(id)...
}
