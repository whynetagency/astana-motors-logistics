import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  emailControl!: FormControl;

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loaderService.loading$.next(false);
    this.emailControl = new FormControl('', [Validators.required, Validators.email])
  }

  resetPassword(): void {
    this.loaderService.loading$.next(true);
    this.authService.passwordReset(this.emailControl.value)
     .then(() => {
        this.loaderService.loading$.next(false);
        this.router.navigate(['/login']);
      })
     .catch((error) => {
        this.loaderService.loading$.next(false);
       console.log(error)
      });
  }
}
