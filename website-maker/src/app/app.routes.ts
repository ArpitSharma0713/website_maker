import { Routes } from '@angular/router';
import { Pg1 } from './pgs/pg1/pg1';
import { Pg2 } from './pgs/pg2/pg2';
import { Pg3 } from './pgs/pg3/pg3';
import { Pg4 } from './pgs/pg4/pg4';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Pg1 },
  { path: 'register', component: Pg3 },
  { path: 'forgot-password', component: Pg2 },
  { path: '**', redirectTo: '/login' },
  { path: 'Home', component: Pg4 }
];
