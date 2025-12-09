import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUsuarioComponent } from './modifica-usuario.component';

describe('ModificaUsuarioComponent', () => {
  let component: ModificaUsuarioComponent;
  let fixture: ComponentFixture<ModificaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
