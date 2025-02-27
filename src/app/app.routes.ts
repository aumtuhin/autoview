import { Routes } from '@angular/router';
import { CarDetailComponent, CarListComponent } from './pages';



export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailComponent }, // Dynamic route for car details
];
