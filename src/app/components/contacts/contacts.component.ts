import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }
}
