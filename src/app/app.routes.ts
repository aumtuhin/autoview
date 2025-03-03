import { Routes } from '@angular/router';
import { VehicleListComponent, VehicleDetailComponent } from './pages';



export const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/:id', component: VehicleDetailComponent }, // Dynamic route for car details
];
