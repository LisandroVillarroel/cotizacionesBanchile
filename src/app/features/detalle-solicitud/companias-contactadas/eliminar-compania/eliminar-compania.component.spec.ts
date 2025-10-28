import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCompaniaComponent } from './eliminar-compania.component';

describe('EliminarCompaniaComponent', () => {
  let component: EliminarCompaniaComponent;
  let fixture: ComponentFixture<EliminarCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
