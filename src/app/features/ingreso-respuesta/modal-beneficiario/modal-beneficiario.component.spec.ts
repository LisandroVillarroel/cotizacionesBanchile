import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBeneficiarioComponent } from './modal-beneficiario.component';

describe('ModalBeneficiarioComponent', () => {
  let component: ModalBeneficiarioComponent;
  let fixture: ComponentFixture<ModalBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBeneficiarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
