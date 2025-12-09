import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaUsuarioComponent } from './agrega-usuario.component';

describe('AgregaUsuarioComponent', () => {
  let component: AgregaUsuarioComponent;
  let fixture: ComponentFixture<AgregaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
