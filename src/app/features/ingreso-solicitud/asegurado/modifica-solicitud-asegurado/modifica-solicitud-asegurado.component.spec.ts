import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaSolicitudAseguradoComponent } from './modifica-solicitud-asegurado.component';

describe('ModificarSolicitudAseguradoComponent', () => {
  let component: ModificaSolicitudAseguradoComponent;
  let fixture: ComponentFixture<ModificaSolicitudAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaSolicitudAseguradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaSolicitudAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
