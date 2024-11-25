import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss'
})
export class CarriagesComponent {

  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }

}
