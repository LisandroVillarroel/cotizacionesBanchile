import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaTipoSeguroComponent } from './agrega-tipo-seguro.component';

describe('AgregaTipoSeguroComponent', () => {
  let component: AgregaTipoSeguroComponent;
  let fixture: ComponentFixture<AgregaTipoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaTipoSeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregaTipoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
