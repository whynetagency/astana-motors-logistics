import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }

}
