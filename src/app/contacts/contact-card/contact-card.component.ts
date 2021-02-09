import { Component, Input, OnInit } from '@angular/core';
import { ContactList } from 'src/app/_models/contactist';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: ContactList;

  constructor() { }

  ngOnInit() {
  }

}
