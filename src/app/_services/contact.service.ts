import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';
import { ContactList } from '../_models/contactist';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiEndpoint;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

getAllContacts(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<ContactList[]>> {
  const paginationResultObj: PaginatedResult<ContactList[]> = new PaginatedResult<ContactList[]>();

  let params = new HttpParams();
  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('orderBy', userParams.orderBy);
  }

  return this.http.get<ContactList[]>(this.baseUrl + 'contact', {observe: 'response', params})
  .pipe(
    map(response => {
      paginationResultObj.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginationResultObj.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginationResultObj;
    })
  );
}

getContact(id): Observable<Contact> {
  return this.http.get<Contact>(this.baseUrl + 'contact/' + id);
}

deleteContact(id) {
  return this.http.delete(this.baseUrl + 'contact/' + id);
}

addContact(model: any) {
  return this.http.post(this.baseUrl + 'contact', model);
}

updateContact(id, model: any) {
  return this.http.put(this.baseUrl + 'contact/' + id, model);
}

}
