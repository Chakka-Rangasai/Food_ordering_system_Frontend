import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp; // exp is in seconds

      // Current time in seconds
      const now = Math.floor(Date.now() / 1000);

      if (expiry && now > expiry) {
        // Token expired
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
        return false;
      }

      // Token valid
      return true;
    } catch (e) {
      console.error('Invalid token format', e);
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
