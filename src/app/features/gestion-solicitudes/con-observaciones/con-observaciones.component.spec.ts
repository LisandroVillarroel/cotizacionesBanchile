import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConObservacionesComponent } from './con-observaciones.component';

describe('ConObservacionesComponent', () => {
  let component: ConObservacionesComponent;
  let fixture: ComponentFixture<ConObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConObservacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
