import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { BsDropdownDirective, BsDropdownMenuDirective } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    BsDropdownDirective,
    RouterLink,
    BsDropdownMenuDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() currentRoute!: string;
  @ViewChild('headerElement', {static: true}) headerElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.isHeaderFixed) {
      const scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollDistance > 25) {
        this.headerElement.nativeElement.classList.add('header-fixed-filled');
      } else {
        this.headerElement.nativeElement.classList.remove('header-fixed-filled');
      }
    }
  }

  isHeaderFixed = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public authService: AuthService,
  ) {

  }


  onToggleMenu(): void {
    this.document.body.classList.toggle('menu-open');
  }

  navigateTo(path: string): void {
    this.router.navigate([path])
  }
}
