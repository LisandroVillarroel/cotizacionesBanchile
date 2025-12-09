import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaUsuarioComponent } from './elimina-usuario.component';

describe('EliminaUsuarioComponent', () => {
  let component: EliminaUsuarioComponent;
  let fixture: ComponentFixture<EliminaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
