import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const UserGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return new Promise((resolve, reject) => {
    authService.isUserLoggedIn.subscribe((value: boolean) => {
      if (value) {
        router.navigateByUrl('/', {replaceUrl: true}).then();
        reject(false);
      } else {
        resolve(true);
      }
    })
  })
};
