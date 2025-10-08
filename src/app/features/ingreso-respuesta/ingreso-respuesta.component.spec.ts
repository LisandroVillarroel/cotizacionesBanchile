import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoRespuestaComponent } from './ingreso-respuesta.component';

describe('IngresoRespuestaComponent', () => {
  let component: IngresoRespuestaComponent;
  let fixture: ComponentFixture<IngresoRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
