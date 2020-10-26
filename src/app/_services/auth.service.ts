import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;

constructor(private http: HttpClient) { }

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const res = response;
      if (res) {
        localStorage.setItem('token', res.token);
      }
    })
  );
}

}
