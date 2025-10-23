import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasPendientesComponent } from './propuestas-pendientes.component';

describe('PropuestasPendientesComponent', () => {
  let component: PropuestasPendientesComponent;
  let fixture: ComponentFixture<PropuestasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropuestasPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropuestasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
