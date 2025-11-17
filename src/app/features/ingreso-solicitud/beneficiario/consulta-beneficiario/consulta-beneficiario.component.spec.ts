import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaBeneficiarioComponent } from './consulta-beneficiario.component';



describe('ConsultaBeneficiarioComponent', () => {
  let component: ConsultaBeneficiarioComponent;
  let fixture: ComponentFixture<ConsultaBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaBeneficiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
