import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Notes } from 'src/app/_models/notes';
import { ContactService } from 'src/app/_services/contact.service';

declare let alertify: any;
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() note: Notes;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private contactService: ContactService) { }

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
