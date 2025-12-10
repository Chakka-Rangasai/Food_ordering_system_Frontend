import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../../user-module/user-login/user-login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  get isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  get brandLink(): string {
    return this.isLoggedIn ? '/restaurantlist' : '/';
  }
  logout() {
    UserLogin.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false'); 
    console.log('User logged out');
  }
}
