import { Component, inject, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

// services
import {
  AddVehicleRequest,
  DefaultService,
  GetVehicles200ResponseInner,
} from '../../api';
import { VehicleDialogService } from '../../services/vehicle-dialog.service';

// components
import { AddVehicleComponent } from '../../components';
import { VehicleCardComponent } from '../../components';

//primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-list',
  imports: [
    NgIf,
    NgFor,
    ProgressSpinnerModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    VehicleCardComponent,
    CardModule,
    SkeletonModule,
    MessageModule,
    FormsModule,
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private vehicleService = inject(DefaultService); // Inject API Service
  private vehicleDialogService = inject(VehicleDialogService); // Inject Dialog Service
  private messageService = inject(MessageService); // Inject Message Service

  @Input() addVehicleClicked!: () => void; // Accepting the function as an Input

  vehicles: GetVehicles200ResponseInner[] = [];
  sortOrder: string = 'asc'; // Default: Sort A-Z

  isLoading: boolean = true; //Add loading state
  errorMessage: string = ''; //Add error message state
  isError: boolean = false; //Add error state

  displayDialog: boolean = false; //Controls dialog visibility

  formValid: boolean = true; // Form validation state

  // ✅ Store validation error messages
  errors: {
    name?: string;
    manufacturer?: string;
    model?: string;
    mileage?: string;
  } = {};

  newVehicle: AddVehicleRequest = {
    name: '',
    manufacturer: '',
    model: '',
    fuel: '',
    type: '',
    vin: '',
  };

  ngOnInit(): void {
    this.loadVehicles();

    this.vehicleDialogService.dialogState$.subscribe((state) => {
      this.displayDialog = state;
    });
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.sortVehicles();
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
        this.errorMessage = 'Failed to load vehicles. Please try again later.';
        this.isError = true;
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

  closeDialog(): void {
    this.displayDialog = false;
    this.newVehicle = {
      name: '',
      manufacturer: '',
      model: '',
      fuel: '',
      type: '',
      vin: '',
    };
  }

  // Validate input fields
  validateForm(): boolean {
    this.errors = {}; // ✅ Reset errors before validation

    if (!this.newVehicle.name) {
      this.errors.name = 'Vehicle name is required';
    }

    if (!this.newVehicle.manufacturer) {
      this.errors.manufacturer = 'Manufacturer is required';
    }

    if (!this.newVehicle.model) {
      this.errors.model = 'Model is required';
    }

    return Object.keys(this.errors).length === 0; // ✅ Returns true if no errors
  }


  // Add new vehicle
  addVehicle(): void {
    if (!this.validateForm()) return; // ✅ Stop submission if form is invalid

    this.vehicleService.addVehicle(this.newVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle added successfully!' });
        this.closeDialog();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add vehicle. Try again.' });
      }
    });
  }

}
