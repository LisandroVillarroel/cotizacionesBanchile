import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaAseguradaComponent } from './materia-asegurada.component';

describe('MateriaAseguradaComponent', () => {
  let component: MateriaAseguradaComponent;
  let fixture: ComponentFixture<MateriaAseguradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaAseguradaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MateriaAseguradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
