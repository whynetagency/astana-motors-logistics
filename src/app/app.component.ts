import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/services/loader.service';
import { LoaderComponent } from './components/structual/loader/loader.component';
import { AuthService } from './shared/services/auth.service';
import { HeaderComponent } from './components/structual/header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Astana Motors Logistics';
  isLoading = false;
  currentUrl: string = '';
  isHeaderFooterVisible: boolean = true;
  showHeaderFooter: boolean = true;
  private hideRoutes: string[] = ['/login', '/sign-up', '/password-reset'];

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = !this.hideRoutes.includes(event.url)
      }
    });
  }


  ngOnInit(): void {
    this.loaderService.loading$.subscribe((value: boolean) => {
      this.isLoading = value;
      this.cdr.detectChanges();

      this.checkHeaderVisibility();
    })
  }

  checkHeaderVisibility(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url.replace('/', '');
        this.isHeaderFooterVisible = this.currentUrl !== 'admin';
      });
  }

}
