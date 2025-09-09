import { TestBed } from '@angular/core/testing';
import { DocumentosAsociadosService } from './documentosasociados.service';

describe('DocumentosAsociadosService', () => {
  let service: DocumentosAsociadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosAsociadosService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar registros con documentos', () => {
    const registros = service.obtenerRegistrosConDocumentos();
    expect(registros.length).toBeGreaterThan(0);
    expect(registros[0].documentosAsociados.length).toBeGreaterThan(0);
  });
});
