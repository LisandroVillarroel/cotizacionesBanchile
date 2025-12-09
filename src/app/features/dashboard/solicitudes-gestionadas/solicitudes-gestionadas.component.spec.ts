import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesGestionadasComponent } from './solicitudes-gestionadas.component';

describe('SolicitudesGestionadasComponent', () => {
  let component: SolicitudesGestionadasComponent;
  let fixture: ComponentFixture<SolicitudesGestionadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesGestionadasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudesGestionadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
