import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';

declare let alertify: any;
@Injectable()
export class ContactDetailResolver implements Resolve<Contact[]> {
    constructor(private contactService: ContactService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
        return this.contactService.getContact(route.params['id']).pipe(
            catchError(error => {
                alertify.error('Problem in getting contact');
                this.router.navigate(['/contacts']);
                return of(null);
            })
        );
    }
}
