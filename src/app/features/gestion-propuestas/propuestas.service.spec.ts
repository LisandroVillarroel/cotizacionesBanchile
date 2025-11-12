/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PropuestasService } from './propuestas.service';

describe('Service: Propuestas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropuestasService]
    });
  });

  it('should ...', inject([PropuestasService], (service: PropuestasService) => {
    expect(service).toBeTruthy();
  }));
});
