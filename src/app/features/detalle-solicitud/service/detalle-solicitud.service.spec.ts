/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetalleSolicitudService } from './service/detalle-solicitud.service';

describe('Service: DetalleSolicitud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleSolicitudService]
    });
  });

  it('should ...', inject([DetalleSolicitudService], (service: DetalleSolicitudService) => {
    expect(service).toBeTruthy();
  }));
});
