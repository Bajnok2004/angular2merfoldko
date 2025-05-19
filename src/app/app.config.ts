import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANUVtgRJlNawKEieq4wATIxxTnkOBQj3w",
  authDomain: "szallashelyfoglalo-9443d.firebaseapp.com",
  projectId: "szallashelyfoglalo-9443d",
  storageBucket: "szallashelyfoglalo-9443d.appspot.com",
  messagingSenderId: "108029406561",
  appId: "1:108029406561:web:6d48069ac451af22d1a920"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
