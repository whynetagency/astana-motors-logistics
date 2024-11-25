import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  featuredVacancies= [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      location: 'Dolor sit amet',
      department: 'Consectetur',
    },
    {
      id: 2,
      title: 'Adipiscing elit',
      location: 'Sed do eiusmod',
      department: 'Tempor',
    },
    {
      id: 3,
      title: 'Incididunt ut labore',
      location: 'Et dolore magna',
      department: 'Aliqua',
    },
  ];
  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
  }
}
