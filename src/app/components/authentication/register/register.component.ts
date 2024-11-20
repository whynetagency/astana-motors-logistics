import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
  ) {}

  async register(data: { email: string, phoneNumber: string, password: string }): Promise<void> {
    await this.authService.createUser(data);
  }
}
