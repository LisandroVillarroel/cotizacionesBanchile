import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSolicitudBeneficiarioComponent } from './consulta-solicitud-beneficiario.component';

describe('ConsultaSolicitudBeneficiarioComponent', () => {
  let component: ConsultaSolicitudBeneficiarioComponent;
  let fixture: ComponentFixture<ConsultaSolicitudBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaSolicitudBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaSolicitudBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
