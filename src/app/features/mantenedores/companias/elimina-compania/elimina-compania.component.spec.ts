import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminaCompaniaComponent } from './elimina-compania.component';

describe('EliminaCompaniaComponent', () => {
  let component: EliminaCompaniaComponent;
  let fixture: ComponentFixture<EliminaCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminaCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminaCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
