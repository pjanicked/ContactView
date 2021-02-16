import { Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
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
  noteForm: FormGroup;
  @Output() noteDeleteEvent = new EventEmitter();

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createNoteForm();
  }

  createNoteForm() {
    this.noteForm = this.fb.group({
      id: [''],
      noteText: ['', Validators.required],
      contactid: [''],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  editNote(id) {
    this.modalRef.hide();
    alertify.success('note edited!');
  }

  deleteNote(id) {
    this.noteDeleteEvent.emit(id);
    this.modalRef.hide();
    alertify.success('note deleted!');
  }

  cancel() {
    this.modalRef.hide();
  }

}
