import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
  })
export class LoggedInGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router, private snack: SnackbarService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
        this.router.navigate(['/']);
        this.snack.open('You are already logged in', 'Ok', 3000);
        return false;
    }
    return true;
  }
}
