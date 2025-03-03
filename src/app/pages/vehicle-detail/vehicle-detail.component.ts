import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DefaultService } from '../../api';
import { GetVehicles200ResponseInner } from '../../api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-detail',
  imports: [ CommonModule, CardModule, ButtonModule ],
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

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.loadVehicle(vehicleId);
    }
  }

  loadVehicle(id: string): void {
    this.isLoading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isError = true;
        this.isLoading = false;
        console.error('Error fetching vehicle:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load vehicle details' });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

}
