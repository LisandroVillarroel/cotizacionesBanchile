import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaBeneficiarioComponent } from './agrega-beneficiario.component';

describe('AgregaBeneficiarioComponent', () => {
  let component: AgregaBeneficiarioComponent;
  let fixture: ComponentFixture<AgregaBeneficiarioComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaBeneficiarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
