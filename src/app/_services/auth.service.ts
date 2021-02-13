import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiEndpoint;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

register(model: any) {
  return this.http.post(this.baseUrl + 'auth/register', model);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'auth/login', model).pipe(
    map((response: any) => {
      const res = response;
      if (res) {
        localStorage.setItem('token', res.token);
      }
    })
  );
}

forgotpassword(model: any) {
  return this.http.post(this.baseUrl + 'auth/forgotpassword', model);
}

resetPassword(model: any) {
  return this.http.post(this.baseUrl + 'auth/resetpassword', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
