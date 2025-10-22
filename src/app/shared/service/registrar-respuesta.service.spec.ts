import { TestBed } from '@angular/core/testing';

import { RegistrarRespuestaService } from './registrar-respuesta.service';

describe('RegistrarRespuestaService', () => {
  let service: RegistrarRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
