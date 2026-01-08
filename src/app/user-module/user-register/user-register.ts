import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../Services/user-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-register.html',
  styleUrls: ['./user-register.css']
})
export class UserRegister {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService 
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
      ]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const payload = this.registerForm.value;
    this.userService.registerUser(payload).subscribe({
      next: (res: any) => {
        this.toastr.success('Registration Successful!', 'Success', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
        this.registerForm.reset();
        this.submitted = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Registration failed. Please try again.';
        this.toastr.error(errorMsg, 'Error');
        console.error('Registration Failed:', errorMsg);
      }
    });
  }
}