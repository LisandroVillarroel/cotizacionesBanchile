import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaRubroComponent } from './agrega-rubro.component';

describe('AgregaRubroComponent', () => {
  let component: AgregaRubroComponent;
  let fixture: ComponentFixture<AgregaRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
