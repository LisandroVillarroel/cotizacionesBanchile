import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDevueltaComponent } from './solicitud-devuelta.component';

describe('SolicitudDevueltaComponent', () => {
  let component: SolicitudDevueltaComponent;
  let fixture: ComponentFixture<SolicitudDevueltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDevueltaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudDevueltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
