/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GestionCotizacionesService } from './gestion-cotizaciones.service';

describe('Service: GestionCotizaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionCotizacionesService],
    });
  });

  it('should ...', inject([GestionCotizacionesService], (service: GestionCotizacionesService) => {
    expect(service).toBeTruthy();
  }));
});
