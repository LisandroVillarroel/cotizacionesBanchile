import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnCotizacionComponent } from './en-cotizacion.component';

describe('EnCotizacionComponent', () => {
  let component: EnCotizacionComponent;
  let fixture: ComponentFixture<EnCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnCotizacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
