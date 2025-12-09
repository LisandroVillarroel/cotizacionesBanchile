import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaBeneficiarioComponent } from './modifica-beneficiario.component';

describe('ModificarBeneficiarioComponent', () => {
  let component: ModificaBeneficiarioComponent;
  let fixture: ComponentFixture<ModificaBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaBeneficiarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
