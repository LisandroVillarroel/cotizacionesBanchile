/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AprobarSolicitudService } from './aprobar-solicitud.service';

describe('Service: AprobarSolicitud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AprobarSolicitudService]
    });
  });

  it('should ...', inject([AprobarSolicitudService], (service: AprobarSolicitudService) => {
    expect(service).toBeTruthy();
  }));
});
