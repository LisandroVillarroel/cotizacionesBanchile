import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAgregadaCiaComponent } from './solicitud-agregada-cia.component';

describe('SolicitudAgregadaCiaComponent', () => {
  let component: SolicitudAgregadaCiaComponent;
  let fixture: ComponentFixture<SolicitudAgregadaCiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudAgregadaCiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudAgregadaCiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
