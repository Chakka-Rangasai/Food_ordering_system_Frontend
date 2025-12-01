import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserLogin } from '../../user-module/user-login/user-login';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  get isLoggedIn(): boolean {
    return UserLogin.isLoggedIn; 
  }

  logout() {
    UserLogin.isLoggedIn = false; 
    console.log('User logged out');
  }
}
