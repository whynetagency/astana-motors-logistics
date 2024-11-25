import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    DatePipe,
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersHistoryComponent {
  orders = [
    {
      id: 1,
      orderNumber: 'ORD12345',
      date: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Минулий рік
      totalAmount: 100,
      status: 'Выполнен',
    },
    {
      id: 2,
      orderNumber: 'ORD67890',
      date: new Date(),
      totalAmount: 50,
      status: 'В ожидании',
    },
    // Додаткові замовлення
  ];

  filteredOrders = [...this.orders];
  hasMoreOrders = true;

  filtersForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
    this.filtersForm = new FormGroup({
      searchQuery: new FormControl(''),
      sortOrder: new FormControl('date_desc'),
    });
  }

  ngOnInit() {
    // Підписка на зміни форми
    this.filtersForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.applyFilters();
      });
  }

  applyFilters() {
    const searchQuery = this.filtersForm.get('searchQuery')?.value;
    const sortOrder = this.filtersForm.get('sortOrder')?.value;

    this.filteredOrders = this.orders.filter(
      (order) =>
        order.orderNumber.includes(searchQuery) ||
        order.date.toLocaleDateString().includes(searchQuery)
    );

    if (sortOrder === 'date_desc') {
      this.filteredOrders.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
    } else if (sortOrder === 'date_asc') {
      this.filteredOrders.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
    } else if (sortOrder === 'status') {
      this.filteredOrders.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    }

    return this.cdr.markForCheck();
  }

  loadMoreOrders() {
    // Логіка завантаження додаткових замовлень
    console.log('Loading more orders...');
    this.hasMoreOrders = false; // Змінити, якщо немає більше даних
  }

  showOrderDetails(orderId: number) {
    // Логіка відображення деталей замовлення
    console.log('Show details for order:', orderId);
  }
}
