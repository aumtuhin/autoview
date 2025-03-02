import { inject, Injectable } from '@angular/core';
import { DefaultService, GetVehicles200ResponseInner } from '../api';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleService = inject(DefaultService); // Inject API Service

  constructor(private vehicleApiService: DefaultService) {} // Use OpenAPI service


  vehicles: GetVehicles200ResponseInner[] = [];
  sortOrder: string = 'asc'; // Default: Sort A-Z


  loadVehicles(): GetVehicles200ResponseInner[] {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.sortVehicles();
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      },
      complete: () => {
        console.log('Vehicle data fetch completed.');
      },
    });

    return this.vehicles;
  }

  sortVehicles(): void {
    this.vehicles.sort((a, b) => {
      return this.sortOrder === 'asc'
        ? (a.name ?? '').localeCompare(b.name ?? '') // A-Z
        : (b.name ?? '').localeCompare(a.name ?? ''); // Z-A
    });
  }


}
