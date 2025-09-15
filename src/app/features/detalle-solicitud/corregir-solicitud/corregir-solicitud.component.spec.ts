import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorregirSolicitudComponent } from './corregir-solicitud.component';

describe('CorregirSolicitudComponent', () => {
  let component: CorregirSolicitudComponent;
  let fixture: ComponentFixture<CorregirSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorregirSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorregirSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
