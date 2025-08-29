import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaSolicitudBeneficiarioComponent } from './modifica-solicitud-beneficiario.component';

describe('ModificarSolicitudBeneficiarioComponent', () => {
  let component: ModificaSolicitudBeneficiarioComponent;
  let fixture: ComponentFixture<ModificaSolicitudBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaSolicitudBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaSolicitudBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
