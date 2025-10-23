import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasFirmadasComponent } from './propuestas-firmadas.component';

describe('PropuestasFirmadasComponent', () => {
  let component: PropuestasFirmadasComponent;
  let fixture: ComponentFixture<PropuestasFirmadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropuestasFirmadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropuestasFirmadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
