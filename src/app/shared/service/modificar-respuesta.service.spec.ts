import { TestBed } from '@angular/core/testing';

import { ModificarRespuestaService } from './modificar-respuesta.service';

describe('ModificarRespuestaService', () => {
  let service: ModificarRespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarRespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
