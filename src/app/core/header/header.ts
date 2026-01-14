import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../order-module/Services/cart-service';
import { UserService } from '../../user-module/Services/user-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  cartCount = 0;
  currentRoute = '';
  isCollapsed = true;
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.userService.isLoggedIn$.subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.userService.setLoginState(false);
    this.cartService.clearInternalCart();
    console.log('User logged out');
    this.router.navigate(['/']);
    localStorage.removeItem('jwtToken');
  }
}
