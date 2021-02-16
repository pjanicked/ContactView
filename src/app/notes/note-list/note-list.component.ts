import { Component, Input, OnInit } from '@angular/core';
import { Notes } from 'src/app/_models/notes';

declare let alertify: any;
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() noteList: Notes[];

  constructor() { }

  ngOnInit() {
  }

  deleteNote(id) {
    this.noteList.splice(this.noteList.findIndex(p => p.id === id), 1);
  }

}
