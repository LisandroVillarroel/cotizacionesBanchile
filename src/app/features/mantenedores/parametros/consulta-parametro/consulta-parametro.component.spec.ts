import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaParametroComponent } from './consulta-parametro.component';

describe('ConsultaParametroComponent', () => {
  let component: ConsultaParametroComponent;
  let fixture: ComponentFixture<ConsultaParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaParametroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
