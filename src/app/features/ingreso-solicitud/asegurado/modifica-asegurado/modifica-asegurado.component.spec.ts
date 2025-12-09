import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaAseguradoComponent } from './modifica-asegurado.component';

describe('ModificarAseguradoComponent', () => {
  let component: ModificaAseguradoComponent;
  let fixture: ComponentFixture<ModificaAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaAseguradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
