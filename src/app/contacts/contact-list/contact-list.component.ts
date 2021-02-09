import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactList } from 'src/app/_models/contactist';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { ContactService } from 'src/app/_services/contact.service';

declare let alertify: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: ContactList[];
  pagination: Pagination;
  user = JSON.parse(localStorage.getItem('user'));
  userParams: any = {};

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contactList = data['contactList'].result;
      this.pagination = data['contactList'].pagination;
    });

    this.userParams.orderBy = 'createdAt';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadContacts();
  }

  loadContacts() {
    return this.contactService.getAllContacts(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<ContactList[]>) => {
        this.contactList = res.result;
        this.pagination = res.pagination;
      },
      error => {
        alertify.error(error.error);
      });
  }

}
