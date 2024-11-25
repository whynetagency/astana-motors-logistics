import { Component, Input } from '@angular/core';
import { DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { OrderStatus } from '../../../shared/models/order.interface';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [
    DatePipe,
    TitleCasePipe,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {
  @Input() orderId!: string;
  orderStatus = OrderStatus;
  order = {
    orderNumber: '123456',
    dateCreated: new Date(),
    dateCompleted: new Date(),
    estimatedCompletion: new Date(),
    status: this.orderStatus.IN_PROGRESS,
    history: [
      { date: new Date(), message: 'Заказ получено' },
      { date: new Date(), message: 'Обработка заказа' },
      { date: new Date(), message: 'Заказ в процессе выполнения' }
    ]
  };

  orderStatusMap = new Map<OrderStatus, string>([
    [this.orderStatus.PENDING, 'Ожидание'],
    [this.orderStatus.IN_PROGRESS, 'В процессе'],
    [this.orderStatus.COMPLETED, 'Завершен'],
    [this.orderStatus.CANCELLED, 'Отменен']
  ])

  constructor() {}

  ngOnInit(): void {
  }

  getOrderStatus(status: OrderStatus): string {
    return this.orderStatusMap.get(status)!;
  }
}
