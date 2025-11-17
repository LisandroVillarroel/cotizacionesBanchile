import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaBeneficiarioComponent } from './grilla-beneficiario.component';

describe('GrillaBeneficiarioComponent', () => {
  let component: GrillaBeneficiarioComponent;
  let fixture: ComponentFixture<GrillaBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
