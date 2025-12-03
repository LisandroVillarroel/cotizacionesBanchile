/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CarteraService } from './cartera.service';

describe('Service: Cartera', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarteraService]
    });
  });

  it('should ...', inject([CarteraService], (service: CarteraService) => {
    expect(service).toBeTruthy();
  }));
});
