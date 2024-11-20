import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CarriagesComponent } from './components/carriages/carriages.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { FaqComponent } from './components/faq/faq.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserGuard } from './shared/guards/user.guard';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [UserGuard] },
  { path: 'sign-up', component: RegisterComponent, canActivate: [UserGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'carriages', component: CarriagesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'cooperation', component: CooperationComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'reset-password', component: PaymentComponent },
];
