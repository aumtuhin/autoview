import { Routes } from '@angular/router';
import { VehicleListComponent, VehicleDetailComponent } from './pages';



export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: VehicleListComponent },
  { path: 'cars/:id', component: VehicleDetailComponent }, // Dynamic route for car details
];
