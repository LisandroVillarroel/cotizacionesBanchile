import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaSolicitudBeneficiarioComponent } from './elimina-solicitud-beneficiario.component';

describe('EliminaSolicitudBeneficiarioComponent', () => {
  let component: EliminaSolicitudBeneficiarioComponent;
  let fixture: ComponentFixture<EliminaSolicitudBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaSolicitudBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminaSolicitudBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
