import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesRecibidasComponent } from './cotizaciones-recibidas.component';

describe('CotizacionesRecibidasComponent', () => {
  let component: CotizacionesRecibidasComponent;
  let fixture: ComponentFixture<CotizacionesRecibidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesRecibidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionesRecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
