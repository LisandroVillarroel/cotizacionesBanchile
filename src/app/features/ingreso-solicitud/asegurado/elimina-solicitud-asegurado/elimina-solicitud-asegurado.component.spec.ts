import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaSolicitudAseguradoComponent } from './elimina-solicitud-asegurado.component';

describe('EliminaSolicitudAseguradoComponent', () => {
  let component: EliminaSolicitudAseguradoComponent;
  let fixture: ComponentFixture<EliminaSolicitudAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaSolicitudAseguradoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminaSolicitudAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
