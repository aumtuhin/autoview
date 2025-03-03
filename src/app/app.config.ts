import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiModule } from './api/api.module';
import { Configuration } from './api/configuration';
import { MessageService } from 'primeng/api';

//configs;
import { environment } from '../environments/environment.dev';

//primeng
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from '../theme';

//routes
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Required for HTTP requests
    importProvidersFrom(ApiModule), // Import the API module
    MessageService, // Provide the PrimeNG MessageService
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: Configuration, useValue: new Configuration({ basePath: environment.apiBaseUrl }) },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
  ],
}

