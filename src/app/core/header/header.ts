import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../order-module/Services/cart-service';

@Component({
  selector: 'app-header',
  standalone: true, // ✅ mark as standalone since you use imports
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  cartCount = 0;
  currentRoute = '';
  isCollapsed = true; // ✅ toggle flag

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('isLoggedIn'); // clear login state
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
