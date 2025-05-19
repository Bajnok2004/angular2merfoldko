import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  logout(): void {

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isAdmin', 'false');
    this.isAdmin = false;
    this.isLoggedIn = false;


    setTimeout(() => {
      window.location.href = '/kijelentkezes';
    }, 1);
  }
}
