import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'autoview';
}
