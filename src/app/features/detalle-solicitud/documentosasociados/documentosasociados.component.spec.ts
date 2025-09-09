import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosAsociadosComponent } from './documentosasociados.component';
import { DocumentosAsociadosService } from './documentosasociados.service';

describe('DocumentosAsociadosComponent', () => {
  let component: DocumentosAsociadosComponent;
  let fixture: ComponentFixture<DocumentosAsociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentosAsociadosComponent],
      providers: [DocumentosAsociadosService]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentosAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar registros con documentos', () => {
    expect(component.registros.length).toBeGreaterThan(0);
  });
});
