import { Component, inject } from '@angular/core';
import { DefaultService, GetVehicles200ResponseInner } from '../../api';
import { NgFor, NgIf } from '@angular/common';

//primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-vehicle-list',
  imports: [NgFor, NgIf, ProgressSpinnerModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  private vehicleService = inject(DefaultService); // Inject API Service

  vehicles: GetVehicles200ResponseInner[] = [];
  sortOrder: string = 'asc'; // Default: Sort A-Z

  isLoading: boolean = true; //Add loading state

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
}
