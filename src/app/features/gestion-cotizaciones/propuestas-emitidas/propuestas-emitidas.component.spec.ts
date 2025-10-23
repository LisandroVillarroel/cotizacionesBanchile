import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasEmitidasComponent } from './propuestas-emitidas.component';

describe('PropuestasEmitidasComponent', () => {
  let component: PropuestasEmitidasComponent;
  let fixture: ComponentFixture<PropuestasEmitidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropuestasEmitidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropuestasEmitidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
