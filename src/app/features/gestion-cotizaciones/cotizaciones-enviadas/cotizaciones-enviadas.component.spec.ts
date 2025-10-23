import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesEnviadasComponent } from './cotizaciones-enviadas.component';

describe('CotizacionesEnviadasComponent', () => {
  let component: CotizacionesEnviadasComponent;
  let fixture: ComponentFixture<CotizacionesEnviadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesEnviadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionesEnviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
