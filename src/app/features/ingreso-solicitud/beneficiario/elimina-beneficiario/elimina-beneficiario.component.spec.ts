import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminaBeneficiarioComponent } from './elimina-beneficiario.component';

describe('EliminaBeneficiarioComponent', () => {
  let component: EliminaBeneficiarioComponent;
  let fixture: ComponentFixture<EliminaBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaBeneficiarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
