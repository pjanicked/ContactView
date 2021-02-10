import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/_services/auth.service';

declare let alertify: any;
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  token: any;
  email: any;
  resetPasswordForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    this.createResetForm();
  }

  createResetForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmpassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const resetObj = {
        password: this.resetPasswordForm.value.password,
        confirmpassword: this.resetPasswordForm.value.confirmpassword,
        email: this.email,
        token: this.token,
        };
      this.authService.resetPassword(resetObj).subscribe(() => {
        alertify.success('Password reset successful!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }, error => {
        alertify.error(error.error);
      });
    }
  }

}
