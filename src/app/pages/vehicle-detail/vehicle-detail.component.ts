import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DefaultService } from '../../api';
import { GetVehicles200ResponseInner } from '../../api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-detail',
  imports: [ CommonModule, CardModule, ButtonModule, BreadcrumbModule ],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vehicleService = inject(DefaultService);
  private messageService = inject(MessageService);

  vehicle: GetVehicles200ResponseInner | null = null;
  isLoading: boolean = true;
  isError: boolean = false;
  errorMessage: string = '';


  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.loadVehicle(vehicleId);
    } else {
      this.isError = true;
      this.errorMessage = 'Invalid vehicle ID. Please try again.';
    }
  }

  loadVehicle(id: string): void {
    this.isLoading = true;
    this.isError = false;

    this.vehicleService.getVehicleById(id).subscribe({
      next: (data) => {
        if (data) {
          this.vehicle = data;
          this.isLoading = false;
        } else {
          this.isError = true;
          this.errorMessage = 'No vehicle details found for this ID.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isError = true;
        this.isLoading = false;
        this.errorMessage = 'Failed to load vehicle details. Please try again later.';
        console.error('Error fetching vehicle:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  retry(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.loadVehicle(vehicleId);
    }
  }

}
