import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSeguroComponent } from './tipo-seguro.component';

describe('TipoSeguroComponent', () => {
  let component: TipoSeguroComponent;
  let fixture: ComponentFixture<TipoSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoSeguroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
