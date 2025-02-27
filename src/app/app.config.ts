import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiModule } from './api/api.module';
import { Configuration } from './api/configuration';

//primeng
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { definePreset } from '@primeng/themes';

//routes
import { routes } from './app.routes';

const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{amber.50}',
          100: '{amber.100}',
          200: '{amber.200}',
          300: '{amber.300}',
          400: '{amber.400}',
          500: '{amber.600}',
          600: '{amber.500}',
          700: '{amber.700}',
          800: '{amber.800}',
          900: '{amber.900}',
          950: '{amber.950}'
      }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Required for HTTP requests
    importProvidersFrom(ApiModule), // Import the API module
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: Configuration, useValue: new Configuration({ basePath: 'https://67b85e2b699a8a7baef3cceb.mockapi.io' }) }, // Provide the API base URL
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
  ],
}

