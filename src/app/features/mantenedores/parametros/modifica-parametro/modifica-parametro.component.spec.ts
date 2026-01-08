import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaParametroComponent } from './modifica-parametro.component';

describe('ModificaParametroComponent', () => {
  let component: ModificaParametroComponent;
  let fixture: ComponentFixture<ModificaParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaParametroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
