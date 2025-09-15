import { TestBed } from '@angular/core/testing';

import { IngresoSolicitudService } from './ingreso-solicitud.service';

describe('IngresoSolicitudService', () => {
  let service: IngresoSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
