import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRubroComponent } from './consulta-rubro.component';

describe('ConsultaRubroComponent', () => {
  let component: ConsultaRubroComponent;
  let fixture: ComponentFixture<ConsultaRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
