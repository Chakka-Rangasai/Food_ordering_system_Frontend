import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Services/user-service';
import { ToastrService } from 'ngx-toastr'; 
import { CartService } from '../../order-module/Services/cart-service';
@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class UserLogin {
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private cartService:CartService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).+$/)
      ]]
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    const payload = this.loginForm.value;
    this.userService.loginUser(payload).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message || 'Login Successful', 'Welcome!', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
        this.userService.setLoginState(true);
        localStorage.setItem('jwtToken', response.token);
        console.log('Login Successful');
        this.cartService.getCart().subscribe({
        next: () => {
          this.router.navigate(['/restaurantlist']);
        }
      });
      },
      error: (err) => {
        const errorMsg = err.error?.message ?? 'Invalid email or password';
        this.toastr.error(errorMsg, 'Login Failed', {
          timeOut: 4000,
          progressBar: true
        });
        this.userService.setLoginState(false);
      }
    });
  }
}