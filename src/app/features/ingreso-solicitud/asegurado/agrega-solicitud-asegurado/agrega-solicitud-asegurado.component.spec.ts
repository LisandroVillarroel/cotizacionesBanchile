import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaSolicitudAseguradoComponent } from './agrega-solicitud-asegurado.component';

describe('AgregaSolicitudAseguradoComponent', () => {
  let component: AgregaSolicitudAseguradoComponent;
  let fixture: ComponentFixture<AgregaSolicitudAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaSolicitudAseguradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaSolicitudAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
