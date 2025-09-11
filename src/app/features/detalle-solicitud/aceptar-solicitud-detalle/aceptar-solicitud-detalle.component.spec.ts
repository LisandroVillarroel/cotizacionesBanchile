import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarSolicitudDetalleComponent } from './aceptar-solicitud-detalle.component';

describe('AceptarSolicitudDetalleComponent', () => {
  let component: AceptarSolicitudDetalleComponent;
  let fixture: ComponentFixture<AceptarSolicitudDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarSolicitudDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarSolicitudDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
