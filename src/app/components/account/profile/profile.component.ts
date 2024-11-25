import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { IUser } from '../../../shared/models/user.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../shared/services/loader.service';
import { AuthService } from '../../../shared/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @ViewChild('confirmPasswordTpl', { static: true }) confirmPasswordTpl!: TemplateRef<any>;
  me!: IUser;
  profileForm!: FormGroup;
  confirmPassword!: FormControl;
  passConfirmed = new BehaviorSubject(false);


  constructor(
    public loaderService: LoaderService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
  ) {
    this.getUserInfo();
    this.confirmPassword = new FormControl('', Validators.required);

  }


  getUserInfo(): void {
    this.loaderService.loading$.next(true);
    this.authService.user.pipe(
      filter(user => !!user),
      tap(user => {
        this.me = user;
        this.setForm(user);
        this.loaderService.loading$.next(false)
      }),
    ).subscribe()
  }

  setForm(user: IUser): void {
    //TODO: added more fields after clarification with the customer
    this.profileForm = new FormGroup({
      email: new FormControl(user.email, Validators.required),
      phoneNumber: new FormControl(user.phoneNumber, Validators.required),
    });
    this.profileForm.disable();
    this.cdr.markForCheck();
  }

  saveProfile(): void {
    const isEmailChanged = this.profileForm.controls['email'].value !== this.me.email;

    if (isEmailChanged) {
      const modal = this.modalService!.show(this.confirmPasswordTpl);
      modal.onHide!.subscribe(event => {
        this.confirmPassword.value && this.update(this.confirmPassword.value)
      });

      this.passConfirmed.subscribe(value => value && this.modalService.hide());
    }
  }

  update(password?: string): void {
    this.authService.updateUserData(this.profileForm.value, password).then(r => {
      this.profileForm.disable();
      this.authService.getUserData();
    });
  }

  resetForm(): void {
    this.setForm(this.me);
  }

  isFormChanged(): boolean {
    if (!this.profileForm || !this.me) {
      return false;
    }

    const currentValues = this.profileForm.getRawValue();
    const originalValues = {
      email: this.me.email,
      phoneNumber: this.me.phoneNumber,
    };

    // Форма вважається зміненою, якщо:
    // - Вона має стан dirty (користувач змінював поля)
    // - Поточні значення не збігаються з початковими
    return this.profileForm.dirty && JSON.stringify(currentValues) !== JSON.stringify(originalValues);
  }

}
