import { ComponentFixture, TestBed } from '@angular/core/testing';

import ModalAseguradoComponent from './modal-asegurado.component';

describe('ModalAseguradoComponent', () => {
  let component: ModalAseguradoComponent;
  let fixture: ComponentFixture<ModalAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAseguradoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
