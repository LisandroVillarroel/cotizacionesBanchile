import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPropuestaComponent } from './creacion-propuesta.component';

describe('CreacionPropuestaComponent', () => {
  let component: CreacionPropuestaComponent;
  let fixture: ComponentFixture<CreacionPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionPropuestaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreacionPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
