import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'foglalas',
    title: 'Foglalás - BajnokSzállás',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'szallasok',
    title: 'Szállások - BajnokSzállás',
    loadComponent: () => import('./pages/listings/listings.component').then(m => m.ListingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'bejelentkezes',
    title: 'Bejelentkezés - BajnokSzállás',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'kijelentkezes',
    title: 'Kijelentkezés - BajnokSzállás',
    loadComponent: () => import('./pages/logout/logout.component').then(m => m.LogoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'regisztracio',
    title: 'Regisztráció - BajnokSzállás',
    loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'profil',
    title: 'Profilom - BajnokSzállás',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
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
