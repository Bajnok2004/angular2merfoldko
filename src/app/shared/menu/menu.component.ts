import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{

  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Input() isAdmin: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();




  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }


  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }


  logout(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('isAdmin', "false");
    window.location.href = "/home";
  }
}
