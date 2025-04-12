import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'foglalas',
    title: 'Foglalás - BajnokSzállás',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
  },
  {
    path: 'szallasok',
    title: 'Szállások - BajnokSzállás',
    loadComponent: () => import('./pages/listings/listings.component').then(m => m.ListingsComponent),
  },
  {
    path: 'bejelentkezes',
    title: 'Bejelentkezés - BajnokSzállás',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'kijelentkezes',
    title: 'Kijelentkezés - BajnokSzállás',
    loadComponent: () => import('./pages/logout/logout.component').then(m => m.LogoutComponent),
  },
  {
    path: 'regisztracio',
    title: 'Regisztráció - BajnokSzállás',
    loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
  },
  {
    path: 'profil',
    title: 'Profilom - BajnokSzállás',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'admin',
    title: 'Admin Felület - BajnokSzállás',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
  },
  {
    path: '',
    title: 'Kezdőlap - BajnokSzállás',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
