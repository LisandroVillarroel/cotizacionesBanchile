import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { provideNgxMask } from 'ngx-mask';
import { authInterceptor } from '@core/auth/interceptores/auth.interceptor';
import { errorInterceptor } from '@core/auth/interceptores/error.interceptor';
import { datoInterceptor } from '@core/auth/interceptores/dato.interceptor';


registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch(),
  withInterceptors([
    authInterceptor,
    errorInterceptor,
    datoInterceptor
  ])),  provideNgxMask(),
{ provide: LOCALE_ID, useValue: 'es-ES' },

  {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
useValue: { appearance: 'outline', floatLabel: 'never', SubscripSizing:'dynamic' }
  }

  ]
};
