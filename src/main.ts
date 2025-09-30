import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localeEsBo from '@angular/common/locales/es-BO';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsBo);

bootstrapApplication(AppComponent,  {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LOCALE_ID, useValue: 'es-BO' }
  ]
})
  .catch((err) => console.error(err));
