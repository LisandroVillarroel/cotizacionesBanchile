import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesRegistradasComponent } from './cotizaciones-registradas.component';

describe('CotizacionesRegistradasComponent', () => {
  let component: CotizacionesRegistradasComponent;
  let fixture: ComponentFixture<CotizacionesRegistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesRegistradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionesRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
