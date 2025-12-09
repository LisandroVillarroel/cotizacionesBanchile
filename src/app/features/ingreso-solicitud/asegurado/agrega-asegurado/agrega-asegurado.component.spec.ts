import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaAseguradoComponent } from './agrega-asegurado.component';

describe('AgregaAseguradoComponent', () => {
  let component: AgregaAseguradoComponent;
  let fixture: ComponentFixture<AgregaAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaAseguradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregaAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
