import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaParametroComponent } from './agrega-parametro.component';

describe('AgregaParametroComponent', () => {
  let component: AgregaParametroComponent;
  let fixture: ComponentFixture<AgregaParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaParametroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
