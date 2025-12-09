/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenCotizacionesComponent } from './resumen-cotizaciones.component';

describe('ResumenCotizacionesComponent', () => {
  let component: ResumenCotizacionesComponent;
  let fixture: ComponentFixture<ResumenCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenCotizacionesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
