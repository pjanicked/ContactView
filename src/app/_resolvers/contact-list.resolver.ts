import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactList } from '../_models/contactist';
import { ContactService } from '../_services/contact.service';

declare let alertify: any;
@Injectable()
export class ContactListResolver implements Resolve<ContactList[]> {
    pageNumber = 1;
    pageSize = 8;
    constructor(private contactService: ContactService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ContactList[]> {
        return this.contactService.getAllContacts(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                alertify.error('Problem in getting contact list');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
