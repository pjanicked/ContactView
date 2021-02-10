import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContactList } from 'src/app/_models/contactist';
import { ContactService } from 'src/app/_services/contact.service';

declare let alertify: any;
@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: ContactList;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id) {
    this.contactService.deleteContact(id).subscribe(() => {
      alertify.success('deleted successfully!');
      setTimeout(function() {
        window.location.reload();
      }, 3000);
    },
    error => {
      alertify.error(error);
    });
    this.modalRef.hide();
  }

  cancel() {
    this.modalRef.hide();
  }

}
