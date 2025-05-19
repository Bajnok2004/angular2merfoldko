import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { Subscription, filter } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Szálláshely Foglaló';
  isLoggedIn = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private authSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser
      .subscribe(user => {
        this.isLoggedIn = !!user;
        localStorage.setItem(
          'isLoggedIn',
          this.isLoggedIn ? 'true' : 'false'
        );
      });
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.sidenav.close();
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.router.navigate(['/bejelentkezes']);
    });
  }

  onToggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
  }
}
