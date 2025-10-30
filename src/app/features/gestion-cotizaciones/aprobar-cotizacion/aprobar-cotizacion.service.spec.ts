import { TestBed } from '@angular/core/testing';

import { AprobarCotizacionService } from './aprobar-cotizacion.service';

describe('AprobarCotizacionService', () => {
  let service: AprobarCotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprobarCotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
