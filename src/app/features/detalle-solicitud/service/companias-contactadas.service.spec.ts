/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CompaniasContactadasService } from './companias-contactadas.service';

describe('Service: CompaniasContactadas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompaniasContactadasService]
    });
  });

  it('should ...', inject([CompaniasContactadasService], (service: CompaniasContactadasService) => {
    expect(service).toBeTruthy();
  }));
});
