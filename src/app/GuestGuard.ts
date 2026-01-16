import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Already logged in redirect to restaurant list page only .
      this.router.navigate(['/restaurantlist']);
      return false;
    }

    // Not logged in allow Landing page
    return true;
  }
}
