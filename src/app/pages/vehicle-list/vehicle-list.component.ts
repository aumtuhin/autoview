import { Component, inject } from '@angular/core';
import {
  AddVehicleRequest,
  DefaultService,
  GetVehicles200ResponseInner,
} from '../../api';
import { NgFor, NgIf } from '@angular/common';

// components
import { AddVehicleComponent } from '../../components';

//primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vehicle-list',
  imports: [
    NgFor,
    NgIf,
    ProgressSpinnerModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private vehicleService = inject(DefaultService); // Inject API Service

  vehicles: GetVehicles200ResponseInner[] = [];
  sortOrder: string = 'asc'; // Default: Sort A-Z

  isLoading: boolean = true; //Add loading state

  displayDialog: boolean = false; //Controls dialog visibility

  newVehicle: AddVehicleRequest = {
    name: '',
    manufacturer: '',
    model: '',
    fuel: '',
    type: '',
    vin: '',
  };

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.sortVehicles();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Vehicle data fetch completed.');
      },
    });
  }

  sortVehicles(): void {
    this.vehicles.sort((a, b) => {
      return this.sortOrder === 'asc'
        ? (a.name ?? '').localeCompare(b.name ?? '') // A-Z
        : (b.name ?? '').localeCompare(a.name ?? ''); // Z-A
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortVehicles();
  }

  openDialog(): void {
    this.displayDialog = true;

    console.log(this.displayDialog)
  }

  closeDialog(): void {
    console.log(this.displayDialog)
    this.displayDialog = false;
    console.log(this.displayDialog)
    this.newVehicle = {
      name: '',
      manufacturer: '',
      model: '',
      fuel: '',
      type: '',
      vin: '',
    };
  }

  saveVehicle(): void {
    if (
      this.newVehicle.name &&
      this.newVehicle.manufacturer &&
      this.newVehicle.model
    ) {
      this.vehicles.push(this.newVehicle);
      this.sortVehicles();
      this.closeDialog();
    }
  }
}
