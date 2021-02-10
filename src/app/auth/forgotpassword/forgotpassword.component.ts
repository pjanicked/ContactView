import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

declare let alertify: any;
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  forgotpassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotpassword(this.forgotPasswordForm.value).subscribe(() => {
        alertify.success('We have sent a link to get your account back to your email address. Please click on that link!');
        alertify.success('Also we recommend to close this tab!');
      }, error => {
        alertify.error(error.error);
      });
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
