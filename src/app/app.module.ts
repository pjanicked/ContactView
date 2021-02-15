import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ContactService } from './_services/contact.service';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactCardComponent } from './contacts/contact-card/contact-card.component';
import { ContactListResolver } from './_resolvers/contact-list.resolver';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { ContactEditResolver } from './_resolvers/contact-edit.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ContactListComponent,
    ContactCardComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ContactEditComponent,
    ContactDetailComponent,
    ContactAddComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['localhost:44331', 'contactviewapi.herokuapp.com'],
         blacklistedRoutes: ['localhost:44331/api/auth', 'contactviewapi.herokuapp.com/api/auth']
      }
   })
  ],
  providers: [
    AuthService,
    AuthGuard,
    ContactService,
    ContactListResolver,
    ContactDetailResolver,
    ContactEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
