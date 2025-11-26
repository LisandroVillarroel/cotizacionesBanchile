import { TestBed } from '@angular/core/testing';

import { TipoSeguroService } from './tipo-seguro.service';

describe('TipoSeguroService', () => {
  let service: TipoSeguroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSeguroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
