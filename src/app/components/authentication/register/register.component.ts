import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
  ) {
    //TODO: added more fields after clarification with the customer
    this.signUpForm = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email]),
      phone: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      isConsent: new FormControl (false, [Validators.required, Validators.requiredTrue]),
    }, { validators: this.passwordMatchValidator })
  }

  async register(): Promise<void> {
    await this.authService.createUser({
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value,
      phoneNumber: this.signUpForm.controls['phone'].value,
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirm')?.value;

    if (password !== confirmPassword) {
      control.get('passwordConfirm')?.setErrors({passwordMismatch: true});
      return {passwordMismatch: true};
    }

    return null;
  }
}
