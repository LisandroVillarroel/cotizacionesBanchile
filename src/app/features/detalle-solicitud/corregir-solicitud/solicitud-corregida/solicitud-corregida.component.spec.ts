import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCorregidaComponent } from './solicitud-corregida.component';

describe('SolicitudCorregidaComponent', () => {
  let component: SolicitudCorregidaComponent;
  let fixture: ComponentFixture<SolicitudCorregidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudCorregidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudCorregidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
