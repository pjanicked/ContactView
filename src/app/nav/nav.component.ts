import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

declare let alertify: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
