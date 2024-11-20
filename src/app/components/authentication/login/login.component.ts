import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl ('', [Validators.required, Validators.email]),
      phone: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    })
  }

  login(): void {
    this.authService.signInWithEmailAndPassword(this.loginForm.value);
  }

  async resetPassword(email: string): Promise<void> {
    await this.authService.passwordReset(email);
  }
}
