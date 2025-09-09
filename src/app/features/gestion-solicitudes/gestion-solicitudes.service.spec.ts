import { TestBed } from '@angular/core/testing';

import { GestionSolicitudesService } from './gestion-solicitudes.service';

describe('GestionSolicitudesService', () => {
  let service: GestionSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
