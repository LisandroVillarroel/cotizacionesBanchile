import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesPendientesComponent } from './cotizaciones-pendientes.component';

describe('CotizacionesPendientesComponent', () => {
  let component: CotizacionesPendientesComponent;
  let fixture: ComponentFixture<CotizacionesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
