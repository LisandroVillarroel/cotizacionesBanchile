/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnularSolicitudService } from './anular-solicitud.service';

describe('Service: AnularSolicitud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnularSolicitudService]
    });
  });

  it('should ...', inject([AnularSolicitudService], (service: AnularSolicitudService) => {
    expect(service).toBeTruthy();
  }));
});
