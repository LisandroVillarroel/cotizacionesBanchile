import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolverConObservacionesComponent } from './devolver-con-observaciones.component';

describe('DevolverConObservacionesComponent', () => {
  let component: DevolverConObservacionesComponent;
  let fixture: ComponentFixture<DevolverConObservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolverConObservacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolverConObservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
