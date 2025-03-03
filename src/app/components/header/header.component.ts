import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../button/button.component';
import { VehicleDialogService } from '../../services/vehicle-dialog.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    ImageModule,
    ButtonComponent,
  ],
})
export class HeaderComponent implements OnInit {
  constructor(
    private vehicleDialogService: VehicleDialogService,
    private router: Router
  ) {}

  showAddVehicleButton = false;

  ngOnInit(): void {
    this.updateButtonVisibility();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddVehicleButton = event.url == '/' || event.url == '/vehicles';
      }
    });

  }

  openDialog(): void {
    this.vehicleDialogService.openDialog();
  }

  updateButtonVisibility(): void {
    const currentUrl = this.router.url;
    this.showAddVehicleButton = currentUrl == '/' || currentUrl == '/vehicles';
  }
}
