import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarACompaniaComponent } from './enviar-a-compania.component';

describe('EnviarACompaniaComponent', () => {
  let component: EnviarACompaniaComponent;
  let fixture: ComponentFixture<EnviarACompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarACompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnviarACompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
