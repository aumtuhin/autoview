import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
})
export class VehicleCardComponent {
  @Input() name: string | undefined = 'Unknown Vehicle';
  @Input() manufacturer: string | undefined = 'Unknown Manufacturer';
  @Input() model: string | undefined = 'Unknown Model';
  @Input() mileage?: number | undefined | null; // Optional field
}
