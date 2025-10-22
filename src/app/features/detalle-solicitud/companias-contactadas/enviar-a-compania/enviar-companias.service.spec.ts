/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnviarCompaniasService } from './enviar-companias.service';

describe('Service: EnviarCompanias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnviarCompaniasService]
    });
  });

  it('should ...', inject([EnviarCompaniasService], (service: EnviarCompaniasService) => {
    expect(service).toBeTruthy();
  }));
});
