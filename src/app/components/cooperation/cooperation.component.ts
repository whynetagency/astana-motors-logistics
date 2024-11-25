import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-cooperation',
  standalone: true,
  imports: [],
  templateUrl: './cooperation.component.html',
  styleUrl: './cooperation.component.scss'
})
export class CooperationComponent {
  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }
}
