import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaSolicitudBeneficiarioComponent } from './agrega-solicitud-beneficiario.component';

describe('AgregaSolicitudBeneficiarioComponent', () => {
  let component: AgregaSolicitudBeneficiarioComponent;
  let fixture: ComponentFixture<AgregaSolicitudBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaSolicitudBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaSolicitudBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
