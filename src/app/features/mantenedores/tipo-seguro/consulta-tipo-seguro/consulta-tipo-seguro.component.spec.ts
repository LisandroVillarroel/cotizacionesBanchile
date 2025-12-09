import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTipoSeguroComponent } from './consulta-tipo-seguro.component';

describe('ConsultaTipoSeguroComponent', () => {
  let component: ConsultaTipoSeguroComponent;
  let fixture: ComponentFixture<ConsultaTipoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTipoSeguroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaTipoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
