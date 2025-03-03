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
import { Toast } from 'primeng/toast';
import { Select } from 'primeng/select';

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
    Select,
    Toast,
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

  sortOrder = { label: 'A-Z', value: 'asc' }; // Default: Sort A-Z
  sortOptions = [this.sortOrder, { label: 'Z-A', value: 'desc' }];

  isLoading: boolean = true;
  errorMessage: string = '';
  isError: boolean = false;

  displayDialog: boolean = false; //Controls dialog visibility

  formValid: boolean = true; // Form validation state

  newVehicle: AddVehicleRequest = {
    name: '',
    manufacturer: '',
    model: '',
    fuel: '',
    type: '',
    vin: '',
    color: null,
    mileage: null,
  };

  errors: Partial<Record<keyof AddVehicleRequest, string>> = {};

  ngOnInit(): void {
    this.loadVehicles();

    this.vehicleDialogService.dialogState$.subscribe((state) => {
      this.displayDialog = state;
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Vehicle added successfully!',
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
      if (!a.name || !b.name) return 0;

      return this.sortOrder.value === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
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
      color: null,
      mileage: null,
    };
    this.errors = {}; // Reset errors when closing
    this.vehicleDialogService.closeDialog();
  }

  // Validate a single field dynamically
  validateField(field: keyof AddVehicleRequest, value: any) {
    if (!value) {
      this.errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    } else {
      delete this.errors[field]; // Remove error when field is valid
    }
  }

  // Validate entire form before submission
  validateForm(): boolean {
    this.errors = {}; // Reset errors before validation

    this.validateField('name', this.newVehicle.name);
    this.validateField('manufacturer', this.newVehicle.manufacturer);
    this.validateField('model', this.newVehicle.model);
    this.validateField('fuel', this.newVehicle.fuel);
    this.validateField('type', this.newVehicle.type);
    this.validateField('vin', this.newVehicle.vin);

    return Object.keys(this.errors).length === 0; // ✅ Returns true if no errors
  }

  // Add new vehicle
  addVehicle(): void {
    if (!this.validateForm()) return; // Stop submission if form is invalid

    this.vehicleService.addVehicle(this.newVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vehicle added successfully!',
        });

        this.closeDialog(); // Close modal AFTER success message
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add vehicle. Try again.',
        });
      },
    });
  }
}
