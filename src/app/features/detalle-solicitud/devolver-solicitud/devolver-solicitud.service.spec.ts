/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DevolverSolicitudService } from './devolver-solicitud.service';

describe('Service: DevolverSolicitud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevolverSolicitudService]
    });
  });

  it('should ...', inject([DevolverSolicitudService], (service: DevolverSolicitudService) => {
    expect(service).toBeTruthy();
  }));
});
