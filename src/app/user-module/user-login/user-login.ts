import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLogin {
  static isLoggedIn: boolean = false;

  loginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).+$/)
      ]]
    });

    // Restore login state from localStorage
    const storedLogin = localStorage.getItem('isLoggedIn');
    UserLogin.isLoggedIn = storedLogin === 'true';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const hardcodedEmail = 'yamini@gmail.com';
    const hardcodedPassword = 'Yamini@1234';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      this.successMessage = 'Login successful!';
      this.errorMessage = '';
      UserLogin.isLoggedIn = true;

      // Save login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        this.router.navigate(['/restaurantlist']);
      }, 1000);
    } else {
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.successMessage = '';
      UserLogin.isLoggedIn = false;

      // Clear login state
      localStorage.removeItem('isLoggedIn');
    }
  }
}
