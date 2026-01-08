import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user-module/Services/user-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  isLoggedIn = false;

  constructor(private userService: UserService) {
    this.userService.isLoggedIn$.subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  logout() {
    this.userService.setLoginState(false);
    console.log('User logged out');
  }
}
