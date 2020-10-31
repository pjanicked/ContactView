import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

declare let alertify: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
  this.loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  });
}

login() {
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe(
    () => {
      alertify.success('Logged in successfully');
      this.router.navigate(['/contacts']);
    },
    error => {
      alertify.error(error.error);
    });
}

cancel() {
  this.router.navigate(['/home']);
}

}
