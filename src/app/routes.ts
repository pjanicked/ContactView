import { AuthGuard } from './_guards/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        {path: 'contacts', component: ContactsComponent },
    ]
},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
