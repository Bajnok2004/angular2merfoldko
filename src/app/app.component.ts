import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './shared/menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Szálláshely foglaló';
  page: string = "home";
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

    logout(){
      localStorage.setItem('isLoggedIn', "false");
      localStorage.setItem('isAdmin', "false");
      this.isAdmin = false;
      this.isLoggedIn = false;
      window.location.href = "/home";
    }


    changePage(selectedPage: string) {
      this.page = selectedPage;
    }
}
