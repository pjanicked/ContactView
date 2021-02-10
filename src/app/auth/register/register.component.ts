import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

declare let alertify: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() authCancel = new EventEmitter();
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.createRegForm();
  }

  createRegForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmpassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(() => {
        alertify.success('Registered Successfully!');
        alertify.success('We have sent a confirmation email to your email address. Please click on that link and then login again!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      }, error => {
        alertify.error(error.error);
      });
    }
  }

  cancel() {
    this.authCancel.emit(false);
  }

}
