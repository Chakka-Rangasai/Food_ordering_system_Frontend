import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from './user-login';

describe('UserLogin', () => {
  let component: UserLogin;
  let fixture: ComponentFixture<UserLogin>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLogin,ReactiveFormsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate email format',()=>{
    const emailControl=component.loginForm.controls['email'];
    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors?.['required']).toBeTruthy();
  })
});
