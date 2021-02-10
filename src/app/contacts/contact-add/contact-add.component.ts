import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/_services/contact.service';

declare let alertify: any;
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private contactService: ContactService) { }

  ngOnInit() {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      description: [''],
      companyUrl: ['']
    });
  }

  submit() {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(() => {
        alertify.success('Contact added successfully!');
        setTimeout(() => {
          this.router.navigate(['/contacts']);
        }, 3000);
      }, error => {
        alertify.error(error);
      });
    }
  }

}
