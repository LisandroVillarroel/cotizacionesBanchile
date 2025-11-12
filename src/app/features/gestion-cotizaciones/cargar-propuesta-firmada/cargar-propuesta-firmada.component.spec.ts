import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPropuestaFirmadaComponent } from './cargar-propuesta-firmada.component';

describe('CargarPropuestaFirmadaComponent', () => {
  let component: CargarPropuestaFirmadaComponent;
  let fixture: ComponentFixture<CargarPropuestaFirmadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarPropuestaFirmadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarPropuestaFirmadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
