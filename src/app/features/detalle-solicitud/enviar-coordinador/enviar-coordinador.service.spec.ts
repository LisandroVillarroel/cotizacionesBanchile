/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnviarCoordinadorService } from './enviar-coordinador.service';

describe('Service: EnviarCoordinador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnviarCoordinadorService]
    });
  });

  it('should ...', inject([EnviarCoordinadorService], (service: EnviarCoordinadorService) => {
    expect(service).toBeTruthy();
  }));
});
