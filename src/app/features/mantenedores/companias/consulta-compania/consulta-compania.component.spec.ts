import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCompaniaComponent } from './consulta-compania.component';

describe('ConsultaCompaniaComponent', () => {
  let component: ConsultaCompaniaComponent;
  let fixture: ComponentFixture<ConsultaCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
