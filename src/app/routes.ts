import { AuthGuard } from './_guards/auth.guard';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import {Routes} from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactListResolver } from './_resolvers/contact-list.resolver';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';
import { ContactEditResolver } from './_resolvers/contact-edit.resolver';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        {path: 'contacts', component: ContactListComponent, resolve: {contactList: ContactListResolver} },
        {path: 'contacts/add', component: ContactAddComponent },
        {path: 'contacts/:id', component: ContactDetailComponent, resolve: {contact: ContactDetailResolver} },
        {path: 'contacts/edit/:id', component: ContactEditComponent, resolve: {contact: ContactEditResolver} },
    ]
},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
