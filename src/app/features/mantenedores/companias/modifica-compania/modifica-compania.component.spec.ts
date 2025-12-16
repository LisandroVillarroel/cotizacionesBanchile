import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaCompaniaComponent } from './modifica-compania.component';

describe('ModificaCompaniaComponent', () => {
  let component: ModificaCompaniaComponent;
  let fixture: ComponentFixture<ModificaCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
