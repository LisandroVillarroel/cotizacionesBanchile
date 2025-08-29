import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSolicitudAseguradoComponent } from './consulta-solicitud-asegurado.component';

describe('ConsultaSolicitudAseguradoComponent', () => {
  let component: ConsultaSolicitudAseguradoComponent;
  let fixture: ComponentFixture<ConsultaSolicitudAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaSolicitudAseguradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaSolicitudAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
