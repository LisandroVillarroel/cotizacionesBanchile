import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPropuestaIsolComponent } from './cargar-propuesta-isol.component';

describe('CargarPropuestaIsolComponent', () => {
  let component: CargarPropuestaIsolComponent;
  let fixture: ComponentFixture<CargarPropuestaIsolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarPropuestaIsolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarPropuestaIsolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
