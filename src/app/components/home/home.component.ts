import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  form: FormGroup;
  brands: string[] = ['Toyota', 'Hyundai', 'BMW', 'Mercedes'];
  models: string[] = ['Model A', 'Model B', 'Model C'];
  cities: string[] = ['Алматы', 'Астана', 'Шымкент', 'Атырау', 'Актобе', 'Павлодар', 'Тараз', 'Семей', 'Кызылорда', 'Костанай']

  constructor(
    private loaderService: LoaderService,
  ) {
    this.loaderService.loading$.next(false);
    this.form = new FormGroup({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      departureCity: new FormControl('', Validators.required),
      arrivalCity: new FormControl('', Validators.required),
      desiredDate: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]) // TODO: add validator for phone pattern
    })
  }

  sendForm(): void {
   console.log(1);
    console.log(this.form.value)
  }
}
