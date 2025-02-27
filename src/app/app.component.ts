import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent, HeaderComponent, FooterComponent } from "./components";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'autoview';
}
