import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   isLoggedIn: boolean = false; // default: not logged in

  login() {
    // In a real app, you'd call AuthService.login() here
    this.isLoggedIn = true;
    console.log('User logged in');
  }

  logout() {
    // In a real app, you'd call AuthService.logout() here
    this.isLoggedIn = false;
    console.log('User logged out');
  }
}
