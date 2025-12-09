import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaAseguradoComponent } from './elimina-asegurado.component';

describe('EliminaAseguradoComponent', () => {
  let component: EliminaAseguradoComponent;
  let fixture: ComponentFixture<EliminaAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaAseguradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminaAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
