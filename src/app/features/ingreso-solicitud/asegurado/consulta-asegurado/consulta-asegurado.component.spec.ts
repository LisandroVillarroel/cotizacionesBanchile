import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAseguradoComponent } from './consulta-asegurado.component';

describe('ConsultaAseguradoComponent', () => {
  let component: ConsultaAseguradoComponent;
  let fixture: ComponentFixture<ConsultaAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaAseguradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
