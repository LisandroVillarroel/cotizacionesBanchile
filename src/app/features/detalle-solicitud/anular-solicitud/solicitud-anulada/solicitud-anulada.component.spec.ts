import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAnuladaComponent } from './solicitud-anulada.component';

describe('SolicitudAnuladaComponent', () => {
  let component: SolicitudAnuladaComponent;
  let fixture: ComponentFixture<SolicitudAnuladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudAnuladaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudAnuladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
