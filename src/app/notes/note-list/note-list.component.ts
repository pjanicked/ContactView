import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Notes } from 'src/app/_models/notes';

declare let alertify: any;
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() noteList: Notes[];
  modalRef: BsModalRef;
  addNoteForm: FormGroup;

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createNoteForm();
  }

  createNoteForm() {
    this.addNoteForm = this.fb.group({
      id: [''],
      noteText: [, Validators.required],
      contactId: [''],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  addNote() {
    const noteObj = {
      id: 0,
      noteText: this.addNoteForm.value.noteText,
      contactId: 0
    };
    this.noteList.push(noteObj);
    this.addNoteForm.reset();
    this.modalRef.hide();
  }

  deleteNote(id) {
    this.noteList.splice(this.noteList.findIndex(p => p.id === id), 1);
  }

  cancel() {
    this.modalRef.hide();
  }

}
