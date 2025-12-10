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
    const storedLogin = localStorage.getItem('isLoggedIn');
    UserLogin.isLoggedIn = storedLogin === 'true';
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const hardcodedEmail = 'jujarurajdeep@gmail.com';
    const hardcodedPassword = 'Rajdeep@8106';
    if (email === hardcodedEmail && password === hardcodedPassword) {
      this.successMessage = 'Login successful!';
      this.errorMessage = '';
      UserLogin.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/restaurantlist']);
      ;
    } else {
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.successMessage = '';
      UserLogin.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    }
  }
}