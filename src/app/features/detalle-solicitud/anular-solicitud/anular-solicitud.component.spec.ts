import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularSolicitudComponent } from './anular-solicitud.component';

describe('AnularSolicitudComponent', () => {
  let component: AnularSolicitudComponent;
  let fixture: ComponentFixture<AnularSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnularSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnularSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
