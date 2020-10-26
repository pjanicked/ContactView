import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
