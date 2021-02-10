import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';

declare let alertify: any;
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    alertify.error('You do not have access to this page');
    this.router.navigate(['/home']);
    return false;
  }
}
