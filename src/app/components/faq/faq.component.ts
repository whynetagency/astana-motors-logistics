import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { AccordionComponent, AccordionPanelComponent } from 'ngx-bootstrap/accordion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    AccordionPanelComponent,
    AccordionComponent
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }
}
