import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

//import { LOCALE_ID } from '@angular/core';

import 'moment/locale/es';
//import es from '@angular/common/locales/es';
//import { registerLocaleData } from '@angular/common';
//registerLocaleData(es);
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    // { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
}).catch((err) => console.error(err));
