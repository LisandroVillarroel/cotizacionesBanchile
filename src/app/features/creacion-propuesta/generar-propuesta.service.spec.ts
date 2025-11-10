/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenerarPropuestaService } from './generar-propuesta.service';

describe('Service: GenerarPropuesta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerarPropuestaService]
    });
  });

  it('should ...', inject([GenerarPropuestaService], (service: GenerarPropuestaService) => {
    expect(service).toBeTruthy();
  }));
});
