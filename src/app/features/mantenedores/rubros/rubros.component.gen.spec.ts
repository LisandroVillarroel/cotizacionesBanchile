import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import RubrosComponent from './rubros.component';

describe('RubrosComponent', () => {
  let component: RubrosComponent;
  let fixture: ComponentFixture<RubrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RubrosComponent],
    });
    fixture = TestBed.createComponent(RubrosComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([
      `index`,
      `id_rubro`,
      `nombre_rubro`,
      `estado_rubro`,
      `fecha_creacion`,
      `usuario_creacion`,
      `fecha_modificacion`,
      `usuario_modificacion`,
      `opciones`,
    ]);
  });

  describe('agregaNuevoRubro', () => {
    it('makes expected calls', () => {
      spyOn(component, 'rescataLista').and.callThrough();
      component.agregaNuevoRubro();
      expect(component.rescataLista).toHaveBeenCalled();
    });
  });
});
