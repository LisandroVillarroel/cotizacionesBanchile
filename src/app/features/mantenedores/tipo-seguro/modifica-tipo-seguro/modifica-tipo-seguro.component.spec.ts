import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTipoSeguroComponent } from './modifica-tipo-seguro.component';

describe('ModificaTipoSeguroComponent', () => {
  let component: ModificaTipoSeguroComponent;
  let fixture: ComponentFixture<ModificaTipoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaTipoSeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaTipoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
