import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserLogin } from '../../user-module/user-login/user-login';
import { CommonModule } from '@angular/common';
import { CartService } from '../../order-module/Services/cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  cartCount = 0;
  constructor(private cartService: CartService) {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  get isLoggedIn(): boolean {
    // Always check localStorage so state persists across refresh
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    UserLogin.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // clear login state
    console.log('User logged out');
  }
}