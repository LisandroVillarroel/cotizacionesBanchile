import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCompaniaComponent } from './listar-compania.component';

describe('ListarCompaniaComponent', () => {
  let component: ListarCompaniaComponent;
  let fixture: ComponentFixture<ListarCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCompaniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
