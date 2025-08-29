import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaSolicitudBeneficiarioComponent } from './grilla-solicitud-beneficiario.component';

describe('GrillaSolicitudBeneficiarioComponent', () => {
  let component: GrillaSolicitudBeneficiarioComponent;
  let fixture: ComponentFixture<GrillaSolicitudBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaSolicitudBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrillaSolicitudBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
