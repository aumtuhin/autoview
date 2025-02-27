import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string | undefined;
  @Output() onClick = new EventEmitter<void>(); // Emit event when clicked

  handleClick(): void {
    this.onClick.emit();
  }
}
