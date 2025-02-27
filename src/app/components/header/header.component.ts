import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '../button/button.component';

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
  ngOnInit() {}
  @Output() addVehicleClicked = new EventEmitter<void>();

  openDialog() {
    this.addVehicleClicked.emit(); // Notify parent component to open the dialog
  }
}
