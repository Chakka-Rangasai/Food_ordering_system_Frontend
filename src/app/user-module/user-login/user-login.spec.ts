import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from './user-login';

describe('UserLogin Component - Form Validation', () => {
  let component: UserLogin;
  let fixture: ComponentFixture<UserLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLogin, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ EMAIL TESTS
  it('should mark email as required when empty', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['required']).toBeTrue();
  });

  it('should mark email invalid when not in proper format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalidEmail');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['email']).toBeTrue();
  });

  it('should accept a valid email address', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTrue();
    expect(emailControl.errors).toBeNull();
  });

  // ✅ PASSWORD TESTS
  it('should mark password as required when empty', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['required']).toBeTrue();
  });

  it('should mark password invalid when shorter than minlength', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('abc'); // too short
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();
  });

  it('should mark password invalid when missing uppercase/lowercase/special char', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('password123'); // no uppercase or special char
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['pattern']).toBeTruthy();
  });

  it('should accept a valid password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('Valid@123'); // meets all rules
    expect(passwordControl.valid).toBeTrue();
    expect(passwordControl.errors).toBeNull();
  });

  // ✅ FORM SUBMISSION TEST
  it('should not submit when form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should submit when form is valid', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('Valid@123');
    expect(component.loginForm.valid).toBeTrue();
  });
});
