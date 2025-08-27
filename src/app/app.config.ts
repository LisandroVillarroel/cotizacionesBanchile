import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Subscription } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch()),
  {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
useValue: { appearance: 'outline', floatLabel: 'never', SubscripSizing:'dynamic' }
  }
  ]
};
