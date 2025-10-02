import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEnviadaCiaComponent } from './solicitud-enviada-cia.component';

describe('SolicitudEnviadaCiaComponent', () => {
  let component: SolicitudEnviadaCiaComponent;
  let fixture: ComponentFixture<SolicitudEnviadaCiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudEnviadaCiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudEnviadaCiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
