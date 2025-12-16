import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaCompaniaComponent } from './agrega-compania.component';

describe('AgregaCompaniaComponent', () => {
  let component: AgregaCompaniaComponent;
  let fixture: ComponentFixture<AgregaCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
