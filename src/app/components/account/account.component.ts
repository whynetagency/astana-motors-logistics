import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './profile/profile.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { GpsTrackerComponent } from './gps-tracker/gps-tracker.component';
import { OrderStatusComponent } from './order-status/order-status.component';

enum AccountView {
  Profile = 'profile',
  OrderStatus = 'orderStatus',
  GPSTracker = 'gpsTracker',
  OrdersHistory = 'ordersHistory',
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    ProfileComponent,
    NgIf,
    OrdersHistoryComponent,
    GpsTrackerComponent,
    OrderStatusComponent,
  ],
  providers: [BsModalService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  accountView = AccountView;
  currentView: AccountView = this.accountView.Profile;
  constructor(
    public loaderService: LoaderService,
    private authService: AuthService,
  ) {
  }

  setView(view: AccountView): void {
    this.currentView = view;
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    console.log('Користувач вийшов');
  }

}
