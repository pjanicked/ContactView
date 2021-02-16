import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_services/contact.service';

declare let alertify: any;
@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactForm: FormGroup;
  contact: Contact;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.contactForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private fb: FormBuilder, private router: Router,
    private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
    });
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
    this.contactService.updateContact(this.contact.id, this.contact).subscribe(() => {
      alertify.success('Contact updated successfully');
      setTimeout(() => {
        this.router.navigate(['/contacts']);
      }, 3000);
    },
    error => {
      alertify.error(error.error);
    });
  }

}
