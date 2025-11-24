import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaRubroComponent } from './modifica-rubro.component';

describe('ModificaRubroComponent', () => {
  let component: ModificaRubroComponent;
  let fixture: ComponentFixture<ModificaRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificaRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
