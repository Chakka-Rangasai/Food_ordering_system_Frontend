import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from './user-login';
describe('UserLogin Component', () => {
  let component: UserLogin;
  let fixture: ComponentFixture<UserLogin>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [UserLogin, ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
    fixture = TestBed.createComponent(UserLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate empty email', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['required']).toBeTruthy();
  });
  it('should invalidate wrong email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('not-an-email');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });
  it('should validate correct email format', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTrue();
  });
  it('should require password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['required']).toBeTruthy();
  });
  it('should invalidate short password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('Ab@1'); 
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();
  });
  it('should invalidate password without uppercase/lowercase/special char', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('password123'); 
    expect(passwordControl.valid).toBeFalse();
    expect(passwordControl.errors?.['pattern']).toBeTruthy();
  });
  it('should validate strong password', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('Strong@123');
    expect(passwordControl.valid).toBeTrue();
  });
  it('should login successfully with correct credentials', () => {
    component.loginForm.setValue({
      email: 'jujarurajdeep@gmail.com',
      password: 'Rajdeep@8106'
    });
    component.onSubmit();
    expect(component.successMessage).toBe('Login successful!');
    expect(component.errorMessage).toBe('');
    expect(UserLogin.isLoggedIn).toBeTrue();
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/restaurantlist']);
  });
  it('should fail login with wrong credentials', () => {
    component.loginForm.setValue({
      email: 'wrong@example.com',
      password: 'Wrong@123'
    });
    component.onSubmit();
    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
    expect(component.successMessage).toBe('');
    expect(UserLogin.isLoggedIn).toBeFalse();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
  it('should not submit if form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });
    component.onSubmit();
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('');
    expect(UserLogin.isLoggedIn).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
